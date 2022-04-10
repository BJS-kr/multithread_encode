import HTTP from 'http';
import { Worker } from 'worker_threads';
import { isEncodeInstruction } from './lib/typeguard';
import { log } from 'console';

function encodingServer() {
  HTTP.createServer((request, response) => {
    console.log(request.url);
    if (request.url === '/') {
      response.writeHead(200, 'this is encoder for adaptive streaming');
      response.end('hi! This is encoding server using Multi-threads!');
    } else if (request.method === 'POST' && request.url === '/encode') {
      let data: Buffer;

      request
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          const encodeInstruction = JSON.parse(JSON.stringify(data));

          if (isEncodeInstruction(encodeInstruction)) {
            const worker = new Worker('./encode.ts', {
              workerData: encodeInstruction,
            });

            worker
              .on('messageerror', (error) => {
                log('deserialize message failed: \n', error);
              })
              .on('online', () => {
                log('encoding started');
              })
              .on('message', (message) => {
                if (message.type === 'process') log(message.message);
              })
              .on('exit', () => {
                log('Worker Process Exited');
              });

            response.writeHead(201);
            response.end();
          } else {
            response.writeHead(400);
            response.end('must pass valid encode instruction');
          }
        });
    } else {
      response.writeHead(404);
      response.end();
    }
  }).listen(8080, () => {
    log('encoding server started');
  });
}

encodingServer();
