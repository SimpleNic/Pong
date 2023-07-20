class paddle {
  constructor(x, y, w, h, vel, controller, side) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vel = vel;
    this.controller = controller;
    this.side = side;
  }

  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.controller == "PLAYER") {
      switch (key_pressed) {
        case "w":
          this.vel = -PADDLE_VEL;
          break;
        case "s":
          this.vel = PADDLE_VEL;
          break;
        default:
          this.vel = 0;
          break;
      }
    } else if (this.controller == "AI" && listBall.length > 0) {
      if (gameTime % DIFFICULTY > DIFFICULTY / 2) {
        let closest = listBall[0];
        for (let i = 0; i < listBall.length; i++) {
          let ballObj = listBall[i];

          if (this.side == "LEFT" && closest.x > ballObj.x) closest = ballObj;
          else if (this.side == "RIGHT" && closest.x < ballObj.x)
            closest = ballObj;
        }
        if (closest.y > this.y + this.height / 2) this.vel = PADDLE_VEL;
        else if (closest.y < this.y + this.height / 2) this.vel = -PADDLE_VEL;
      } else this.vel *= 0.3;
    }

    this.y += this.vel;

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
    }
  }

  reset() {
    if (this.side == "LEFT") this.x = PADDLE_X_LEFT;
    else if (this.side == "RIGHT") this.x = PADDLE_X_RIGHT;
    this.y = PADDLE_Y;
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;
    this.vel = PADDLE_VEL;
  }
}
