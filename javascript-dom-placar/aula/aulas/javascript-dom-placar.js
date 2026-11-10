/* =========================================================================
   AULA: JavaScript e DOM, da variável ao placar (disciplina de Coding)

   JavaScript puro, sem bibliotecas e sem npm. A turma sai do zero e termina
   com um placar de futebol funcionando no navegador. A progressão:
   1. variáveis, tipos, operadores, funções e if/else (treino.js, no Node);
   2. o DOM: getElementById e textContent (index.html + app.js);
   3. tempo: setInterval, o contador que anda sozinho;
   4. eventos: addEventListener, reagir ao clique;
   5. desafio em três níveis: o placar (placar.html + placar.js).

   Mesmo formato das outras aulas: cartões roxos de desafio antes de cada
   trecho, e o código existente é AJUSTADO no lugar (replace/insert).

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

const INITIAL_ENTRIES = [];
const INITIAL_FILES = {};

/* Sem bibliotecas: só o navegador (e o Node pra rodar o treino.js). */
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
  title:'JavaScript e DOM: da variável ao placar',
  eyebrow:'Coding · JavaScript no navegador',
  md:
`Entender, linha por linha, **como o código muda a página sozinho**, e terminar construindo um **placar de futebol**.

No caminho, 13 exercícios curtos:

1. **Fundamentos** (\`treino.js\`): variáveis, tipos, operadores, funções, \`if\`/\`else\`;
2. **DOM** (\`index.html\` + \`app.js\`): encontrar e mudar um elemento;
3. **Tempo**: \`setInterval\`, um contador que anda sozinho;
4. **Eventos**: \`addEventListener\`, reagir ao clique;
5. **Desafio** (\`placar.html\` + \`placar.js\`): o placar, em três níveis.

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'note',
  title:'Três linguagens, três papéis',
  md:
`Uma página web é feita de três linguagens, cada uma com um papel:

- **HTML**, a estrutura: o que existe na página (títulos, textos, botões). É o **esqueleto**.
- **CSS**, a aparência: cores, tamanhos, posições. É a **roupa**.
- **JavaScript**, o comportamento: contar, reagir a cliques, mudar a tela. São os **músculos**.

Hoje o foco é o **JavaScript** e a **lógica**. O HTML será mínimo e **não usamos CSS**: a página fica simples de propósito.`
},
{
  part:'Preparação', op:'note',
  title:'Como testar',
  md:
`A aula tem dois tipos de arquivo:

- **\`treino.js\`**: só lógica, sem página. Rode no terminal com \`node treino.js\` (ou cole no **Console** do navegador, **F12**).
- **\`.html\` + \`.js\`**: o código que mexe na página. Abra o \`.html\` no navegador (dois cliques) e use o **Console** pra ver erros e \`console.log\`.

Mudou o código? Salve e aperte **F5** pra recarregar.

> Todo exercício começa num **cartão roxo**: tente sozinho antes de ver a solução sendo digitada.`
},

