document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskValue = document.getElementById("taskInput").value; // Récupère la valeur du champ de saisie
  if (taskValue) {
    const li = document.createElement("li");

    const input = document.createElement("input"); // Crée un nouvel élément input de type checkbox
    input.type = "checkbox";
    li.appendChild(input);

    const span = document.createElement("span");
    span.textContent = taskValue.charAt(0).toUpperCase() + taskValue.slice(1);
    li.appendChild(span); // Ajoute le span au div

    // Ajoute un gestionnaire d'événements à la case à cocher
    input.addEventListener("change", function () {
      if (input.checked) {
        span.style.textDecoration = "line-through"; // Raye le texte si la case est cochée
        span.style.color = "#f9e38e";
        span.style.fontStyle = "italic";
      } else {
        span.style.textDecoration = "none";
        span.style.color = "black";
        span.style.fontStyle = "normal";
      }
    });

    document.getElementById("todo-list").appendChild(li); // Ajoute le li à la liste des tâches (ul#todo-list)

    document.getElementById("taskInput").value = ""; // Réinitialise le champ de saisie
  }
});
