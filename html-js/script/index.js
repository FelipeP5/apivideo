//Exclusão
//Organizar cartões por data
//Opção de filtrar entre video e playlist;

if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};
// document.getElementById("tema").addEventListener("click", () => {
//     if (localStorage.getItem("tema" === null || undefined || "claro")){
//         localStorage.setItem("tema", "escuro");
//     } else {
//         localStorage.setItem("tema", "claro");
//     }
// });

// if(localStorage.getItem("tema") === "escuro"){

// }

const tituloH3 = document.getElementById("titulo");
const placeholderImg = "../svg/placeholder-img.jpg";
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const videoNav = document.getElementById("video-nav");
const playlistNav = document.getElementById("playlist-nav");
const lista = document.getElementById("lista");
const pesquisaInput = document.getElementById("pesquisa-input");
const escolhaCriacao = document.getElementById("escolha-criacao");
const param = new URLSearchParams(location.search).get("r");
let itensSalvos = [];

fetch(videoURL)
    .then(res => res.json())
    .then(videos => listeVideos(videos))
    .catch(erro => console.warn(erro, "Erro ao carregar vídeos"));
fetch(playlistURL)
    .then(res => res.json())
    .then(playlists => listePlaylists(playlists))
    .catch(erro => console.warn(erro, "Erro ao carregar playlists"));

if (lista.children === 1){
    tituloH3.innerText = "Alterações Recentes";
    }
    
//
document.getElementById("search-btn").addEventListener("click", filtroPesquisa)

videoNav.addEventListener("click", () => location.search = "r=playlist"); //r indica remoção
playlistNav.addEventListener("click", () => location.search = "r=video");


function listeVideos(videos){
    videos.forEach(video => {
        itensSalvos.push({
            tipo: "video",
            nome: video.nome,
            obj: video,
        });
    });
};

function listePlaylists(playlists){
    playlists.forEach(playlist => {
        
        itensSalvos.push({
            tipo: "playlist",
            nome: playlist.nome,
            obj: playlist,
        })
    })
};

function filtroPesquisa(){
    let itensSelecionados = [];

    const query = pesquisaInput.value;
    let itens = itensSalvos.filter( item => item.tipo !== param);
    let queryset = itens = itens.filter(item => item.nome === query);
    itens.forEach(item => itensSelecionados.push(item));
    
    return exibirSelecionados(queryset);
}

function exibirSelecionados(selecao){
    console.log(selecao);
}

function escolhaCriacaoMenu(){
    escolhaCriacao.showModal();
}

function excluirVideo(id){
    fetch(videoURL + id + "/", {
        method: "DELETE",
    })
    .then(res => console.log(res))
    .catch(erro => console.error(erro, "Exclusão fracassou"));
};

function excluirPlaylist(id){
    fetch(playlistURL + id + "/", {
        method: "DELETE",
    })
    .then(res => console.log(res))
    .catch(erro => console.error(erro, "Exclusão fracassou"));
};

function videodetalhe(id){
    window.location.href = `videodetalhe.html?id=${id}`;
};
function playlistdetalhe(id){
    location.href = `playlistdetalhe.html?id=${id}`;
}
