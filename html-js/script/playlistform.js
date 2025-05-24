/*TODO: 
- Atualizar data ao editar conteúdo;
- Exibir arquivos já em uso num texto a parte;
*/
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
        descricao.innerText = playlist.descricao ? playlist.descricao : "";
        // videos = ?
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"))
}

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);
    const dados = new FormData(form);
    if (id){
        fetch(playlistURL + id  + "/", {
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