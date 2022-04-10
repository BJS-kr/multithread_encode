import { EncodeInstruction } from './type';

export function isEncodeInstruction(
  workerData: any
): workerData is EncodeInstruction {
  if (workerData.tag === 'ENCODE_INSTRUCTION') return true;
  return false;
}
