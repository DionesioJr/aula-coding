const elementoContador = document.getElementById("contador");
let contador = 0;

function adicionar(valor) {
  return valor + 1;
}

function mudarValorTela() {
  elementoContador.textContent = contador;
}

setInterval(() => {
  if (contador < 10) {
    contador = adicionar(contador);
  }
  mudarValorTela();
}, 300);
