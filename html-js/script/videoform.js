/*TODO: 
- edição de relações (preenchimento de existentes e atualização);
*/
if(JSON.parse(sessionStorage.getItem("autenticado")) !== true){location.replace("login.html")};


const formVideo = document.getElementById("form-video");
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
const excluirModalBtn= document.getElementById("excluir-video-modal-btn");
const criarA = document.getElementById("criar-video-a");
const detalheA = document.getElementById("detalhe-video-a");
const camposPlaylists = document.getElementById("campos-playlists");
const modalPlaylists = document.getElementById("modal-playlists");

if (Number(id)) {
    document.querySelector("#titulo-acao").innerText = "Alterar informações de video";
    const imgVideoUsoTxt = document.getElementById("img-video-uso");
    const videoUsoTxt = document.getElementById("video-uso");
    
    fetch(videoURL + id)
    .then(res => res.json())
    .then(video => {
        nome.value = video.nome;
        descricao.innerText = video.descricao ? video.descricao : "";
        imgVideoUsoTxt.innerText = `Usando: ${video.thumbnail || "Nada"}`;
        videoUsoTxt.innerText = `Usando: ${video.arquivo}`;
        enviarBtn.value = "Alterar";
        criarA.href = "videoform.html";
        detalheA.href = `videodetalhe.html?id=${id}`;
    })
    .catch(erro => console.error(erro, "Erro ao preencher campos"));
    document.querySelectorAll(".d-none").forEach((elemento)=>elemento.classList.remove("d-none"));
    listarPlaylistsEmModal();
}

enviarBtn.addEventListener("click", () => {
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
        .then(res => {
            console.log(res);
            alert("Vídeo criado");
        }
    )
    .catch(erro => console.error(erro, "Erro ao criar vídeo"));
}
});

formModalEscolha.addEventListener("submit", (e)=> {
    e.preventDefault();
    controleDeRelacoes(e);
});

excluirModalBtn.addEventListener("click", () => {
    fetch(videoURL + id + "/", {method:"DELETE"})
    .then(res => location.href = "./")
    .catch(erro => console.error("Excluir o vídeo não foi possível", erro));
})

function listarPlaylistsEmModal(){
    fetch(playlistURL)
    .then(res => res.json())
    .then(playlists => {
        playlists.forEach(playlist =>{
            const option = document.createElement("div");
            option.classList.add("form-check")
            option.innerHTML = `<label for="${playlist.id}" class="form-check-label">${playlist.nome}</label>
            <input id="${playlist.id}" class="form-check-input" type="checkbox" name="playlist" value="${playlist.id}">`;
            camposPlaylists.appendChild(option);
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
            dados.append("playlist", listItem[1].value)
            dados.append("video", id);
    
            if (listItem[1].checked){
                
                fetch(relacoes, {
                    method : "POST",
                    body : dados,
                }).catch(erro => console.error(erro));
            }
            else {
                listaRels.forEach(rel => {
                    if (rel.video === Number(id) && rel.playlist === Number(listItem[1].value)){
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