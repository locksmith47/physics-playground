import { GameObject } from "./GameObject.js";
import { Vector2D } from "../Vector2D.js";

export class MouseFollower extends GameObject {
  position: Vector2D;

  constructor(position?: Vector2D) {
    super(position);
    this.position = position || new Vector2D(0, 0);
  }

  update() {
    // noop
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.ellipse(this.position.x, this.position.y, 20, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}
