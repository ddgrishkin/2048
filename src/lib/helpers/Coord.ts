export class Coord {
  readonly x: number;
  readonly y: number;

  static parse(key: string): Coord {
    const [xCoord, yCoord] = key.split('-');
    const x = Number(xCoord);
    const y = Number(yCoord);

    return new Coord(x, y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

	isEqual(coord: Coord): boolean {
		return coord.x === this.x && coord.y === this.y;
	}

  toString(): string {
    return `${this.x}-${this.y}`;
  }
}
