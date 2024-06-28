document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verifica se a conta existe no localStorage
    const storedAccounts = JSON.parse(localStorage.getItem('users')) || [];
    const account = storedAccounts.find(acc => acc.email === email && acc.password === password);

    if (account) {
        // Simulação de login bem-sucedido
        alert('Login bem-sucedido!');
        window.location.href = 'pagina-principal.html'; // Redireciona para a página principal após o login
    } else {
        alert('Conta não encontrada. Por favor, cadastre-se primeiro.');
    }
});

function goToCadastro() {
    window.location.href = 'cadastro-principal.html';
}
var users = JSON.parse(localStorage.getItem('users')) || [];

function validateLogin() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    var user = users.find(user => user.email === email);

    if (!user) {
        document.getElementById("loginError").innerHTML = "Conta não encontrada. Cadastre-se primeiro.";
        return false;
    }

    if (user.password !== password) {
        document.getElementById("loginError").innerHTML = "Email ou senha incorretos.";
        return false;
    }

    document.getElementById("loginError").innerHTML = "";
    // Redirecionar para a página principal após login bem-sucedido
    window.location.href = 'pagina-principal.html';
    return false;
}
