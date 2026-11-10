const lista = document.getElementById("lista") as HTMLUListElement;
const total = document.getElementById("total") as HTMLSpanElement;
const campo = document.getElementById("campo") as HTMLInputElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
console.log(lista);

function criarItem(nome: string): void {
  const li = document.createElement("li");
  const texto = document.createElement("span");
  texto.textContent = nome;
  texto.addEventListener("click", () => {
    li.classList.toggle("feito");
  });
  li.appendChild(texto);

  const remover = document.createElement("button");
  remover.textContent = "remover";
  remover.addEventListener("click", () => {
    li.remove();
    techs.splice(techs.indexOf(nome), 1);
    total.textContent = String(lista.children.length);
  });
  li.appendChild(remover);

  lista.appendChild(li);
  total.textContent = String(lista.children.length);
}

const techs: string[] = ["Git", "TypeScript"];

techs.forEach((nome) => criarItem(nome));

btnAdd.addEventListener("click", () => {
  const nome = campo.value.trim();
  if (nome !== "") {
    if (!techs.includes(nome)) {
      techs.push(nome);
      criarItem(nome);
      campo.value = "";
    }
  }
});
