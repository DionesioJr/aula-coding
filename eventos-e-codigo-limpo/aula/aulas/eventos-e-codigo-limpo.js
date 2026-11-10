/* =========================================================================
   AULA: Eventos e código limpo (disciplina de Coding)

   Aula 2 de 3 da série "Minhas tecnologias". Para iniciantes: foco na
   lógica, nenhum CSS, exercícios pequenos em sequência. A progressão:
   1. eventos (src/eventos.ts + eventos.html): três telas simples primeiro
      (contador de cliques, nome que aparece em cima, calculadora de IMC),
      depois o objeto do evento, formulário, a armadilha do innerHTML += e
      a delegação;
   2. código limpo (src/limpo.ts): nomes que explicam, uma função uma
      tarefa, retorno antecipado, todos os caminhos retornam e números
      mágicos;
   3. laboratório: refatorar um código bagunçado (src/app.ts) em 5 passos.

   O projeto já começa com o app.ts "que funciona, mas está bagunçado".

   Mesmo formato das outras aulas: cartões roxos de desafio antes de cada
   trecho, e o código existente é AJUSTADO no lugar (replace/insert).

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* ---------------------------------------------------------------------
   Projeto de partida: o resultado da aula anterior (versão bagunçada)
   --------------------------------------------------------------------- */
const INICIAL_INDEX_HTML =
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Minhas tecnologias</title>
</head>
<body>
  <h1>Minhas tecnologias</h1>
  <input id="campo" placeholder="Ex.: Git">
  <button id="btnAdd">Adicionar</button>
  <p><span id="total">0</span> tecnologias</p>
  <ul id="lista"></ul>

  <script src="dist/app.js"></script>
