const form = document.querySelector("form");
const playlistURL = "http://127.0.0.1:8000/playlist/";
const dados = new FormData(form);

form.addEventListener("submit", e => {
    console.log(e);
    e.preventDefault();
    fetch(playlistURL, {
        method: 'POST',
        headers: 'application/json',
        body: dados,
    })
});