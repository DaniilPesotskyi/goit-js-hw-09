import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateTimeInput: document.getElementById('datetime-picker'),
    startButton: document.querySelector('[data-start]')
}

const clockFaceRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  field: document.querySelectorAll('.field'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0]
      if (selectedDate <= Date.now()) {
        alert('Select date in future!')
        return;
      }
      refs.startButton.removeAttribute('disabled', 'disabled')
    },
};

flatpickr(refs.dateTimeInput, options);

let selectedDate = null;

class Timer {
  constructor() {
    this.intervalId = null
    this.active = false
  }

  start() {
    if(this.active) {
      return
    }
    this.active = true
    refs.dateTimeInput.setAttribute('disabled', 'disabled')
    console.log('Starting')

    this.intervalId = setInterval(() => {
      let deltaTime = selectedDate - Date.now()
      this.onTimerFinish(deltaTime, this.intervalId)
      console.log(deltaTime)
      this.updateClockFace(this.convertMs(deltaTime))
    }, 1000)
  }

  updateClockFace({ days, hours, minutes, seconds }) {
    clockFaceRefs.days.textContent = String(days).padStart(2, '0');
    clockFaceRefs.hours.textContent = String(hours).padStart(2, '0');
    clockFaceRefs.minutes.textContent = String(minutes).padStart(2, '0');
    clockFaceRefs.seconds.textContent = String(seconds).padStart(2, '0');
  }

  convertMs(ms) {
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
  }

  onTimerFinish(ms, intervalId) {
    if (ms < 1000) {
      clearInterval(intervalId);
      refs.dateTimeInput.removeAttribute('disabled', 'disabled');
      alert('Timer finished!')
    }
  }
}

let timer = new Timer()

refs.startButton.addEventListener('click', timer.start.bind(timer))