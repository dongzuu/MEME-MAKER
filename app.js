const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const widthRange = document.querySelector("#width-range");
const colorsRange = document.querySelector("#colors-range");

canvas.width = 800;
canvas.height = 800;
let isPainting;

function onMousemove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
  isPainting = true;
}
function cancelPainting() {
  ctx.beginPath();
  isPainting = false;
}
function lineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}
function lineColorChange(event) {
  console.log(event.target.value);
  ctx.strokeStyle = event.target.value;
}

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
widthRange.addEventListener("change", lineWidthChange);
colorsRange.addEventListener("change", lineColorChange);
