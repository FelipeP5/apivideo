/*TODO: 
- Exibir arquivos já em uso num texto a parte;
- menu de seleção de playlists;
- edição de relações;
- Selecionamento de playlists em edição;
*/
const formVideo = document.getElementById("form-video");
const formMenu = document.getElementById("form-menu");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const playlists = document.getElementById("playlists");
const thumbnail = document.getElementById("thumbnail");
const playlistsBtn = document.getElementById("playlists-btn")
const excluirBtn = document.getElementById("excluir-btn");
const menuPlaylists = document.getElementById("menu-playlists");
let formContent = false;

if (id) {
    document.querySelector("h1").innerText = "Alterar informações de video";
    fetch(videoURL + id)
    .then(res => res.json())
    .then(video => {
        nome.value = video.nome;
        descricao.innerText = video.descricao ? video.descricao : "";
        // videos = ?
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"));

    excluirBtn.style.display = "flex";
}

playlistsBtn.addEventListener("click", () => {
    menuPlaylists.showModal();
    if (!formContent){
        listarPlaylistsEmMenu();
        formContent = true;
    };
    formMenu.addEventListener("submit", enviarRelacoes);
    document.getElementById("fechar-btn").addEventListener("click", () => menuPlaylists.close());
})

excluirBtn.addEventListener("click", () => {
    const modalExclusao = document.getElementById("modal-exclusao");
    modalExclusao.showModal();
    document.getElementById("confirmar-exclusao-btn").addEventListener("click", excluir);
    document.getElementById("cancelar-btn").addEventListener("click", () => modalExclusao.close());
})

formVideo.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);
    const dados = new FormData(formVideo);
    if (id){
        fetch(videoURL + id  + "/", {
            method: "PUT",
            body: dados,
        })
        .then(res => {
            console.log(res);
            alert("Informações modificadas com sucesso");
        })
        .catch(erro => console.error(erro, "Erro ao editar conteúdo"));
    }
    else{
        fetch(videoURL, {
        method: "POST",
        body: dados,
    })
    .then((res) => {
        console.log(res);
        alert("Vídeo criado");
    }
    )
    .catch(erro => console.error(erro, "Erro ao criar vídeo"));
    }
});

function enviarRelacoes(){
    formMenu.addEventListener("submit", e => {
        e.preventDefault();
        console.log(e);
                Object.entries(e.target).forEach(listItem => {
                    console.log("listItem" + listItem + "numero dele:" + listItem[1].value);
                    const dados = new FormData();
                    dados.append("playlist", listItem[1].value)
                    dados.append("video", id);
                    if (listItem[1].checked){
                        console.log("coisa do if", listItem[1].value);
                        fetch(relacoes, {
                            method : "POST",
                            body : dados,
                        }).catch(erro => console.error(erro));
                    };
                });
            });
    menuPlaylists.close();
};

function listarPlaylistsEmMenu(){
    fetch(playlistURL)
        .then(res => res.json())
        .then(playlists => {
            playlists.forEach(playlist =>{
                const option = document.createElement("div");
                option.innerHTML = `<label for="${playlist.id}" class="form-label">${playlist.nome}</label>
                                <input id="${playlist.id}" class="" type="checkbox" name="playlist" value="${playlist.id}">`;
                document.getElementById("menu-playlists").appendChild(option);
            });
        })
        .catch(erro => console.error(erro));
    };

function excluir(){
    fetch(videoURL + id + "/", {
        method: "DELETE",
    })
    .then(res => {
        console.log(res);
        location.replace("./");
    })
    .catch(erro => console.error(erro, "Exclusão fracassou"));
}
