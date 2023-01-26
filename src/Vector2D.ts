export class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  add(value: Vector2D): Vector2D {
    const newVector = this.clone();
    newVector.x += value.x;
    newVector.y += value.y;

    return newVector;
  }

  scale(value: number): Vector2D {
    const newVector = this.clone();
    newVector.x *= value;
    newVector.y *= value;

    return newVector;
  }
}