/* ----------------------------------------------------------------------
   Parte 1: variáveis e tipos
   ---------------------------------------------------------------------- */
{
  part:'1 · Variáveis e tipos', op:'file', target:'treino.js',
  title:'Criar treino.js',
  explain:'Primeiro a lógica, sem página nenhuma. Tudo que aparecer vai pro terminal com <code>console.log</code>.'
},
{
  part:'1 · Variáveis e tipos', op:'challenge', time:'3 min',
  title:'Exercício 1: caixas com nome',
  md:
`Uma **variável** é uma caixa com nome que guarda um valor.

- \`let\`: o valor **pode mudar**;
- \`const\`: o valor é **fixo**.

Escreva:

1. uma variável \`contador\` começando em \`0\`, que depois passa a valer \`5\`;
2. uma constante \`time\` com o texto \`"Brasil"\`;
3. mostre as duas no terminal.

Depois tente \`time = "Argentina";\`. O que acontece?`
},
{
  part:'1 · Variáveis e tipos', op:'code', file:'treino.js',
  title:'let e const',
  explain:'<code>let</code> aceita nova atribuição. Tentar trocar uma <code>const</code> dá <b>TypeError: Assignment to constant variable</b>. Texto vai sempre entre aspas.',
  code:
`// Exercício 1: variáveis
let contador = 0;
contador = 5;
const time = "Brasil";

console.log(contador); // 5
console.log(time); // Brasil
`
},
{
  part:'1 · Variáveis e tipos', op:'challenge', time:'3 min',
  title:'Exercício 2: tipos de dados',
  md:
`Todo valor tem um **tipo**. O operador \`typeof\` mostra qual é.

Mostre no terminal o \`typeof\` de:

1. o número \`10\`;
2. o texto \`"Preparado ?"\`;
3. o valor \`true\`.

No placar, os gols são **number**, o nome dos times é **string** e "o jogo acabou?" é **boolean**.`
},
{
  part:'1 · Variáveis e tipos', op:'code', file:'treino.js',
  title:'typeof',
  explain:'<code>number</code> para contas, <code>string</code> para texto, <code>boolean</code> para verdadeiro ou falso (<code>true</code>/<code>false</code>, sem aspas).',
  code:
`
// Exercício 2: tipos
console.log(typeof 10); // number
console.log(typeof "Preparado ?"); // string
console.log(typeof true); // boolean
`
},
{
  part:'1 · Variáveis e tipos', op:'challenge', time:'3 min',
  title:'Exercício 3: somar 1 de três jeitos',
  md:
`Existem três formas de somar 1 ao valor que já está na variável:

\`\`\`js
pontos = pontos + 1;
pontos += 1;
pontos++;
\`\`\`

Crie \`pontos\` valendo \`5\`, aplique **as três**, uma depois da outra, e mostre o resultado. Qual número aparece?`
},
{
  part:'1 · Variáveis e tipos', op:'code', file:'treino.js',
  title:'Operadores de atribuição',
  explain:'As três linhas fazem a mesma coisa: somam 1 ao que já estava na caixa. 5 + 1 + 1 + 1 = <b>8</b>.',
  code:
`
// Exercício 3: somar 1
let pontos = 5;
pontos = pontos + 1;
pontos += 1;
pontos++;
console.log(pontos); // 8
`
},
{
  part:'1 · Variáveis e tipos', op:'challenge', time:'4 min',
  title:'Exercício 4: comparações',
  md:
`Toda comparação responde \`true\` ou \`false\`:

- \`<\` menor · \`>\` maior · \`<=\` menor ou igual · \`===\` igual · \`!==\` diferente

**Antes de rodar**, escreva o que você acha que cada linha mostra:

\`\`\`js
console.log(5 < 10);
console.log(10 <= 10);
console.log(5 === "5");
console.log(5 !== 6);
console.log("gol" === "gol");
\`\`\`

> Pegadinha: \`===\` compara **valor e tipo**.`
},
{
  part:'1 · Variáveis e tipos', op:'code', file:'treino.js',
  title:'Comparações',
  explain:'<code>5 === "5"</code> é <b>false</b>: o primeiro é number, o segundo é string. Por isso sempre <code>===</code> e <code>!==</code>.',
  code:
`
// Exercício 4: comparações
console.log(5 < 10); // true
console.log(10 <= 10); // true
console.log(5 === "5"); // false
console.log(5 !== 6); // true
console.log("gol" === "gol"); // true
`
},

