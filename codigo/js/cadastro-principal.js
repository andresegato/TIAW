var users = JSON.parse(localStorage.getItem('users')) || [];
var isUserTableVisible = false; // Variável para controlar o estado da tabela de usuários

function addUserToTable(user) {
    var table = document.getElementById("userList");
    var row = table.insertRow();
    row.innerHTML = "<td>" + user.name + "</td><td>" + user.email + "</td><td><button onclick='editUser(" + users.indexOf(user) + ")'>Editar</button><button onclick='deleteUser(" + users.indexOf(user) + ")'>Deletar</button></td>";
}

function showUserTable() {
    var table = document.getElementById("userList");
    var showUsersBtn = document.getElementById("showUsersBtn");

    if (!isUserTableVisible) {
        table.style.display = "table";
        isUserTableVisible = true;
        showUsersBtn.textContent = "Ocultar Usuários"; // Altera o texto do botão
    } else {
        table.style.display = "none";
        isUserTableVisible = false;
        showUsersBtn.textContent = "Mostrar Usuários"; // Altera o texto do botão de volta ao original
    }
}

function isEmailRegistered(email) {
    return users.some(user => user.email === email);
}

function addUser() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if (isEmailRegistered(email)) {
        document.getElementById("emailError").innerHTML = "Email já cadastrado";
        return;
    }

    var user = { name: name, email: email, password: password };
    users.push(user);
    
    localStorage.setItem('users', JSON.stringify(users));
    addUserToTable(user);
    document.getElementById("userForm").reset();

    // Exibe a mensagem de sucesso e o botão de redirecionamento
    document.getElementById("welcome").style.display = "block";
}

function editUser(index) {
    var user = users[index];
    var newName = prompt("Novo nome:", user.name);
    var newEmail = prompt("Novo email:", user.email);
    if (newName && newEmail) {
        user.name = newName;
        user.email = newEmail;
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
        updateTable();
    }
}

function deleteUser(index) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        updateTable();
    }
}

function updateTable() {
    var table = document.getElementById("userList");
    table.innerHTML = "<tr><th>Nome</th><th>Email</th><th>Ações</th></tr>";
    for (var i = 0; i < users.length; i++) {
        addUserToTable(users[i]);
    }
    document.getElementById("showUsersBtn").textContent = "Mostrar Usuários"; // Garante que o botão esteja no estado inicial
    isUserTableVisible = false; // Reseta o estado da tabela
    table.style.display = "none"; // Garante que a tabela esteja oculta inicialmente
}

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var valid = true;

    if (name == "") {
        document.getElementById("nameError").innerHTML = "Por favor, insira seu nome";
        valid = false;
    } else {
        document.getElementById("nameError").innerHTML = "";
    }

    if (email == "") {
        document.getElementById("emailError").innerHTML = "Por favor, insira seu email";
        valid = false;
    } else {
        document.getElementById("emailError").innerHTML = "";
    }

    if (password == "") {
        document.getElementById("passwordError").innerHTML = "Por favor, insira sua senha";
        valid = false;
    } else {
        document.getElementById("passwordError").innerHTML = "";
    }

    if (valid) {
        addUser();
    }

    return false; 
}

function goToLogin() {
    window.location.href = 'login.html'; // Redireciona para a página de login
}

updateTable();
