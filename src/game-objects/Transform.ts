import { Vector2D } from "../Vector2D.js";

export class Transform {
  position: Vector2D;
  rotation: number;

  constructor(position?: Vector2D, rotation?: number) {
    this.position = position || new Vector2D();
    this.rotation = rotation || 0;
  }

  clone(): Transform {
    return new Transform(this.position.clone(), this.rotation);
  }
}
