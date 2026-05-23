// ================= LOADER =================
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1200);
});

// ================= SIDEBAR =================
function openNav() {
  document.getElementById("mySidebar").classList.add("active");
  document.getElementById("overlay").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidebar").classList.remove("active");
  document.getElementById("overlay").style.display = "none";
}
const canvas = document.getElementById("trainCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 120;

let x = -200;

function drawTrain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // train body
  ctx.fillStyle = "#00c6ff";
  ctx.fillRect(x, 40, 120, 30);
  
  // wheels
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(x + 20, 75, 8, 0, Math.PI * 2);
  ctx.arc(x + 80, 75, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // smoke
  ctx.fillStyle = "rgba(200,200,200,0.3)";
  ctx.beginPath();
  ctx.arc(x + 130, 40, 10, 0, Math.PI * 2);
  ctx.arc(x + 150, 30, 12, 0, Math.PI * 2);
  ctx.fill();
  
  x += 2;
  if (x > canvas.width) x = -200;
  
  requestAnimationFrame(drawTrain);
}

drawTrain();