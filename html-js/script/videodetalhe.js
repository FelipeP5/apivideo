// Descrição colapsável
// "Incluso" exibe playlists que o incluem;
// "Editar" leva ao form com id;
// "Arquivo" mostra o arquivo de vídeo salvo para reprodução com ferramentas externas.
// Cabeçalho e botões fixos na tela;

const player = document.querySelector("video");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const videoURL = "http://127.0.0.1:8000/video/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");

fetch(videoURL + id + "/")
    .then(res => res.json())
    .then(video => {
        nome.innerText = video.nome ? video.nome : "Sem título";
        data.innerText = video.data ? video.data : "##-##-####";
        descricao.innerText = video.descricao ? video.descricao : "O vídeo não contém uma descrição.";
        player.poster = video.thumbnail ? video.thumbnail : "";
        preencherFonte(video.arquivo);
    })
    .catch(erro => console.error(erro, "Erro ao preencher espaços"));

function preencherFonte(arquivo){
    console.log(arquivo);
    const fonte = document.createElement("source");
    fonte.setAttribute("src", arquivo);
    player.appendChild(fonte);
    console.log(fonte, "#############", player);
    player.load();
};

function editarVideo(){
    location.href = `./videoform.html?id=${id}`;
};