/* ----------------------------------------------------------------------
   Parte 2: funções e if
   ---------------------------------------------------------------------- */
{
  part:'2 · Funções e if', op:'challenge', time:'4 min',
  title:'Exercício 5: a função adicionar',
  md:
`Uma **função** é uma receita reutilizável: você escreve uma vez e usa quantas vezes quiser.

\`\`\`js
function nome(parametro) {
  return resultado;
}
\`\`\`

- \`parametro\` é o que **entra** na receita;
- \`return\` é o que **sai**.

Crie \`adicionar(valor)\`, que devolve \`valor + 1\`, e **chame** com \`9\`, com \`41\` e com \`adicionar(1)\` dentro de outra chamada.

> Diferença: **definir** (\`function adicionar...\`) é escrever a receita. **Chamar** (\`adicionar(9)\`) é usá-la.`
},
{
  part:'2 · Funções e if', op:'code', file:'treino.js',
  title:'function e return',
  explain:'Sem <code>return</code>, a função devolve <code>undefined</code>. A última chamada resolve de dentro pra fora: <code>adicionar(1)</code> vale 2, e <code>adicionar(2)</code> vale 3.',
  code:
`
// Exercício 5: função
function adicionar(valor) {
  return valor + 1;
}

console.log(adicionar(9)); // 10
console.log(adicionar(41)); // 42
console.log(adicionar(adicionar(1))); // 3
`
},
{
  part:'2 · Funções e if', op:'challenge', time:'5 min',
  title:'Exercício 6: o if trava no 10',
  md:
`O \`if\` faz uma pergunta. Se a resposta for \`true\`, o bloco entre \`{ }\` roda. Se for \`false\`, é pulado.

Crie \`gols\` valendo \`9\` e escreva:

> **se** \`gols\` for menor que 10, some 1 usando \`adicionar\`.

Mostre \`gols\`. Depois **repita o mesmo \`if\`** e mostre de novo. O que acontece na segunda vez?`
},
{
  part:'2 · Funções e if', op:'code', file:'treino.js',
  title:'if: só faz se for verdade',
  explain:'Na primeira vez 9 &lt; 10, então soma. Na segunda 10 &lt; 10 é <b>false</b>: o bloco é pulado e o valor <b>trava em 10</b>. É esse <code>if</code> que vai segurar o contador mais adiante.',
  code:
`
// Exercício 6: if
let gols = 9;

if (gols < 10) {
  gols = adicionar(gols);
}
console.log(gols); // 10

if (gols < 10) {
  gols = adicionar(gols);
}
console.log(gols); // 10, o if não deixou passar
`
},
{
  part:'2 · Funções e if', op:'challenge', time:'6 min',
  title:'Exercício 7: if / else, quem venceu',
  md:
`Com \`else\` você diz **o que fazer quando a resposta é não**.

\`\`\`js
if (condicao) {
  // se verdadeiro
} else {
  // senão
}
\`\`\`

Crie \`quemVenceu(golsA, golsB)\`. Ela **devolve**:

- \`"Time A venceu"\` se A fez mais gols;
- \`"Time B venceu"\` se B fez mais gols;
- \`"Empate"\` nos outros casos.

Teste com \`(2, 1)\`, \`(0, 3)\` e \`(1, 1)\`.

> Dica: \`else if\` encadeia mais uma pergunta antes do \`else\` final.`
},
{
  part:'2 · Funções e if', op:'code', file:'treino.js',
  title:'else if e else',
  explain:'As perguntas são feitas em ordem; a primeira verdadeira decide. O <code>else</code> final pega tudo que sobrou, que aqui só pode ser o empate. Vamos reaproveitar essa ideia no cronômetro do placar.',
  code:
`
// Exercício 7: if / else
function quemVenceu(golsA, golsB) {
  if (golsA > golsB) {
    return "Time A venceu";
  } else if (golsB > golsA) {
    return "Time B venceu";
  } else {
    return "Empate";
  }
}

console.log(quemVenceu(2, 1)); // Time A venceu
console.log(quemVenceu(0, 3)); // Time B venceu
console.log(quemVenceu(1, 1)); // Empate
`
},

