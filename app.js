var pomodoroSkin,
  displayStatus,
  displayTime,
  timer,
  minutes,
  seconds,
  timeSession = 25,
  timeBreak = 5,
  timeOn = false,
  time = 1500; // seconds

let curStatus = 'session';
let switchBtn = document.querySelector('#switch')
let tabTitle = document.querySelector('title')

function changeDisplay() {
  minutes = parseInt(time / 60, 10);
  seconds = parseInt(time % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  displayTime.textContent = minutes + ":" + seconds;
  tabTitle.textContent = displayTime.textContent + " - Session";
}

const toggleIcon = document.querySelector('.toggle-icon')
document.querySelector('.theme-toggle').onclick = function() {
  if (toggleIcon.getAttribute("d") === "M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z") {toggleIcon.setAttribute("d","M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z")}
  else {toggleIcon.setAttribute("d","M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z")}
};

function darkMode() {
  const root = document.documentElement;
  const switchBtn = document.querySelector('#switch')
  let newTheme;
  if (root.className === 'break' || root.className === 'light') {newTheme = 'dark'}
  else if (root.className === 'dark' && switchBtn.textContent == 'BREAK') {newTheme = 'light'}
  else if (root.className === 'dark' && switchBtn.textContent == 'POMODORO') {newTheme = 'break'}
  else {newTheme = 'dark'}
  root.className = newTheme;
}
document.querySelector('.theme-toggle').addEventListener('click', darkMode)

function setBreak() {
  const root = document.documentElement;
  let newTheme;
  const switchBtn = document.querySelector('#switch')
  const status = document.querySelector('.status')
  if (root.className === 'break') {newTheme = 'light', switchBtn.textContent = 'BREAK', status.textContent = 'CURRENT: POMODORO'} else {newTheme = 'break', switchBtn.textContent = 'POMODORO', status.textContent = 'CURRENT: BREAK'}
  root.className = newTheme;
}
document.querySelector('#switch').addEventListener('click', setBreak)

function setTime(newTime) {
  time = newTime * 60;
  changeDisplay();
}

function resetTimer() {
  if (curStatus === 'session') {
    setTime(timeSession);
  } else {
    setTime(timeBreak);
  }
}

function switchMode() {
  if (curStatus !== 'break') {
    curStatus = 'break';
    setTime(timeBreak);
    pomodoroSkin.classList.remove("session");
    pomodoroSkin.classList.add("break");
    switchBtn.textContent = 'WORK'
  } else {
    curStatus = 'session';
    setTime(timeSession);
    pomodoroSkin.classList.remove("break");
    pomodoroSkin.classList.add("session");
    switchBtn.textContent = 'BREAK'
  }
  displayStatus.innerHTML = curStatus;
}

function startTimer(display) {
  clearInterval(timer);
  timer = setInterval(function() {
    changeDisplay();
    if (time !== 0) {
      time--;
    } else {
      switchMode();
    }
  }, 1000);
}

function toggleTimer() {
  if (timeOn) {
    timeOn = false;
    displayToggle.innerHTML = 'PLAY';
    clearInterval(timer);
  } else {
    timeOn = true;
    displayToggle.innerHTML = 'PAUSE';
    startTimer();
  }
}

(function() {
  pomodoroSkin = document.getElementsByClassName('pomodoro')[0];
  displayStatus = document.getElementsByClassName('status')[0];
  displayTime = document.getElementsByClassName('timer')[0];
  displayToggle = document.getElementById('toggle');

  document.getElementById('switch').onclick = switchMode;
  document.getElementById('reset').onclick = resetTimer;
  document.getElementById('toggle').onclick = toggleTimer;

  var displaySession = document.getElementById('session');
  var displayBreak = document.getElementById('break');

  document.getElementById('session-minus').onclick = function() {
    if (timeSession > 1) {
      timeSession--;
      displaySession.innerHTML = timeSession;
    }
  };
  document.getElementById('session-plus').onclick = function() {
    if (timeSession < 60) {
      timeSession++;
      displaySession.innerHTML = timeSession;
    }
  };
  document.getElementById('break-minus').onclick = function() {
    if (timeBreak > 1) {
      timeBreak--;
      displayBreak.innerHTML = timeBreak;
    }
  };
  document.getElementById('break-plus').onclick = function() {
    if (timeBreak < 60) {
      timeBreak++;
      displayBreak.innerHTML = timeBreak;
    }
  };
})();