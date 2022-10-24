
const body = document.body;
const startSwitcherColor = document.querySelector('button[data-start]');
const stopSwitcherColor = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onStartBtnClick = () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
   
    startSwitcherColor.disabled = true;
    stopSwitcherColor.disabled = false;
};

const onStopBtnClick = () => {
    clearInterval(timerId);
    
    startSwitcherColor.disabled = false;
    stopSwitcherColor.disabled = true;
};

startSwitcherColor.addEventListener ('click', onStartBtnClick);
stopSwitcherColor.addEventListener('click', onStopBtnClick);