/* ----------------------------------------------------------------------
   Parte 3: o DOM
   ---------------------------------------------------------------------- */
{
  part:'3 · DOM', op:'note',
  title:'O DOM é a página em forma de árvore',
  md:
`O navegador lê o HTML e monta uma **árvore de objetos**: o **DOM**. O JavaScript pode encontrar qualquer item dessa árvore e **mudar o que aparece na tela**.

\`\`\`
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1#contador
        └── script
\`\`\`

- **\`document\`** é a raiz, o ponto de partida.
- O \`#contador\` indica o **id** do elemento: é o "nome" pelo qual o JavaScript vai procurá-lo.

> Abra o **F12 → Elements** em qualquer site e veja essa árvore de verdade.`
},
{
  part:'3 · DOM', op:'file', target:'index.html',
  title:'Criar index.html',
  explain:'O ponto de partida: uma página com um único título.'
},
{
  part:'3 · DOM', op:'code', file:'index.html',
  title:'Ligando o JavaScript ao HTML',
  explain:'Três detalhes: <b>1)</b> o <code>id="contador"</code> é o nome que o JS vai procurar. <b>2)</b> <code>&lt;script src&gt;</code> carrega o <code>app.js</code>. <b>3)</b> O script fica no <b>fim do body</b>: quando ele roda, o <code>&lt;h1&gt;</code> já existe. No <code>head</code>, o <code>h1</code> ainda não existiria e o código falharia.',
  code:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Exemplo</title>
</head>
<body>
  <h1 id="contador">Preparado ?</h1>

  <script src="app.js"></script>
</body>
</html>
`
},
{
  part:'3 · DOM', op:'file', target:'app.js',
  title:'Criar app.js',
  explain:'O arquivo que o <code>&lt;script src="app.js"&gt;</code> carrega.'
},
{
  part:'3 · DOM', op:'challenge', time:'5 min',
  title:'Exercício 8: trocar o texto da tela',
  md:
`Mexer na tela são **dois passos**:

1. **achar** o elemento: \`document.getElementById("contador")\` devolve o elemento com esse id;
2. **mudar** o texto: a propriedade \`textContent\` é o texto que aparece dentro dele.

Guarde o \`<h1>\` numa constante \`elementoContador\` e troque o texto dele para \`7\`. Abra o \`index.html\` e confira.

> Dá pra testar ao vivo: no Console da página, digite \`document.getElementById("contador").textContent = 99\`.`
},
{
  part:'3 · DOM', op:'code', file:'app.js',
  title:'getElementById e textContent',
  explain:'O <code>"Preparado ?"</code> some e aparece <b>7</b>. Guardar o elemento numa <code>const</code> evita procurar de novo a cada uso.',
  code:
`const elementoContador = document.getElementById("contador");
elementoContador.textContent = 7;
`
},

/* ----------------------------------------------------------------------
   Parte 4: tempo
   ---------------------------------------------------------------------- */
{
  part:'4 · Tempo', op:'challenge', time:'4 min',
  title:'Exercício 9: repetir no tempo',
  md:
`\`setInterval\` roda uma função **de tempos em tempos**.

\`\`\`js
setInterval(() => {
  // o que repetir
}, 300);
\`\`\`

- \`() => { }\` é uma **arrow function**: uma função sem nome, só outra forma de escrever \`function\`;
- \`300\` são os **milissegundos** entre uma vez e outra (1000 ms = 1 segundo).

Faça aparecer \`"tic"\` no Console a cada 300 ms.`
},
{
  part:'4 · Tempo', op:'code', file:'app.js',
  title:'setInterval',
  explain:'Abra o Console (F12): o <code>tic</code> aparece sem parar, a cada 300 ms. Ele <b>não termina sozinho</b>; só <code>clearInterval</code> para.',
  code:`
setInterval(() => {
  console.log("tic");
}, 300);
`
},
{
  part:'4 · Tempo', op:'challenge', time:'6 min',
  title:'Exercício 10: montar as peças do contador',
  md:
`Agora o contador de verdade. Antes do motor, preparamos **três peças** no \`app.js\`:

1. uma variável \`contador\` começando em \`0\`;
2. a função \`adicionar(valor)\` que devolve \`valor + 1\` (a mesma do exercício 5);
3. uma função \`mudarValorTela()\` que escreve o \`contador\` dentro do \`<h1>\`.

Troque a linha que fixava o \`7\` por essas peças.

> Nada aparece na tela ainda: aqui só **preparamos**.`
},
{
  part:'4 · Tempo', op:'replace', file:'app.js',
  find:`elementoContador.textContent = 7;
`,
  title:'A preparação',
  explain:'Três peças, nenhuma chamada: a página continua em "Preparado ?". Trocamos o <code>7</code> fixo por <code>mudarValorTela()</code>, que mostra o valor <b>atual</b> do contador.',
  code:
`let contador = 0;

function adicionar(valor) {
  return valor + 1;
}

function mudarValorTela() {
  elementoContador.textContent = contador;
}
`
},
{
  part:'4 · Tempo', op:'challenge', time:'6 min',
  title:'Exercício 11: o motor',
  md:
`Junte tudo: **variável + função + if + DOM + setInterval**.

Troque o \`"tic"\` por um motor que, **a cada 300 ms**:

1. se \`contador\` ainda for menor que \`10\`, soma 1 usando \`adicionar\`;
2. **sempre** atualiza a tela com \`mudarValorTela()\`.

Resultado: o título vai de "Preparado ?" a \`0, 1, 2 ... 10\` sozinho.`
},
{
  part:'4 · Tempo', op:'replace', file:'app.js',
  find:`  console.log("tic");
`,
  title:'Variável + função + if + DOM + setInterval',
  explain:'Em 6 linhas aparece tudo o que vimos. O <code>if</code> segura o número em 10; o <code>mudarValorTela()</code> fica <b>fora</b> do <code>if</code>, então a tela é atualizada a cada volta.',
  code:
`  if (contador < 10) {
    contador = adicionar(contador);
  }
  mudarValorTela();
`
},
{
  part:'4 · Tempo', op:'challenge', time:'4 min',
  title:'Exercício 12: o setInterval para em 10?',
  md:
`O número trava em \`10\`. Isso quer dizer que o \`setInterval\` **parou**?

Palpite primeiro, depois **prove**: coloque um \`console.log\` **dentro** do \`setInterval\` e olhe o Console.`
},
{
  part:'4 · Tempo', op:'insert', file:'app.js', after:'setInterval(() => {',
  title:'Provando com console.log',
  explain:'O <code>rodou</code> continua aparecendo <b>mesmo depois do 10</b>. Quem trava o número é o <code>if</code>; o <code>setInterval</code> segue rodando a cada 300 ms. Pare de verdade com <code>clearInterval</code> (vamos usar no nível 3).',
  code:`  console.log("rodou", contador);
`
},
{
  part:'4 · Tempo', op:'replace', file:'app.js',
  find:`  console.log("rodou", contador);
`,
  title:'Apagar a prova',
  explain:'Missão cumprida: pode tirar o <code>console.log</code> de teste.'
},

