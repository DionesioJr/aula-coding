import * as atividades from './atividades';

console.log(atividades.estaParOuImpar(4)); // 'par'
console.log(atividades.estaParOuImpar(7)); // 'ímpar'

console.log(atividades.maiorDeDois(10, 3)); // 10
console.log(atividades.maiorDeDois(2, 8)); // 8

console.log(atividades.maiorDeTres(4, 9, 6)); // 9
console.log(atividades.maiorDeTres(1, 2, 3)); // 3

console.log(atividades.calcularFatorial(5)); // 120
console.log(atividades.calcularFatorial(0)); // 1

console.log(atividades.ehPrimo(7)); // true
console.log(atividades.ehPrimo(8)); // false

console.log(atividades.classificarNota(8)); // 'aprovado'
console.log(atividades.classificarNota(6)); // 'recuperação'
console.log(atividades.classificarNota(3)); // 'reprovado'

console.log(atividades.inverterTexto('typescript')); // 'tpircsepyt'

console.log(atividades.contarVogais('Computador')); // 4
