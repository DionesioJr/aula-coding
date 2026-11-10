const campo = document.getElementById("campo") as HTMLInputElement;
const lista = document.getElementById("lista") as HTMLUListElement;
const total = document.getElementById("total") as HTMLSpanElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;

const techs: string[] = [];

function lerCampo(): string {
  return campo.value.trim();
}

function ehValido(nome: string): boolean {
  if (nome === "") return false;
  if (techs.includes(nome)) return false;
  return true;
}

function criarItem(nome: string): HTMLLIElement {
  const item = document.createElement("li");
  item.textContent = nome;

  const remover = document.createElement("button");
  remover.className = "remover";
  remover.textContent = "remover";
  item.appendChild(remover);

  return item;
}

function atualizarTotal(): void {
  total.textContent = String(techs.length);
}

function adicionar(): void {
  const nome = lerCampo();
  if (!ehValido(nome)) return;

  techs.push(nome);
  lista.appendChild(criarItem(nome));
  atualizarTotal();
  campo.value = "";
}

btnAdd.addEventListener("click", adicionar);

lista.addEventListener("click", (event) => {
  const alvo = event.target as HTMLElement;
  if (!alvo.matches(".remover")) return;

  const item = alvo.closest("li");
  if (item === null) return;

  const posicao = Array.from(lista.children).indexOf(item);
  techs.splice(posicao, 1);
  item.remove();
  atualizarTotal();
});
