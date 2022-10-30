// Import library
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Get form element
const form = document.querySelector('.form');

// Set event listener submit on form
form.addEventListener('submit', onSubmitForm); 

// Submit form
function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(form.step.value);
  }
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

// Create promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


