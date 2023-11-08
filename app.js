let curStatus = 'session';
let switchBtn = document.querySelector('#switch');
let tabTitle = document.querySelector('title');
let timer;
let isTimerRunning = false;
let sessionTime = 25;
let breakTime = 5;
let count = sessionTime*60;
let curTime = document.querySelector('.timer');
let startStopBtn = document.querySelector("#toggle");
let subFive = document.querySelector("#minus_five");
let subOne = document.querySelector("#minus_one");
let addOne = document.querySelector("#plus_one");
let addFive = document.querySelector("#plus_five");

const toggleIcon = document.querySelector('.toggle-icon')
document.querySelector('.theme-toggle').onclick = function() {
  if (toggleIcon.getAttribute("d") === "M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z") {toggleIcon.setAttribute("d","M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z")}
  else {toggleIcon.setAttribute("d","M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z")}
};

function darkMode() {
  const root = document.documentElement;
  let newTheme;
  if (root.className === 'break' || root.className === 'light') {newTheme = 'dark'}
  else if (root.className === 'dark' && switchBtn.textContent == 'BREAK') {newTheme = 'light'}
  else if (root.className === 'dark' && switchBtn.textContent == 'POMODORO') {newTheme = 'break'}
  else {newTheme = 'dark'}
  root.className = newTheme;
}
document.querySelector('.theme-toggle').addEventListener('click', darkMode)

function setBreak() {
  if (curStatus == 'session') {
    curStatus = 'break'
    displayCurrentTime(breakTime*60)
    count = breakTime*60
  }
  else if (curStatus == 'break') {
    curStatus = 'session'
    displayCurrentTime(sessionTime*60)
    count = sessionTime*60
  }

  const root = document.documentElement;
  let newTheme;
  const switchBtn = document.querySelector('#switch')
  const status = document.querySelector('.status')
  if (root.className === 'break') {newTheme = 'light', switchBtn.textContent = 'BREAK', status.textContent = 'CURRENT: POMODORO'} else {newTheme = 'break', switchBtn.textContent = 'POMODORO', status.textContent = 'CURRENT: BREAK'}
  root.className = newTheme;

}
document.querySelector('#switch').addEventListener('click', setBreak)
// INCREMENTS
// if button clicked AND time not running, add/remove time depending on button type
function minusFive() {
  if (isTimerRunning === false) {
  if (curStatus === 'session') {
    if (sessionTime > 10) {
      sessionTime -= 5
      displayCurrentTime(sessionTime*60)
    }
  }
  else if (curStatus === 'break') {
    if (breakTime > 5) {
      breakTime -= 5
      displayCurrentTime(breakTime*60)
    }
  }
}
}
subFive.addEventListener('click', minusFive)

function minusOne() {
  if (isTimerRunning === false) {
  if (curStatus === 'session') {
    if (sessionTime > 10) {
      sessionTime -= 1
      displayCurrentTime(sessionTime*60)
    }
  }
  else if (curStatus === 'break') {
    if (breakTime > 1) {
      breakTime -= 1
      displayCurrentTime(breakTime*60)
    }
  }
  }
}
subOne.addEventListener('click', minusOne)

function plusFive() {
  if (isTimerRunning === false) {
  if (curStatus === 'session') {
    if (sessionTime < 90) {
      sessionTime += 5
      displayCurrentTime(sessionTime*60)
    }
  }
  else if (curStatus === 'break') {
    if (breakTime < 60) {
      breakTime += 5
      displayCurrentTime(breakTime*60)
    }
  }
}
}
addFive.addEventListener('click', plusFive)

function plusOne() {
  if (isTimerRunning === false) {
  if (curStatus === 'session') {
    if (sessionTime < 90) {
      sessionTime += 1
      displayCurrentTime(sessionTime*60)
    }
  }
  else if (curStatus === 'break') {
    if (breakTime < 60) {
      breakTime += 1
      displayCurrentTime(breakTime*60)
    }
  }
}
}
addOne.addEventListener('click', plusOne)

// DISPLAY CURRENT TIME
function displayCurrentTime(time) {
  let minutes = (time/60) - (time/60 % 1);
  let seconds = time % 60;
  let curMinute = curTime.innerHTML.split(':')[0]
  let curSecond = curTime.innerHTML.split(':')[1]
  curMinute = minutes
  curSecond = seconds
  if (curSecond == '0') {curSecond = '00'}
  curTime.innerHTML = curMinute + ':' + curSecond
  tabTitle.innerText = curTime.textContent + ' - Session'
}
// START + PAUSE
function startTimer() {
  if (curStatus == 'session') {count = 60*sessionTime}
  else if (curStatus == 'break') {count = 60*breakTime}
  if (startStopBtn.textContent === 'START') {
    startStopBtn.textContent = 'PAUSE';
    subFive.style.display = "none";
    subOne.style.display = "none";
    addFive.style.display = "none";
    addOne.style.display = "none";
    isTimerRunning = true
    timer = setInterval(function() {
      count--;
      displayCurrentTime(count);
      if (count === 0) {
        clearInterval(timer);
        isTimerRunning = false;
      }
    }, 1000);
    isTimerRunning = true;
  } else if (startStopBtn.textContent === 'PAUSE') {
    startStopBtn.textContent = 'START';
    clearInterval(timer);
    isTimerRunning = false;
  }
}
document.querySelector('#toggle').addEventListener('click', startTimer);

// RESET
function resetTimer() {
  clearInterval(timer);
  subFive.style.display = "";
  subOne.style.display = "";
  addFive.style.display = "";
  addOne.style.display = "";
  if (curStatus === 'session') {
    displayCurrentTime(sessionTime*60)
    count = sessionTime*60;
  }
  else if (curStatus === 'break') {
    displayCurrentTime(breakTime*60)
    count = breakTime*60
  }
  startStopBtn.textContent = 'START'
  isTimerRunning = false
}
document.querySelector('#reset').addEventListener('click', resetTimer)