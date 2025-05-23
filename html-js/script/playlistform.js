//TODO: Atualizar data ao editar conteúdo;
const form = document.querySelector("form");
const playlistURL = "http://127.0.0.1:8000/playlist/";
const id = new URLSearchParams(location.search).get("id");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const videos = document.getElementById("videos");
const thumbnail = document.getElementById("thumbnail");

if (id) {
    document.querySelector("h1").innerText = "Alterar informações de playlist"
    fetch(playlistURL + id)
    .then(res => res.json())
    .then(playlist => {
        nome.value = playlist.nome;
        descricao.innerText = playlist.descricao ? playlist.descricao : "Não tem";
        // videos = ?
        thumbnail.value = playlist.thumbnail ? playlist.thumbnail : "Não tem";
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"))
}

form.addEventListener("submit", e => {
    console.log(e);
    e.preventDefault();
    const dados = new FormData(form);
    if (id){
        fetch(playlistURL + id, {
            method: "PUT",
            body: dados,
        })
        .then(res => {
            console.log(res);
            alert("Informações modificadas com sucesso");
        })
        .catch(erro => console.error(erro, "Erro ao editar conteúudo"))
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