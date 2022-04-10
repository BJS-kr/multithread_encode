export function SIGTERM(signal: NodeJS.Signals) {
  return {
    type: 'report',
    message: `SIGTERM detected. Exiting process on signal: ${signal}`,
  };
}

export function SIGINT(signal: NodeJS.Signals) {
  return {
    type: 'report',
    message: `SIGINT detected. Exiting process on signal: ${signal}`,
  };
}

export function COMMAND_ERROR(error: any, output: string) {
  return {
    type: 'report',
    message: `Error occurred during encoding: ${error}.\n expected output was: ${output}`,
  };
}

export function PROGRESS(progress: any) {
  return {
    type: 'process',
    message: 'Processing: ' + progress.percent + '% done',
  };
}

export function COMPLETE() {
  return { type: 'complete', message: 'encoding done' };
}

export function STOP() {
  return {
    type: 'report',
    message: 'Order received from Main-thread : stop encode',
  };
}

export function TIMEOUT() {
  return {
    type: 'report',
    message:
      'Error occurred:  5 mins elapsed since encoding started. must be something wrong',
  };
}