/* ----------------------------------------------------------------------
   Parte 5: eventos
   ---------------------------------------------------------------------- */
{
  part:'5 · Eventos', op:'note',
  title:'Eventos: reagir ao usuário',
  md:
`Duas formas de "fazer algo quando algo acontece":

- **\`setInterval\`** reage ao **tempo**: roda sozinho a cada X ms;
- **\`addEventListener\`** reage ao **usuário**: roda **quando alguém clica**.

\`\`\`js
botao.addEventListener("click", () => {
  // roda a cada clique
});
\`\`\`

A estrutura é a mesma: **uma função que roda quando algo acontece**. Esse "algo" é o evento, aqui \`"click"\`.

> O gol de um placar não acontece com o tempo: acontece **quando alguém clica**.`
},
{
  part:'5 · Eventos', op:'file', target:'placar.html',
  title:'Criar placar.html',
  explain:'Uma página nova, só pro placar. Começamos com <b>um</b> time e <b>um</b> botão.'
},
{
  part:'5 · Eventos', op:'code', file:'placar.html',
  title:'Um número e um botão',
  explain:'Cada elemento que o JS usa tem um <code>id</code>: <code>gols</code> para o número, <code>btnGol</code> para o botão.',
  code:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Placar</title>
</head>
<body>
  <h1 id="gols">0</h1>
  <button id="btnGol">+ Gol</button>

  <script src="placar.js"></script>
</body>
</html>
`
},
{
  part:'5 · Eventos', op:'file', target:'placar.js',
  title:'Criar placar.js',
  explain:'O arquivo carregado pelo <code>placar.html</code>.'
},
{
  part:'5 · Eventos', op:'challenge', time:'6 min',
  title:'Exercício 13: o botão + Gol',
  md:
`Cada clique em **+ Gol** deve somar 1 e mostrar o novo valor na tela.

Você precisa de:

1. uma variável \`gols\` começando em \`0\`;
2. o elemento do número (\`gols\`) e o elemento do botão (\`btnGol\`);
3. um \`addEventListener("click", ...)\` no botão que soma 1 e atualiza o \`textContent\`.

> Passe a função **sem executá-la**: o código dentro do \`() => { }\` só roda **quando o clique acontecer**.`
},
{
  part:'5 · Eventos', op:'code', file:'placar.js',
  title:'addEventListener',
  explain:'A variável <code>gols</code> guarda o valor; a tela só muda quando o código escreve no <code>textContent</code>. Sem a linha da tela, o número subiria "por dentro" e você não veria nada.',
  code:
`let gols = 0;
const tela = document.getElementById("gols");
const botao = document.getElementById("btnGol");

botao.addEventListener("click", () => {
  gols = gols + 1;
  tela.textContent = gols;
});
`
},

