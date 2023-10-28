import { changeActiveBtn, stopBtn } from "./control.js";
import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const countElem = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');

const todoAddli = document.createElement('li');
todoAddli.classList.add('.todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую задачу';

todoAddli.append(todoAddBtn);

const getTodo = () => JSON.parse(localStorage.getItem('pomodoro') || '[]');

const addTodo = (title) => {
    const todo = {
        id: Math.random().toString(16).substring(2, 8),
        title,
        pomodoro: 0
    }

    const todoList = getTodo();
    todoList.push(todo);
    localStorage.setItem('pomodoro', JSON.stringify(todoList));

    return todo;
}

const updateTodo = (todo) => {
    const todoList = getTodo();
    const todoItem = todoList.find((item) => item.id === todo.id);
    todoItem.title = todo.title;
    todoItem.pomodoro = todo.pomodoro;
    localStorage.setItem('pomodoro', JSON.stringify(todoList));
}

const createTodoListItem = (todo) => {
    if (todo.id !== 'default') {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo__item');

        const todoItemWrapper = document.createElement('div');
        todoItemWrapper.classList.add('todo__item-wrapper');
        todoItem.append(todoItemWrapper);

        const todoBtn = document.createElement('button');
        todoBtn.classList.add('todo__btn');
        todoBtn.textContent = todo.title;

        const editBtn = document.createElement('button');
        editBtn.classList.add('todo__edit');
        editBtn.ariaLabel = 'Редактировать задачу';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo__del');
        deleteBtn.ariaLabel = 'Удалить задачу';

        todoItemWrapper.append(todoBtn, editBtn, deleteBtn);

        todoListElem.prepend(todoItem);

        todoBtn.addEventListener('click', () => {
            state.activeTodo = todo;
            showTodo();
            changeActiveBtn('work');
            stopBtn();
        });

        editBtn.addEventListener('click', () => {
            todo.title = prompt('Название задачи', todo.title);
            todoBtn.textContent = todo.title;
            updateTodo(todo);
            showTodo();
        });
    }
}

const renderTodoList = (list) => {
    todoListElem.textContent = '';
    list.forEach(createTodoListItem);
    todoListElem.append(todoAddli);
}

const showTodo = () => {
    if (state.activeTodo) {
        titleElem.textContent = state.activeTodo.title;
        countElem.textContent = state.activeTodo.pomodoro;
    } else {
        titleElem.textContent = 'Нет задач для выполнения';
        countElem.textContent = 0;
    }
}

export const initTodo = () => {
    const todoList = getTodo();

    if (!todoList.length) {
        state.activeTodo = {
            id: 'default',
            pomodoro: 0,
            title: 'Нет задач для выполнения'
        }
    } else {
        state.activeTodo = todoList[todoList.length - 1];
    }

    showTodo();
    renderTodoList(todoList);

    todoAddBtn.addEventListener('click', () => {
        const title = prompt('Введите задачу')?.trim();
        if (title) {
            const todo = addTodo(title);
            createTodoListItem(todo);
            state.activeTodo = todo;
            showTodo();
        } 
    })
}