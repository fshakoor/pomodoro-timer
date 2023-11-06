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
  tabTitle.textContent = 'Session: ' + displayTime.textContent;
}

function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
}
document.querySelector('.theme-toggle').addEventListener('click', setTheme)

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
  clearInterval(timer); // Ensures only one instance of function is running
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