import { initControl } from "./control.js";
import { initTodo } from "./todo.js";

const initPomodoro = () => {
    initTodo();
    initControl();
}

initPomodoro();