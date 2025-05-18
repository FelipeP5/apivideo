const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const lista = document.getElementById("lista"); 

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
        const cartao = `<div id="video${video.id}" class="col mais">
                            <div class="card bg-cprimary clr-csecondary">
                                <img src="${video.thumbnail}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                                <div class="card-img-overlay">
                                        <div class="container p-0">
                                            <a href="#" class="ms-auto btn clr-cprimary">Editar</a>
                                            <a href="#" class="btn clr-cprimary">Excluir</a>
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
                <div id="playlist${playlist.id}" class="col mais">
                     <div class="card bg-cprimary clr-csecondary">
                            <img src="${playlist.thumbnail}" alt="image cap" class="card-img-top img-fluid custom-img bg-csecondary">
                            <div class="card-img-overlay">
                                <div class="container p-0">
                                    <a href="#" class="ms-auto btn clr-cprimary">Editar</a>
                                    <a href="#" class="btn clr-cprimary">Excluir</a>
                                </div>
                            </div>
                            <h6 class="card-header text-center">${playlist.nome}</h6>
                        </div>   
                </div>
                    `;
        lista.innerHTML += cartao;
    })
};

function direcionarForm(elemento){
    // Lógica para direcionar ao form com id desejado
};

function excluir(id){
    // Modal e chamada de API para exclusão
};