// Exemplo 8: if / else
function quemVenceu(golsA, golsB) {
  if (golsA > golsB) {
    return "Time A venceu";
  } else if (golsB > golsA) {
    return "Time B venceu";
  } else {
    return "Empate";
  }
}

console.log(quemVenceu(2, 1)); // Time A venceu
console.log(quemVenceu(0, 3)); // Time B venceu
console.log(quemVenceu(1, 1)); // Empate
