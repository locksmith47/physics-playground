import { Vector2D } from "./Vector2D.js";

export class GameObject {
  position: Vector2D;
  velocity: Vector2D;

  constructor(position?: Vector2D, velocity?: Vector2D) {
    this.position = position || new Vector2D(0, 0);
    this.velocity = velocity || new Vector2D(0, 0);
  }

  update(timeElapsedMs: number) {
    this.position = this.position.add(
      this.velocity.scale(timeElapsedMs / 1000)
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.ellipse(this.position.x, this.position.y, 10, 15, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}
