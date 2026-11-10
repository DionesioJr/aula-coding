// Exercício 1: função com tipos
function somar(a: number, b: number): number {
  return a + b;
}

console.log(somar(2, 3)); // 5

// Exercício 3: tipos básicos
let nome: string = "Ana";
let idade: number = 20;
let aprovado: boolean = true;
let cidade = "Campo Grande"; // inferido: string

console.log(nome, idade, aprovado, cidade); // Ana 20 true Campo Grande

// Exercício 5: array
const linguagens: string[] = ["JavaScript", "TypeScript", "Python", "Java"];
console.log(linguagens.length); // 4

// Exercício 6: media
function media(a: number, b: number): number {
  return (a + b) / 2;
}

console.log(media(8, 6)); // 7

// Exercício 7: arrow function e void
const dobro = (n: number): number => n * 2;
console.log(dobro(4)); // 8

function avisar(texto: string): void {
  console.log(texto);
}
avisar("Oi, turma!"); // Oi, turma!

// Exercício 8: template string
const mensagem = `${nome} tem ${idade} anos`;
console.log(mensagem); // Ana tem 20 anos

// Exercício 9: forEach
linguagens.forEach((linguagem) => {
  console.log(linguagem);
});

// Exercício 10: forEach com posição
linguagens.forEach((linguagem, i) => {
  console.log(`Linguagem ${i + 1}: ${linguagem}`);
});
