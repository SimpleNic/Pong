const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const newGameBtn = document.getElementsByClassName("new-game");

const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

const DIFFICULTY = 50; // Lower is harder

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 60;
const PADDLE_VEL = 5;
const PADDLE_Y = CENTER_Y - PADDLE_HEIGHT / 2;

const PADDLE_X_LEFT = 0;
const PADDLE_X_RIGHT = canvas.width - PADDLE_WIDTH;

const BALL_X = CENTER_X;
const BALL_Y = CENTER_Y;
const BALL_RADIUS = 10;
const BALL_VEL = {
  x: 5,
  y: Math.floor(Math.random() * 10) - 5,
};

let leftPlayerScore = 0;
let rightPlayerScore = 0;

let keyPressed = "";
let gameRunning = false;
let gameTime = 0;

const leftPaddle = new paddle(
  PADDLE_X_LEFT,
  PADDLE_Y,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_VEL,
  "PLAYER",
  "LEFT"
);
const rightPaddle = new paddle(
  PADDLE_X_RIGHT,
  PADDLE_Y,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_VEL,
  "AI",
  "RIGHT"
);
const listPaddle = [leftPaddle, rightPaddle];

const startBall = new ball(BALL_X, BALL_Y, BALL_RADIUS, BALL_VEL);
const listBall = [startBall];

//Pixel art
const COLORS = {
  black: "rgb(0,0,0)",
  white: "rgb(255,255,255)",
  red: "rgb(255,0,0)",
  green: "rgb(0,255,0)",
  blue: "rgb(0,0,255)",
};

const DASHED_LINE_ART = {
  pattern: {
    repeat_num: 55,
    color: "white",
    x_interval: 0,
    y_interval: 10,
    width: 2,
    height: 5,
  },
  layers: [],
};

const ZERO_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 5, width: 5, height: 35 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 25, y: 5, width: 5, height: 35 },
  ],
};

const ONE_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 15, height: 5 },
    { color: "white", x: 10, y: 5, width: 5, height: 35 },
    { color: "white", x: 0, y: 40, width: 25, height: 5 },
  ],
};

const TWO_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 20, width: 30, height: 5 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 0, y: 25, width: 5, height: 15 },
    { color: "white", x: 25, y: 5, width: 5, height: 15 },
  ],
};

const THREE_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 20, width: 25, height: 5 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 25, y: 5, width: 5, height: 35 },
  ],
};

const FOUR_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 5, height: 20 },
    { color: "white", x: 0, y: 20, width: 25, height: 5 },
    { color: "white", x: 25, y: 0, width: 5, height: 45 },
  ],
};

const FIVE_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 20, width: 30, height: 5 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 25, y: 25, width: 5, height: 15 },
    { color: "white", x: 0, y: 5, width: 5, height: 15 },
  ],
};

const SIX_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 20, width: 30, height: 5 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 25, y: 25, width: 5, height: 15 },
    { color: "white", x: 0, y: 5, width: 5, height: 15 },
    { color: "white", x: 0, y: 25, width: 5, height: 15 },
  ],
};

const SEVEN_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 25, y: 5, width: 5, height: 40 },
  ],
};

const EIGHT_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 5, width: 5, height: 35 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 25, y: 5, width: 5, height: 35 },
    { color: "white", x: 5, y: 20, width: 20, height: 5 },
    
  ],
};

const NINE_ART = {
  pattern: {
    repeat_num: 0,
    color: "white",
    x_interval: 0,
    y_interval: 0,
    width: 0,
    height: 0,
  },
  layers: [
    { color: "white", x: 0, y: 0, width: 30, height: 5 },
    { color: "white", x: 0, y: 5, width: 5, height: 20 },
    { color: "white", x: 0, y: 40, width: 30, height: 5 },
    { color: "white", x: 25, y: 5, width: 5, height: 35 },
    { color: "white", x: 5, y: 20, width: 20, height: 5 },
  ],
};

const NUM_ART = [
  ZERO_ART,
  ONE_ART,
  TWO_ART,
  THREE_ART,
  FOUR_ART,
  FIVE_ART,
  SIX_ART,
  SEVEN_ART,
  EIGHT_ART,
  NINE_ART,
];
