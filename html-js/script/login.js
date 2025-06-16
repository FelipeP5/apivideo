//INFO: Username não aceita espaços, caracteres especiais e deve ser único entre todos usuários
//Cadastrar precisa criar uma instância de User apropriadamente
//Como transferir o token de acesso entre múltiplas páginas?

const loginURL = "http://127.0.0.1:8000/login/";
const usuarioURL = "http://127.0.0.1:8000/usuario/";

const formLogin = document.getElementById("form-login");
const formCadastrar = document.getElementById("form-cadastrar");
const usuarioLogin = document.getElementById("usuarioLoginInput");
const senhaLogin = document.getElementById("senhaLoginInput");
const usuarioCadastrar = document.getElementById("usuarioCadastrarInput");
const senhaCadastrar = document.getElementById("senhaCadastrarInput");
const entrarBtn = document.getElementById("entrar-btn");
const cadastrarBtn = document.getElementById("cadastrar-btn");

formCadastrar.addEventListener("submit", (e) =>{
    e.preventDefault();
    // const cadastrarDados = new FormData(formCadastrar);
    // fetch(usuarioURL, {
    //     method: 'POST',
    //     body: cadastrarDados
    // });
    const dadosUsuario = {
        usuario: usuarioCadastrar.value,
        senha: senhaCadastrar.value,
    }
    localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
});

entrarBtn.addEventListener("click", () => {
    // const loginDados = new FormData(formLogin);
    const dadosU = JSON.parse(localStorage.getItem("dadosUsuario"));
    if (dadosU.usuario === usuarioLogin.value && dadosU.senha === senhaLogin.value){
        sessionStorage.setItem("autenticado", true);
        location.href = "./";
    }
})