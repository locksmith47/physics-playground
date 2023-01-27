import { GameObject } from "./GameObject.js";
import { Vector2D } from "../Vector2D.js";
import { Transform } from "./Transform.js";

export class CircleObject extends GameObject {
  velocity: Vector2D;

  constructor(transform?: Transform, velocity?: Vector2D) {
    super(transform);
    this.velocity = velocity || new Vector2D(0, 0);
  }

  update(timeElapsedMs: number) {
    this.transform.position = this.transform.position.add(
      this.velocity.scale(timeElapsedMs / 1000)
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.ellipse(
      this.transform.position.x,
      this.transform.position.y,
      10,
      10,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
