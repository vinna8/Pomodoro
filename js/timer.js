import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";
import { showTodo, updateTodo } from "./todo.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const audio = new Audio('audio/eralash.mp3')

export const showTimer = (seconds) => {
    const CurrentMinutes = Math.floor(seconds / 60);
    const CurrentSeconds = seconds % 60;
    
    minutesElem.textContent = CurrentMinutes >= 10 ? CurrentMinutes : `0${CurrentMinutes}`;
    secondsElem.textContent = CurrentSeconds >= 10 ? CurrentSeconds : `0${CurrentSeconds}`;
}

const alarm = () => {
    audio.play();
}

export const startTimer = () => {
    state.timerId = setInterval(() => {
        state.timeLeft -= 1; 
        showTimer(state.timeLeft);

        if (state.timeLeft > 0 && state.isActive) {
            return;
        }

        clearTimeout(state.timerId);

        if (state.status === 'work') {
            state.activeTodo.pomodoro += 1;
            updateTodo(state.activeTodo);
            showTodo();
            if (state.activeTodo.pomodoro % state.count) {
                state.status = 'break';
                showTimer(state.break * 60);
            } else {
                state.status = 'relax';
                showTimer(state.relax * 60);
            }
        } else {
            state.status = 'work';
            showTimer(state.work * 60);
        }
    
        alarm();
        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        showTodo();
        startTimer();
    }, 1000)
}