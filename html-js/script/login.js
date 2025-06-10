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
    cadastrarDialog.close();
    const usuarioDadosEntrada = {
        usuario : usuarioCadastrar.value,
        senha : senhaCadastrar.value,
    };
    console.log(JSON.stringify(usuarioDadosEntrada));
    localStorage.setItem("usuarioDados", JSON.stringify(usuarioDadosEntrada));
})

entrarBtn.addEventListener("click", () => {
    const usuarioDadosSaida = JSON.parse(localStorage.getItem("usuarioDados"));
    if (usuarioLogin.value === usuarioDadosSaida.usuario && senhaLogin.value === usuarioDadosSaida.senha){
        sessionStorage.setItem("autenticado", true);
        location.href = "./";
    }
    else {
        console.log(`Usuário: ${usuarioLogin.value}, Senha: ${senhaLogin.value}.
        São desiguais à ${usuarioDadosSaida.usuario} e ${usuarioDadosSaida.senha} de ${usuarioDadosSaida}`);
    }
});