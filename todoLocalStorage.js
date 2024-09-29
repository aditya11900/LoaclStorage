document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    // Load tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks from localStorage when the page loads
    tasks.forEach((task) => {
        renderTask(task);
    });

    // Add a new task when the 'Add Task' button is clicked
    addButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();

        if (taskText === "") return; // Check if the input is empty

        // Create a new task object
        const newTask = {
            id: Date.now(),
            task: taskText,
            completed: false
        };

        tasks.push(newTask); // Add the new task to the task array
        saveToLocalStorage(); // Save the updated tasks to localStorage
        renderTask(newTask); // Render the new task to the DOM
        todoInput.value = ""; // Clear the input field
    });

    // Render a task to the DOM
    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        li.innerHTML = `
            <span>${task.task}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Handle delete button click
        li.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTask(task.id);
        });

        todoList.appendChild(li);
    }

    // Save tasks to localStorage
    function saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Delete task by id
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveToLocalStorage();
        document.querySelector(`[data-id="${id}"]`).remove();
    }
});
