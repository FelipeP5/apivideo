// Descrição colapsável
// "Inclui" exibe videos que o inclusos;

const capa = document.getElementById("capa");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const filaVideos = document.getElementById("fila-videos");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const incluiBtn = document.getElementById("inclui-btn");
const rodape = document.getElementById("footer-id");
const id = new URLSearchParams(location.search).get("id");

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
                itemVideo.innerHTML = `<p>Nome: ${video.nome}; data: ${video.data}; capa: ${video.thumbnail};</p>`;
                item.addEventListener("click", () => controlarVideo(video));
                filaVideos.appendChild(itemVideo);

        });
        };

function editarPlaylist(){
    location.href = `./playlistform.html?id=${id}`;
};