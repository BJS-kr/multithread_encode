import HTTP from 'http';
import { Worker } from 'worker_threads';
import a from './encode';

function start() {
  HTTP.createServer((request, response) => {
    if (request.url === '/') {
      response.writeHead(200, 'this is encoder for adaptive streaming')
      response.end()
    }else if (request.url === '/encode') {
      new Worker('./encode.ts', {workerData: encodeInstruction})
    }
  }).listen(8080)
}