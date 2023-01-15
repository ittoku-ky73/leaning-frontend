import { create, createReportList } from "./modules/canvas.js";
import randomSquare, { draw, reportArea, reportPerimeter } from "./modules/square.js";

const canvas = create("myCanvas", document.body, 480, 320);
const reportList = createReportList(canvas.id);

let square1 = draw(canvas.ctx, 50, 50, 100, "blue");
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

for (let i=0; i<10; i++) {
  randomSquare(canvas.ctx);
}
