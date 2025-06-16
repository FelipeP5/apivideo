/*TODO: 
- edição de relações (preenchimento de existentes e atualização);
*/
if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};


const formVideo = document.getElementById("form-video");
const formModal = document.getElementById("form-modal");
const videoURL = "http://127.0.0.1:8000/video/";
const playlistURL = "http://127.0.0.1:8000/playlist/";
const relacoes = "http://127.0.0.1:8000/playlistvideo/";
const id = new URLSearchParams(location.search).get("id");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const thumbnail = document.getElementById("thumbnail");
const playlistsBtn = document.getElementById("playlists-btn")
const excluirBtn = document.getElementById("excluir-btn");
const modalPlaylists = document.getElementById("modal-playlists");
let formContent = false;

if (Number(id)) {
    document.querySelector("h1").innerText = "Alterar informações de video";
    const imgVideoUsoTxt = document.getElementById("img-video-uso");
    const videoUsoTxt = document.getElementById("video-uso");

    fetch(videoURL + id)
    .then(res => res.json())
    .then(video => {
        nome.value = video.nome;
        descricao.innerText = video.descricao ? video.descricao : "";
        imgVideoUsoTxt.innerText = `Usando: ${video.thumbnail || "Nada"}`;
        videoUsoTxt.innerText = `Usando: ${video.arquivo}`;
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"));
    document.querySelectorAll(".d-none").forEach((elemento)=>elemento.classList.remove("d-none"));
}

formVideo.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);
    const dados = new FormData(formVideo);
    if (Number(id)){
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
// Modal de relações
playlistsBtn.addEventListener("click", () => {
    modalPlaylists.showModal();
    if (!formContent){
        listarPlaylistsEmModal();
        formContent = true;
    };
    formModal.addEventListener("submit", salvarRelacoes);
    document.getElementById("fechar-btn").addEventListener("click", () => modalPlaylists.close());
});

function listarPlaylistsEmModal(){
    fetch(playlistURL)
    .then(res => res.json())
    .then(playlists => {
        playlists.forEach(playlist =>{
            const option = document.createElement("div");
            option.innerHTML = `<label for="${playlist.id}" class="form-label">${playlist.nome}</label>
            <input id="${playlist.id}" class="" type="checkbox" name="playlist" value="${playlist.id}">`;
            document.getElementById("campos-playlists").appendChild(option);
        });
    })
    .catch(erro => console.error(erro));
};

function salvarRelacoes(e){
    e.preventDefault();

    Object.entries(e.target).forEach(listItem => {
        const dados = new FormData();
        dados.append("playlist", listItem[1].value)
        dados.append("video", id);
        if (listItem[1].checked){
            console.log("Truthy!", listItem[1].value);
            fetch(relacoes, {
                method : "POST",
                body : dados,
            }).catch(erro => console.error(erro));
        } else{console.log(listItem[1].checked, "Falsy!")};
    });
    modalPlaylists.close();
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
};