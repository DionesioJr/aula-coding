// Desafio: mini placar no terminal
let golsA = 0;
let golsB = 0;

function adicionar(valor) {
  return valor + 1;
}

function quemVenceu(a, b) {
  if (a > b) {
    return "Time A venceu";
  } else if (b > a) {
    return "Time B venceu";
  } else {
    return "Empate";
  }
}

golsA = adicionar(golsA);
golsA = adicionar(golsA);
golsB = adicionar(golsB);

console.log("Placar:", golsA, "x", golsB); // Placar: 2 x 1
console.log(quemVenceu(golsA, golsB)); // Time A venceu
