document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDesc = document.getElementById('task-desc');
    const taskList = document.getElementById('task-list');

    loadTasks();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = taskInput.value.trim();
        const description = taskDesc.value.trim();
        if (task !== '' && description !== '') {
            addTask(task, description);
            taskInput.value = '';
            taskDesc.value = '';
        }
    });

    function addTask(task, description) {
        const li = createTaskElement(task, description, false);
        taskList.appendChild(li);
        storeTaskInLocalStorage({ task, description, completed: false });
    }

    function createTaskElement(task, description, completed) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="task">${task}</span>, <span class="description">${description}</span>`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.classList.add('edit-btn');
        if (completed) {
            editBtn.style.display = 'none';
        }
        editBtn.addEventListener('click', function() {
            const newTask = prompt('Edit Task', task);
            const newDesc = prompt('Edit Description', description);
            if (newTask !== null && newDesc !== null) {
                li.querySelector('.task').textContent = newTask;
                li.querySelector('.description').textContent = newDesc;
                updateTaskInLocalStorage(task, newTask, newDesc);
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(task);
        });

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup);
        return li;
    }

    function storeTaskInLocalStorage(taskObj) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(taskObj);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromLocalStorage() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    function loadTasks() {
        let tasks = getTasksFromLocalStorage();
        tasks.forEach(function(taskObj) {
            const li = createTaskElement(taskObj.task, taskObj.description, taskObj.completed);
            taskList.appendChild(li);
        });
    }

    function removeTaskFromLocalStorage(taskToRemove) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(taskObj => taskObj.task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskInLocalStorage(oldTask, newTask, newDesc) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.map(taskObj => {
            if (taskObj.task === oldTask) {
                return { task: newTask, description: newDesc, completed: taskObj.completed };
            }
            return taskObj;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
