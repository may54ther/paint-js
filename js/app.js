const canvas = document.getElementById("paintCanvas");
const colors = document.getElementsByClassName("paintColor");
const colorPicker = document.querySelector(".colorPicker");
const range = document.getElementById("paintRange");
const clear = document.getElementById("paintClear");
const mode = document.getElementById("paintMode");
const save = document.getElementById("paintSave");

const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#222";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.lineWidth = 2.5;
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;

let filling = false;
let painting = false; // 캔버스에 클릭(그리기 시작)했는가?

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting(event) {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleColorClick(event) {
  const type = event.type;

  if (type === "input") {
    const color = event.target.value;
    ctx.strokeStyle = ctx.fillStyle = color;
  } else {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = ctx.fillStyle = color;
  }
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "채우기 모드";
  } else {
    filling = true;
    mode.innerText = "그리기 모드";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveCanvas() {
  const img = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = img;
  link.download = "yourCanvas[🍉]";
  link.click();
}

function handleClearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (colorPicker) {
  colorPicker.addEventListener("input", handleColorClick);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveCanvas);
}

if (clear) {
  clear.addEventListener("click", handleClearCanvas);
}
