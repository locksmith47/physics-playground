import { Vector2D } from "./Vector2D.js";
import { GameObject } from "./GameObject.js";

const canvas = <HTMLCanvasElement>document.getElementById("playarea");
const canvas2DContext = canvas?.getContext("2d");

const balls: GameObject[] = [];
for (let i = 0; i < 100; i++) {
  balls[i] = new GameObject(
    new Vector2D(100 + Math.random() * 400, 100 + Math.random() * 400),
    new Vector2D(-200 + Math.random() * 400, -200 + Math.random() * 400)
  );
}

if (canvas2DContext) {
  let previousTimestamp: number;
  const updateFrame = (timestamp: number) => {
    if (!previousTimestamp) previousTimestamp = timestamp;
    const elapsed = timestamp - previousTimestamp;

    canvas2DContext.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => ball.update(elapsed));
    balls.forEach((ball) => ball.draw(canvas2DContext));

    previousTimestamp = timestamp;
    window.requestAnimationFrame(updateFrame);
  };

  window.requestAnimationFrame(updateFrame);
}
