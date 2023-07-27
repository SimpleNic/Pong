document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.getElementById("new-game").addEventListener("click", function () {
  reset();
});

function keyDownHandler(e) {
  gameRunning = true;
  if (e.key == "w" || e.key == "s") keyPressed = e.key;
}

function keyUpHandler(e) {
  if (e.key == "w" || e.key == "s") keyPressed = "";
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
  keyPressed = "";
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

function draw_score() {
  if (leftPlayerScore < 10 && rightPlayerScore < 10) {
    leftScoreArt = NUM_ART[leftPlayerScore];
    rightScoreArt = NUM_ART[rightPlayerScore];
    draw_art(leftScoreArt, CENTER_X - 80, 20);
    draw_art(rightScoreArt, CENTER_X + 50, 20);
  }
  else if (leftPlayerScore == 10){
    rightScoreArt = NUM_ART[rightPlayerScore];
    draw_art(rightScoreArt, CENTER_X + 50, 20);
    draw_art(ONE_ART, CENTER_X - 120, 20)
    draw_art(ZERO_ART, CENTER_X - 80, 20)
  }
  else if (rightPlayerScore == 10){
    leftScoreArt = NUM_ART[leftPlayerScore];
    draw_art(leftScoreArt, CENTER_X - 80, 20);
    draw_art(ONE_ART, CENTER_X + 50, 20)
    draw_art(ZERO_ART, CENTER_X + 90, 20)
  }
}

function draw_art(art, x, y) {
  if (art.pattern != NaN) {
    ctx.fillStyle = COLORS[art.pattern.color];
    for (let i = 0; i < art.pattern.repeat_num; i++) {
      ctx.fillRect(
        x + art.pattern.x_interval * i,
        y + art.pattern.y_interval * i,
        art.pattern.width,
        art.pattern.height
      );
    }
  }
  for (let i = 0; i < art.layers.length; i++) {
    layer = art.layers[i];
    ctx.fillStyle = COLORS[layer.color];
    ctx.fillRect(layer.x + x, layer.y + y, layer.width, layer.height);
  }
  ctx.fillStyle = "#FFF";
}

function draw() {
  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#FFF";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  draw_score();
  draw_art(DASHED_LINE_ART, CENTER_X - 1, 0);

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
