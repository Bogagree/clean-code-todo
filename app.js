//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const addTaskButton = document.querySelector(".task-row-wrapper button"); //first button
const todoList = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskElement = function (taskTitle) {
  const taskElement = document.createElement("li");

  //input (checkbox)
  const checkbox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const titleInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteIcon = document.createElement("img"); //delete button image

  label.innerText = taskTitle;
  label.className = "task";

  //Each elements, needs appending
  checkbox.type = "checkbox";
  titleInput.type = "text";
  titleInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(titleInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskElement = createTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  todoList.appendChild(taskElement);
  bindTaskEvents(taskElement, markTaskComplete);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskElement = this.parentNode;

  const titleInput = taskElement.querySelector("input[type=text]");
  const label = taskElement.querySelector("label");
  const editButton = taskElement.querySelector(".edit");
  const isEditing = taskElement.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = titleInput.value;
    editButton.innerText = "Edit";
  } else {
    titleInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskElement.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskElement = this.parentNode;
  const taskList = taskElement.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(taskElement);
};

//Mark task completed
const markTaskComplete = function () {
  //Append the task list item to the #completed-tasks
  const taskElement = this.parentNode;
  completedList.appendChild(taskElement);
  bindTaskEvents(taskElement, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskElement = this.parentNode;
  todoList.appendChild(taskElement);
  bindTaskEvents(taskElement, markTaskComplete);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskElement, onCheckboxChange) {
  //select ListItems children
  const checkbox = taskElement.querySelector("input[type=checkbox]");
  const editButton = taskElement.querySelector("button.edit");
  const deleteButton = taskElement.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = onCheckboxChange;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < todoList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoList.children[i], markTaskComplete);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedList.children[i], markTaskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
