// Exercício 1: variáveis
let contador = 0;
contador = 5;
const time = "Brasil";

console.log(contador); // 5
console.log(time); // Brasil

// Exercício 2: tipos
console.log(typeof 10); // number
console.log(typeof "Preparado ?"); // string
console.log(typeof true); // boolean

// Exercício 3: somar 1
let pontos = 5;
pontos = pontos + 1;
pontos += 1;
pontos++;
console.log(pontos); // 8

// Exercício 4: comparações
console.log(5 < 10); // true
console.log(10 <= 10); // true
console.log(5 === "5"); // false
console.log(5 !== 6); // true
console.log("gol" === "gol"); // true

// Exercício 5: função
function adicionar(valor) {
  return valor + 1;
}

console.log(adicionar(9)); // 10
console.log(adicionar(41)); // 42
console.log(adicionar(adicionar(1))); // 3

// Exercício 6: if
let gols = 9;

if (gols < 10) {
  gols = adicionar(gols);
}
console.log(gols); // 10

if (gols < 10) {
  gols = adicionar(gols);
}
console.log(gols); // 10, o if não deixou passar

// Exercício 7: if / else
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
