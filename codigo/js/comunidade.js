document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var usuario = document.getElementById('usuario').value;
    var mensagem = document.getElementById('mensagem').value;
    
    if (usuario && mensagem) {
        var post = {
            id: new Date().getTime(),
            usuario: usuario,
            mensagem: mensagem,
            data: new Date().toLocaleString()
        };
        
        var posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        
        document.getElementById('usuario').value = '';
        document.getElementById('mensagem').value = '';
        
        carregarPosts();
    }
});

function carregarPosts() {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    
    posts.forEach(function(post) {
        var postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h4>${post.usuario} <span>(${post.data})</span></h4>
            <p>${post.mensagem}</p>
            <div class="post-actions">
                <button onclick="editarPost(${post.id})">Editar</button>
                <button onclick="excluirPost(${post.id})">Excluir</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function editarPost(id) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var post = posts.find(post => post.id === id);
    
    if (post) {
        document.getElementById('usuario').value = post.usuario;
        document.getElementById('mensagem').value = post.mensagem;
        
        excluirPost(id);
    }
}

function excluirPost(id) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    carregarPosts();
}

window.onload = function() {
    carregarPosts();
};
