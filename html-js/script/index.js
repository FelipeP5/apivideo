//excluir ta pagando tudo
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
const excluirVideoBtn = document.getElementById("excluir-video-btn");
const excluirPlaylistBtn = document.getElementById("excluir-playlist-btn");
const idVideoExclusao = document.getElementById("id-video-exclusao");
const idPlaylistExclusao = document.getElementById("id-playlist-exclusao");
const param = new URLSearchParams(location.search).get("rm");
let itensSalvos = [];

todos();

pesquisaInput.addEventListener("input", filtroPesquisa);
videoNav.addEventListener("click", () => location.search = "rm=playlist");
playlistNav.addEventListener("click", () => location.search = "rm=video");
excluirVideoBtn.addEventListener("click", () => {
    const videoId = idVideoExclusao.value;
    fetch(videoURL + videoId + "/", {
        method: "DELETE",
    })
    .catch(erro => console.error("Não deu para excluir video", erro));
    
});
excluirPlaylistBtn.addEventListener("click", () => {
    const playlistId = idPlaylistExclusao.value;
    fetch(playlistURL + playlistId + "/", {
        method: "DELETE",
    })
    .catch(erro => console.error("Não deu para excluir playlist", erro));
    
})

async function todos(){
    await fetch(videoURL)
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
        <div class="col">
            <div data-bs-toggle="modal" data-bs-target="#modal-criacao" 
            class="pointer plus card align-items-center justify-content-evenly">
                <img src="../svg/red-plus-11961.svg" alt="+" class="w-25 h-25">
             </div>
        </div>
    `;
    selecao.forEach(item => {
        if (item.tipo === "video"){
            const cartaoVideo = `
                <div class="col">
                    <div class="pointer card bg-cprimary clr-csecondary">
                            <img onclick="videoDetalhe(${item.obj.id})" src="${item.obj.thumbnail || placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                            <h6 onclick="videoDetalhe(${item.obj.id})" class="card-header text-center">${item.nome}</h6>
                                <div id="card-dd" class="dropstart position-absolute end-0 m-2">
                                    <button type="button" data-bs-toggle="dropdown" class="btn-cprimary rounded">+</button>
                                    <ul class="dropdown-menu bg-cprimary">
                                        <li>
                                            <a href="videoform.html?id=${item.obj.id}" class="dropdown-item btn-cprimary">Editar</a>
                                        </li>
                                        <li>
                                            <button onclick="marcarExclusaoVideo(${item.obj.id})" id="excluir-card-btn" data-bs-toggle="modal" data-bs-target="#modal-excluir-video"
                                            type="button" class="dropdown-item btn-cprimary">Excluir</button>
                                        </li>
                                    </ul>
                                </div>
                    </div>
                </div>            
                    `;
                    lista.innerHTML += cartaoVideo;
        }
        else {
            const cartaoPlay = `
                <div class="col">
                    <div class="pointer card bg-cprimary clr-csecondary">
                            <img onclick="playlistDetalhe(${item.obj.id})" src="${item.obj.thumbnail || placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                            <h6 onclick="playlistDetalhe(${item.obj.id})" class="card-header text-center">${item.nome}</h6>
                                <div id="card-dd" class="dropstart position-absolute end-0 m-2">
                                    <button type="button" data-bs-toggle="dropdown" class="btn-cprimary rounded">+</button>
                                    <ul class="dropdown-menu bg-cprimary">
                                        <li>
                                            <a href="playlistform.html?id=${item.obj.id}" class="dropdown-item btn-cprimary">Editar</a>
                                        </li>
                                        <li>
                                            <button onclick="marcarExclusaoPlaylist(${item.obj.id})" data-bs-toggle="modal" data-bs-target="#modal-excluir-playlist"
                                            type="button" class="dropdown-item btn-cprimary">Excluir</button>
                                        </li>
                                    </ul>
                                </div>
                    </div>
                </div>
            `;
            lista.innerHTML += cartaoPlay;
        }
    })
}

//onclick funções

function videoDetalhe(id){
    window.location.href = `videodetalhe.html?id=${id}`;
};
function playlistDetalhe(id){
    location.href = `playlistdetalhe.html?id=${id}`;
}

function marcarExclusaoVideo(videoId){
    idVideoExclusao.value = videoId;
}
function marcarExclusaoPlaylist(playlistId){
    idPlaylistExclusao.value = playlistId;
}