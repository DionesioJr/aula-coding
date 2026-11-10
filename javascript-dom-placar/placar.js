let golsA = 0;
let golsB = 0;
let minuto = 0;

const telaA = document.getElementById("golsA");
const telaB = document.getElementById("golsB");
const telaTempo = document.getElementById("tempo");
const telaResultado = document.getElementById("resultado");

function atualizarPlacar() {
  telaA.textContent = golsA;
  telaB.textContent = golsB;
}

document.getElementById("btnA").addEventListener("click", () => {
  golsA = golsA + 1;
  atualizarPlacar();
});

document.getElementById("btnB").addEventListener("click", () => {
  golsB = golsB + 1;
  atualizarPlacar();
});

document.getElementById("btnMenosA").addEventListener("click", () => {
  if (golsA > 0) {
    golsA = golsA - 1;
  }
  atualizarPlacar();
});

document.getElementById("btnMenosB").addEventListener("click", () => {
  if (golsB > 0) {
    golsB = golsB - 1;
  }
  atualizarPlacar();
});

document.getElementById("btnZerar").addEventListener("click", () => {
  golsA = 0;
  golsB = 0;
  atualizarPlacar();
});

function quemVenceu() {
  if (golsA > golsB) {
    return "Brasil venceu!";
  } else if (golsB > golsA) {
    return "Argentina venceu!";
  } else {
    return "Empate!";
  }
}

const cronometro = setInterval(() => {
  minuto = minuto + 1;
  telaTempo.textContent = `Tempo: ${minuto} min`;

  if (minuto === 90) {
    clearInterval(cronometro);
    telaResultado.textContent = quemVenceu();
  }
}, 200);
