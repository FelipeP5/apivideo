// Editar deve se referir ao vídeo quando um está ativo;
// Botão playlistSequencia deve exibir o nome da playlist em uso;
// Modo Sequência deve ativar autoplay; 
// Os itens da fila-video precisam de botôes excluir e desatar, difícil implementação;
// Tamanho do rodapé deve ser modificável;
// modo sequência deve persistir em recarregamento de página;
// Descrição colapsável;
// Erro 404 no primeiro clique em uma dos vídeos sem imagem, GET: http://127.0.0.1:5500/html-js/html/null;

if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};

const id = new URLSearchParams(location.search).get("id");
const placeholderImg = "../svg/placeholder-img.jpg";
///
const areaDaCapa = document.getElementById("area-da-capa");
let capa = document.getElementById("capa");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const filaVideos = document.getElementById("fila-videos");
///
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
///
const incluiBtn = document.getElementById("inclui-btn");
const antecessorBtn = document.getElementById("antecessor-btn");
const sucessorBtn = document.getElementById("sucessor-btn");
const antecessorDiv = document.querySelector(".antecessor-div");
const sucessorDiv = document.querySelector(".sucessor-div");
const rodape = document.getElementById("footer-id");
const editarBtn = document.getElementById("editar-btn");
const playlistSequenciaBtn = document.getElementById("playlist-sequencia-btn");
let player;
let sequenciavideoObjs = selecionarVideos();
let indiceVideoAtual;

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

exibirSelecionados();

antecessorBtn.addEventListener("click", () => {
    indiceVideoAtual--;
    controlarVideo(indiceVideoAtual);
})
sucessorBtn.addEventListener("click", () => {
    indiceVideoAtual++;
    controlarVideo(indiceVideoAtual);
});

incluiBtn.addEventListener("click", () => {
    filaVideos.classList.toggle("d-none");
    filaVideos.classList.toggle("fila-videos");
    rodape.classList.toggle("rodape-inativo");
    rodape.classList.toggle("rodape-ativo");
});

playlistSequenciaBtn.addEventListener("click", () => location.href = `playlistdetalhe.html?id=${id}`);


editarBtn.addEventListener("click", () => {
    if (!indiceVideoAtual){
        console.log("indicie atual V");
        location.href = `playlistform.html?id=${id}`;
    } 
    else{
        console.log("Indice atual F");
        location.href = `videoform.html?id=${sequenciavideoIds[indiceVideoAtual].id}`;
    };
})

async function selecionarVideos() {
            try {
            const listaRelacoes = await fetch(relacoes).then(res => res.json());
            console.log("relacoes ", listaRelacoes);
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
                console.error(error, "Erro ao selecionar vídeos");
            }
        };

async function exibirSelecionados() {
    const videosFiltrados = await sequenciavideoObjs;
    console.log("sem promessas", videosFiltrados);
    
        try{
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
            itemVideo.addEventListener("click", () => controlarVideo(videosFiltrados.indexOf(video)));
            filaVideos.appendChild(itemVideo);
        });           
        } catch (error) {console.log(error, "Erro ao criar itensVídeos.")};
};

async function controlarVideo(videoId){
    console.log("controlarVideo: ", videoId);
    const videoObjs = await sequenciavideoObjs;
    indiceVideoAtual = videoId;
    desativarReativarControles();
    if (capa) {
        areaDaCapa.removeChild(capa);
        capa = false;
        areaDaCapa.innerHTML = `<video controls playsinline poster="#" preload="metadata" class="d-flex w-100 h-100">
                                </video>
                            `;
    };
    playlistSequenciaBtn.innerText = 'playlist.nome' || "Sem Nome de Playlist";
    nome.innerText = videoObjs[indiceVideoAtual].nome || "Sem Nome de Vídeo";
    descricao.innerText = videoObjs[indiceVideoAtual].descricao || "O vídeo não contém uma descrição.";
    preencherVideo(videoObjs, indiceVideoAtual);
    playlistSequenciaBtn.style.display = "block";
    antecessorDiv.style.display = "block";
    sucessorDiv.style.display = "block";
    rodape.classList.add("row", "m-0");
    indiceVideoAtual === videoObjs.length - 1 ? null : reproducaoSequencial(indiceVideoAtual);
};

function preencherVideo(videoObjs, videoId){
    console.log(videoId);
    player = document.querySelector("video");

    player.poster = videoObjs[videoId].thumbnail;
    player.setAttribute("src", videoObjs[videoId].arquivo);
    player.load();

    player.addEventListener("error", () => {
        player.src = "../svg/youare.mp4";
        player.poster = placeholderImg;
        nome.innerText = "Erro ao carregar vídeo";
        descricao.innerText = "Má escolha";
    })
};

async function reproducaoSequencial(videoId){
    player.addEventListener("ended", () => {
        videoId++
        console.log("reprodução sequência", videoId)
        controlarVideo(videoId);
    })
}

async function desativarReativarControles() {
    const vetorVideoObjs = await sequenciavideoObjs;
    if (indiceVideoAtual === vetorVideoObjs.length - 1){
        sucessorBtn.setAttribute("disabled", "");
    };
    if (indiceVideoAtual === 0){
        antecessorBtn.setAttribute("disabled", "");
    }
    else{
        sucessorBtn.removeAttribute("disabled");
        antecessorBtn.removeAttribute("disabled");
    }
}

// function excluirVideo(videoId){
//     fetch(videoURL + videoId + "/", {
//         method: "DELETE",
//     })
//     .then(res => console.log(res))
//     .catch(erro => console.error(erro));

//     exibirSelecionados();
// }
