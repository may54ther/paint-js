const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("paintColor");
const range = document.getElementById("paintRange");
const clear = document.getElementById("paintClear");

canvas.width = 700;
canvas.height = 700;
ctx.lineWidth = 2.5;
ctx.strokeStyle = "#22222";

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

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //대상에 마우스 진입+이동
  canvas.addEventListener("mousedown", startPainting); //마우스 클릭
  canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 종료
  canvas.addEventListener("mouseleave", stopPainting); //대상에서 마우스가 나감
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
clear.addEventListener("click", function() {
  ctx.beginPath();
});

if (range) {
  range.addEventListener("input", handleRangeChange);
}
