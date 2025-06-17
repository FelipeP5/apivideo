/*TODO: 
- edição de relações (preenchimento de existentes e atualização);
*/
if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};


const formPlaylist = document.getElementById("form-playlist");
const formModalEscolha = document.getElementById("form-modal-escolha");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const thumbnail = document.getElementById("thumbnail");
const enviarBtn = document.getElementById("enviar-btn");
const confirmarBtn = document.getElementById("confirmar-btn");
const excluirBtn = document.getElementById("excluir-btn");
const excluirModalBtn= document.getElementById("excluir-playlist-modal-btn");
const criarA = document.getElementById("criar-playlist-a");
const detalheA = document.getElementById("detalhe-playlist-a");
const campoVideos = document.getElementById("campo-videos");
const modalVideos = document.getElementById("modal-videos");

if (Number(id)) {
    document.querySelector("#titulo-acao").innerText = "Alterar informações de playlist";
    const imgPlaylistUsoTxt = document.getElementById("img-playlist-uso");

    fetch(playlistURL + id)
    .then(res => res.json())
    .then(playlist => {
        nome.value = playlist.nome;
        descricao.innerText = playlist.descricao ? playlist.descricao : "";
        imgPlaylistUsoTxt.innerText = `Usando: ${playlist.thumbnail || "Nada"}`;
        enviarBtn.value = "Alterar";
        criarA.href = "playlistform.html";
        detalheA.href = `playlistdetalhe.html?id=${id}`;
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"));
    document.querySelectorAll(".d-none").forEach(elemento => elemento.classList.remove("d-none"));
    listarVideosEmModal();
}

enviarBtn.addEventListener("click", () => {
    const dados = new FormData(formPlaylist);
    if (Number(id)){
        fetch(playlistURL + id  + "/", {
            method: "PUT",
            body: dados,
        })
        .then(res => {
            alert("Informações modificadas com sucesso");
        })
        .catch(erro => console.error(erro, "Erro ao editar conteúdo"))
    }
    else{
        fetch(playlistURL, {
        method: "POST",
        body: dados,
    })
    .then((res) => {
        if (res.ok){
        alert("Playlist criada")
        }
        else{alert("Erro")};
    })
    .catch(erro => console.error(erro, "Erro ao criar playlist"));
    }
});

formModalEscolha.addEventListener("submit", (e)=> {
    e.preventDefault();
    controleDeRelacoes(e);
});

async function listarVideosEmModal(){
    const listaRels = await fetch(relacoes).then(res => res.json())
    .catch(erro => console.error(erro, "Falha em pegar relações"));
    
    fetch(videoURL)
    .then(res => res.json())
    .then(videos => {
       videos.forEach(video => {
            const option = document.createElement("div");
            option.classList.add("form-check")
            option.innerHTML = `<label for="${video.nome}:${video.id}" class="form-check-label">${video.nome}</label>
            <input id="${video.nome}:${video.id}" class="form-check-input" type="checkbox" name="video" value="${video.id}">`;
            campoVideos.appendChild(option);
            listaRels.forEach(rel => {
                if (rel.playlist === Number(id) && rel.video === video.id){
                    document.getElementById(`${video.nome}:${video.id}`).setAttribute("checked", "");
                }
            });
        });
    })
    .catch(erro => console.error(erro));
};

async function controleDeRelacoes(eSubmit){
    const listaRels = await fetch(relacoes).then(res => res.json())
    .catch(erro => console.error(erro, "Falha em pegar relações"));
    try{
        Object.entries(eSubmit.target).forEach(listItem => {
            const dados = new FormData();
            dados.append("video", listItem[1].value)
            dados.append("playlist", id);
    
            if (listItem[1].checked){
                fetch(relacoes, {
                    method : "POST",
                    body : dados,
                }).catch(erro => console.error(erro));
            }
            else {
                listaRels.forEach(rel => {
                    if (rel.playlist === Number(id) && rel.video === Number(listItem[1].value)){
                        fetch(relacoes + rel.id + "/", {method: "DELETE"})
                    };
                })
            };
        });
    }
    catch (erro) {
        console.error(erro, "Algo deu errado!")
    }
}