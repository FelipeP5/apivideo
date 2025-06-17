// Os itens da fila-video precisam de botôes excluir e desatar
// Descrição colapsável

if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};

const id = new URLSearchParams(location.search).get("id");
const placeholderImg = "../svg/placeholder-img.jpg";
const rodape = document.getElementById("footer-id");
const incluidoBtn = document.getElementById("incluido-btn");
const editarVideoBtn = document.getElementById("editar-btn");
const filaPlaylists = document.getElementById("fila-playlists");
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
const excluirPlaylistBtn = document.getElementById("excluir-playlist-btn");
const idPlaylistExclusao = document.getElementById("id-playlist-exclusao");
const desatarPlaylistBtn = document.getElementById("desatar-card-btn");
const idPlaylistDesatar = document.getElementById("id-playlist-desatar");
let sequenciaPlaylistsObjs = selecionarPlaylists();

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

exibirSelecionados();

incluidoBtn.addEventListener("click", () => {
    filaPlaylists.classList.toggle("d-none");
    filaPlaylists.classList.toggle("fila-playlists");
    rodape.classList.toggle("rodape-inativo");
    rodape.classList.toggle("rodape-ativo");
    });

editarVideoBtn.addEventListener("click", () => location.href = `videoform.html?id=${id}`);

excluirPlaylistBtn.addEventListener("click", () => {
    const playlistId = idPlaylistExclusao.value;
    fetch(playlistURL + playlistId + "/", {
        method: "DELETE",
    })
    .catch(erro => console.error("Não deu para excluir playlist", erro));
    location.reload();
})
desatarPlaylistBtn.addEventListener("click", desatarPlaylist);

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

async function selecionarPlaylists() {
    try {
    const listaRelacoes = await fetch(relacoes).then(res => res.json());
    console.log("relacoes ", listaRelacoes);
    let filtro = [];
    let playlistsFiltradas = [];

    listaRelacoes.forEach(relacao => {
        if (relacao.video === Number(id)){
            filtro.push(relacao.playlist);
        };
    });

    const playlists = await fetch(playlistURL).then(res => res.json());
    playlists.forEach(playlist => {
        const filtroUnico = filtro.filter((valor, indice, vetor) => vetor.indexOf(valor) === indice);
        if (filtroUnico.includes(playlist.id)){
            playlistsFiltradas.push(playlist);
        };
    });
    
    return playlistsFiltradas;
    } catch (error) {
        console.error(error, "Erro ao selecionar playlists.");
    }
};

async function exibirSelecionados() {
    const playlistsFiltradas = await sequenciaPlaylistsObjs;
    
    try{
        playlistsFiltradas.forEach(playlist=> {
            const itemPlaylist = document.createElement("div");
            itemPlaylist.classList.add("col-3");
            itemPlaylist.innerHTML = `
                <div class="col">
                    <div class="pointer card bg-cprimary clr-csecondary">
                        <img onclick="playlistDetalhe(${playlist.id})" src="${playlist.thumbnail || placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                        <h6 onclick="playlistDetalhe(${playlist.id})" class="card-header text-center">${playlist.nome}</h6>
                        <div id="card-dd" class="dropstart position-absolute end-0 m-2">
                            <button type="button" data-bs-toggle="dropdown" class="btn-cprimary rounded">+</button>
                            <ul class="dropdown-menu bg-cprimary">
                                <li>
                                    <a href="playlistform.html?id=${playlist.id}" class="dropdown-item btn-cprimary">Editar</a>
                                </li>
                                <li>
                                    <button onclick="marcarExclusaoPlaylist(${playlist.id})" id="excluir-card-btn" data-bs-toggle="modal" data-bs-target="#modal-excluir-playlist"
                                    type="button" class="dropdown-item btn-cprimary">Excluir</button>
                                </li>
                                    
                            </ul>
                        </div>
                    </div>
                </div>
                `;
            filaPlaylists.appendChild(itemPlaylist);
        });           
        } catch (error) {console.log(error, "Erro ao criar itensPlaylists.")};
};

function playlistDetalhe(playlistId){
    location.href = `playlistdetalhe.html?id=${playlistId}`;
}

function marcarExclusaoPlaylist(playlistId){
    idPlaylistExclusao.value = playlistId;
}

// async function desatarPlaylist(){
//     const idp = idPlaylistExclusao.value;
//     const idv = id;
//     const rels = fetch(relacoes).then(res => res.json())
//     .catch(erro => console.error(erro));

//     try{
//         rels.forEach(rel => {
//             if (rel.video === idv && rel.playlist === idp){
//                 console.log("Será removido");
//                 fetch(relacoes + rel.id + "/", {method:"DELETE"})
//                 .then(res => console.log(res)).catch(erro => erro);
//             }
//         })
//     } catch (erro) {return erro}
// }