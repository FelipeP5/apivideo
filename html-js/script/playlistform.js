/*TODO: 
- edição de relações (preenchimento de existentes e atualização);
*/
const formPlaylist = document.getElementById("form-playlist");
const formModal = document.getElementById("form-modal");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const thumbnail = document.getElementById("thumbnail");
const excluirBtn = document.getElementById("excluir-btn");
const videosBtn = document.getElementById("videos-btn")
const modalVideos = document.getElementById("modal-videos");
let formContent = false;

if (Number(id)) {
    document.querySelector("h1").innerText = "Alterar informações de playlist";
    const imgPlaylistUsoTxt = document.getElementById("img-playlist-uso");
    fetch(playlistURL + id)
    .then(res => res.json())
    .then(playlist => {
        nome.value = playlist.nome;
        descricao.innerText = playlist.descricao ? playlist.descricao : "";
        imgPlaylistUsoTxt.innerText = `Usando: ${playlist.thumbnail || "Nada"}`;
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"));

    document.querySelectorAll(".d-none").forEach(elemento => elemento.classList.remove("d-none"));
}

formPlaylist.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);
    const dados = new FormData(formPlaylist);
    if (Number(id)){
        fetch(playlistURL + id  + "/", {
            method: "PUT",
            body: dados,
        })
        .then(res => {
            console.log(res);
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
        console.log(res);
        alert("Playlist criada");
    }
    )
    .catch(erro => console.error(erro, "Erro ao criar playlist"));
    }
});

// Modal de relações
videosBtn.addEventListener("click", () => {
    modalVideos.showModal();
    if (!formContent){
        listarVideosEmModal();
        formContent = true;
    };
    formModal.addEventListener("submit", salvarRelacoes);
    document.getElementById("fechar-btn").addEventListener("click", () => modalVideos.close());
});

function listarVideosEmModal(){
    fetch(videoURL)
    .then(res => res.json())
    .then(videos => {
        videos.forEach(video =>{
            const opcao = document.createElement("div");
            opcao.innerHTML = `<label for="${video.id}" class="form-label">${video.nome}</label>
            <input id="${video.id}" class="" type="checkbox" name="video" value="${video.id}">`;
            document.getElementById("campos-videos").appendChild(opcao);
        });
    })
    .catch(erro => console.error(erro));
};

function salvarRelacoes(e){
    e.preventDefault();

    Object.entries(e.target).forEach(listItem => {
        const dados = new FormData();
        dados.append("video", listItem[1].value)
        dados.append("playlist", id);
        if (listItem[1].checked){
            console.log("Truthy!", listItem[1].value);
            fetch(relacoes, {
                method : "POST",
                body : dados,
            }).catch(erro => console.error(erro));
        } else{console.log(listItem[1].checked, "Falsy!")};
    });
    modalVideos.close();
};

excluirBtn.addEventListener("click", () => {
    document.getElementById("modal-exclusao").showModal();
    document.getElementById("confirmar-exclusao-btn").addEventListener("click", excluir);
    document.getElementById("cancelar-btn").addEventListener("click", () => modalExclusao.close());
});

function excluir(){
    fetch(playlistURL + id + "/", {
        method: "DELETE",
    })
    .then(res => {
        console.log(res);
        location.replace("./");
    })
    .catch(erro => console.error(erro, "Exclusão fracassou"));
};