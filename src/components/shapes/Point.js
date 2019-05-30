export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(point) {
    return (
      Number.isInteger(point.x) &&
      this.x === point.x &&
      Number.isInteger(point.y) &&
      this.y === point.y
    );
  }
}
