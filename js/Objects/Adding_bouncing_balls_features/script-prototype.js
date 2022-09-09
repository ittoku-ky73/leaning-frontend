const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ballCounter = document.querySelector('p');
let ballCount = 0;

// return integer from min to max
function random(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;

  if (num === 0) {
    return random(min, max);
  }
  return num;
}

// return random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// set ball counter text
function setBallCounterText(count) {
  ballCounter.textContent = 'boll count: ' + count;
}

/* constructor: Shape
 * Ball, EvilCircle constructor basic constructor
 */
function Shape(x, y, velX, velY) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
}

/* constructor: Ball
 * balls bounce when ball hit the wall and change color when ball hit each other.
 */
function Ball(x, y, velX, velY, color, size) {
  Shape.call(this, x, y, velX, velY);
  this.color = color;
  this.size = size;
}

/* method: Ball::draw()
 * drawing a ball in canvas
 */
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

/* method: Ball::update()
 * moving a ball in canvas. and if the ball moves to the wall, it bounces off the ball.
 */
Ball.prototype.update = function () {
  // right wall
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  // left wall
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  // bottom wall
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  // top wall
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  // move the ball
  this.x += this.velX;
  this.y += this.velY;
}

/* method: Ball::collisionDetect()
 * ball changes color if ball hits the ball
 */
Ball.prototype.collisionDetect = function () {
  balls.forEach(ball => {
    if ((this === ball)) return;

    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + ball.size) {
      ball.color = this.color = randomRGB();
    }
  });
}

/* constructor: EvilCircle
 * EvilCircle eats the ball and this is a user-operated
 */
function EvilCircle(x, y) {
  Shape.call(this, x, y, 20, 20);
  this.color = 'white';
  this.size = 10;

  // controller
  window.addEventListener('keypress', e => {
    switch (e.key) {
      // left
      case 'a':
        this.x -= this.velX;
        break;
      // right
      case 'd':
        this.x += this.velX;
        break;
      // up
      case 'w':
        this.y -= this.velY;
        break;
      // down
      case 's':
        this.y += this.velY;
        break;
    }
  });
}
/* method: EvilCircle::draw()
 * draw a circle on a doughnut
 */
EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

/* method: EvilCircle::checkBounds()
 * try not to go beyond the wall
 */
EvilCircle.prototype.checkBounds = function () {
  // right wall
  if ((this.x + this.size) >= width) {
    this.x -= this.velX;
  }
  // left wall
  if ((this.x - this.size) <= 0) {
    this.x += this.velX;
  }
  // bottom wall
  if ((this.y + this.size) >= height) {
    this.y -= this.velY;
  }
  // top wall
  if ((this.y - this.size) <= 0) {
    this.y += this.velY;
  }
}

/* method: EvilCircle::collisionDetect()
 * evilCircle eats the ball when it hits the ball
 */
EvilCircle.prototype.collisionDetect = function () {
  balls.forEach((ball, index) => {
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + ball.size) {
      delete balls[index];
      setBallCounterText(--ballCount);
    }
  });
}

// define ball objects
let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let x = random(0 + size, width - size);
  let y = random(0 + size, width - size);
  let velX = random(-7, 7);
  let velY = random(-7, 7);
  let color = randomRGB();

  balls.push(new Ball(x, y, velX, velY, color, size));
}

// define evilCircle object
let evilCircle = new EvilCircle(250, 250);

// set ball counter
ballCount = balls.length;
setBallCounterText(ballCount);

// animation
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball => {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  });

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
