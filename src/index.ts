import { Vector2D } from "./Vector2D.js";
import { GameObject } from "./game-objects/GameObject.js";
import { MouseFollower } from "./game-objects/MouseFollower.js";
import { PolygonObject } from "./game-objects/PolygonObject.js";

const canvas = <HTMLCanvasElement>document.getElementById("playarea");
const canvas2DContext = canvas?.getContext("2d");

const gameObjects: GameObject[] = [];
const polygonObject = new PolygonObject(
  new Vector2D(100 + Math.random() * 400, 100 + Math.random() * 400)
);
gameObjects.push(polygonObject);
const mouseFollower: MouseFollower = new MouseFollower();
gameObjects.push(mouseFollower);

if (canvas2DContext) {
  let previousTimestamp: number;
  const updateFrame = (timestamp: number) => {
    if (!previousTimestamp) previousTimestamp = timestamp;
    const elapsed = timestamp - previousTimestamp;

    canvas2DContext.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach((gameObject) => gameObject.update(elapsed));
    gameObjects.forEach((gameObject) => gameObject.draw(canvas2DContext));

    previousTimestamp = timestamp;
    window.requestAnimationFrame(updateFrame);
  };

  window.requestAnimationFrame(updateFrame);

  canvas.onmousedown = (event: MouseEvent) => {
    const boundingBox = canvas.getBoundingClientRect();

    mouseFollower.position.x = event.clientX - boundingBox.left;
    mouseFollower.position.y = event.clientY - boundingBox.top;

    polygonObject.testPoint = mouseFollower.position;
  };
}
