document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();
});

document.getElementById("addTaskButton").addEventListener("click", () => {
  const taskValue = document.getElementById("taskInput").value.trim();
  if (taskValue) {
    const taskId = Date.now().toString(); // Créer un identifiant unique basé sur le timestamp
    addTaskToList(taskId, taskValue, false);
    document.getElementById("taskInput").value = "";
  }
});

document.getElementById("clearTasksButton").addEventListener("click", () => {
  clearAllTasks();
});

document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("addTaskButton").click();
  }
});

function loadTasksFromLocalStorage() {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTaskToList(task.id, task.text, task.completed);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des tâches :", error);
    localStorage.removeItem("tasks");
  }
}

function addTaskToList(id, text, completed) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.taskId = id; // Attribuer l'identifiant unique à l'élément

  const taskDiv = document.createElement("div");
  li.appendChild(taskDiv);

  const input = createCheckbox(id, completed);
  taskDiv.appendChild(input);

  const span = createSpan(text, completed);
  taskDiv.appendChild(span);

  const editButton = createEditButton(id, span, input);
  li.appendChild(editButton);

  document.getElementById("todo-list").appendChild(li);
  updateTaskInLocalStorage(id, text, completed);
}

function createCheckbox(id, completed) {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = completed;
  input.addEventListener("change", () => handleCheckboxChange(id, input));
  return input;
}

function handleCheckboxChange(id, checkbox) {
  const completed = checkbox.checked;
  const taskText = checkbox.nextElementSibling.textContent;
  styleTaskAsCompleted(checkbox.nextElementSibling, completed);
  updateTaskInLocalStorage(id, taskText, completed);
}

function createSpan(text, completed) {
  const span = document.createElement("span");
  span.textContent = text.charAt(0).toUpperCase() + text.slice(1);
  if (completed) {
    span.classList.add("completed");
  }
  return span;
}

function styleTaskAsCompleted(span, completed) {
  if (completed) {
    span.classList.add("completed");
  } else {
    span.classList.remove("completed");
  }
}

function createEditButton(id, span, checkbox) {
  const editButton = document.createElement("button");
  editButton.textContent = "Modifier";
  editButton.addEventListener("click", () =>
    handleEditTask(id, span, checkbox)
  );
  return editButton;
}

function handleEditTask(id, span, checkbox) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  span.parentNode.replaceChild(input, span);
  input.focus();

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const newText = input.value.trim();
      if (newText) {
        span.textContent = newText;
        input.parentNode.replaceChild(span, input);
        updateTaskInLocalStorage(id, newText, checkbox.checked);
      } else {
        alert("Le texte de la tâche ne peut pas être vide.");
      }
    }
  });
}

function updateTaskInLocalStorage(id, text, completed) {
  try {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex > -1) {
      tasks[taskIndex] = { id, text, completed };
    } else {
      tasks.push({ id, text, completed });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Erreur lors de la mise à jour des tâches :", error);
  }
}

function clearAllTasks() {
  localStorage.removeItem("tasks");
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((item) => item.remove());
}
