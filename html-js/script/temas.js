//Mudar Cor de corpo no auto;
//Exibir tema atual no texto do dropdown
"use strict";

const pegarTema = () => {
    const temaEscolhido = localStorage.getItem("temaUsuario");
    if (temaEscolhido){
        return temaEscolhido;
    };
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
};

const definirTema = tema => {
    const corpo = document.getElementById("corpo");
    if (tema === "auto"){
        document.documentElement.setAttribute("data-bs-theme", window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
    } else{
        document.documentElement.setAttribute("data-bs-theme", tema);
    }
    if (tema === "dark"){
        corpo.style.backgroundColor = "rgb(40, 40, 40)";
    }
    else {
        corpo.style.backgroundColor = "rgb(217, 217, 217)";
    }
}

const mostrarTemaAtivo = tema => {
    document.querySelectorAll("[data-bs-theme-value]").forEach((elemento) => {
        if (elemento.getAttribute("data-bs-theme-value") === tema){
            elemento.classList.add("active");
            // document.getElementById("temaSelecionadotxt").innerText = "";
        } else{
            elemento.classList.remove("active");
        }
    })
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", () => {
    const temaArmazenado = pegarTema();
    if (temaArmazenado !== "dark" && temaArmazenado !== "light"){
        definirTema(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
    } else{
        definirTema(temaArmazenado);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    definirTema(pegarTema());
    mostrarTemaAtivo(pegarTema());
    document.querySelectorAll("[data-bs-theme-value]").forEach((ativar) => {
        ativar.addEventListener("click", () => {
            const tema = ativar.getAttribute("data-bs-theme-value");
            localStorage.setItem("temaUsuario", tema);
            mostrarTemaAtivo(pegarTema());
            definirTema(pegarTema());
        })
    });

})