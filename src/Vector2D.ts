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

  subtract(value: Vector2D): Vector2D {
    const newVector = this.clone();
    newVector.x -= value.x;
    newVector.y -= value.y;

    return newVector;
  }

  scale(value: number): Vector2D {
    const newVector = this.clone();
    newVector.x *= value;
    newVector.y *= value;

    return newVector;
  }

  unit(): Vector2D {
    return this.scale(1 / this.length());
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  rotate(angleRadians: number): Vector2D {
    const currentAngle = Math.atan2(this.y, this.x);
    const currentMagnitude = this.length();

    return new Vector2D(
      Math.cos(angleRadians + currentAngle) * currentMagnitude,
      Math.sin(angleRadians + currentAngle) * currentMagnitude
    );
  }

  dot(value: Vector2D): number {
    return this.x * value.x + this.y * value.y;
  }

  leftNormal(): Vector2D {
    return new Vector2D(-this.y, this.x);
  }

  static scalarResolute(fromVector: Vector2D, ontoVector: Vector2D): number {
    return fromVector.dot(ontoVector.unit());
  }

  static vectorResolute(fromVector: Vector2D, ontoVector: Vector2D): Vector2D {
    const scalarResolute = Vector2D.scalarResolute(fromVector, ontoVector);
    return ontoVector.unit().scale(scalarResolute);
  }
}
