import { PathLike } from 'fs';

export type EncodeInstruction = {
  tag: 'ENCODE_INSTRUCTION';
  input: string;
  inputFormat: string;
  output: string;
  outputFormat: string;
  outputFPS: number;
  size: string;
  videoBitrate: number;
  autoPadEnable: boolean;
  autoPadColor: string;
  duration: number;
  thumbnail: { filename: string; folder: string; size: string; count: number };
};
