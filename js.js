// Get DOM elements
const createBtn = document.getElementById("create-clock");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const shortBreakBtn = document.getElementById("short-break");
const longBreakBtn = document.getElementById("long-break");
const beep = document.getElementById("beep");

const hInput = document.getElementById("hours");
const mInput = document.getElementById("minutes");
const sInput = document.getElementById("seconds");

const hDisplay = document.getElementById("clock-h");
const mDisplay = document.getElementById("clock-m");
const sDisplay = document.getElementById("clock-s");

const clock = document.getElementById("the-clock");

// Timer variables
let totalSeconds = 0;
let timer = null;

// Format numbers to always show 2 digits
function format(val) {
  return String(val).padStart(2, "0");
}

// Update the display with current time
function updateDisplay() {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  hDisplay.textContent = format(h);
  mDisplay.textContent = format(m);
  sDisplay.textContent = format(s);
}

// When user clicks "Create Pomodoro"
createBtn.addEventListener("click", () => {
  const h = parseInt(hInput.value) || 0;
  const m = parseInt(mInput.value) || 0;
  const s = parseInt(sInput.value) || 0;

  totalSeconds = h * 3600 + m * 60 + s;

  if (totalSeconds > 0) {
    updateDisplay();
    clock.classList.remove("hidden");
  }
});

// Start countdown
startBtn.addEventListener("click", () => {
  if (timer || totalSeconds <= 0) return;

  timer = setInterval(() => {
    totalSeconds--;

    if (totalSeconds <= 0) {
      clearInterval(timer);
      timer = null;
      beep.play();
      alert("Time's up! Take a break.");
    }

    updateDisplay();
  }, 1000);
});

// Stop (pause) timer
stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

// Reset timer to original input values
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  createBtn.click(); // Re-run the create logic
});

// Start a break timer (short or long)
function startBreak(minutes) {
  clearInterval(timer);
  timer = null;

  totalSeconds = minutes * 60;
  updateDisplay();
  clock.classList.remove("hidden");

  timer = setInterval(() => {
    totalSeconds--;

    if (totalSeconds <= 0) {
      clearInterval(timer);
      timer = null;
      beep.play();
      alert("Break over! Back to work.");
    }

    updateDisplay();
  }, 1000);
}

// Short break button (5 minutes)
shortBreakBtn.addEventListener("click", () => {
  startBreak(5);
});

// Long break button (15 minutes)
longBreakBtn.addEventListener("click", () => {
  startBreak(15);
});
