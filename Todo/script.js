const addNewTodo = document.querySelector('.add_new_todo');
const addTodo = document.querySelector('.add_todo');
const newTodoText = document.querySelector('.new_todo_text');
const newTodoConatiner = document.querySelector('.new_todo_container');

const todosContainer = document.querySelector('.todos_container');

addNewTodo.addEventListener('click', () => {
    console.log('add new todo clicked');

    // blur backgroud
    todosContainer.classList.add('blur');

    // show add todo input
    newTodoConatiner.classList.remove('hidden');

    // Add focus to text input
    newTodoText.focus();
});

addTodo.addEventListener('click', () => {
    console.log('add todo clicked');

    // removev blur
    todosContainer.classList.remove('blur');

    //hide add new todo text container
    newTodoConatiner.classList.add('hidden');

    // Add todo to UI
    if (!newTodoText.value)
        return;
    var todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
        <input type="checkbox" name="todo status" class="todo_status">
        <p class="todo_text">${newTodoText.value}</p>
        <button>
            <span class="material-icons">clear</span>
        </button>
    `;
    todosContainer.appendChild(todo);
    newTodoText.value = '';

    const todoStatus = todo.querySelector(".todo_status");
    const todoText = todo.querySelector(".todo_text");
    const deleteTodo = todo.querySelector("button");

    deleteTodo.addEventListener('click', () => {
        todosContainer.removeChild(todo);
    });

    todoStatus.addEventListener('change', (e) => {
        if (e.target.checked) {
            console.log("Checkbox is checked");
            todoText.classList.add('line_through');
        } else {
            console.log("Checkbox is not checked");
            todoText.classList.remove('line_through');
        }
    });

    saveTodos();
});

function saveTodos() {

}

function getSavedTodos() {

}