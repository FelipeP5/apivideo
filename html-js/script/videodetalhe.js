// Descrição colapsável
// "Incluso" exibe playlists que o incluem;

const areaDePlayer = document.getElementById("area-de-player");
const player = document.querySelector("video");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const erroNoPlayer = document.getElementById("video-el-nao-sustentado");
const msgErro = document.getElementById("msg-erro");
const download = document.getElementById("arquivo-nao-carregou");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");

fetch(videoURL + id + "/")
    .then(res => res.json())
    .then(video => {
        document.querySelector("title").innerText = video.nome ? video.nome : "Vídeo Detalhe";
        nome.innerText = video.nome ? video.nome : "Sem título";
        data.innerText = video.data ? video.data : "##-##-####";
        descricao.innerText = video.descricao ? video.descricao : "O vídeo não contém uma descrição.";
        player.poster = video.thumbnail ? video.thumbnail : "";
        preencherFonte(video.arquivo);
    })
    .catch(erro => console.error(erro, "Erro ao preencher espaços"));

function preencherFonte(arquivo){
    console.log(arquivo);
    player.setAttribute("src", arquivo);
    player.load();
    player.addEventListener("error", arquivo => {
        areaDePlayer.removeChild(player);
        erroNoPlayer.href = arquivo;
        msgErro.classList.remove("d-none");
        download.href = `./videoform.html?id=${id}`;
    })
};

function editarVideo(){
    location.href = `./videoform.html?id=${id}`;
};
