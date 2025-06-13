const tituloEl = document.querySelector("title");
const blocoUsuario = document.getElementById("bloco-usuario");
const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

tituloEl.innerText = `${dadosUsuario.usuario}`;

exibirUsuario();

function exibirUsuario(){
    blocoUsuario.innerHTML = `
        <p class="fs-2 fw-bold">${dadosUsuario.usuario}</p>
        <p class="fs-4">Senha: ${dadosUsuario.senha}</p>
        <button id="redefinirBtn" type="button" class="rounded p-2 bg-csecondary clr-cprimary">Redefinir</button>
    `;
    const redefinirBtn = document.getElementById("redefinirBtn");
    redefinirBtn.addEventListener("click", redefinirUsuario);
}

function redefinirUsuario(){
    blocoUsuario.innerHTML = `
        <p><input id="novoUsuarioInput" type="text"></p>
        <p>Senha: <input id="novaSenhaInput" type="password"></p>
        <button id="confirmarBtn" type="button" class="rounded p-2 bg-csecondary clr-cprimary">Confirmar</button>
    `;
    const novoUsuarioInput = document.getElementById("novoUsuarioInput");
    const novaSenhaInput = document.getElementById("novaSenhaInput");
    const confirmarBtn = document.getElementById("confirmarBtn");

    confirmarBtn.addEventListener("click", () => {
        dadosUsuario.usuario = novoUsuarioInput.value;
        dadosUsuario.senha = novaSenhaInput.value;
        console.log(dadosUsuario);
        localStorage.setItem("dadosUsuario", dadosUsuario);
        exibirUsuario();
    })
}