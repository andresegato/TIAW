document.addEventListener('DOMContentLoaded', function() {
    const pontosElement = document.getElementById('pontos'); // Seleciona o elemento HTML com o id 'pontos'
    const verRealizacoesButton = document.getElementById('verRealizacoes'); // Seleciona o botão com o id 'verRealizacoes'

    function updatePontos() {
        let pontos = localStorage.getItem('pontos'); // Obtém os pontos do localStorage
        if (pontos === null) { // Se os pontos não existirem no localStorage
            pontos = 0; // Inicializa os pontos com 0
            localStorage.setItem('pontos', pontos); // Armazena os pontos no localStorage
        }
        pontosElement.textContent = pontos; // Atualiza o conteúdo do elemento 'pontos' com os pontos obtidos
    }

    verRealizacoesButton.addEventListener('click', function() {
        window.location.href = 'painelControle.html'; // Redireciona para 'painelControle.html' quando o botão é clicado
    });

    updatePontos(); // Chama a função para atualizar os pontos quando o DOM é carregado
});
