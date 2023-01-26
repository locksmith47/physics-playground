import { Vector2D } from "../Vector2D.js";

export abstract class GameObject {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number;

  constructor(position?: Vector2D, velocity?: Vector2D, rotation?: number) {
    this.position = position || new Vector2D(0, 0);
    this.velocity = velocity || new Vector2D(0, 0);
    this.rotation = rotation || 0;
  }

  abstract update(timeElapsedMs: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
