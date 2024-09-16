document.addEventListener("DOMContentLoaded", function() {
    console.log("Perfil JS carregado");

    var users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Usuários carregados do localStorage:", users);

    var currentUserEmail = localStorage.getItem('currentUserEmail');
    console.log("Email do usuário atual:", currentUserEmail);

    if (!currentUserEmail) {
        alert("Nenhum usuário logado. Por favor, faça login.");
        window.location.href = 'login.html';
        return;
    }

    var currentUser = users.find(user => user.email === currentUserEmail);
    console.log("Usuário atual encontrado:", currentUser);

    if (currentUser) {
        document.getElementById("username").textContent = currentUser.name;
        document.getElementById("user-email").textContent = currentUser.email;
        
        // Exibir a foto de perfil do usuário, se existir
        if (currentUser.profilePicture) {
            document.getElementById("profile-pic").src = currentUser.profilePicture;
        }
    } else {
        alert("Usuário não encontrado. Por favor, faça login novamente.");
        window.location.href = 'login.html';
    }

    // Função para editar o nome do usuário
    document.getElementById("edit-name-btn").addEventListener("click", function() {
        document.getElementById("edit-name-section").hidden = false;
    });

    document.getElementById("save-name-btn").addEventListener("click", function() {
        var newName = document.getElementById("new-username").value;
        if (newName) {
            currentUser.name = newName;
            document.getElementById("username").textContent = newName;
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById("edit-name-section").hidden = true;
        }
    });

    // Função para editar o email do usuário
    document.getElementById("edit-email-btn").addEventListener("click", function() {
        document.getElementById("edit-email-section").hidden = false;
    });

    document.getElementById("save-email-btn").addEventListener("click", function() {
        var newEmail = document.getElementById("new-email").value;
        var currentPassword = document.getElementById("current-password-email").value;
        if (newEmail && currentPassword === currentUser.password) {
            currentUser.email = newEmail;
            document.getElementById("user-email").textContent = newEmail;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUserEmail', newEmail);
            document.getElementById("edit-email-section").hidden = true;
        } else {
            alert("Senha incorreta ou email inválido.");
        }
    });

    // Função para editar a senha do usuário
    document.getElementById("edit-password-btn").addEventListener("click", function() {
        document.getElementById("edit-password-section").hidden = false;
    });

    document.getElementById("save-password-btn").addEventListener("click", function() {
        var currentPassword = document.getElementById("current-password").value;
        var newPassword = document.getElementById("new-password").value;
        if (currentPassword === currentUser.password && newPassword) {
            currentUser.password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById("edit-password-section").hidden = true;
        } else {
            alert("Senha atual incorreta ou nova senha inválida.");
        }
    });

    // Função para deletar a conta do usuário
    document.getElementById("delete-account-btn").addEventListener("click", function() {
        if (confirm("Tem certeza que deseja excluir esta conta?")) {
            users = users.filter(user => user.email !== currentUserEmail);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('currentUserEmail');
            alert("Conta excluída com sucesso.");
            window.location.href = 'login.html';
        }
    });

    // Função para carregar a foto de perfil
    document.getElementById("profile-pic").addEventListener("click", function() {
        document.getElementById("profile-pic-input").click();
    });

    document.getElementById("profile-pic-input").addEventListener("change", function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var dataURL = e.target.result;
                document.getElementById("profile-pic").src = dataURL;
                currentUser.profilePicture = dataURL;
                localStorage.setItem('users', JSON.stringify(users));
            };
            reader.readAsDataURL(file);
        }
    });
});
