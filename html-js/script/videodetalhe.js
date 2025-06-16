// Os itens da fila-video precisam de botôes excluir e desatar, difícil implementação;
// Descrição colapsável

if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};

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
const id = new URLSearchParams(location.search).get("id");
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
    
    return await playlistsFiltradas;
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
                <div class="pointer card bg-cprimary clr-csecondary">
                   <img src="${playlist.thumbnail || placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                   <div class="card-img-overlay">
                        <div class="container p-0">
                            <a href="playlistform.html?id=${playlist.id}" class="ms-auto btn clr-cprimary">Editar</a>
                            <button onclick=excluirPlaylist(${playlist.id}) type="button" class="btn clr-cprimary">Excluir</button>
                        </div>
                    </div>
                    <h6 class="card-header text-center">${playlist.nome}</h6>
                </div>
                `;
            itemPlaylist.addEventListener("click", () => location.href=`playlistdetalhe.html?id=${playlist.id}`);
            filaPlaylists.appendChild(itemPlaylist);
        });           
        } catch (error) {console.log(error, "Erro ao criar itensPlaylists.")};
};

function excluirPlaylist(){}