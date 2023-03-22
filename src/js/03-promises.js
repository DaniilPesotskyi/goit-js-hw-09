import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
}

refs.form.addEventListener('submit', onSubmitForm)

function onSucces({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

function onSubmitForm(e) {
  e.preventDefault()
  const amount = Number(refs.inputAmount.value);
  let delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);

  setTimeout(() => {
    for (let index = 1; index <= amount; index += 1) {
      createPromise(index, delay).then(onSucces).catch(onError);
      delay += step;
    }
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}