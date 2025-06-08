// Descrição colapsável
// O player some ao exibir mensagens de erro, quebrando o sistema em vídeos subsequentes;
// Editar deve se referir ao vídeo quando um está ativo;
// Os itens da fila-video precisam botoes funcionais;
// Tamanho do rodapé é modificável;

const placeholderImg = "../svg/placeholder-img.jpg";
const areaDaCapa = document.getElementById("area-da-capa");
let capa = document.getElementById("capa");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const filaVideos = document.getElementById("fila-videos");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const incluiBtn = document.getElementById("inclui-btn");
const antecessorBtn = document.getElementById("antecessor-btn");
const sucessorBtn = document.getElementById("sucessor-btn");
const antecessorDiv = document.querySelector(".antecessor-div");
const sucessorDiv = document.querySelector(".sucessor-div");
const rodape = document.getElementById("footer-id");
const id = new URLSearchParams(location.search).get("id");
const playlistSequenciaBtn = document.getElementById("playlist-sequencia-btn");
let sequenciaDeVideo = [];

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

    exibirSelecionados()

incluiBtn.addEventListener("click", () => {
    filaVideos.classList.toggle("d-none");
    filaVideos.classList.toggle("fila-videos");
    rodape.classList.toggle("rodape-inativo");
    rodape.classList.toggle("rodape-ativo");
});

 async function selecionarVideos() {
            try {
            const listaRelacoes = await fetch(relacoes).then(res => res.json());
            console.log("relacoes ", relacoes);
            let filtro = [];
            let videosFiltrados = [];

            listaRelacoes.forEach(relacao => {
                if (relacao.playlist === Number(id)){
                    filtro.push(relacao.video);
                };
            });

            const videos = await fetch(videoURL).then(res => res.json());
            videos.forEach(video => {
                const filtroUnico = filtro.filter((valor, indice, vetor) => vetor.indexOf(valor) === indice);
                if (filtroUnico.includes(video.id)){
                    videosFiltrados.push(video);
                };
            });
            
            return await videosFiltrados;
            } catch (error) {
                console.error(error, "You suck!");
            }
        };

async function exibirSelecionados() {
            const videosFiltrados = await selecionarVideos();
            console.log("sem promessas", videosFiltrados);

            videosFiltrados.forEach(video => {
                const itemVideo = document.createElement("div");
                itemVideo.classList.add("col-3");
                itemVideo.innerHTML = `
                            <div class="pointer card bg-cprimary clr-csecondary">
                                <img src="${video.thumbnail || placeholderImg}" alt="Nenhuma imagem" class="card-img-top img-fluid custom-img bg-csecondary">
                                <div class="card-img-overlay">
                                        <div class="container p-0">
                                            <a href="videoform.html?id=${video.id}" class="ms-auto btn clr-cprimary">Editar</a>
                                            <button type="button" onclick="excluirVideo(${video.id})" class="btn clr-cprimary">Excluir</button>
                                        </div>
                                </div>
                                <h6 class="card-header text-center">${video.nome}</h6>
                            </div>
                        `;
                itemVideo.addEventListener("click", () => controlarVideo(video));
                filaVideos.appendChild(itemVideo);
        });
};

function controlarVideo(videoObj){
    if (capa) {
        areaDaCapa.removeChild(capa);
        capa = false;
        areaDaCapa.innerHTML = `<video controls playsinline poster="#" preload="metadata" class="d-flex w-100 h-100">
                        <p >O seu navegador não tem apoio para vídeos em sites D:</p>
                        <a href="#" download id="video-el-nao-sustentado">Clique aqui para baixá-lo</a>
                      </video>
                        <p id="msg-erro" class="d-none">
                            Não foi possível carregar o vídeo pois o arquivo não existe ou não é suportado. Você pode
                            <a href="" id="arquivo-nao-carregou">clicar aqui para adicionar o arquivo no  vídeo</a>
                        </p>
                        `;
    };
    playlistSequenciaBtn.innerText = 'playlist.nome' || "Sem Nome de Playlist";
    nome.innerText = videoObj.nome || "Sem Nome de Vídeo";
    descricao.innerText = videoObj.descricao || "O vídeo não contém uma descrição.";
    preencherVideo(videoObj);
    playlistSequenciaBtn.style.display = "block";
    antecessorDiv.style.display = "block";
    sucessorDiv.style.display = "block";
    
    rodape.classList.add("row", "m-0");
};

function preencherVideo(videoObj){
    console.log(videoObj);
    const player = document.querySelector("video");
    const erroNoPlayer = document.getElementById("video-el-nao-sustentado");
    const msgErro = document.getElementById("msg-erro");
    const download = document.getElementById("arquivo-nao-carregou");

    player.poster = videoObj.thumbnail;
    player.setAttribute("src", videoObj.arquivo);
    player.load();
    player.addEventListener("error", arquivo => {
        areaDaCapa.removeChild(player);
        erroNoPlayer.href = arquivo;
        msgErro.classList.remove("d-none");
        download.href = `./videoform.html?id=${videoObj.id}`;
    })
};

function editarPlaylist(){
    location.href = `./playlistform.html?id=${id}`;
};

function excluirVideo(id){
    fetch(videoURL + id + "/", {
        method: "DELETE",
    })
    .then(res => console.log(res))
    .catch(erro => console.error(erro, "Exclusão fracassou"));
};