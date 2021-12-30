//bien luu api
var tasksApi = "http://localhost:3000/tasks";

function start() {
  getTasks(renderTasks);
  handleAddTask();
}
start();

// get Tasks
function getTasks(callback) {
  fetch(tasksApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

//Add Tasks
function addTask(data, callback) {
  var options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(tasksApi, options)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}
//Delete Task
function handleDeleteTask(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(tasksApi + "/" + id, options)
    .then(response => {
      response.json();
    })
    .then(() => {
      getTasks(renderTasks);
    });
}

//render UI
function renderTasks(tasks) {
  var listTasks = document.querySelector("#tasks");
  var html = tasks.map(task => {
    return `
          <div class="task">
              <div class="content">
                <input
                  type="text"
                  class="text"
                  value = "${task.job}"
                  readonly
                />
              </div>
              <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete" onclick="handleDeleteTask(${task.id})">Delete</button>
              </div>
          </div>
     `;
  });
  listTasks.innerHTML = html.join("");
}

//Xu li tao form
function handleAddTask() {
  var addBtn = document.querySelector("input#todo-new-task-submit");
  addBtn.addEventListener("click", e => {
    e.preventDefault();
    var inputTask = document.querySelector("input#todo-new-task-input").value;

    var formData = {
      job: inputTask,
    };
    addTask(formData, () => {
      getTasks(renderTasks);
    });
  });
}
