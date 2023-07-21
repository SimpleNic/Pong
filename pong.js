const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const newGameBtn = document.getElementsByClassName("new-game");
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.getElementById("new-game").addEventListener("click", function () {
  reset();
});

const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

const DIFFICULTY = 50; // Lower is harder

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 60;
const PADDLE_VEL = 7;
const PADDLE_Y = CENTER_Y - PADDLE_HEIGHT / 2;

const PADDLE_X_LEFT = 0;
const PADDLE_X_RIGHT = canvas.width - PADDLE_WIDTH;
const LEFT = "LEFT";
const RIGHT = "RIGHT";

const BALL_X = CENTER_X;
const BALL_Y = CENTER_Y;
const BALL_RADIUS = 10;
const BALL_VEL = {
  x: 5,
  y: 5,
};

const leftPaddle = new paddle(
  PADDLE_X_LEFT,
  PADDLE_Y,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_VEL,
  "PLAYER",
  LEFT
);
const rightPaddle = new paddle(
  PADDLE_X_RIGHT,
  PADDLE_Y,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_VEL,
  "AI",
  RIGHT
);
const listPaddle = [leftPaddle, rightPaddle];

const startBall = new ball(BALL_X, BALL_Y, BALL_RADIUS, BALL_VEL);
const listBall = [startBall];

let leftPlayerScore = 0;
let rightPlayerScore = 0;

let key_pressed = "";
let gameRunning = false;
let gameTime = 0;

function keyDownHandler(e) {
  gameRunning = true;
  if (e.key == "w" || e.key == "s") key_pressed = e.key;
}

function keyUpHandler() {
  key_pressed = "";
}

function reset() {
  listPaddle.length = 0;
  listPaddle.push(leftPaddle);
  listPaddle.push(rightPaddle);

  listBall.length = 0;
  listBall.push(startBall);

  listPaddle.forEach((paddle) => paddle.reset());
  listBall.forEach((ball) => ball.reset());
  leftPlayerScore = 0;
  rightPlayerScore = 0;
  key_pressed = "";
  gameRunning = false;
  gameTime = 0;
}

function winDraw() {
  ctx.font = "32px Arial";
  let winText = "";
  if (leftPlayerScore == 10) {
    winText = "Player 1 wins!";
  } else if (rightPlayerScore == 10) {
    winText = "Player 2 wins!";
  }
  ctx.fillText(winText, CENTER_X, CENTER_Y);
}

function update() {
  if (leftPlayerScore == 10 || rightPlayerScore == 10) {
    gameRunning = false;
    return;
  }
  listPaddle.forEach((paddle) => paddle.update());
  listBall.forEach((ball) => ball.update());
  gameTime += 1;
}

function draw() {
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#FFF";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillText(leftPlayerScore, CENTER_X - 50, 20);
  ctx.fillText(rightPlayerScore, CENTER_X + 50, 20);

  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(CENTER_X, 0);
  ctx.lineTo(CENTER_X, canvas.height);
  ctx.stroke();
  ctx.closePath();

  listPaddle.forEach((paddle) => paddle.draw());
  if (gameRunning) listBall.forEach((ball) => ball.draw());
  else if (leftPlayerScore != 10 && rightPlayerScore != 10) {
    ctx.font = "32px Arial";
    ctx.fillText("Press any key to start", CENTER_X, CENTER_Y);
  }
  winDraw();
}

function loop() {
  if (gameRunning) {
    update();
  }
  draw();
  requestAnimationFrame(loop);
}

loop();
