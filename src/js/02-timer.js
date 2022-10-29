import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  buttonStartTimer: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

refs.buttonStartTimer.disabled = true;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
    const currentDate = new Date();
    
        if (selectedDates[0] - currentDate > 0) {
        refs.buttonStartTimer.disabled = false;
        } else {
         refs.buttonStartTimer.disabled = true;
         Notify.failure('Please choose a date in the future', {
         timeout: 2000,
         width: '500px',
        });
    };
  },
};
    
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};
         
const onStartBtnClick = () => {
    const selectedDate = fp.selectedDates[0];
            
    timerId = setInterval(() => {
        const startTime = new Date();
        const countdown = selectedDate - startTime;
        refs.buttonStartTimer.disabled = true;

        if (countdown < 0) {
            clearInterval(timerId);
            return;
        }
        updateTimerFace(convertMs(countdown));
    }, 1000);
};
        
 function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
};

const fp = flatpickr('#datetime-picker', options);

refs.buttonStartTimer.addEventListener('click', onStartBtnClick);

const timer = document.querySelector('.timer');
timer.setAttribute('style', 'color: grey; text-transform: uppercase; font-weight: 700;')

