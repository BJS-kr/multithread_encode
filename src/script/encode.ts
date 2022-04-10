import ffmpeg from 'fluent-ffmpeg';
import { parentPort, workerData } from 'worker_threads';
import {
  COMMAND_ERROR,
  COMPLETE,
  PROGRESS,
  SIGINT,
  SIGTERM,
  STOP,
  TIMEOUT,
} from '../lib/messages';
import { EncodeInstruction } from '../lib/type';
import { resolve } from 'path';

process.on('SIGINT', (signal) => {
  parentPort?.postMessage(SIGINT(signal));
  process.exit(0);
});

process.on('SIGTERM', (signal) => {
  parentPort?.postMessage(SIGTERM(signal));
  process.exit(0);
});

parentPort?.on('message', (message) => {
  if (message.type === 'SIGNAL') {
    process.emit(message.signal);
  }
});

parentPort?.on('close', () => {
  console.log('Main-thread exited');
  process.exit(1);
});

const {
  input,
  inputFormat,
  output,
  outputFormat,
  outputFPS,
  size,
  videoBitrate,
  autoPadEnable,
  autoPadColor,
  duration,
  thumbnail,
} = workerData as EncodeInstruction;

console.log(workerData);

const command = ffmpeg()
  .input(resolve(input))
  .inputFormat(inputFormat)
  .output(output)
  .outputFormat(outputFormat)
  .outputFPS(outputFPS)
  .size(size)
  .videoBitrate(videoBitrate)
  .autoPad(autoPadEnable, autoPadColor)
  .duration(duration)
  .thumbnail(thumbnail)
  .on('error', (error) => {
    parentPort?.postMessage(COMMAND_ERROR(error, output));
    process.exit(1);
  })
  .on('progress', (progress) => {
    parentPort?.postMessage(PROGRESS(progress));
  })
  .on('end', () => {
    parentPort?.postMessage(COMPLETE());
    process.exit(0);
  });

parentPort?.on('message', (message) => {
  if (message.type === 'Main-thread' && message.order === 'stop') {
    parentPort?.postMessage(STOP());
    command.kill('SIGKILL');
  }
});

command.run();

setTimeout(() => {
  command.on('error', () => {
    parentPort?.postMessage(TIMEOUT());
  });

  command.kill('SIGKILL');
  process.exit(1);
}, 1000 * 60 * 5);
