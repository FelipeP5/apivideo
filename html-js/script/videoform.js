/*TODO: 
- Exibir arquivos já em uso num texto a parte;
- menu de seleção de vídeos;
*/
const form = document.querySelector("form");
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

playlistsBtn.addEventListener("click", (e) => {
    console.log(e);
    document.getElementById("menu-playlists").show();

})

excluirBtn.addEventListener("click", () => {
    document.getElementById("modal-exclusao").showModal();
    document.getElementById("confirmar-exclusao-btn").addEventListener("click", excluir);
    document.getElementById("cancelar-btn").addEventListener("click", () => modalExclusao.close());
})

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);
    const dados = new FormData(form);
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

function listarPlaylists(){
    //e ballz
}

function excluir(){
    fetch(videoURL + id + "/", {
        method: "DELETE",
    })
    .then(res => {
        console.log(res);
        location.replace("inicio.html");
    })
    .catch(erro => console.error(erro, "Exclusão fracassou"));
}
