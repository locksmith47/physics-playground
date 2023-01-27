import { Vector2D } from "../Vector2D.js";
import { Transform } from "./Transform.js";

export abstract class CollisionBody {
  transform: Transform;

  constructor(transform?: Transform) {
    this.transform = transform || new Transform();
  }
  abstract collide(collisionBody: CollisionBody): Vector2D | null;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
