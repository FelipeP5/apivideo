const cadastrarDialog = document.getElementById("cadastrarDialog");
const closeBtn = document.getElementById("closeBtn");
const formLogin = document.getElementById("formLogin");
const formCadastrar = document.getElementById("formCadastrar");
const cadastrarShow = document.getElementById("castrarShow");
const usuarioLoginInput = document.getElementById("usuarioLoginInput");
const senhaLoginInput = document.getElementById("senhaLoginInput");
const usuarioCadastrarInput = document.getElementById("usuarioCadastrarInput");
const senhaCadastrarInput = document.getElementById("senhaCadastrarInput");
const entrarBtn = document.getElementById("entrarBtn");
const cadastrarBtn = document.getElementById("cadastrarBtn");

cadastrarShow.addEventListener("click", () => cadastrarDialog.showModal());

closeBtn.addEventListener("click", () => cadastrarDialog.close())
