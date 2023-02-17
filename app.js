const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const widthRange = document.querySelector("#width-range");
const colorsRange = document.querySelector("#colors-range");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtin = document.querySelector("#mode-option");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
canvas.width = 800;
canvas.height = 800;
ctx.lineCap = "round";
let isPainting;
let isFilling;
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
  console.dir(a);
}
function onDubleClick(event) {
  const myText = textInput.value;
  if (myText !== "") {
    ctx.save();
    ctx.font = `48px 'Press Start 2P'`;
    ctx.strokeText(myText, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
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
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}
function cancelPainting() {
  ctx.beginPath();
  isPainting = false;
}
function lineWidthChange(event) {
  ctx.strokeText.font = event.target.value;
  //ctx.strokeTex = event.target.value;
  console.log(event);
}
function lineColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  console.log(event);
}
function onColorsOption(event) {
  const colorOptionValue = event.target.dataset.color;
  ctx.strokeStyle = colorOptionValue;
  ctx.fillStyle = colorOptionValue;
  colorsRange.value = colorOptionValue;
}

function onModeclick() {
  if (isFilling) {
    modeBtin.innerText = "Fill";
    isFilling = false;
  } else {
    modeBtin.innerText = "Draw";
    isFilling = true;
  }
}
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  if (modeBtin.innerText === "Draw") {
    modeBtin.innerText = "Fill";
    isFilling = false;
  }
}
function onFilechange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  image = new Image(20, 20);
  image.src = url;
  image.addEventListener("load", onLoadFile);
  console.dir(file);
  console.dir(event);
}

function onLoadFile() {
  ctx.drawImage(image, 0, 0, 800, 800);
}
fileInput.addEventListener("change", onFilechange);
canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
widthRange.addEventListener("change", lineWidthChange);
colorsRange.addEventListener("change", lineColorChange);
colorOptions.forEach((eachcolor) =>
  eachcolor.addEventListener("click", onColorsOption)
);
modeBtin.addEventListener("click", onModeclick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
canvas.addEventListener("dblclick", onDubleClick);
saveBtn.addEventListener("click", onSaveClick);
