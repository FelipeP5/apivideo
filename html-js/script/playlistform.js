const form = document.querySelector("form");
const url = "http://127.0.0.1:8000/playlist/";
const btn = document.getElementById("enviar");

btn.addEventListener("submit", criar)

function criar(){
    btn.preventDefault();
    const dados = FormData(form);
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
            },
            body: JSON.stringify(dados),
        }
)
    .catch(erro => console.warn(erro, "Houve erro")); //405
}