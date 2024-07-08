document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");
  const totalTasks = document.getElementById("total-tasks");
  const completedTasks = document.getElementById("completed-tasks");
  const newTaskInput = document.getElementById("new-task");
  const addTaskButton = document.getElementById("add-task");

  let tasks = [];

  function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task) => {
      const taskRow = document.createElement("tr");
      taskRow.className = task.completed ? "completed" : "";
      taskRow.innerHTML = `
                <td>${task.id}</td>
                <td>${task.description}</td>
                <td><input type="checkbox" class="complete" ${
                  task.completed ? "checked" : ""
                }></td>
                <td><button class="delete">✖</button></td>
            `;
      todoList.appendChild(taskRow);

      taskRow.querySelector(".complete").addEventListener("change", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      taskRow.querySelector(".delete").addEventListener("click", () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        renderTasks();
      });
    });

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter((t) => t.completed).length;
  }

  addTaskButton.addEventListener("click", () => {
    const newTaskDescription = newTaskInput.value.trim();
    if (newTaskDescription) {
      const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description: newTaskDescription,
        completed: false,
      };
      tasks.push(newTask);
      newTaskInput.value = "";
      renderTasks();
    }
  });

  renderTasks();
});
