import {Coord} from 'lib/helpers/Coord';

export function getTranslate({x, y}: Coord): string {
  return `translate3d(${x * 100}%, ${y * 100}%, 0)`;
}

export function generateColorsMap(digit: number, limit = 20) {
  const result: Record<string, string> = {};

  let colorStep = 15;
  let colorStart = 0;
  for (let d = digit, i = 0; i < limit; i++) {
    result[d] = `hsl(${colorStart} 45% 50%)`;
    colorStart += colorStep;
    d *= 2;
  }

  return result;
}
