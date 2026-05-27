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


// ================= INTERACTIVE PERCENTAGE-BASED SLIDER ENGINE =================
let currentIdx = 0;
let autoScrollTimer;

const windowEl = document.getElementById('sliderWindow');
const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot-indicator');
const totalSlides = dots.length;

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Updates slide tracks safely using active view frame widths
function updateSlider() {
  if (!windowEl || !track) return;
  currentTranslate = currentIdx * -windowEl.offsetWidth;
  prevTranslate = currentTranslate;
  track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
  track.style.transform = `translateX(${currentTranslate}px)`;
  
  // Highlighting engine for indicators matching original layout
  dots.forEach((dot, index) => {
    if (index === currentIdx) {
      dot.style.backgroundColor = '#00ff88';
      dot.style.borderColor = '#00ff88';
      dot.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.6)';
    } else {
      dot.style.backgroundColor = 'transparent';
      dot.style.borderColor = 'var(--purple)';
      dot.style.boxShadow = 'none';
    }
  });
}

// Relative button navigation hooks
function moveSlide(direction) {
  currentIdx = (currentIdx + direction + totalSlides) % totalSlides;
  updateSlider();
  resetTimer();
}

// Direct indicator node jump links
function jumpToSlide(index) {
  currentIdx = index;
  updateSlider();
  resetTimer();
}

// 3-Second automatic horizontal transition looping
function startTimer() {
  autoScrollTimer = setInterval(() => {
    currentIdx = (currentIdx + 1) % totalSlides;
    updateSlider();
  }, 3000);
}

function resetTimer() {
  clearInterval(autoScrollTimer);
  startTimer();
}

// Universal touch/mouse coordinates finder
function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches.clientX;
}

// Initialization of pointer gestures
if (windowEl) {
  windowEl.addEventListener('touchstart', dragStart);
  windowEl.addEventListener('touchend', dragEnd);
  windowEl.addEventListener('touchmove', dragMove);
  windowEl.addEventListener('mousedown', dragStart);
  windowEl.addEventListener('mouseup', dragEnd);
  windowEl.addEventListener('mouseleave', dragEnd);
  windowEl.addEventListener('mousemove', dragMove);
}

function dragStart(event) {
  isDragging = true;
  startX = getPositionX(event);
  track.style.transition = "none"; // Drops tracking delay during raw input holds
  clearInterval(autoScrollTimer);
}

function dragMove(event) {
  if (!isDragging) return;
  const currentX = getPositionX(event);
  const currentPosition = prevTranslate + (currentX - startX);
  track.style.transform = `translateX(${currentPosition}px)`;
}

function dragEnd(event) {
  if (!isDragging) return;
  isDragging = false;

  let endX = startX;
  if (event.type.includes('mouse')) {
    endX = event.pageX;
  } else if (event.changedTouches && event.changedTouches.length > 0) {
    endX = event.changedTouches.clientX;
  }
  
  const movedBy = endX - startX;
  const threshold = windowEl.offsetWidth * 0.2; // Requires moving 20% across bounds to trigger a turn

  if (movedBy < -threshold && currentIdx < totalSlides - 1) {
    currentIdx += 1;
  } else if (movedBy > threshold && currentIdx > 0) {
    currentIdx -= 1;
  }

  updateSlider();
  startTimer();
}

// Automatically shifts slider track layout properly during viewport resizing
window.addEventListener('resize', updateSlider);

// Live startup triggers
updateSlider();
startTimer();
