// Exercício 15: nomes que explicam
let diasDeAtraso = 7;
let aprovados: string[] = [];
function calcularMulta(dias: number): number {
  return dias * 2;
}
console.log(calcularMulta(diasDeAtraso)); // 14

// Exercício 16: uma função, uma tarefa
function validar(nomeAluno: string): boolean {
  return nomeAluno !== "";
}

function salvar(nomeAluno: string): void {
  console.log(`Salvando ${nomeAluno}`);
}

function notificar(email: string): void {
  console.log(`Enviando e-mail para ${email}`);
}

function matricular(nomeAluno: string, email: string): void {
  if (validar(nomeAluno)) {
    salvar(nomeAluno);
    notificar(email);
  }
}

matricular("Ana", "ana@email.com");

// Exercício 18: retorno antecipado
function frete(peso: number, uf: string): number {
  if (peso <= 0) return 0;
  if (uf === "MS") return 10;
  if (peso > 30) return 50;
  return 25;
}

console.log(frete(0, "SP")); // 0
console.log(frete(5, "MS")); // 10
console.log(frete(40, "SP")); // 50
console.log(frete(10, "SP")); // 25
console.log(frete(30, "SP")); // 25
console.log(frete(-1, "MS")); // 0

// Exercício 21: sem números mágicos
const NOTA_MINIMA = 7;
const NOTA_RECUPERACAO = 5;

function nivel(nota: number): string {
  if (nota >= NOTA_MINIMA) return "aprovado";
  if (nota >= NOTA_RECUPERACAO) return "recuperação";
  return "reprovado";
}

console.log(nivel(8)); // aprovado
console.log(nivel(6)); // recuperação
console.log(nivel(3)); // reprovado

const TAXA_SERVICO = 1.25;
const preco = 80;
const totalComTaxa = preco * TAXA_SERVICO;
console.log(totalComTaxa); // 100
