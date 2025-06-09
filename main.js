let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let customInput = document.getElementById('custom-minutes');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let beep = document.getElementById('beep');

let timer;
let isRunning = false;
let totalSeconds;

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  totalSeconds = parseInt(customInput.value) * 60;
  updateDisplay();

  timer = setInterval(() => {
    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(timer);
      isRunning = false;
      beep.play();
      return;
    }

    updateDisplay();
  }, 1000);
}

function updateDisplay() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  let value = parseInt(customInput.value) || 25;
  minutesDisplay.textContent = String(value).padStart(2, '0');
  secondsDisplay.textContent = "00";
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Set default display
resetTimer();
