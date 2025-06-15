
if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};

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
const param = new URLSearchParams(location.search).get("rm");
let itensSalvos = [];

todos();

pesquisaInput.addEventListener("input", filtroPesquisa);
videoNav.addEventListener("click", () => location.search = "rm=playlist");
playlistNav.addEventListener("click", () => location.search = "rm=video");

async function todos(){
    fetch(videoURL)
        .then(res => res.json())
        .then(videos => listeVideos(videos))
        .catch(erro => console.warn(erro, "Erro ao carregar vídeos")),

    await fetch(playlistURL)
        .then(res => res.json())
        .then(playlists => listePlaylists(playlists))
        .catch(erro => console.warn(erro, "Erro ao carregar playlists"));
    
    filtroPesquisa();

    if (itensSalvos.length > 0){
        tituloH3.innerText = "Alterações Recentes";
    }
}

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
    let itensSelecionados = itensSalvos.filter(item => item.tipo !== param);
    const query = pesquisaInput.value;
    const queryWords = query.split(" ");
    const queryChars = query.split("");

    itensSelecionados.map((itemObj) => {
        itemObj.peso = 0;
        for (const queryWord of queryWords){
           if (itemObj.nome.includes(queryWord)){
            itemObj.peso += 30;
           }
           if (itemObj.nome.includes(queryWord.toLowerCase())){
            itemObj.peso += 25;
           }
        };
        for (const queryChar of queryChars){
            if (itemObj.nome.includes(queryChar)){
             itemObj.peso += 10;
            }
            if (itemObj.nome.includes(queryChar.toLowerCase())){
                itemObj.peso += 5;
            }
         }
        return itemObj;
    });
    itensSelecionados.sort((itemObjA, itemObjB) => itemObjB.peso - itemObjA.peso);
    
    return exibirSelecionados(itensSelecionados);
}

function exibirSelecionados(selecao){
    console.log("Seleção ", selecao);
    lista.innerHTML = `
        <div onclick="escolhaCriacaoMenu()" class="col pointer">
                    <div class="h-100 card align-items-center justify-content-evenly">
                        <img src="../svg/red-plus-11961.svg" alt="+" class="w-25 h-25">
                    </div>
        </div>
    `;
    selecao.forEach(item => {
        if (item.tipo === "video"){
            const cartaoVideo = `<div id="video${item.obj.id}" class="col">
                            <div onclick="videodetalhe(${item.obj.id})" class="pointer card bg-cprimary clr-csecondary">
                                <img src="${item.obj.thumbnail || placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                                <div class="card-img-overlay">
                                        <div class="container p-0">
                                            <a href="videoform.html?id=${item.obj.id}" class="ms-auto btn clr-cprimary">Editar</a>
                                            <button type="button" onclick="excluirVideo(${item.obj.id})" class="btn clr-cprimary">Excluir</button>
                                        </div>
                                </div>
                                <h6 class="card-header text-center">${item.nome}</h6>
                            </div>
                        </div>
                    `;
        lista.innerHTML += cartaoVideo;
        }
        else {
            const cartaoPlay = `
                <div id="playlist${item.obj.id}" class="col">
                    <div onclick="playlistdetalhe(${item.obj.id})" class="pointer card bg-cprimary clr-csecondary">
                            <img src="${item.obj.thumbnail || placeholderImg}" alt="image cap" class="card-img-top img-fluid custom-img bg-csecondary">
                            <div class="card-img-overlay">
                                <div class="container p-0">
                                    <a href="playlistform.html?id=${item.obj.id}" class="ms-auto btn clr-cprimary">Editar</a>
                                    <a href="#" onclick="excluirPlaylist(${item.obj.id})" class="btn clr-cprimary">Excluir</a>
                                </div>
                            </div>
                            <h6 class="card-header text-center">${item.nome}</h6>
                        </div>   
                </div>
            `;
            lista.innerHTML += cartaoPlay;
        }
    })
}

function escolhaCriacaoMenu(){
    escolhaCriacao.showModal();
}

//onclick funções

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
