//Exclusão
//Organizar cartões por data
//Opção de filtrar entre video e playlist;

const placeholderImg = "../svg/placeholder-img.jpg";
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const lista = document.getElementById("lista");
const escolhaCriacao = document.getElementById("escolha-criacao");

fetch(videoURL)
    .then(res => res.json())
    .then(videos => listeVideos(videos))
    .catch(erro => console.warn(erro, "Erro ao carregar vídeos"));
fetch(playlistURL)
    .then(res => res.json())
    .then(playlists => listePlaylists(playlists))
    .catch(erro => console.warn(erro, "Erro ao carregar playlists"));

function listeVideos(videos){
    videos.forEach(video => {
        const cartao = `<div id="video${video.id}" class="col">
                            <div onclick="videodetalhe(${video.id})" class="pointer card bg-cprimary clr-csecondary">
                                <img src="${video.thumbnail ? video.thumbnail : placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                                <div class="card-img-overlay">
                                        <div class="container p-0">
                                            <a href="videoform.html?id=${video.id}" class="ms-auto btn clr-cprimary">Editar</a>
                                            <button type="button" onclick="excluirVideo(${video.id})" class="btn clr-cprimary">Excluir</button>
                                        </div>
                                </div>
                                <h6 class="card-header text-center">${video.nome}</h6>
                            </div>
                        </div>
                    `;
        lista.innerHTML += cartao;
    });
};

function listePlaylists(playlists){
    playlists.forEach(playlist => {
        const cartao = `
                <div id="playlist${playlist.id}" class="col">
                     <div onclick="playlistdetalhe(${playlist.id})" class="pointer card bg-cprimary clr-csecondary">
                            <img src="${playlist.thumbnail ? playlist.thumbnail : placeholderImg}" alt="image cap" class="card-img-top img-fluid custom-img bg-csecondary">
                            <div class="card-img-overlay">
                                <div class="container p-0">
                                    <a href="playlistform.html?id=${playlist.id}" class="ms-auto btn clr-cprimary">Editar</a>
                                    <a href="#" onclick="excluirPlaylist(${playlist.id})" class="btn clr-cprimary">Excluir</a>
                                </div>
                            </div>
                            <h6 class="card-header text-center">${playlist.nome}</h6>
                        </div>   
                </div>
                    `;
        lista.innerHTML += cartao;
    })
};

function escolhaCriacaoMenu(){
    console.log("Evento click escutado")
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
    location.href = `videodetalhe.html?id=${id}`;
};
function playlistdetalhe(id){
    location.href = `playlistdetalhe.html?id=${id}`;
}
