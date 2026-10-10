
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskLabel = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    taskLabel.textContent = taskText;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    checkbox.addEventListener("change", function () {
        listItem.classList.toggle("completed", checkbox.checked);
    });

    deleteButton.addEventListener("click", function () {
        listItem.remove();
    });

    listItem.append(checkbox, taskLabel, deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskInput.focus();
});
