import { Vector2D } from "./Vector2D.js";
import {
  PolygonCollisionBody,
  SquarePoints,
} from "./game-objects/PolygonCollisionBody.js";
import { PolygonObject } from "./game-objects/PolygonObject.js";
import { Transform } from "./game-objects/Transform.js";

const canvas = <HTMLCanvasElement>document.getElementById("playarea");
const canvas2DContext = canvas?.getContext("2d");

const gameObjects: PolygonObject[] = [];

const polygonObject = new PolygonObject(
  new PolygonCollisionBody(
    [
      new Vector2D(-25, -25),
      new Vector2D(25, -25),
      new Vector2D(25, 25),
      new Vector2D(-25, 25),
      new Vector2D(-40, 0),
    ].map((point) => point.scale(2))
  ),
  new Transform(new Vector2D(200, 200), (Math.PI * 45) / 180)
);

gameObjects.push(polygonObject);

const mouseFollower: PolygonObject = new PolygonObject(
  new PolygonCollisionBody()
);
gameObjects.push(mouseFollower);

if (canvas2DContext) {
  let previousTimestamp: number;
  const updateFrame = (timestamp: number) => {
    if (!previousTimestamp) previousTimestamp = timestamp;
    const elapsed = timestamp - previousTimestamp;

    canvas2DContext.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach((gameObject) => gameObject.update(elapsed));
    const separatingVector = gameObjects[0].collisionBody.collide(
      gameObjects[1].collisionBody
    );
    if (separatingVector) {
      gameObjects[0].transform.position =
        gameObjects[0].transform.position.subtract(separatingVector);
    }
    gameObjects.forEach((gameObject) => gameObject.draw(canvas2DContext));

    previousTimestamp = timestamp;
    window.requestAnimationFrame(updateFrame);
  };

  window.requestAnimationFrame(updateFrame);

  canvas.onmousemove = (event: MouseEvent) => {
    const boundingBox = canvas.getBoundingClientRect();

    mouseFollower.transform.position.x = event.clientX - boundingBox.left;
    mouseFollower.transform.position.y = event.clientY - boundingBox.top;
  };
}
