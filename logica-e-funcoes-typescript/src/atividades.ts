export function estaParOuImpar(numero: number): string {
  if (numero % 2 === 0) {
    return 'par';
  }
  return 'ímpar';
}

export function maiorDeDois(a: number, b: number): number {
  if (a > b) {
    return a;
  }
  return b;
}

export function maiorDeTres(a: number, b: number, c: number): number {
  let maior = a;
  if (b > maior) {
    maior = b;
  }
  if (c > maior) {
    maior = c;
  }
  return maior;
}

export function calcularFatorial(n: number): number {
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado = resultado * i;
  }
  return resultado;
}

export function ehPrimo(n: number): boolean {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

export function classificarNota(nota: number): string {
  if (nota >= 7) {
    return 'aprovado';
  }
  if (nota >= 5) {
    return 'recuperação';
  }
  return 'reprovado';
}

export function inverterTexto(texto: string): string {
  let invertido = '';
  for (let i = texto.length - 1; i >= 0; i--) {
    invertido = invertido + texto[i];
  }
  return invertido;
}

export function contarVogais(texto: string): number {
  const vogais = 'aeiouAEIOU';
  let total = 0;
  for (let i = 0; i < texto.length; i++) {
    if (vogais.includes(texto[i])) {
      total = total + 1;
    }
  }
  return total;
}
