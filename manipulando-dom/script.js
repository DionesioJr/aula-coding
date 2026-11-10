const titulo = document.getElementById('titulo');
const contador = document.getElementById('contador');
const botaoSomar = document.getElementById('botao-somar');

let cliques = 0;

titulo.textContent = 'Contador de cliques';

function somar() {
  cliques = cliques + 1;
  contador.textContent = cliques;
}

botaoSomar.addEventListener('click', somar);
