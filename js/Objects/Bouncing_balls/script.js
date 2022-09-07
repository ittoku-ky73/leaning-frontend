const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
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

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;

  if (num === 0) {
    return random(min, max);
  }
  return num;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// animation
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball => {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  });

  requestAnimationFrame(loop);
}

loop();
