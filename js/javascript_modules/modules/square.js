const name = "square";

// ctxに正方形を描画
function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color,
  };
}

// minからmaxまでの乱数を返す
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// listIdのリストに正方形の面積の入った項目を追加
function reportArea(length, listId) {
  const list = document.getElementById(listId);
  const myItem = document.createElement("li");

  myItem.textContent = `${name} area is ${length * length}px squared.`;
  list.appendChild(myItem);
}

// listIdのリストの項目に正方形の外周の入った項目を追加
function reportPerimeter(length, listId) {
  const list = document.getElementById(listId);
  const myItem = document.createElement("li");

  myItem.textContent = `${name} perimeter is ${length * 4}px.`;
  list.appendChild(myItem);
}

// ランダムな正方形を描画
function randomSquare(ctx) {
  const x = random(0, 480);
  const y = random(0, 320);
  const length = random(10, 100);
  const color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color,
  };
}

export { name, draw, reportArea, reportPerimeter };
export default randomSquare;
