// Descrição colapsável
// "Inclui" exibe playlists que o incluem;
// Cabeçalho e botões fixos na tela;

const capa = document.getElementById("capa");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");

fetch(playlistURL + id + "/")
    .then(res => res.json())
    .then(playlist => {
        document.querySelector("title").innerText = playlist.nome ? playlist.nome : "Playlist Detalhe";
        capa.src = playlist.thumbnail ? playlist.thumbnail : "../svg/placeholder-img.jpg";
        nome.innerText = playlist.nome ? playlist.nome : "Sem título";
        data.innerText = playlist.data ? playlist.data : "##-##-####";
        descricao.innerText = playlist.descricao ? playlist.descricao : "A playlist não contém uma descrição.";
    })
    .catch(erro => console.error(erro, "Erro ao preencher espaços"));

function editarPlaylist(){
    location.href = `./playlistform.html?id=${id}`;
}