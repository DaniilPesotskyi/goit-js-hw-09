const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
    pageBody: document.querySelector('body'),
}

refs.startButton.addEventListener('click', startColorSwitcher)
refs.stopButton.addEventListener('click', stopColorSwitcher)

let intervalId = null;
let isColorSwitcherActive = true;

function startColorSwitcher() {
    if(isColorSwitcherActive) {
        isColorSwitcherActive = false;
        intervalId = setInterval(changeBodyColor, 1000)
        refs.stopButton.removeAttribute("disabled", "disabled")
        refs.startButton.setAttribute("disabled", "disabled")
    }
}

function stopColorSwitcher() {
    isColorSwitcherActive = true;
    clearInterval(intervalId)
    refs.stopButton.setAttribute("disabled", "disabled")
    refs.startButton.removeAttribute("disabled", "disabled")
}

function changeBodyColor() {
    refs.pageBody.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
