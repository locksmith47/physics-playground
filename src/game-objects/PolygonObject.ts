import { GameObject } from "./GameObject.js";
import { CollisionBody } from "./CollisionBody.js";
import { Transform } from "./Transform.js";

export class PolygonObject extends GameObject {
  collisionBody: CollisionBody;

  constructor(collisionBody: CollisionBody, transform?: Transform) {
    super(transform);
    this.collisionBody = collisionBody;
  }

  update(timeElapsedMs: number) {
    this.transform.position = this.transform.position.add(
      this.velocity.scale(timeElapsedMs / 1000)
    );
    this.transform.rotation += (Math.PI * 2) / 180 / 2;

    this.collisionBody.transform = this.transform;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.collisionBody.draw(ctx);
  }
}
