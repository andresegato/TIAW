document.addEventListener("DOMContentLoaded", function() {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const mesesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();

    const primeiraDataMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const diaSemanaPrimeiraData = primeiraDataMes.getDay();

    const mesElemento = document.getElementById('mes');
    mesElemento.textContent = `${mesesAno[mesAtual]} de ${anoAtual}`;

    const numeroDiasElemento = document.querySelector('.number-days');
    let conteudoNumeroDias = '';

    for (let i = 0; i < diaSemanaPrimeiraData; i++) {
        conteudoNumeroDias += '<span class="mes-anterior"></span>';
    }

    for (let i = 1; i <= ultimoDiaMes; i++) {
        if (i === dataAtual.getDate()) {
            conteudoNumeroDias += `<span class="days-selected">${i}</span>`;
        } else {
            conteudoNumeroDias += `<span>${i}</span>`;
        }
    }

    numeroDiasElemento.innerHTML = conteudoNumeroDias;

    
});

//Vizualização de tarefa

document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    loadTasks();

    function loadTasks() {
        let tasks = getTasksFromLocalStorage();
        tasks.forEach(function(taskObj, index) {
            const li = createTaskElement(taskObj.task, taskObj.description, index + 1);
            taskList.appendChild(li);
        });
        updatePontosOnPage();
    }

    function createTaskElement(task, description, taskNumber) {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.textContent = `Tarefa ${taskNumber}: ${task}`;

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = description;

        li.appendChild(taskHeader);
        li.appendChild(taskDescription);
        return li;
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

    function updatePontosOnPage() {
        document.getElementById('pontos').textContent = localStorage.getItem('pontos') || '0';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDesc = document.getElementById('task-desc');

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
        const li = createTaskElement(task, description);
        document.getElementById('task-list').appendChild(li);
        storeTaskInLocalStorage({ task, description, completed: false });
    }

    function createTaskElement(task, description) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="task">${task}</span><span class="description">${description}</span>`;
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
    document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    loadTasks();

    function loadTasks() {
        let tasks = getTasksFromLocalStorage();
        tasks.forEach(function(taskObj, index) {
            const li = createTaskElement(taskObj.task, taskObj.description, index + 1);
            taskList.appendChild(li);
        });
        updatePontosOnPage();
    }

    function createTaskElement(task, description, taskNumber) {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.textContent = `Tarefa ${taskNumber}: ${task}`;

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = description;

        li.appendChild(taskHeader);
        li.appendChild(taskDescription);
        return li;
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

    function updatePontosOnPage() {
        document.getElementById('pontos').textContent = localStorage.getItem('pontos') || '0';
    }

    window.completeTask = function(index) {
        const task = tasks[index];
        task.completed = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        updateProgress();
        incrementPontos();

        // Remover a tarefa concluída do outro JavaScript
        const completedTaskList = document.getElementById('completedTaskList');
        const allCompletedTasks = completedTaskList.querySelectorAll('.task-item');
        const taskText = task.task;
        allCompletedTasks.forEach(function(completedTask) {
            if (completedTask.textContent.includes(taskText)) {
                completedTask.remove();
            }
        });
    };
});

});


// GRAFICO JAVASCRIPT

document.addEventListener('DOMContentLoaded', function() {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    // Obtém o contexto do gráfico
    const ctx = document.getElementById('grafico').getContext('2d');

    // Cria o gráfico
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: diasSemana, // Usando os dias da semana como rótulos
            datasets: [{
                label: 'Quantidade de Tarefas',
                data: [0, 0, 0, 0, 0, 0, 0], // Inicializa com 0 tarefas para cada dia
                borderWidth: 1,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(199, 199, 199, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Função para carregar as tarefas e atualizar o gráfico
    function loadTasksAndUpdateChart() {
        const tasks = getTasksFromLocalStorage();
        const data = [0, 0, 0, 0, 0, 0, 0]; // Inicializa com 0 tarefas para cada dia

        tasks.forEach(function(taskObj) {
            if (taskObj.completed) {
                const completionDate = new Date(taskObj.date);
                const dayOfWeek = completionDate.getDay();
                data[dayOfWeek]++;
            }
        });

        // Atualiza os dados do gráfico
        chart.data.datasets[0].data = data;
        chart.update();
    }

    // Carrega as tarefas e atualiza o gráfico ao carregar a página
    loadTasksAndUpdateChart();

    // Função para obter as tarefas armazenadas localmente
    function getTasksFromLocalStorage() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    // Função para atualizar o gráfico quando uma tarefa é concluída
    window.completeTask = function(index) {
        const tasks = getTasksFromLocalStorage();
        const task = tasks[index];
        task.completed = true;
        task.date = new Date().toLocaleDateString();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasksAndUpdateChart(); // Atualiza o gráfico
        incrementPontos();
        alert('Parabéns por concluir uma atividade!');
    };

    // Restante do código...
});
