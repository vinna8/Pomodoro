import { state } from "./state.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const audio = new Audio('audio/eralash.mp3')

const showTimer = (seconds) => {
    const CurrentMinutes = Math.floor(seconds / 60);
    const CurrentSeconds = seconds % 60;
    
    minutesElem.textContent = CurrentMinutes >= 10 ? CurrentMinutes : `0${CurrentMinutes}`;
    secondsElem.textContent = CurrentSeconds >= 10 ? CurrentSeconds : `0${CurrentSeconds}`;
}

const alarm = () => {
    audio.play();
}

export const startTimer = () => {
    state.timeLeft -= 5;

    showTimer(state.timeLeft);
    
    if (state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer, 1000);
    }

    if (state.timeLeft <= 0) {
        alarm();
    }
}