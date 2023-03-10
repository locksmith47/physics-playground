import { Vector2D } from "../Vector2D.js";
import { Transform } from "./Transform.js";

export abstract class GameObject {
  transform: Transform;
  velocity: Vector2D;

  constructor(transform?: Transform, velocity?: Vector2D) {
    this.transform = transform || new Transform();
    this.velocity = velocity || new Vector2D();
  }

  abstract update(timeElapsedMs: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
