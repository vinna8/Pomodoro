import { state } from "./state.js";
import { showTimer, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');


export const initControl = () => {
    btnStart.addEventListener('click', () => {
        if (state.isActive) {
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Старт';
        } else {
            state.isActive = true;
            btnStart.textContent = 'Пауза';
            startTimer();
        }
    });

    btnStop.addEventListener('click', () => {
        clearTimeout(state.timerId);
        state.isActive = false;
        btnStart.textContent = 'Старт';
        state.timeLeft = state[state.status] * 60;
        showTimer(state.timeLeft);
    });

    showTimer(state.timeLeft);
}