import { GameObject } from "./GameObject.js";
import { Transform } from "./Transform.js";

export class MouseFollower extends GameObject {
  constructor(transform?: Transform) {
    super(transform);
  }

  update() {
    // noop
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.ellipse(
      this.transform.position.x,
      this.transform.position.y,
      20,
      20,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
