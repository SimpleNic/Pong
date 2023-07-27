class ball {
  constructor(x, y, radius, vel) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vel = {
      x: vel.x,
      y: vel.y,
    };
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.Collision();

    if (this.y < this.radius || this.y > canvas.height - this.radius) {
      this.vel.y *= -1;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;

    this.Score();
  }

  Score() {
    if (this.x < 0) {
      rightPlayerScore += 1;
      listBall.length = 0;
      listBall.push(startBall);
      startBall.reset();
    }
    if (this.x > canvas.width) {
      leftPlayerScore += 1;
      listBall.length = 0;
      listBall.push(startBall);
      startBall.reset();
      this.vel.x *= -1;
    }
  }

  Collision() {
    for (let i = 0; i < listPaddle.length; i++) {
      let paddleObj = listPaddle[i];
      if (
        paddleObj.x + paddleObj.width > this.x - this.radius + this.vel.x &&
        paddleObj.x < this.x + this.radius + this.vel.x &&
        paddleObj.y + paddleObj.height > this.y - this.radius + this.vel.x &&
        paddleObj.y < this.y + this.radius + this.vel.x
      ) {
        this.vel.x *= -1;
        this.vel.y += Math.floor(
          (Math.random() * difficulty) / 10 - difficulty / 20
        );
        break;
      }
    }
  }

  reset() {
    this.x = BALL_X;
    this.y = BALL_Y;
    this.radius = BALL_RADIUS;
    this.vel = {
      x: BALL_VEL.x,
      y: Math.floor((Math.random() * difficulty) / 10 - difficulty / 20),
    };
  }
}