/* ----------------------------------------------------------------------
   Parte 6: desafio
   ---------------------------------------------------------------------- */
{
  part:'6 · Desafio: placar', op:'challenge', time:'15 min',
  title:'Construa um placar de futebol',
  md:
`Hora de usar tudo, em duplas. O placar final:

\`\`\`
   1º TEMPO · 23 min
 BRASIL   2  x  1   ARGENTINA
 [+ Gol A] [+ Gol B]   [Zerar]
\`\`\`

**Sua missão:**

- mostrar o nome dos dois times;
- mostrar os gols de cada time;
- um botão **+ Gol** para cada time;
- um botão para **zerar** o placar.

Três níveis, vá até onde conseguir:

- **Nível 1 · Básico:** dois times, botões **+ Gol** funcionando. *(variável · DOM · evento)*
- **Nível 2 · Intermediário:** botão **− 1** para corrigir, **nunca negativo**, botão **Zerar**. *(if · função)*
- **Nível 3 · Craque:** cronômetro com \`setInterval\`, encerra aos **90 min** com \`clearInterval\`, mostra quem **venceu** ou empate. *(setInterval · if / else)*

> Sem CSS: o placar pode ficar feio. O importante é **funcionar**.`
},
{
  part:'6 · Desafio: placar', op:'challenge', time:'6 min',
  title:'Nível 1: o HTML do placar',
  md:
`Troque o título e o botão únicos pelo HTML dos **dois times**:

- um \`<h2>\` com **Brasil x Argentina**;
- os dois números, cada um num \`<span>\` com **id** (\`golsA\` e \`golsB\`), dentro do \`<h1>\`;
- um botão **+ Gol** por time (\`btnA\` e \`btnB\`).

> O \`<span>\` é um pedaço de texto dentro de outro elemento: perfeito pra trocar só o número.`
},
{
  part:'6 · Desafio: placar', op:'replace', file:'placar.html',
  find:`  <h1 id="gols">0</h1>
  <button id="btnGol">+ Gol</button>
`,
  title:'O HTML dos dois times',
  explain:'Cada número tem seu <code>id</code> (<code>golsA</code>, <code>golsB</code>) e cada botão também (<code>btnA</code>, <code>btnB</code>): é por eles que o JS vai mudar o placar e ligar o clique.',
  code:
`  <h2>Brasil x Argentina</h2>
  <h1>
    <span id="golsA">0</span> x
    <span id="golsB">0</span>
  </h1>
  <button id="btnA">+ Gol A</button>
  <button id="btnB">+ Gol B</button>
`
},
{
  part:'6 · Desafio: placar', op:'challenge', time:'6 min',
  title:'Nível 1: o Time A',
  md:
`Adapte o código do exercício 13 ao **Time A**. Compare com o contador:

- \`contador\` → \`golsA\`
- \`mudarValorTela()\` → \`atualizarPlacar()\`
- \`setInterval\` → **clique no botão**

Troque o código do botão único por uma variável \`golsA\`, uma função \`atualizarPlacar()\` e o clique no \`btnA\`.`
},
{
  part:'6 · Desafio: placar', op:'replace', file:'placar.js',
  find:`let gols = 0;
const tela = document.getElementById("gols");
const botao = document.getElementById("btnGol");

botao.addEventListener("click", () => {
  gols = gols + 1;
  tela.textContent = gols;
});
`,
  title:'Time A pronto',
  explain:'<code>atualizarPlacar()</code> concentra "escrever na tela". Assim, todo botão só precisa mudar a variável e chamá-la.',
  code:
`let golsA = 0;

const telaA = document.getElementById("golsA");

function atualizarPlacar() {
  telaA.textContent = golsA;
}

document.getElementById("btnA").addEventListener("click", () => {
  golsA = golsA + 1;
  atualizarPlacar();
});
`
},
{
  part:'6 · Desafio: placar', op:'challenge', time:'6 min',
  title:'Nível 1: o Time B',
  md:
`Agora é com você: **faça o Time B** copiando o padrão do Time A.

Quatro lugares mudam:

1. a variável \`golsB\`;
2. a constante \`telaB\`;
3. a linha do \`telaB\` dentro de \`atualizarPlacar()\`;
4. o clique no \`btnB\`.`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.js', after:'let golsA = 0;',
  title:'golsB',
  explain:'1) A variável do segundo time.',
  code:`let golsB = 0;
`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.js', after:'const telaA = document.getElementById("golsA");',
  title:'telaB',
  explain:'2) O elemento onde o número do Time B aparece.',
  code:`const telaB = document.getElementById("golsB");
`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.js', after:'  telaA.textContent = golsA;',
  title:'Atualizar o Time B',
  explain:'3) <code>atualizarPlacar()</code> passa a escrever os <b>dois</b> números.',
  code:`  telaB.textContent = golsB;
`
},
{
  part:'6 · Desafio: placar', op:'code', file:'placar.js',
  title:'O clique do Time B',
  explain:'4) Mesma estrutura do Time A, com <code>btnB</code> e <code>golsB</code>. <b>Nível 1 completo.</b>',
  code:
`
document.getElementById("btnB").addEventListener("click", () => {
  golsB = golsB + 1;
  atualizarPlacar();
});
`
},
{
  part:'6 · Desafio: placar', op:'challenge', time:'8 min',
  title:'Nível 2: corrigir e zerar',
  md:
`Gol anulado pelo VAR! Adicione:

1. um botão **− 1** para cada time, que tira um gol;
2. **o placar nunca pode ficar negativo**: só tira se o time tiver pelo menos 1 gol (use \`if\`);
3. um botão **Zerar** que volta os dois times a \`0\`.

Primeiro os botões no HTML, depois o JavaScript.

> O Zerar são três linhas: \`golsA = 0\`, \`golsB = 0\` e \`atualizarPlacar()\`.`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.html', after:'  <button id="btnA">+ Gol A</button>',
  title:'Botão − 1 do Time A',
  explain:'Os botões novos entram ao lado dos <b>+ Gol</b>.',
  code:`  <button id="btnMenosA">- 1 A</button>
`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.html', after:'  <button id="btnB">+ Gol B</button>',
  title:'Botão − 1 do Time B e Zerar',
  explain:'Mais dois botões: o <b>− 1</b> do B e o <b>Zerar</b>.',
  code:`  <button id="btnMenosB">- 1 B</button>
  <button id="btnZerar">Zerar</button>
`
},
{
  part:'6 · Desafio: placar', op:'code', file:'placar.js',
  title:'− 1 sem ficar negativo, e Zerar',
  explain:'O <code>if (golsA > 0)</code> é a trava: com 0 gols, o clique não tira nada. O <code>atualizarPlacar()</code> fica <b>fora</b> do <code>if</code>, então a tela sempre sincroniza. <b>Nível 2 completo.</b>',
  code:
`
document.getElementById("btnMenosA").addEventListener("click", () => {
  if (golsA > 0) {
    golsA = golsA - 1;
  }
  atualizarPlacar();
});

document.getElementById("btnMenosB").addEventListener("click", () => {
  if (golsB > 0) {
    golsB = golsB - 1;
  }
  atualizarPlacar();
});

document.getElementById("btnZerar").addEventListener("click", () => {
  golsA = 0;
  golsB = 0;
  atualizarPlacar();
});
`
},
{
  part:'6 · Desafio: placar', op:'challenge', time:'10 min',
  title:'Nível 3: cronômetro e vencedor',
  md:
`Hora de ser **craque**. O jogo tem tempo:

1. mostre \`Tempo: 0 min\` na tela e **some 1 minuto** a cada 200 ms com \`setInterval\`;
2. ao chegar em **90 min**, **pare** o cronômetro com \`clearInterval\`;
3. nesse momento, mostre **quem venceu** (ou empate) num parágrafo.

\`\`\`js
const cronometro = setInterval(() => { ... }, 200);
clearInterval(cronometro); // para
\`\`\`

> \`setInterval\` **devolve um número** que identifica o cronômetro: guarde-o numa constante pra poder parar depois. E reaproveite o \`if\`/\`else\` do exercício 7.`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.html', after:'  <h2>Brasil x Argentina</h2>',
  title:'Onde mostrar o tempo',
  explain:'Um parágrafo com <code>id="tempo"</code> logo abaixo do título.',
  code:`  <p id="tempo">Tempo: 0 min</p>
`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.html', after:'  <button id="btnZerar">Zerar</button>',
  title:'Onde mostrar o resultado',
  explain:'Um parágrafo vazio: o JS preenche quando o jogo acabar.',
  code:`  <p id="resultado"></p>
`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.js', after:'let golsB = 0;',
  title:'A variável minuto',
  explain:'O tempo de jogo também é um valor que muda: precisa de uma variável.',
  code:`let minuto = 0;
`
},
{
  part:'6 · Desafio: placar', op:'insert', file:'placar.js', after:'const telaB = document.getElementById("golsB");',
  title:'As duas telas novas',
  explain:'O cronômetro escreve em <code>tempo</code> e o vencedor em <code>resultado</code>.',
  code:`const telaTempo = document.getElementById("tempo");
const telaResultado = document.getElementById("resultado");
`
},
{
  part:'6 · Desafio: placar', op:'code', file:'placar.js',
  title:'quemVenceu, cronômetro e clearInterval',
  explain:'<code>quemVenceu()</code> é o <code>if</code>/<code>else</code> do exercício 7. O <code>setInterval</code> sobe 1 minuto por volta; quando <code>minuto === 90</code>, o <code>clearInterval(cronometro)</code> <b>para de verdade</b> e o vencedor aparece. <b>Placar completo!</b>',
  code:
`
function quemVenceu() {
  if (golsA > golsB) {
    return "Brasil venceu!";
  } else if (golsB > golsA) {
    return "Argentina venceu!";
  } else {
    return "Empate!";
  }
}

const cronometro = setInterval(() => {
  minuto = minuto + 1;
  telaTempo.textContent = \`Tempo: \${minuto} min\`;

  if (minuto === 90) {
    clearInterval(cronometro);
    telaResultado.textContent = quemVenceu();
  }
}, 200);
`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Do contador ao placar',
  md:
`## Conceitos de hoje
- **\`let\` / \`const\`**: guardar valores (\`const\` não muda).
- **Tipos**: \`number\`, \`string\`, \`boolean\`. \`typeof\` mostra qual é.
- **Operadores**: \`+=\`, \`++\`, \`<\`, \`===\`. Comparação responde \`true\` ou \`false\`.
- **\`function\` / \`return\`**: receitas reutilizáveis (definir ≠ chamar).
- **\`if\` / \`else\`**: tomar decisões.
- **DOM**: \`getElementById\` encontra, \`textContent\` muda a tela.
- **\`setInterval\`** repete no tempo (e **não para sozinho**: \`clearInterval\`). **\`addEventListener\`** reage ao usuário.

## Exercícios pra casa
1. **Contagem regressiva:** o contador começa em 10 e desce até 0 (e para com \`clearInterval\`).
2. **Botão Pausar:** um botão que para o cronômetro do placar sem zerar os gols.
3. **Quem está na frente:** mostre um texto \`"Brasil na frente"\`, \`"Argentina na frente"\` ou \`"Empatado"\` num parágrafo, atualizado a cada gol (reaproveite o \`if\`/\`else\`).
4. **Limite de 99:** o placar não passa de 99 gols (e \`+ Gol\` deixa de funcionar nesse caso).
5. **Mostre o seu placar** para a turma!`
},
];

global.AULA_JAVASCRIPT_DOM_PLACAR = {
  meta: {
    titulo:    'JavaScript e DOM: da variável ao placar',
    projeto:   'javascript-dom-placar',
    subtitulo: 'Coding · HTML e JavaScript puros',
    vazio:     'Projeto vazio.<br>Vamos do treino.js ao placar.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
