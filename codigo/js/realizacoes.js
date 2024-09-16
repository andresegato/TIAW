document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const progressChart = document.getElementById('progressChart').getContext('2d');
    const completionPercentage = document.getElementById('completionPercentage');
    const dateFilter = document.getElementById('dateFilter');
    const currentDateElem = document.getElementById('currentDate');

    let tasks = getTasksFromLocalStorage();
    let completedTasks = tasks.filter(task => task.completed);

    const chart = new Chart(progressChart, {
        type: 'doughnut',
        data: {
            labels: ['Concluído', 'Pendente'],
            datasets: [{
                data: [0, 100],
                backgroundColor: ['#4caf50', '#333']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 70,
            rotation: -90,
            circumference: 180,
            legend: {
                display: false
            }
        }
    });

    function updateProgress() {
        const totalTasks = tasks.length;
        const completedTaskCount = completedTasks.length;
        const percentage = totalTasks === 0 ? 0 : Math.floor((completedTaskCount / totalTasks) * 100);
        chart.data.datasets[0].data = [completedTaskCount, totalTasks - completedTaskCount];
        chart.update();
        completionPercentage.textContent = `${percentage}% das tarefas concluídas`;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (!task.completed) {
                const li = document.createElement('li');
                li.classList.add('task-item');
                li.innerHTML = `<p>${task.task}</p>
                                <button onclick="completeTask(${index})">Concluir</button>`;
                taskList.appendChild(li);
            }
        });

        completedTasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item', 'completed');
            li.innerHTML = `<p>${task.task}</p>
                            <span class="date">${task.date}</span>`;
            completedTaskList.appendChild(li);
        });
    }

    window.completeTask = function(index) {
        const task = tasks[index];
        task.completed = true;
        task.date = new Date().toLocaleDateString();
        completedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        updateProgress();
        incrementPontos();
        alert('Parabéns por concluir uma atividade!');
    };

    dateFilter.addEventListener('change', function() {
        const filterDate = new Date(dateFilter.value).toLocaleDateString();
        const filteredTasks = completedTasks.filter(task => task.date === filterDate);
        completedTaskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item', 'completed');
            li.innerHTML = `<p>${task.task}</p>
                            <span class="date">${task.date}</span>`;
            completedTaskList.appendChild(li);
        });
    });

    function updateCurrentDate() {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElem.textContent = `Hoje é ${today.toLocaleDateString('pt-BR', options)}`;
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

    function incrementPontos() {
        let pontos = parseInt(localStorage.getItem('pontos') || '0', 10);
        pontos += 10; // Incrementa por 10 pontos por tarefa concluída
        localStorage.setItem('pontos', pontos);
    }

    renderTasks();
    updateProgress();
    updateCurrentDate();
});

//JAVASCRIPT DO POMODORO

function Pomodoro() {
    this.duracaoTrabalho = 25 * 60;
    this.duracaoPausa = 5 * 60;
    this.estado = "inicio";
    this.tempoRestante = this.duracaoTrabalho;
    this.intervaloTimer = null;

    this.iniciarPomodoro = function() {
        const btnIniciar = document.getElementById('btn-iniciar');
        const btnPausar = document.getElementById('btn-pausar');
        const btnFinalizar = document.getElementById('btn-finalizar');

        btnIniciar.addEventListener('click', () => {
            if (this.estado === 'inicio') {
                this.intervaloTimer = setInterval(() => {
                    this.timer();
                    this.atualizarInterface();
                }, 1000);

                this.estado = 'trabalho';
                btnIniciar.disabled = true;
                btnPausar.disabled = false;
                btnFinalizar.disabled = false;
                this.atualizarInterface();
            }
        });

        btnPausar.addEventListener('click', () => {
            if (this.estado === 'trabalho') {
                clearInterval(this.intervaloTimer);
                this.estado = 'pausa';
                btnPausar.disabled = true;
                btnIniciar.disabled = false;
                this.atualizarInterface();
            }
        });

        btnFinalizar.addEventListener('click', () => {
            clearInterval(this.intervaloTimer);
            this.estado = 'inicio';
            this.tempoRestante = this.duracaoTrabalho;
            btnIniciar.disabled = false;
            btnPausar.disabled = true;
            btnFinalizar.disabled = true;
            this.atualizarInterface();
        });
    };

    this.timer = function() {
        this.tempoRestante--;
        if (this.tempoRestante <= 0) {
            clearInterval(this.intervaloTimer);
            this.estado = 'finalizado';
            document.getElementById('btn-iniciar').disabled = false;
            document.getElementById('btn-pausar').disabled = true;
            document.getElementById('btn-finalizar').disabled = true;
            this.atualizarInterface();
        }
    };

    this.atualizarInterface = function() {
        const minutos = Math.floor(this.tempoRestante / 60);
        const segundos = this.tempoRestante % 60;
        document.getElementById('timer-display').textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;

        switch (this.estado) {
            case 'inicio':
                document.getElementById('status-texto').textContent = 'Pronto para iniciar';
                break;
            case 'trabalho':
                document.getElementById('status-texto').textContent = 'Trabalhando...';
                break;
            case 'pausa':
                document.getElementById('status-texto').textContent = 'Pausa';
                break;
            case 'finalizado':
                document.getElementById('status-texto').textContent = 'Pomodoro finalizado!';
                break;
        }
    };
}

const pomodoro = new Pomodoro();
pomodoro.iniciarPomodoro();

