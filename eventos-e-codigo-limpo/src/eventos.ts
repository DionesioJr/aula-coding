// 1. Clique
const botaoTeste = document.getElementById("btnTeste") as HTMLButtonElement;

function avisar(): void {
  console.log("clicou");
}

botaoTeste.addEventListener("click", avisar);

// 2. Contador de letras
const caixa = document.getElementById("caixa") as HTMLInputElement;
const letras = document.getElementById("letras") as HTMLSpanElement;

caixa.addEventListener("input", (event) => {
  const alvo = event.target as HTMLInputElement;
  letras.textContent = String(alvo.value.length);
});

// 3. Formulário
const formNome = document.getElementById("formNome") as HTMLFormElement;
const entradaNome = document.getElementById("entradaNome") as HTMLInputElement;
const listaNomes = document.getElementById("listaNomes") as HTMLUListElement;

formNome.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = entradaNome.value.trim();
  if (nome !== "") {
    const item = document.createElement("li");
    item.textContent = nome;

    const remover = document.createElement("button");
    remover.className = "remover";
    remover.textContent = "remover";
    item.appendChild(remover);

    listaNomes.appendChild(item);
    entradaNome.value = "";
  }
});

// 4. O botão que para de responder
const painel = document.getElementById("painel") as HTMLDivElement;
const botaoSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

botaoSalvar.addEventListener("click", () => {
  const aviso = document.createElement("p");
  aviso.textContent = "Salvo!";
  painel.appendChild(aviso);
});

// Delegação: um ouvinte só remove qualquer item
listaNomes.addEventListener("click", (event) => {
  const alvo = event.target as HTMLElement;
  if (alvo.matches(".remover")) {
    const item = alvo.closest("li");
    if (item !== null) {
      item.remove();
    }
  }
});
