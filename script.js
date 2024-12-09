const daySelect = document.getElementById('day-select');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksContainer = document.getElementById('tasks-container');
const deleteCheckedBtn = document.getElementById('delete-checked-btn');

let tasks = {};

addTaskBtn.addEventListener('click', () => {
  const day = daySelect.value;
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  if (!tasks[day]) tasks[day] = [];
  tasks[day].push({ text: taskText, completed: false });

  taskInput.value = '';
  renderTasks();
});

function renderTasks() {
  tasksContainer.innerHTML = '';

  const day = daySelect.value;
  if (tasks[day]) {
	tasks[day].forEach((task, index) => {
	  const taskElement = document.createElement('div');
	  taskElement.className = `task ${task.completed ? 'completed' : ''}`;

	  const checkbox = document.createElement('input');
	  checkbox.type = 'checkbox';
	  checkbox.checked = task.completed;
	  checkbox.addEventListener('change', () => {
		task.completed = checkbox.checked;
		renderTasks();
	  });

	  const taskText = document.createElement('span');
	  taskText.textContent = task.text;

	  taskElement.appendChild(checkbox);
	  taskElement.appendChild(taskText);
	  tasksContainer.appendChild(taskElement);
	});
  }
}

deleteCheckedBtn.addEventListener('click', () => {
  const day = daySelect.value;
  if (tasks[day]) {
	tasks[day] = tasks[day].filter(task => !task.completed);
	renderTasks();
  }
});

daySelect.addEventListener('change', renderTasks);
