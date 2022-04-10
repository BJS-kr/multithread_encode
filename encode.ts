import {FfmpegCommand} from 'fluent-ffmpeg';
import { parentPort, workerData } from 'worker_threads';

const encodeInstruction = workerData

// ffmpeg.ffprobe('/path/to/file.avi', function(err, metadata) {
//     console.dir(metadata);
// });
const command = new FfmpegCommand()
.input('./target')
.inputFormat('mp4')
.output('./out/result')
.outputFormat('mp4')
.outputFPS(60)
.size('1920x1080')
.videoBitrate(7800)
.autoPad(true, 'black')
.duration(120)
.thumbnail({folder:'./out/thumbnails', filename:'result_thumbnail_1920x1080.png', size:'640x480',})
.on('end', () => {
  console.log('encode ended')
})

command.run()

setTimeout(()=> {
  command.on('error', () => {
    '5 mins elapsed since encoding started. must be something wrong'
  })

  command.kill('SIGKILL')
}, 1000 * 60 * 5)

process.on('SIGINT', (signal) => {
  console.log(`SIGINT detected. Exiting process on signal: ${signal}`)
  process.exit()
})

process.on('SIGTERM', (signal) => {
  console.log(`SIGTERM detected. Exiting process on signal: ${signal}`)
  process.exit()
})