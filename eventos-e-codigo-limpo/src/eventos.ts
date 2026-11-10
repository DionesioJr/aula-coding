// 1. Contador
let cliques = 0;
const numero = document.getElementById("numero") as HTMLParagraphElement;
const botaoMais = document.getElementById("btnMais") as HTMLButtonElement;

function somarUm(): void {
  cliques = cliques + 1;
  numero.textContent = String(cliques);
}

botaoMais.addEventListener("click", somarUm);

const botaoZerar = document.getElementById("btnZerar") as HTMLButtonElement;

botaoZerar.addEventListener("click", () => {
  cliques = 0;
  numero.textContent = String(cliques);
});

// 2. Seu nome
const meuNome = document.getElementById("meuNome") as HTMLHeadingElement;
const campoNome = document.getElementById("campoNome") as HTMLInputElement;
const letras = document.getElementById("letras") as HTMLSpanElement;

campoNome.addEventListener("input", (event) => {
  const alvo = event.target as HTMLInputElement;
  letras.textContent = String(alvo.value.length);

  const nome = campoNome.value.trim();
  if (nome === "") {
    meuNome.textContent = "Digite seu nome";
  } else {
    meuNome.textContent = `Olá, ${nome}!`;
  }
});

// 3. Calculadora de IMC
const campoPeso = document.getElementById("campoPeso") as HTMLInputElement;
const campoAltura = document.getElementById("campoAltura") as HTMLInputElement;
const botaoCalcular = document.getElementById("btnCalcular") as HTMLButtonElement;
const resultadoImc = document.getElementById("resultadoImc") as HTMLParagraphElement;

function classificarImc(imc: number): string {
  if (imc < 18.5) return "abaixo do peso";
  if (imc < 25) return "peso normal";
  if (imc < 30) return "sobrepeso";
  return "obesidade";
}

botaoCalcular.addEventListener("click", () => {
  const peso = Number(campoPeso.value);
  const altura = Number(campoAltura.value);
  if (peso <= 0 || altura <= 0) {
    resultadoImc.textContent = "Digite peso e altura maiores que zero";
    return;
  }

  const imc = peso / (altura * altura);
  resultadoImc.textContent = `Seu IMC é ${imc.toFixed(1)} (${classificarImc(imc)})`;
});

// 4. Formulário
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

// 5. O botão que para de responder
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
