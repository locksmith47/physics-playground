import { GameObject } from "./GameObject.js";
import { Vector2D } from "../Vector2D.js";

export const TrianglePoints = [
  new Vector2D(-25, -25),
  new Vector2D(25, -25),
  new Vector2D(25, 25),
];

export const SquarePoints = [
  new Vector2D(-25, -25),
  new Vector2D(25, -25),
  new Vector2D(25, 25),
  new Vector2D(-25, 25),
];

export class PolygonObject extends GameObject {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number;
  points: Vector2D[];

  testPoint: Vector2D;

  constructor(
    position?: Vector2D,
    velocity?: Vector2D,
    rotation?: number,
    points?: Vector2D[],
    testPoint?: Vector2D
  ) {
    super(position, velocity);
    this.position = position || new Vector2D(0, 0);
    this.velocity = velocity || new Vector2D(0, 0);
    this.rotation = rotation || Math.random() * 2 * Math.PI;
    this.points = points || TrianglePoints.map((point) => point.scale(4));
    this.testPoint = testPoint || new Vector2D(0, 0);
  }

  update(timeElapsedMs: number) {
    this.position = this.position.add(
      this.velocity.scale(timeElapsedMs / 1000)
    );
    this.rotation += (Math.PI * 2) / 180 / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    const rotatedPoints = this.points.map((point) =>
      point.rotate(this.rotation)
    );
    rotatedPoints.forEach((point, index) => {
      ctx.beginPath();
      ctx.ellipse(
        this.position.x + point.x,
        this.position.y + point.y,
        5,
        5,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      const lineTo: Vector2D =
        index > 0
          ? rotatedPoints[index - 1]
          : rotatedPoints[this.points.length - 1];

      const sideVector = lineTo.subtract(point).leftNormal();
      let min = 0,
        max = 0;
      rotatedPoints.forEach((point) => {
        const scalarResolute = Vector2D.scalarResolute(
          point.add(this.position),
          sideVector
        );
        if (!min || scalarResolute < min) min = scalarResolute;
        if (!max || scalarResolute > max) max = scalarResolute;
      });
      const testPointProjection = Vector2D.scalarResolute(
        this.testPoint,
        sideVector
      );

      const strokeColour =
        testPointProjection > min && testPointProjection < max
          ? "red"
          : "green";

      ctx.lineWidth = 2;
      ctx.strokeStyle = strokeColour;
      ctx.beginPath();
      ctx.moveTo(this.position.x + point.x, this.position.y + point.y);
      ctx.lineTo(this.position.x + lineTo.x, this.position.y + lineTo.y);
      ctx.stroke();
    });
  }
}
