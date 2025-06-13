//INFO: Username não aceita espaços, caracteres especiais e deve ser único entre todos usuários

const loginURL = "http://127.0.0.1:8000/login/";
const usuarioURL = "http://127.0.0.1:8000/usuario/";
const cadastrarDialog = document.getElementById("cadastrarDialog");
const closeBtn = document.getElementById("closeBtn");
const formLogin = document.getElementById("formLogin");
const formCadastrar = document.getElementById("formCadastrar");
const cadastrarShow = document.getElementById("castrarShow");
const usuarioLogin = document.getElementById("usuarioLoginInput");
const senhaLogin = document.getElementById("senhaLoginInput");
const usuarioCadastrar = document.getElementById("usuarioCadastrarInput");
const senhaCadastrar = document.getElementById("senhaCadastrarInput");
const entrarBtn = document.getElementById("entrarBtn");
const cadastrarBtn = document.getElementById("cadastrarBtn");

// cadastrarShow.addEventListener("click", () => cadastrarDialog.showModal());
// closeBtn.addEventListener("click", () => cadastrarDialog.close());
// formCadastrar.addEventListener("submit", (e) =>{
//     e.preventDefault();
//     const cadastrarDados = new FormData(formCadastrar);
//     fetch(usuarioURL, {
//         method: 'POST',
//         body: cadastrarDados
//     });
//     cadastrarDialog.close();
// });

entrarBtn.addEventListener("click", () => {
    const loginDados = new FormData(formLogin);
    fetch(loginURL, {
        method: "POST",
        body: loginDados
    })
    .then(res => res.json())
    .then(jwt => {
        console.log(jwt);
        console.log("access: ", jwt.access);
    })
})