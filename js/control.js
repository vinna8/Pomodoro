import { state } from "./state.js";
import { showTimer, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');

const startBtn = () => {
    if (state.isActive) {
        clearTimeout(state.timerId);
        state.isActive = false;
        btnStart.textContent = 'Старт';
    } else {
        state.isActive = true;
        btnStart.textContent = 'Пауза';
        startTimer();
    }
} 

export const stopBtn = () => {
    clearTimeout(state.timerId);
    state.isActive = false;
    btnStart.textContent = 'Старт';
    state.timeLeft = state[state.status] * 60;
    showTimer(state.timeLeft);
}

export const changeActiveBtn = (dataUse) => {
    state.status = dataUse;
    for (let i = 0; i < navigationBtns.length; i++) {
        if (navigationBtns[i].dataset.use === dataUse) {
            navigationBtns[i].classList.add('navigation__btn_active');
        } else {
            navigationBtns[i].classList.remove('navigation__btn_active');
        }
    }
}

export const initControl = () => {
    btnStart.addEventListener('click', startBtn);

    btnStop.addEventListener('click', stopBtn);

    for (let i = 0; i < navigationBtns.length; i++) {
        navigationBtns[i].addEventListener('click', () => {
            changeActiveBtn(navigationBtns[i].dataset.use);
            stopBtn();
        })
    }

    showTimer(state.timeLeft);
}