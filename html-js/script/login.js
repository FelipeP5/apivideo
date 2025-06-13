//INFO: Username não aceita espaços, caracteres especiais e deve ser único entre todos usuários
//Cadastrar precisa criar uma instância de User apropriadamente
//Como transferir o token de acesso entre múltiplas páginas?

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

cadastrarShow.addEventListener("click", () => cadastrarDialog.showModal());
closeBtn.addEventListener("click", () => cadastrarDialog.close());
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
    cadastrarDialog.close();
});

entrarBtn.addEventListener("click", () => {
    // const loginDados = new FormData(formLogin);
    const dadosU = JSON.parse(localStorage.getItem("dadosUsuario"));
    if (dadosU.usuario === usuarioLogin.value && dadosU.senha === senhaLogin.value){
    fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
            username: "felipe",
            password: "1234"
        })
    })
    .then(res => res.json())
    .then(jwt => console.log(jwt))
    .finally(() => sessionStorage.setItem("autenticado", true))
    .catch(erro => console.error(erro));
    location.href = "./";
    }
    else{
        alert("Usuário ou senha informados estão incorretos");
    }
})