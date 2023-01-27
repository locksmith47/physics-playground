import { Vector2D } from "../Vector2D.js";
import { CollisionBody } from "./CollisionBody.js";

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

export class PolygonCollisionBody extends CollisionBody {
  shape: Vector2D[];

  constructor(shape?: Vector2D[]) {
    super();
    this.shape = shape || SquarePoints;
  }

  collide(collisionBody: CollisionBody): Vector2D | null {
    if (collisionBody instanceof PolygonCollisionBody) {
      const transformedShape = this.getTransformedShape();
      const otherTransformedShape = collisionBody.getTransformedShape();

      const selfNormals = this.getNormals(transformedShape);
      const otherNormals = collisionBody.getNormals(otherTransformedShape);
      const normals = [...selfNormals, ...otherNormals];

      let smallestLength = 1000000;
      let smallestVector: Vector2D = new Vector2D();
      let validCollision = true;
      normals.every((normal) => {
        let [x0, x1, y0, y1] = [1000000, -1000000, 1000000, -1000000];
        transformedShape.forEach((point) => {
          const scalarResolute = Vector2D.scalarResolute(point, normal);
          if (!x0 || scalarResolute < x0) x0 = scalarResolute;
          if (!x1 || scalarResolute > x1) x1 = scalarResolute;
        });

        otherTransformedShape.forEach((point) => {
          const scalarResolute = Vector2D.scalarResolute(point, normal);
          if (!y0 || scalarResolute < y0) y0 = scalarResolute;
          if (!y1 || scalarResolute > y1) y1 = scalarResolute;
        });

        if (x0 <= y1 && y0 <= x1) {
          const smallestLengthForNormal = Math.min(y1 - x0, x1 - y0);
          if (smallestLengthForNormal < smallestLength) {
            smallestVector = normal;
            smallestLength = smallestLengthForNormal;
          }
          return true;
        }
        validCollision = false;
        return false;
      });
      if (validCollision) {
        if (
          this.transform.position
            .subtract(collisionBody.transform.position)
            .dot(smallestVector) > 0
        ) {
          return smallestVector.scale(-smallestLength);
        }
        return smallestVector.scale(smallestLength);
      }
    }
    return null;
  }

  getTransformedShape(): Vector2D[] {
    return this.shape.map((point) =>
      point.rotate(this.transform.rotation).add(this.transform.position)
    );
  }

  getNormals(transformedShape?: Vector2D[]): Vector2D[] {
    const transformedShapeResolved =
      transformedShape || this.getTransformedShape();
    return transformedShapeResolved.map((point, index) => {
      const previousPoint: Vector2D =
        index > 0
          ? transformedShapeResolved[index - 1]
          : transformedShapeResolved[transformedShapeResolved.length - 1];

      return previousPoint.subtract(point).leftNormal().unit();
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    const transformedPoints = this.getTransformedShape();
    transformedPoints.forEach((point, index) => {
      ctx.beginPath();
      ctx.ellipse(point.x, point.y, 5, 5, 0, 0, 2 * Math.PI);
      ctx.fill();
      const lineTo: Vector2D =
        index > 0
          ? transformedPoints[index - 1]
          : transformedPoints[transformedPoints.length - 1];

      const strokeColour = "red";

      ctx.lineWidth = 2;
      ctx.strokeStyle = strokeColour;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(lineTo.x, lineTo.y);
      ctx.stroke();
    });
  }
}
