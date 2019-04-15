const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
ctx.lineWidth = 2.5;
ctx.strokeStyle = "#22222";

let painting = false; // 캔버스에 클릭(그리기 시작)했는가?

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
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

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

//mouseenter : 대상에 마우스가 진입시
//mousemove : 대상에 마우스가 진입과 이동시
//event.offsetX, Y : 이벤트 대상에 위치한 마우스의 좌표(페이지가 아닌!)
//event.clientX, Y : 현재 보이는 브라우저 화면, 스크롤은 무시
//event.pageX, Y : 전체 문서 기준, 스크롤 포함
//event.screenX, Y : 브라우저X 모니터 화면 기준