</body>
</html>
`;

const INICIAL_PACKAGE_JSON =
`{
  "name": "minhas-tecnologias",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "check-aula": "node aula/tools/check-sync.js"
  },
  "devDependencies": {
    "typescript": "~5.9.2"
  }
}
`;

const INICIAL_TSCONFIG =
`{
  "compilerOptions": {
    "target": "ES2020",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
`;

/* ---------------------------------------------------------------------
   O app.ts em cada etapa da refatoração. Cada trecho (TOP / FN / TAIL)
   é substituído no lugar pelo seguinte, por isso ficam aqui como
   constantes: o "find" de um passo é exatamente o "code" do anterior.
   --------------------------------------------------------------------- */
const TOP0 =
`const campo = document.getElementById("campo") as HTMLInputElement;
const ul = document.getElementById("lista") as HTMLUListElement;
const t = document.getElementById("total") as HTMLSpanElement;
const b = document.getElementById("btnAdd") as HTMLButtonElement;

let l: string[] = [];
`;

const FN0 =
`function f() {
  const v = campo.value;
  if (v !== "") {
    if (!l.includes(v)) {
      l.push(v);
      ul.innerHTML += \`<li>\${v}
        <button class="x">x</button></li>\`;
      t.textContent = String(l.length);
      const botoes = ul.querySelectorAll(".x");
      const ultimo = botoes[botoes.length - 1];
      ultimo.addEventListener("click", () => {
        const li = ultimo.parentElement as HTMLLIElement;
        li.remove();
        l.splice(l.indexOf(v), 1);
        t.textContent = String(l.length);
      });
    }
  }
}
`;

const TAIL0 =
`b.addEventListener("click", f);
`;

const INICIAL_APP_TS = TOP0 + '\n' + FN0 + '\n' + TAIL0;

/* Passo 1: nomes que explicam */
const TOP1 =
`const campo = document.getElementById("campo") as HTMLInputElement;
const lista = document.getElementById("lista") as HTMLUListElement;
const total = document.getElementById("total") as HTMLSpanElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;

const techs: string[] = [];
`;

const FN1 =
`function adicionar() {
  const nome = campo.value;
  if (nome !== "") {
    if (!techs.includes(nome)) {
      techs.push(nome);
      lista.innerHTML += \`<li>\${nome}
        <button class="x">x</button></li>\`;
      total.textContent = String(techs.length);
      const botoes = lista.querySelectorAll(".x");
      const ultimo = botoes[botoes.length - 1];
      ultimo.addEventListener("click", () => {
        const li = ultimo.parentElement as HTMLLIElement;
        li.remove();
        techs.splice(techs.indexOf(nome), 1);
        total.textContent = String(techs.length);
      });
    }
  }
}
`;

const TAIL1 =
`btnAdd.addEventListener("click", adicionar);
`;

/* Passo 2: retorno antecipado */
const FN2 =
`function adicionar() {
  const nome = campo.value.trim();
  if (nome === "") return;
  if (techs.includes(nome)) return;

  techs.push(nome);
  lista.innerHTML += \`<li>\${nome}
    <button class="x">x</button></li>\`;
  total.textContent = String(techs.length);
  const botoes = lista.querySelectorAll(".x");
  const ultimo = botoes[botoes.length - 1];
  ultimo.addEventListener("click", () => {
    const li = ultimo.parentElement as HTMLLIElement;
    li.remove();
    techs.splice(techs.indexOf(nome), 1);
    total.textContent = String(techs.length);
  });
}
`;

/* Passo 3: createElement no lugar do innerHTML += */
const FN3 =
`function adicionar() {
  const nome = campo.value.trim();
  if (nome === "") return;
  if (techs.includes(nome)) return;

  techs.push(nome);

  const item = document.createElement("li");
  item.textContent = nome;

  const remover = document.createElement("button");
  remover.className = "remover";
  remover.textContent = "remover";
  remover.addEventListener("click", () => {
    item.remove();
    techs.splice(techs.indexOf(nome), 1);
    total.textContent = String(techs.length);
  });
  item.appendChild(remover);

  lista.appendChild(item);
  total.textContent = String(techs.length);
  campo.value = "";
}
`;

/* Passo 4: delegação (o ouvinte de cada botão sai, entra um só na lista) */
const OUVINTE_POR_BOTAO =
`  remover.addEventListener("click", () => {
    item.remove();
    techs.splice(techs.indexOf(nome), 1);
    total.textContent = String(techs.length);
  });
`;
const FN4 = FN3.replace(OUVINTE_POR_BOTAO, '');

const DELEGACAO =
`
lista.addEventListener("click", (event) => {
  const alvo = event.target as HTMLElement;
  if (!alvo.matches(".remover")) return;

  const item = alvo.closest("li");
  if (item === null) return;

  const posicao = Array.from(lista.children).indexOf(item);
  techs.splice(posicao, 1);
  item.remove();
  total.textContent = String(techs.length);
});
`;

/* Passo 5: uma função, uma tarefa */
const FN5 =
`function lerCampo(): string {
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
`;

const INITIAL_ENTRIES = [
  {path:'package.json', type:'file'},
  {path:'tsconfig.json', type:'file'},
  {path:'index.html', type:'file'},
  {path:'src', type:'dir'},
  {path:'src/app.ts', type:'file'},
];
const INITIAL_FILES = {
  'package.json': INICIAL_PACKAGE_JSON,
  'tsconfig.json': INICIAL_TSCONFIG,
  'index.html': INICIAL_INDEX_HTML,
  'src/app.ts': INICIAL_APP_TS,
};

/* O projeto já vem com o TypeScript instalado da aula anterior. */
const DEP_STEP = 0;
const DEPS = [];

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert | replace | clear | delete | rename
   ========================================================================= */
const STEPS = [

/* ----------------------------------------------------------------------
   Preparação
   ---------------------------------------------------------------------- */
{
  part:'Preparação', op:'intro',
  title:'Eventos e código limpo',
  eyebrow:'Coding · TypeScript + DOM · Aula 2 de 3',
  md:
`Na aula passada nasceu a lista **Minhas tecnologias**. Hoje ela ganha **eventos de verdade** e passa por uma **faxina de código**.

1. **Eventos** (\`eventos.html\` + \`src/eventos.ts\`): começa com três telas simples (**contador de cliques**, **nome que aparece em cima** e **calculadora de IMC**) e termina na armadilha do \`innerHTML +=\` e na delegação;
2. **Código limpo** (\`src/limpo.ts\`): nomes claros, uma função uma tarefa, retorno antecipado, sem números mágicos;
3. **Laboratório** (\`src/app.ts\`): o código bagunçado da lista vai ficando limpo, **um passo de cada vez**.

Sem CSS, sem pressa: cada exercício é pequeno.

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'challenge', time:'5 min',
  title:'Revisão rápida: responda sem consultar',
  md:
`Três perguntas da aula passada, **30 segundos cada**:

1. Qual método **cria** um elemento novo?
2. O que acontece se você **esquecer o \`appendChild\`**?
3. Para que serve o **\`as HTMLInputElement\`**?

Quem responder, explica para a turma.`
},
{
  part:'Preparação', op:'note',
  title:'Respostas da revisão',
  md:
`1. **\`document.createElement\`**.
2. O elemento **existe na memória**, mas **não aparece** na página.
3. Informa ao TypeScript o **tipo exato** do elemento. Ele **não verifica nada** quando o programa roda.

> Para rodar o projeto: \`npm install\` (se ainda não fez) e \`npm run dev\` num terminal aberto: ele recompila a cada salvamento. A página abre com dois cliques no \`.html\`.`
},

/* ----------------------------------------------------------------------
   Parte 1: eventos
   ---------------------------------------------------------------------- */
{
  part:'1 · Eventos', op:'note',
  title:'Anatomia do addEventListener',
  md:
`\`\`\`ts
botao.addEventListener("click", () => {
  console.log("clicou");
});
\`\`\`

- **\`botao\`**: quem escuta;
- **\`.addEventListener(\`**: o método;
- **\`"click"\`**: qual evento (sempre um texto, **sem** o \`on\`: é \`"click"\`, não \`"onclick"\`);
- **\`() => { ... }\`**: o que fazer.

> A função **não roda agora**: fica guardada e só roda **quando o evento acontecer**.

Eventos mais usados: \`click\` (clicou), \`input\` (digitou), \`submit\` (enviou o formulário), \`keydown\` (apertou tecla), \`change\` (mudou um select ou checkbox).`
},
{
  part:'1 · Eventos', op:'file', target:'eventos.html',
  title:'Criar eventos.html',
  explain:'Uma página de laboratório, só para experimentar eventos. Começa com <b>um número</b> e <b>um botão</b>.'
},
{
  part:'1 · Eventos', op:'code', file:'eventos.html',
  title:'Um número e um botão',
  explain:'O <code>&lt;script&gt;</code> aponta para <code>dist/eventos.js</code>, gerado pelo TypeScript a partir de <code>src/eventos.ts</code>. Cada elemento que o código vai usar tem um <code>id</code>.',
  code:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Eventos</title>
</head>
<body>
  <h1>Eventos</h1>

  <h2>1. Contador</h2>
  <p id="numero">0</p>
  <button id="btnMais">+ 1</button>

  <script src="dist/eventos.js"></script>
</body>
</html>
`
},
{
  part:'1 · Eventos', op:'file', target:'src/eventos.ts',
  title:'Criar src/eventos.ts',
  explain:'Aqui moram todos os exemplos de eventos desta parte, do mais simples ao mais completo.'
},
{
  part:'1 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 1: contador de cliques',
  md:
`Uma tela com um **número** (começa em \`0\`) e um botão **+ 1**. **Cada clique** aumenta o número.

Pense nas peças:

1. uma **variável** \`cliques\` guarda o valor (começa em \`0\`);
2. o elemento do número e o elemento do botão;
3. \`addEventListener("click", ...)\` no botão: soma 1 na variável **e** mostra na tela.

> A variável guarda o valor, mas **a tela só muda** quando o código escreve no \`textContent\`. Como \`textContent\` só aceita texto, converta o número com \`String(...)\`.`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'O contador',
  explain:'Clique várias vezes: <b>1, 2, 3...</b> A função guardada roda <b>a cada clique</b>. Sem a linha do <code>textContent</code>, o número subiria "por dentro" e você não veria nada.',
  code:
`// 1. Contador
let cliques = 0;
const numero = document.getElementById("numero") as HTMLParagraphElement;
const botaoMais = document.getElementById("btnMais") as HTMLButtonElement;

botaoMais.addEventListener("click", () => {
  cliques = cliques + 1;
  numero.textContent = String(cliques);
});
`
},
{
  part:'1 · Eventos', op:'challenge', time:'5 min',
  title:'Exercício 2: botão Zerar',
  md:
`Acrescente um segundo botão, **Zerar**, que volta o contador a \`0\`.

Quatro passos, na mesma ordem do exercício anterior:

1. o botão no HTML (\`id="btnZerar"\`);
2. selecionar o botão (\`HTMLButtonElement\`);
3. ouvir o \`"click"\`;
4. dentro: \`cliques = 0\` **e** atualizar a tela.

> Se esquecer de atualizar a tela, o número só muda no próximo clique em **+ 1**. Por quê?`
},
{
  part:'1 · Eventos', op:'insert', file:'eventos.html', after:'  <button id="btnMais">+ 1</button>',
  title:'O botão Zerar no HTML',
  explain:'Ao lado do <b>+ 1</b>.',
  code:`  <button id="btnZerar">Zerar</button>
`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'Ouvir o Zerar',
  explain:'Mudar a variável <b>e</b> a tela: são <b>duas</b> ações. A variável é o valor; o <code>textContent</code> é o que se vê.',
  code:
`
const botaoZerar = document.getElementById("btnZerar") as HTMLButtonElement;

botaoZerar.addEventListener("click", () => {
  cliques = 0;
  numero.textContent = String(cliques);
});
`
},
{
  part:'1 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 3: o seu nome aparece em cima',
  md:
`Agora um evento diferente: **\`input\`**, que acontece a **cada tecla** digitada num campo.

Monte uma tela com:

- um **título** em cima, que começa com \`"Digite seu nome"\`;
- um **campo** (\`<input>\`) embaixo.

Conforme a pessoa digita, o **nome aparece no título**, letra por letra.

> Para ler o que está no campo: \`campo.value\`. Para mostrar no título: \`titulo.textContent = ...\`.`
},
{
  part:'1 · Eventos', op:'insert', file:'eventos.html', before:'  <script src="dist/eventos.js"></script>',
  title:'O título e o campo no HTML',
  explain:'O <code>&lt;h3&gt;</code> fica <b>em cima</b> do campo, como pedido. O <code>placeholder</code> é o texto cinza de ajuda dentro do campo.',
  code:
`  <h2>2. Seu nome</h2>
  <h3 id="meuNome">Digite seu nome</h3>
  <input id="campoNome" placeholder="Seu nome">

`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'O evento input',
  explain:'A cada tecla o <code>input</code> dispara e o título copia o que está no campo. Digite devagar e veja o nome aparecer <b>enquanto</b> você escreve.',
  code:
`
// 2. Seu nome
const meuNome = document.getElementById("meuNome") as HTMLHeadingElement;
const campoNome = document.getElementById("campoNome") as HTMLInputElement;

campoNome.addEventListener("input", () => {
  meuNome.textContent = campoNome.value;
});
`
},
{
  part:'1 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 4: uma saudação (e o campo vazio)',
  md:
`Apague tudo o que digitou: o título fica **vazio**. Feio.

Melhore:

1. mostre uma saudação, como \`Olá, Ana!\` (use uma **template string**, com crase, e \`\${ }\` para colocar o nome no meio);
2. se o campo estiver **vazio**, volte a mostrar \`"Digite seu nome"\`;
3. tire os **espaços das pontas** com \`trim()\`.

> Duas situações, uma pergunta: **o nome está vazio?** É um \`if\` / \`else\`.`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`  meuNome.textContent = campoNome.value;
`,
  title:'if / else dentro do evento',
  explain:'<code>trim()</code> faz <code>"   "</code> contar como vazio. O <code>if</code> escolhe <b>qual texto</b> mostrar a cada tecla.',
  code:
`  const nome = campoNome.value.trim();
  if (nome === "") {
    meuNome.textContent = "Digite seu nome";
  } else {
    meuNome.textContent = \`Olá, \${nome}!\`;
  }
`
},
{
  part:'1 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 5: o objeto do evento e as letras',
  md:
`Toda função de evento recebe um **objeto do evento**, que chega sozinho:

- **\`event\`**: o objeto;
- **\`event.target\`**: **quem disparou** o evento (aqui, o campo);
- **\`event.target.value\`**: o texto que está no campo.

Acrescente, embaixo do campo, um contador **"N letras"**, usando o \`event\` em vez de \`campoNome\`.

1. HTML: \`<p><span id="letras">0</span> letras</p>\`;
2. receba o \`event\` na função e leia \`event.target\`;
3. escreva \`value.length\` no \`letras\`.

> \`event.target\` vem como "elemento qualquer". Diga o tipo com \`as HTMLInputElement\` pra acessar o \`.value\`.`
},
{
  part:'1 · Eventos', op:'insert', file:'eventos.html', after:'  <input id="campoNome" placeholder="Seu nome">',
  title:'O contador de letras no HTML',
  explain:'O número fica num <code>&lt;span&gt;</code> com <code>id</code>, pra trocar só ele.',
  code:`  <p><span id="letras">0</span> letras</p>
`
},
{
  part:'1 · Eventos', op:'insert', file:'src/eventos.ts', after:'const campoNome = document.getElementById("campoNome") as HTMLInputElement;',
  title:'Selecionar o span das letras',
  explain:'Mais um elemento com o tipo exato da tag.',
  code:`const letras = document.getElementById("letras") as HTMLSpanElement;
`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`campoNome.addEventListener("input", () => {
`,
  title:'event e event.target',
  explain:'A função agora <b>recebe</b> o <code>event</code>. Aqui <code>campoNome</code> e <code>event.target</code> são o <b>mesmo</b> elemento; com delegação (exercício 14) eles serão <b>diferentes</b>.',
  code:
`campoNome.addEventListener("input", (event) => {
  const alvo = event.target as HTMLInputElement;
  letras.textContent = String(alvo.value.length);

`
},
{
  part:'1 · Eventos', op:'challenge', time:'8 min',
  title:'Exercício 6: calculadora de IMC (ler os campos)',
  md:
`**IMC** (índice de massa corporal) = **peso ÷ (altura × altura)**. Peso em **kg**, altura em **metros**.

Vamos montar a calculadora **em três exercícios pequenos**. O primeiro: só **ler** os dois campos quando clicar em **Calcular**.

1. HTML: dois \`<input>\` (\`campoPeso\`, \`campoAltura\`), um botão **Calcular** e um parágrafo vazio para o resultado;
2. no clique, leia os dois valores e mostre no Console.

> **Pegadinha:** \`campo.value\` é **sempre texto**, mesmo num campo de número. Para fazer conta, converta com **\`Number(campo.value)\`**. Teste: \`"70" + 1\` dá \`"701"\`, mas \`Number("70") + 1\` dá \`71\`.`
},
{
  part:'1 · Eventos', op:'insert', file:'eventos.html', before:'  <script src="dist/eventos.js"></script>',
  title:'Os campos da calculadora',
  explain:'<code>type="number"</code> só aceita números no campo. <code>step="0.01"</code> deixa digitar a altura com vírgula (1.75).',
  code:
`  <h2>3. Calculadora de IMC</h2>
  <input id="campoPeso" type="number" placeholder="Peso em kg">
  <input id="campoAltura" type="number" step="0.01" placeholder="Altura em metros">
  <button id="btnCalcular">Calcular</button>
  <p id="resultadoImc"></p>

`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'Ler e converter com Number',
  explain:'Digite <b>70</b> e <b>1.75</b> e clique: o Console mostra <code>70 1.75</code>, já como <b>números</b>. Se o campo estiver vazio, <code>Number("")</code> vale <b>0</b>.',
  code:
`
// 3. Calculadora de IMC
const campoPeso = document.getElementById("campoPeso") as HTMLInputElement;
const campoAltura = document.getElementById("campoAltura") as HTMLInputElement;
const botaoCalcular = document.getElementById("btnCalcular") as HTMLButtonElement;
const resultadoImc = document.getElementById("resultadoImc") as HTMLParagraphElement;

botaoCalcular.addEventListener("click", () => {
  const peso = Number(campoPeso.value);
  const altura = Number(campoAltura.value);
  console.log(peso, altura);
});
`
},
{
  part:'1 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 7: calcular e mostrar o IMC',
  md:
`Troque o \`console.log\` pela **conta** e mostre o resultado no parágrafo.

\`\`\`
IMC = peso / (altura * altura)
\`\`\`

Mostre com **uma casa decimal**: \`Seu IMC é 22.9\`. O método \`toFixed(1)\` faz isso.

Teste com **70 kg** e **1.75 m**. Deve dar **22.9**.`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`  console.log(peso, altura);
`,
  title:'A conta do IMC',
  explain:'70 ÷ (1,75 × 1,75) = 70 ÷ 3,0625 = <b>22,857...</b>, que <code>toFixed(1)</code> mostra como <b>22.9</b>.',
  code:
`  const imc = peso / (altura * altura);
  resultadoImc.textContent = \`Seu IMC é \${imc.toFixed(1)}\`;
`
},
{
  part:'1 · Eventos', op:'challenge', time:'8 min',
  title:'Exercício 8: classificar o IMC e proteger a conta',
  md:
`Duas melhorias:

**1. Classificar.** Crie \`classificarImc(imc)\`, que **devolve** um texto:

- abaixo de **18.5** → \`"abaixo do peso"\`
- abaixo de **25** → \`"peso normal"\`
- abaixo de **30** → \`"sobrepeso"\`
- o resto → \`"obesidade"\`

> Dica: teste do **menor** para o maior. Se a primeira condição falhou, a próxima já sabe que o IMC é pelo menos 18.5.

**2. Proteger.** O que acontece se clicar em **Calcular** com os campos **vazios**? Conserte: se peso **ou** altura for **0 ou menos**, mostre \`"Digite peso e altura maiores que zero"\` e **pare** (\`return\`).`
},
{
  part:'1 · Eventos', op:'insert', file:'src/eventos.ts', before:'botaoCalcular.addEventListener("click", () => {',
  title:'classificarImc',
  explain:'Cada <code>if</code> já <b>devolve</b> e sai. O último <code>return</code> cobre "obesidade" sem precisar de condição. (Esse padrão tem nome, e é o assunto da parte de código limpo.)',
  code:
`function classificarImc(imc: number): string {
  if (imc < 18.5) return "abaixo do peso";
  if (imc < 25) return "peso normal";
  if (imc < 30) return "sobrepeso";
  return "obesidade";
}

`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`  const imc = peso / (altura * altura);
  resultadoImc.textContent = \`Seu IMC é \${imc.toFixed(1)}\`;
`,
  title:'Proteger a conta e mostrar a classificação',
  explain:'O <code>||</code> quer dizer <b>"ou"</b>. Com campo vazio, <code>Number("")</code> vale 0 e a conta daria <code>Infinity</code>: o <code>if</code> pega antes. O <code>return</code> <b>encerra</b> a função e a conta nem acontece.',
  code:
`  if (peso <= 0 || altura <= 0) {
    resultadoImc.textContent = "Digite peso e altura maiores que zero";
    return;
  }

  const imc = peso / (altura * altura);
  resultadoImc.textContent = \`Seu IMC é \${imc.toFixed(1)} (\${classificarImc(imc)})\`;
`
},
{
  part:'1 · Eventos', op:'challenge', time:'5 min',
  title:'Exercício 9: passar a função, não executar',
  md:
`Dá pra **dar nome** à função do contador e **passá-la** ao \`addEventListener\`.

1. Crie \`somarUm()\`, com o que o clique faz;
2. troque a função solta por **\`somarUm\`**.

Agora a pegadinha. O que muda se você escrever:

\`\`\`ts
botaoMais.addEventListener("click", somarUm());
\`\`\`

(com **parênteses**). Pense: **quando** \`somarUm()\` roda?`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`botaoMais.addEventListener("click", () => {
  cliques = cliques + 1;
  numero.textContent = String(cliques);
});
`,
  title:'Passar a função, sem parênteses',
  explain:'<code>somarUm</code> <b>passa a função</b>; <code>somarUm()</code> <b>executa na hora</b> e passa o resultado. Com parênteses, o contador subiria assim que a página carregasse, e o clique não faria nada.',
  code:
`function somarUm(): void {
  cliques = cliques + 1;
  numero.textContent = String(cliques);
}

botaoMais.addEventListener("click", somarUm);
`
},
{
  part:'1 · Eventos', op:'challenge', time:'8 min',
  title:'Exercício 10: formulário e preventDefault',
  md:
`Num \`<form>\`, apertar **Enter** também envia. Mas o navegador, por padrão, **recarrega a página** ao enviar, e tudo que estava na tela se perde.

\`event.preventDefault()\` **impede** esse comportamento.

Monte uma lista de nomes:

1. HTML: \`<form id="formNome">\` com um \`<input id="entradaNome">\` e um botão **Enviar**, mais uma \`<ul id="listaNomes">\`;
2. ouça o **\`"submit"\`** do formulário;
3. chame \`event.preventDefault()\`, leia o campo com \`.trim()\` e, **se não estiver vazio**, crie um \`<li>\` e coloque na lista;
4. limpe o campo.

> \`trim()\` tira espaços do começo e do fim.`
},
{
  part:'1 · Eventos', op:'insert', file:'eventos.html', before:'  <script src="dist/eventos.js"></script>',
  title:'O formulário no HTML',
  explain:'Um <code>&lt;button&gt;</code> dentro de um <code>&lt;form&gt;</code> já <b>envia</b> o formulário: não precisa de <code>id</code> nem de ouvinte de clique.',
  code:
`  <h2>4. Formulário</h2>
  <form id="formNome">
    <input id="entradaNome" placeholder="Nome">
    <button>Enviar</button>
  </form>
  <ul id="listaNomes"></ul>

`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'submit, preventDefault e trim',
  explain:'Sem o <code>preventDefault()</code>, a página recarregaria e o nome sumiria. Use <b>textContent</b> (não <code>innerHTML</code>) com o que o usuário digitou.',
  code:
`
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
    listaNomes.appendChild(item);
    entradaNome.value = "";
  }
});
`
},
{
  part:'1 · Eventos', op:'note',
  title:'Onde mora o ouvinte?',
  md:
`Quando o navegador lê \`<button id="btnSalvar">\`, ele cria um **objeto** na memória. O \`addEventListener\` **prende** o ouvinte **nesse objeto**.

\`\`\`
HTML (texto)  →  objeto button#btnSalvar  →  ouvinte "click"
\`\`\`

O ouvinte fica guardado **no objeto**, não no texto do HTML. Se o objeto for **trocado por outro**, mesmo que idêntico, o ouvinte **vai embora junto**.

Esta ideia é a chave da próxima armadilha.`
},
{
  part:'1 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 11: faça o botão parar de funcionar',
  md:
`Uma armadilha clássica: **\`innerHTML +=\`**.

Monte um painel com um botão **Salvar**. A cada clique, acrescente \`<p>Salvo!</p>\` **dentro do painel**, usando \`painel.innerHTML += "<p>Salvo!</p>"\`.

\`\`\`html
<div id="painel">
  <button id="btnSalvar">Salvar</button>
</div>
\`\`\`

Clique **duas vezes** no botão.

1. O que acontece no **primeiro** clique?
2. E no **segundo**? Aparece algum erro no Console?`
},
{
  part:'1 · Eventos', op:'insert', file:'eventos.html', before:'  <script src="dist/eventos.js"></script>',
  title:'O painel no HTML',
  explain:'O botão está <b>dentro</b> do painel. Isso é o que faz a armadilha funcionar.',
  code:
`  <h2>5. O botão que para de responder</h2>
  <div id="painel">
    <button id="btnSalvar">Salvar</button>
  </div>

`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'O innerHTML += que derruba o ouvinte',
  explain:'No 1º clique aparece o <code>Salvo!</code>. No 2º, <b>nada acontece</b>, e <b>nenhum erro</b>: o bug é silencioso.',
  code:
`
// 5. O botão que para de responder
const painel = document.getElementById("painel") as HTMLDivElement;
const botaoSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

botaoSalvar.addEventListener("click", () => {
  painel.innerHTML += "<p>Salvo!</p>";
});
`
},
{
  part:'1 · Eventos', op:'note',
  title:'Por que o botão parou?',
  md:
`\`painel.innerHTML += x\` é o mesmo que \`painel.innerHTML = painel.innerHTML + x\`. O navegador:

1. **lê** os filhos como **texto** (ouvinte não vira texto);
2. **junta** o texto antigo com o novo;
3. **apaga todos** os filhos antigos;
4. **recria** nós novos a partir do texto, **sem nenhum ouvinte**.

O botão que está na tela agora é **outro**, igual ao antigo, mas sem o \`click\`. A variável \`botaoSalvar\` ainda aponta para o botão antigo, que nem está mais na página.`
},
{
  part:'1 · Eventos', op:'challenge', time:'4 min',
  title:'Exercício 12: prove que o botão é outro',
  md:
`Dá pra **provar**. Depois do \`+=\`, compare a variável com o botão que está **de verdade** dentro do painel:

\`\`\`ts
console.log(botaoSalvar === painel.querySelector("button"));
\`\`\`

Acrescente essa linha dentro do ouvinte e clique. O que o Console mostra? O que isso quer dizer?`
},
{
  part:'1 · Eventos', op:'insert', file:'src/eventos.ts', after:'  painel.innerHTML += "<p>Salvo!</p>";',
  title:'A prova: false',
  explain:'<b>false</b>: a variável aponta para um botão, a tela mostra outro. Quem tem o ouvinte é o antigo, que sumiu da página.',
  code:`  console.log(botaoSalvar === painel.querySelector("button"));
`
},
{
  part:'1 · Eventos', op:'challenge', time:'5 min',
  title:'Exercício 13: acrescentar sem destruir',
  md:
`Conserte. Para **acrescentar** sem recriar os filhos, crie o elemento e use \`appendChild\`:

1. \`createElement("p")\`;
2. \`textContent = "Salvo!"\`;
3. \`painel.appendChild(...)\`.

Troque as duas linhas do ouvinte. Clique **várias vezes**: agora o botão continua respondendo?

> Regra: para **acrescentar**, \`createElement\` + \`appendChild\`. \`innerHTML\` só para **substituir tudo de propósito**, e nunca com texto digitado pelo usuário.`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`  painel.innerHTML += "<p>Salvo!</p>";
  console.log(botaoSalvar === painel.querySelector("button"));
`,
  title:'createElement + appendChild',
  explain:'Só <b>acrescenta</b> um nó novo; o botão continua <b>o mesmo</b>, com o ouvinte. A cada clique, mais um <code>Salvo!</code>.',
  code:
`  const aviso = document.createElement("p");
  aviso.textContent = "Salvo!";
  painel.appendChild(aviso);
`
},
{
  part:'1 · Eventos', op:'note',
  title:'O evento sobe: borbulhamento',
  md:
`Quando você clica num botão **dentro de um \`li\`** dentro de um \`ul\`, o evento **sobe**, como uma bolha:

\`\`\`
button.remover   ← o clique acontece aqui
  li             ← o evento sobe para o pai
    ul           ← e segue subindo até o document
\`\`\`

Por isso **um ouvinte só no \`ul\`** percebe cliques em **qualquer** \`li\` ou botão dentro dele. Isso se chama **delegação de eventos**:

- **\`event.target\`**: quem foi clicado de verdade (o botão);
- **\`alvo.matches(".remover")\`**: o clique foi num botão remover?
- **\`alvo.closest("li")\`**: sobe até o \`li\` mais próximo.

Funciona até para itens **criados depois**, porque o ouvinte está no \`ul\`, que nunca é recriado.`
},
{
  part:'1 · Eventos', op:'challenge', time:'10 min',
  title:'Exercício 14: remover com um ouvinte só',
  md:
`Volte à **lista de nomes** (exercício 10). Cada nome deve ter um botão **remover**, e **um único ouvinte** na lista cuida de todos.

Dois passos:

1. ao criar o item, crie também um \`<button>\` com a classe \`remover\` e coloque **dentro** do \`li\`;
2. ouça o \`"click"\` na **\`listaNomes\`**: se o alvo for \`.remover\`, ache o \`li\` com \`closest("li")\` e chame \`remove()\`.

Depois **adicione um nome novo** e remova: funciona também para os itens criados **depois**?`
},
{
  part:'1 · Eventos', op:'replace', file:'src/eventos.ts',
  find:`    item.textContent = nome;
    listaNomes.appendChild(item);
`,
  title:'O botão remover em cada item',
  explain:'Note: <b>nenhum</b> ouvinte é ligado a este botão. A classe <code>remover</code> serve só pra reconhecê-lo depois.',
  code:
`    item.textContent = nome;

    const remover = document.createElement("button");
    remover.className = "remover";
    remover.textContent = "remover";
    item.appendChild(remover);

    listaNomes.appendChild(item);
`
},
{
  part:'1 · Eventos', op:'code', file:'src/eventos.ts',
  title:'Delegação de eventos',
  explain:'Um ouvinte, todos os itens. <code>matches</code> confere se o clique foi num <code>.remover</code>; <code>closest</code> acha o <code>li</code>; o teste de <code>null</code> garante que ele existe. Itens criados depois também funcionam.',
  code:
`
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
`
},

/* ----------------------------------------------------------------------
   Parte 2: código limpo
   ---------------------------------------------------------------------- */
{
  part:'2 · Código limpo', op:'note',
  title:'Código é lido mais do que escrito',
  md:
`Quem lê o seu código:

- **você no futuro**: daqui a 3 meses, sem lembrar de nada;
- **a equipe**: quem vai manter e corrigir;
- **quem avalia**: recrutador ou professor lendo o seu portfólio.

> **Código limpo é código que outra pessoa entende sem precisar perguntar pra você.**

Os próximos exercícios são **funções pequenas e sem página**: você roda no terminal e vê o resultado. Quatro hábitos:

1. nomes que explicam;
2. uma função, uma tarefa;
3. retorno antecipado (early return);
4. sem números mágicos.`
},
{
  part:'2 · Código limpo', op:'file', target:'src/limpo.ts',
  title:'Criar src/limpo.ts',
  explain:'Os exercícios de código limpo ficam aqui. Rode com <code>npm run limpo</code>.'
},
{
  part:'2 · Código limpo', op:'replace', file:'package.json',
  find:`    "dev": "tsc --watch",
`,
  title:'Um script para rodar o limpo.ts',
  explain:'<code>npm run limpo</code> compila e executa o <code>src/limpo.ts</code> no terminal.',
  code:
`    "dev": "tsc --watch",
    "limpo": "tsc && node dist/limpo.js",
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'5 min',
  title:'Exercício 15: nomes que explicam',
  md:
`Este código funciona, mas **ninguém entende**:

\`\`\`ts
let d = 7;
let lst: string[] = [];
function calc(x: number): number {
  return x * 2;
}
console.log(calc(d));
\`\`\`

Reescreva com **nomes que dizem o que é e para que serve**. O número 7 são **dias de atraso** e a função calcula uma **multa** (2 por dia).

> **Variáveis:** substantivos (\`aprovados\`). **Funções:** verbos (\`calcularMulta\`). **Booleanos:** perguntas (\`ehValido\`).`
},
{
  part:'2 · Código limpo', op:'code', file:'src/limpo.ts',
  title:'Antes: o código ilegível',
  explain:'Quem lê precisa <b>adivinhar</b> o que é cada coisa. O que é <code>d</code>? O que <code>calc</code> calcula?',
  code:
`let d = 7;
let lst: string[] = [];
function calc(x: number): number {
  return x * 2;
}
console.log(calc(d));
`
},
{
  part:'2 · Código limpo', op:'replace', file:'src/limpo.ts',
  find:`let d = 7;
let lst: string[] = [];
function calc(x: number): number {
  return x * 2;
}
console.log(calc(d));
`,
  title:'Depois: o nome já diz tudo',
  explain:'Mesmo comportamento, <b>leitura muito melhor</b>. Sem comentário nenhum, dá pra saber o que o código faz.',
  code:
`// Exercício 15: nomes que explicam
let diasDeAtraso = 7;
let aprovados: string[] = [];
function calcularMulta(dias: number): number {
  return dias * 2;
}
console.log(calcularMulta(diasDeAtraso)); // 14
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'8 min',
  title:'Exercício 16: uma função, uma tarefa',
  md:
`Se, para descrever uma função, você precisa usar **"e"**, ela faz coisas demais.

Esta função **valida**, **salva** e **avisa**: três verbos ligados por "e".

\`\`\`ts
function matricular(nomeAluno: string, email: string): void {
  if (nomeAluno === "") {
    console.log("Nome vazio");
    return;
  }
  console.log("Salvando " + nomeAluno);
  console.log("Enviando e-mail para " + email);
}
\`\`\`

Divida em **três funções**: \`validar\`, \`salvar\` e \`notificar\`. A \`matricular\` passa a só **coordenar** as três.

> Isso é o **Princípio da Responsabilidade Única**: cada função tem **um único motivo para mudar**. Mudou o texto do e-mail? Mexe só em \`notificar\`.`
},
{
  part:'2 · Código limpo', op:'code', file:'src/limpo.ts',
  title:'Antes: tudo junto',
  explain:'Três motivos para mudar no mesmo lugar: a regra de validação, onde se salva e o texto do e-mail.',
  code:
`
function matricular(nomeAluno: string, email: string): void {
  if (nomeAluno === "") {
    console.log("Nome vazio");
    return;
  }
  console.log("Salvando " + nomeAluno);
  console.log("Enviando e-mail para " + email);
}
`
},
{
  part:'2 · Código limpo', op:'replace', file:'src/limpo.ts',
  find:`
function matricular(nomeAluno: string, email: string): void {
  if (nomeAluno === "") {
    console.log("Nome vazio");
    return;
  }
  console.log("Salvando " + nomeAluno);
  console.log("Enviando e-mail para " + email);
}
`,
  title:'Depois: três funções e um coordenador',
  explain:'<code>matricular</code> agora <b>lê como um índice</b>: valida, salva, notifica. Cada função se testa sozinha.',
  code:
`
// Exercício 16: uma função, uma tarefa
function validar(nomeAluno: string): boolean {
  return nomeAluno !== "";
}

function salvar(nomeAluno: string): void {
  console.log(\`Salvando \${nomeAluno}\`);
}

function notificar(email: string): void {
  console.log(\`Enviando e-mail para \${email}\`);
}

function matricular(nomeAluno: string, email: string): void {
  if (validar(nomeAluno)) {
    salvar(nomeAluno);
    notificar(email);
  }
}

matricular("Ana", "ana@email.com");
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'8 min',
  title:'Exercício 17: ifs dentro de ifs',
  md:
`Quanto custa o frete de **40 kg para SP**? Tente descobrir **lendo**:

\`\`\`ts
function frete(peso: number, uf: string): number {
  if (peso > 0) {
    if (uf !== "MS") {
      if (peso > 30) {
        return 50;
      }
      return 25;
    }
    return 10;
  }
  return 0;
}
\`\`\`

Repare como **demora**: três condições na cabeça ao mesmo tempo, e o código "anda" pra direita (formato de **seta**).`
},
{
  part:'2 · Código limpo', op:'code', file:'src/limpo.ts',
  title:'Antes: o formato de seta',
  explain:'Difícil de ler e fácil de errar: uma chave fora do lugar muda tudo. O resultado de <code>frete(40, "SP")</code> é <b>50</b>.',
  code:
`
function frete(peso: number, uf: string): number {
  if (peso > 0) {
    if (uf !== "MS") {
      if (peso > 30) {
        return 50;
      }
      return 25;
    }
    return 10;
  }
  return 0;
}

console.log(frete(40, "SP")); // 50
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'6 min',
  title:'Exercício 18: retorno antecipado',
  md:
`**Early return** (cláusula de guarda): trate os **casos especiais primeiro** e **saia** com \`return\`. O caminho principal fica **no fim**, sem \`else\`, sem pirâmide.

Reescreva o \`frete\` com **quatro linhas**, na ordem:

1. peso zero ou negativo → \`0\`;
2. UF \`"MS"\` → \`10\`;
3. peso acima de 30 → \`50\`;
4. o resto → \`25\`.

Confira que os resultados são **os mesmos**.`
},
{
  part:'2 · Código limpo', op:'replace', file:'src/limpo.ts',
  find:`function frete(peso: number, uf: string): number {
  if (peso > 0) {
    if (uf !== "MS") {
      if (peso > 30) {
        return 50;
      }
      return 25;
    }
    return 10;
  }
  return 0;
}
`,
  title:'Cada if guarda a entrada da função',
  explain:'Leia de cima pra baixo: o <b>primeiro</b> <code>return</code> que acontecer encerra a função. O último <code>return</code> garante que <b>todo caminho devolve</b> um <code>number</code>.',
  code:
`// Exercício 18: retorno antecipado
function frete(peso: number, uf: string): number {
  if (peso <= 0) return 0;
  if (uf === "MS") return 10;
  if (peso > 30) return 50;
  return 25;
}
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'6 min',
  title:'Exercício 19: teste de mesa',
  md:
`**Teste de mesa:** siga o código **com o dedo**, linha por linha, e escreva o resultado **antes** de rodar.

Qual \`if\` decide em cada chamada?

- \`frete(0, "SP")\`
- \`frete(5, "MS")\`
- \`frete(40, "SP")\`
- \`frete(10, "SP")\`
- \`frete(30, "SP")\`
- \`frete(-1, "MS")\`

Depois rode as seis e confira.

> Cuidado com \`frete(30, "SP")\`: **30 não é maior que 30**.`
},
{
  part:'2 · Código limpo', op:'replace', file:'src/limpo.ts',
  find:`console.log(frete(40, "SP")); // 50
`,
  title:'Conferindo as seis chamadas',
  explain:'<code>frete(-1, "MS")</code> dá <b>0</b>: o primeiro <code>if</code> vence, mesmo sendo "MS". A <b>ordem</b> dos <code>if</code> importa.',
  code:
`console.log(frete(0, "SP")); // 0
console.log(frete(5, "MS")); // 10
console.log(frete(40, "SP")); // 50
console.log(frete(10, "SP")); // 25
console.log(frete(30, "SP")); // 25
console.log(frete(-1, "MS")); // 0
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'7 min',
  title:'Exercício 20: todos os caminhos retornam?',
  md:
`Escreva \`nivel(nota)\`, que devolve um \`string\`:

- nota **7 ou mais** → \`"aprovado"\`;
- nota **5 ou mais** → \`"recuperação"\`.

**Só isso, por enquanto**: escreva com dois \`if\` e dois \`return\`. Deixe **de fora** o caso "reprovado".

1. O TypeScript aceita?
2. O que **nota 3** devolveria?

Depois conserte.`
},
{
  part:'2 · Código limpo', op:'code', file:'src/limpo.ts',
  title:'Faltou um caminho',
  explain:'O <code>tsc</code> acusa: <b>Function lacks ending return statement and return type does not include \'undefined\'</b>. Com nota 3, nenhum <code>return</code> acontece. O TypeScript <b>te protege</b> de esquecer um caso.',
  code:
`
function nivel(nota: number): string {
  if (nota >= 7) return "aprovado";
  if (nota >= 5) return "recuperação";
}
`
},
{
  part:'2 · Código limpo', op:'insert', file:'src/limpo.ts', after:'  if (nota >= 5) return "recuperação";',
  title:'O return final cobre o que sobrou',
  explain:'O <code>return</code> do fim pega <b>todos os casos que sobraram</b> (nota menor que 5). Por isso o padrão <i>early return</i> sempre termina com um <code>return</code> final.',
  code:`  return "reprovado";
`
},
{
  part:'2 · Código limpo', op:'challenge', time:'6 min',
  title:'Exercício 21: sem números mágicos',
  md:
`De onde veio o **7**? E o **5**? E se a escola mudar a nota mínima?

Dê **nome** a cada número, em **constantes** (por convenção, em MAIÚSCULAS):

\`\`\`ts
const NOTA_MINIMA = 7;
\`\`\`

1. use \`NOTA_MINIMA\` (7) e \`NOTA_RECUPERACAO\` (5) no \`nivel\`;
2. calcule um preço com **taxa de serviço** de \`1.25\` (+25%) usando uma constante \`TAXA_SERVICO\`.

> Mudou a regra? Troca em **um lugar só**, e o nome explica o número. E código repetido? Vira função: é o **DRY** (*Don't Repeat Yourself*).`
},
{
  part:'2 · Código limpo', op:'insert', file:'src/limpo.ts', before:'function nivel(nota: number): string {',
  title:'As constantes das notas',
  explain:'Constantes <b>antes</b> da função que as usa. O nome em maiúsculas avisa: este valor <b>não muda</b>.',
  code:
`// Exercício 21: sem números mágicos
const NOTA_MINIMA = 7;
const NOTA_RECUPERACAO = 5;

`
},
{
  part:'2 · Código limpo', op:'replace', file:'src/limpo.ts',
  find:`  if (nota >= 7) return "aprovado";
  if (nota >= 5) return "recuperação";
`,
  title:'Usar as constantes no nivel',
  explain:'A regra agora <b>se lê</b>: "nota maior ou igual à nota mínima".',
  code:
`  if (nota >= NOTA_MINIMA) return "aprovado";
  if (nota >= NOTA_RECUPERACAO) return "recuperação";
`
},
{
  part:'2 · Código limpo', op:'code', file:'src/limpo.ts',
  title:'Testar o nivel e a taxa de serviço',
  explain:'Uma nota em cada faixa. A taxa vira <code>TAXA_SERVICO</code>: 80 × 1,25 = <b>100</b>.',
  code:
`
console.log(nivel(8)); // aprovado
console.log(nivel(6)); // recuperação
console.log(nivel(3)); // reprovado

const TAXA_SERVICO = 1.25;
const preco = 80;
const totalComTaxa = preco * TAXA_SERVICO;
console.log(totalComTaxa); // 100
`
},

/* ----------------------------------------------------------------------
   Laboratório: refatorar o app.ts
   ---------------------------------------------------------------------- */
{
  part:'Laboratório', op:'challenge', time:'10 min',
  title:'Laboratório: o código bagunçado',
  md:
`Este é o \`src/app.ts\` da lista **Minhas tecnologias** (aberto ao lado). **Funciona**, mas está bagunçado.

**Antes de mexer**, em duplas: ache **5 problemas**. Dicas:

1. nomes sem sentido;
2. \`if\` dentro de \`if\`;
3. \`innerHTML +=\` (derruba o ouvinte dos botões: **adicione 3 itens e tente remover o primeiro**);
4. texto do usuário dentro de \`innerHTML\`;
5. uma função faz tudo.

Vamos consertar **um problema por vez**, sempre conferindo que a lista continua funcionando.`
},
{
  part:'Laboratório', op:'note',
  title:'Os problemas, um a um',
  md:
`1. **Nomes:** \`l\`, \`f\`, \`v\`, \`t\`, \`b\`, \`ul\`, \`x\` não dizem nada.
2. **ifs aninhados:** formato de seta.
3. **\`innerHTML +=\`**: ao adicionar um item, **recria** os anteriores e **perde o \`click\`** do remover deles. Só o último botão funciona.
4. **Texto do usuário no \`innerHTML\`**: se alguém digitar \`<b>oi</b>\`, o navegador interpreta como HTML.
5. **Uma função só** lê, valida, cria, remove e atualiza a tela.

> A meta: **nomes claros**, **uma tarefa por função**, **early return**, **createElement** no lugar do \`innerHTML +=\` e **delegação** no remover.`
},
{
  part:'Laboratório', op:'challenge', time:'6 min',
  title:'Passo 1: nomes que explicam',
  md:
`Troque os nomes:

- \`ul\` → \`lista\`
- \`t\` → \`total\`
- \`b\` → \`btnAdd\`
- \`l\` → \`techs\`
- \`f\` → \`adicionar\`
- \`v\` → \`nome\`

Primeiro os **elementos** e o array, depois a **função**, por fim a **última linha**. Teste depois de cada um.`
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:TOP0,
  title:'Nomes dos elementos e do array',
  explain:'<code>campo</code> já estava bom e fica. O array de nomes agora é <code>techs</code>: uma lista de tecnologias.',
  code:TOP1
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:FN0,
  title:'Nomes dentro da função',
  explain:'Mesma lógica, nomes novos: <code>f</code> virou <code>adicionar</code>, <code>v</code> virou <code>nome</code>. O comportamento <b>não mudou</b>.',
  code:FN1
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:TAIL0,
  title:'A última linha',
  explain:'Agora o <code>btnAdd</code> chama o <code>adicionar</code>: lê-se quase como uma frase.',
  code:TAIL1
},
{
  part:'Laboratório', op:'challenge', time:'6 min',
  title:'Passo 2: retorno antecipado',
  md:
`Desfaça a **pirâmide** de \`if\`:

1. leia o campo **já com \`trim()\`**;
2. se estiver vazio, \`return\`;
3. se já existir em \`techs\`, \`return\`;
4. o resto da função fica **sem aninhamento**.

> Para **dentro de uma função que não devolve nada**, \`return;\` simplesmente **sai**.`
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:FN1,
  title:'Early return',
  explain:'Os <b>casos especiais saem primeiro</b>; o resto está sem aninhamento e o <code>trim()</code> entrou de graça. Compare com o passo anterior: a mesma lógica, três níveis a menos.',
  code:FN2
},
{
  part:'Laboratório', op:'challenge', time:'8 min',
  title:'Passo 3: createElement no lugar do innerHTML +=',
  md:
`Agora o **vilão**: o \`innerHTML +=\`. Substitua por:

1. \`createElement("li")\` e \`textContent = nome\`;
2. um \`createElement("button")\` com a classe \`remover\` e o texto \`remover\`, **dentro** do \`li\`;
3. o \`click\` desse botão remove o item (e tira de \`techs\`, e atualiza o total);
4. \`lista.appendChild(item)\`.

Adicione 3 itens e remova **o primeiro**: agora funciona?

> Bônus: o nome do usuário agora entra por \`textContent\`, que é **seguro**.`
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:FN2,
  title:'createElement + appendChild',
  explain:'Chega de recriar a lista inteira: cada item é <b>criado uma vez</b> e fica. Os botões antigos <b>mantêm</b> o ouvinte, e o texto do usuário passa por <code>textContent</code>.',
  code:FN3
},
{
  part:'Laboratório', op:'challenge', time:'8 min',
  title:'Passo 4: um ouvinte só (delegação)',
  md:
`Cada botão tem o **seu** ouvinte. Funciona, mas dá pra ficar mais simples: **um ouvinte só, na lista**.

1. **apague** o \`addEventListener\` do botão \`remover\`;
2. no fim do arquivo, ouça o \`"click"\` na \`lista\`;
3. se o alvo for \`.remover\`, ache o \`li\` com \`closest("li")\`;
4. descubra a **posição** do item na lista com \`Array.from(lista.children).indexOf(item)\`;
5. tire de \`techs\` com \`splice(posicao, 1)\`, remova o \`li\` e atualize o total.

> A posição na tela e no array é a mesma, porque os dois são alterados sempre juntos.`
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:OUVINTE_POR_BOTAO,
  title:'Sai o ouvinte de cada botão',
  explain:'Cada botão agora é só um botão com a classe <code>remover</code>: quem escuta é a lista.'
},
{
  part:'Laboratório', op:'code', file:'src/app.ts',
  title:'Um ouvinte na lista',
  explain:'Um só ouvinte cuida de <b>todos</b> os itens, antigos e futuros. <code>Array.from(lista.children)</code> transforma os filhos numa lista comum para usar o <code>indexOf</code>.',
  code:DELEGACAO
},
{
  part:'Laboratório', op:'challenge', time:'10 min',
  title:'Passo 5: uma função, uma tarefa',
  md:
`A \`adicionar\` ainda faz **muita coisa**. Quebre em funções pequenas, cada uma com **um motivo para mudar**:

- \`lerCampo(): string\`: devolve o texto do campo, sem espaços nas pontas;
- \`ehValido(nome: string): boolean\`: \`false\` se vazio ou repetido (use **early return**);
- \`criarItem(nome: string): HTMLLIElement\`: monta o \`li\` com o botão remover e **devolve**;
- \`atualizarTotal(): void\`: escreve o total na tela;
- \`adicionar(): void\`: só **coordena** as outras.

Depois use \`atualizarTotal()\` também no ouvinte da lista.`
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:FN4,
  title:'Cinco funções, cada uma com uma tarefa',
  explain:'<code>adicionar</code> agora <b>lê como um roteiro</b>: lê o campo, valida, guarda, desenha, atualiza o total, limpa o campo. Mudou a regra de validação? Mexe só em <code>ehValido</code>.',
  code:FN5
},
{
  part:'Laboratório', op:'replace', file:'src/app.ts',
  find:`  item.remove();
  total.textContent = String(techs.length);
`,
  title:'Reaproveitar atualizarTotal',
  explain:'O ouvinte da lista usa a <b>mesma</b> função que o <code>adicionar</code>. Sem repetir código (DRY). <b>Faxina completa!</b>',
  code:
`  item.remove();
  atualizarTotal();
`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Eventos e código limpo',
  md:
`## Conceitos de hoje
- **\`addEventListener(tipo, funcao)\`**: a função roda a cada evento. Passe **sem parênteses**.
- **\`event.target\`**: quem disparou. **\`preventDefault()\`**: não recarregar a página no \`submit\`.
- **\`innerHTML +=\`** recria os filhos e **perde os ouvintes**. Prefira \`createElement\` + \`appendChild\`.
- **Delegação**: um ouvinte no pai cuida de todos os filhos (\`matches\`, \`closest\`).
- **Código limpo:** nomes claros, **uma função uma tarefa** (SRP), **early return**, sem números mágicos.

## Exercícios pra casa
1. **Contador de letras com limite:** o contador fica **vermelho** (ou mostra um aviso) quando passar de 20 letras.
2. **Maiúscula:** ao enviar um nome, guarde-o com a primeira letra maiúscula (crie uma função \`capitalizar\`).
3. **Frete novo:** inclua a regra "peso acima de 100 kg → 120" no \`frete\`, **sem criar um novo nível de \`if\`**.
4. **Faxina no seu projeto:** reveja o seu código de aulas anteriores e aplique **um** hábito de hoje.

> Faça **commit e push**: na próxima aula este projeto vai para a nuvem.`
},
];

global.AULA_EVENTOS_E_CODIGO_LIMPO = {
  meta: {
    titulo:    'Eventos e código limpo',
    projeto:   'minhas-tecnologias',
    subtitulo: 'Coding · TypeScript + DOM',
    vazio:     'Projeto vazio.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
