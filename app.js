const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".task-row-wrapper button");
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createTaskElement = function (taskTitle) {
  const taskElement = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const titleInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  label.innerText = taskTitle;
  label.className = "task";

  checkbox.type = "checkbox";
  titleInput.type = "text";
  titleInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(titleInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskElement = createTaskElement(newTaskInput.value);

  todoList.appendChild(taskElement);
  bindTaskEvents(taskElement, markTaskComplete);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskElement = this.parentNode;

  const titleInput = taskElement.querySelector("input[type=text]");
  const label = taskElement.querySelector("label");
  const editButton = taskElement.querySelector(".edit");
  const isEditing = taskElement.classList.contains("editMode");
  if (isEditing) {
    label.innerText = titleInput.value;
    editButton.innerText = "Edit";
  } else {
    titleInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  taskElement.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  const taskList = taskElement.parentNode;
  taskList.removeChild(taskElement);
};

function moveTask(taskElement, targetList, onCheckboxChange) {
  targetList.appendChild(taskElement);
  bindTaskEvents(taskElement, onCheckboxChange);
}

const markTaskComplete = function () {
  moveTask(this.parentNode, completedList, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  moveTask(this.parentNode, todoList, markTaskComplete);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskElement, onCheckboxChange) {
  const checkbox = taskElement.querySelector("input[type=checkbox]");
  const editButton = taskElement.querySelector("button.edit");
  const deleteButton = taskElement.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

function bindStarterTasks() {
  for (let i = 0; i < todoList.children.length; i++) {
    bindTaskEvents(todoList.children[i], markTaskComplete);
  }

  for (let i = 0; i < completedList.children.length; i++) {
    bindTaskEvents(completedList.children[i], markTaskIncomplete);
  }
}

bindStarterTasks();
