const canvas = document.querySelector('#drawing_app');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const colorPicker = document.querySelector('#color');
const sizePicker = document.querySelector('#range');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('button');

const toolbar = document.querySelector('.toolbar');

let cursor = {
  x: 0,
  y: 0,
  pressed: false,
};

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function canvasClear() {
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, width, height);
}

function startDraw() {
  cursor.pressed = true
  toolbar.style.zIndex = '-1';
}

function cancelDraw() {
  cursor.pressed = false;
  toolbar.style.zIndex = '0';
}

canvasClear();

document.addEventListener('mousemove', e => {
  cursor.x = e.pageX;
  cursor.y = e.pageY;
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseout', cancelDraw);
canvas.addEventListener('mouseup', cancelDraw);

clearBtn.addEventListener('click', canvasClear);
sizePicker.addEventListener('input', () => output.textContent = sizePicker.value);

function draw() {
  if (cursor.pressed) {
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, sizePicker.value, degToRad(0), degToRad(360), false);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
