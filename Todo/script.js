const addNewTodoButton = document.querySelector('.add_new_todo');
const addTodo = document.querySelector('.add_todo');
const newTodoText = document.querySelector('.new_todo_text');
const newTodoConatiner = document.querySelector('.new_todo_container');

const todosContainer = document.querySelector('.todos_container');

newTodoText.addEventListener("keyup", function (event) {
    console.log('voila');
    event.preventDefault();
    if (event.keyCode === 13) {
        addTodo.click();
    }
});

addNewTodoButton.addEventListener('click', () => {
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

    const todoJsonToString = JSON.stringify({
        status: false,
        text: newTodoText.value
    });
    addNewTodo(todoJsonToString);
    newTodoText.value = '';
});

function addNewTodo(todoJsonToString) {
    const todoJSON = JSON.parse(todoJsonToString);

    var todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `
        <input type="checkbox" name="todo status" class="todo_status">
        <p class="todo_text"></p>
        <button>
            <span class="material-icons">clear</span>
        </button>
    `;
    todosContainer.appendChild(todo);


    const todoStatus = todo.querySelector(".todo_status");
    const todoText = todo.querySelector(".todo_text");
    const deleteTodo = todo.querySelector("button");

    todoText.innerHTML = todoJSON.text;
    if (todoJSON.status) {
        todoStatus.checked = true;
        todoText.classList.add('line_through');
    }

    deleteTodo.addEventListener('click', () => {
        todosContainer.removeChild(todo);

        saveTodos();
    });

    todoStatus.addEventListener('change', (e) => {
        if (e.target.checked) {
            console.log("Checkbox is checked");
            todoText.classList.add('line_through');
        } else {
            console.log("Checkbox is not checked");
            todoText.classList.remove('line_through');
        }

        saveTodos();
    });

    saveTodos();
}

function saveTodos() {
    var todos = [];
    todosContainer.querySelectorAll('.todo').forEach(todo => {

        const todoJsonToString = JSON.stringify({
            status: todo.querySelector(".todo_status").checked,
            text: todo.querySelector(".todo_text").innerHTML
        });

        todos.push(todoJsonToString);
    });

    localStorage.setItem('todos', JSON.stringify(todos));

    console.log(todos);
}

function getSavedTodos() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos);
    if (todos) {
        todos.forEach(todo => {
            addNewTodo(todo);
        });
    }
}

getSavedTodos();