// Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 650;
cnv.height = 500;

// Global Variables
let p1 = {
  x: 20,
  y: 175,
  w: 20,
  h: 125,
  dy: 9,
  color: "white",
};

let p2 = {
  x: cnv.width - 40,
  y: 175,
  w: 20,
  h: 125,
  dy: 9,
  color: "white",
};

let ball = {
  x: 40,
  y: 225,
  w: 20,
  h: 20,
  dy: -5,
  dx: 5,
  color: "white",
};

// Global Variables

let p1score = 0;
let p2score = 0;

let KeyWIsPressed = false;
let KeySIsPressed = false;
let ArrowUpIsPressed = false;
let ArrowDownIsPressed = false;
let time = 0;

// Main Program Loop
requestAnimationFrame(loop);
function loop() {
  // Logic
  if (KeySIsPressed) {
    p1.y += p1.dy;
  }
  if (KeyWIsPressed) {
    p1.y -= p1.dy;
  }
  if (ArrowDownIsPressed) {
    p2.y += p2.dy;
  }
  if (ArrowUpIsPressed) {
    p2.y -= p2.dy;
  }
  time++;
  console.log(time);

  // Draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  document.body.style.backgroundColor = "black";

  // SCOREBOARD
  ctx.font = "50px Courier New";
  ctx.fillStyle = "white";
  ctx.fillText(p1score, cnv.width / 2 - 100, 75);

  ctx.font = "50px Courier New";
  ctx.fillStyle = "white";
  ctx.fillText(p2score, cnv.width / 2 + 100, 75);

  // Players, Ball, & Border
  ctx.fillStyle = "white";
  ctx.fillRect(cnv.width / 2, 0, 2, cnv.height);

  ctx.fillStyle = p1.color;
  ctx.fillRect(p1.x, p1.y, p1.w, p1.h);

  ctx.fillStyle = p2.color;
  ctx.fillRect(p2.x, p2.y, p2.w, p2.h);

  ctx.fillStyle = ball.color;
  ctx.fillRect(ball.x, ball.y, ball.w, ball.h);

  // Player Collision
  if (p1.y < 0) {
    p1.y = 0;
  } else if (p1.y > cnv.height - p1.h) {
    p1.y = cnv.height - p1.h;
  }

  if (p2.y < 0) {
    p2.y = 0;
  } else if (p2.y > cnv.height - p2.h) {
    p2.y = cnv.height - p2.h;
  }

  // BALL Motion
  ball.x += ball.dx;
  ball.y += ball.dy;
  let randnum = Math.random();

  if (ball.x < 0) {
    ball.x = p1.x + p1.w;
    ball.y = p1.y + p1.h / 2 - ball.h / 2;
    if (time < 1000) {
      ball.dx = 5;
    } else if (time > 1000 && time < 3333) {
      ball.dx = 7;
    } else {
      ball.dx = 9;
    }
    ball.dy = 0;
    p2score = p2score + 1;
  }

  if (ball.x > cnv.width - ball.w) {
    ball.x = p2.x - p2.w;
    ball.y = p2.y + p2.h / 2 - ball.h / 2;
    if (time < 1000) {
      ball.dx = -5;
    } else if (time > 1000 && time < 3333) {
      ball.dx = -7;
    } else {
      ball.dx = -9;
    }
    ball.dy = 0;
    p1score = p1score + 1;
  }

  if (ball.y < 0) {
    ball.y = 0;
    ball.dy = 5;
  }

  if (ball.y > cnv.height - ball.h) {
    ball.y = cnv.height - ball.h;
    ball.dy = -5;
  }

  // Player Ball Collisions
  if (ball.x < p1.x + p1.w && ball.y > p1.y - ball.h && ball.y < p1.y + p1.h) {
    ball.x = p1.x + p1.w;
    //ball speed
    if (time < 1000) {
      ball.dx = 5;
    } else if (time > 1000 && time < 3333) {
      ball.dx = 7;
    } else {
      ball.dx = 9;
    }
    //random angle
    if (randnum < 0.2) {
      ball.dy = 5;
    } else if (randnum < 0.4) {
      ball.dy = -5;
    } else if (randnum < 0.6) {
      ball.dy = 2.5;
    } else if (randnum < 0.8) {
      ball.dy = -2.5;
    } else {
      ball.dy = 0;
    }
  }

  if (
    ball.x > p2.x - ball.w &&
    ball.y > p2.y - ball.h &&
    ball.y < p2.y + p2.h
  ) {
    ball.x = p2.x - p2.w;
    //ball speed
    if (time < 1000) {
      ball.dx = -5;
    } else if (time > 1000 && time < 3333) {
      ball.dx = -7;
    } else {
      ball.dx = -9;
    }
    //random angle
    if (randnum < 0.2) {
      ball.dy = 5;
    } else if (randnum < 0.4) {
      ball.dy = -5;
    } else if (randnum < 0.6) {
      ball.dy = 2.5;
    } else if (randnum < 0.8) {
      ball.dy = -2.5;
    } else {
      ball.dy = 0;
    }
  }

  if (time > 3000 && time < 4000) {
    p1.color = "darkgrey";
    p2.color = "darkgrey";
    ball.color = "darkgrey";
  } else if (time > 4000 && time < 7500) {
    p1.color = "grey";
    p2.color = "grey";
    ball.color = "grey";
  } else if (time > 7500) {
    p1.color = " DarkSlateGray";
    p2.color = " DarkSlateGray";
    ball.color = " DarkSlateGray";
  }

  if (time === 1000) {
    p1.h = p1.h - 10;
    p2.h = p2.h - 10;
  }

  if (time === 2000) {
    p1.h = p1.h - 10;
    p2.h = p2.h - 10;
  }

  if (time === 3000) {
    p1.h = p1.h - 15;
    p2.h = p2.h - 15;
  }

  if (time === 4000) {
    p1.h = p1.h - 15;
    p2.h = p2.h - 15;
  }

  requestAnimationFrame(loop);
}

// Event Stuff
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "KeyW") {
    KeyWIsPressed = true;
  }
  if (event.code == "KeyS") {
    KeySIsPressed = true;
  }
  if (event.code == "ArrowUp") {
    ArrowUpIsPressed = true;
  }
  if (event.code == "ArrowDown") {
    ArrowDownIsPressed = true;
  }

  // Cheat codess
  if (event.code == "KeyO") {
    p1score++;
  }
  if (event.code == "KeyP") {
    p2score++;
  }
  if (event.code == "KeyK") {
    p1score--;
  }
  if (event.code == "KeyL") {
    p2score--;
  }
  if (event.code == "Space") {
    p2score = 0;
    p1score = 0;
  }
}

function keyupHandler(event) {
  if (event.code == "KeyW") {
    KeyWIsPressed = false;
  }
  if (event.code == "KeyS") {
    KeySIsPressed = false;
  }
  if (event.code == "ArrowUp") {
    ArrowUpIsPressed = false;
  }
  if (event.code == "ArrowDown") {
    ArrowDownIsPressed = false;
  }
}
