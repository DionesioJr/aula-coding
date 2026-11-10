// Gerado pela IA: "valide um e-mail"
function ehEmailValido(email: string): boolean {
  const partes = email.split("@");
  if (partes.length !== 2) return false;
  if (partes[0] === "") return false;
  if (!partes[1].includes(".")) return false;
  return true;
}

console.assert(ehEmailValido("ana@email.com") === true, "e-mail válido");
console.assert(ehEmailValido("") === false, "vazio");
console.assert(ehEmailValido("ana") === false, "sem @");
console.assert(ehEmailValido("@email.com") === false, "sem nome");
console.assert(ehEmailValido("ana@") === false, "sem domínio");
console.assert(ehEmailValido("ana@email") === false, "sem ponto");
console.assert(ehEmailValido("a@@b.com") === false, "dois @");
