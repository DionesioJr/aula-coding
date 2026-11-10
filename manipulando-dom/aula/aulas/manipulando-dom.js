/* =========================================================================
   AULA: Manipulando o DOM, parte 1 (disciplina de Coding)

   Versão para iniciantes: um contador de cliques em HTML e JavaScript
   puros, sem bibliotecas e sem npm. Só o essencial, em passos pequenos:
   1. o que é o DOM;
   2. achar um elemento com getElementById (e o null quando não acha);
   3. trocar o texto dele com textContent;
   4. reagir ao clique do botão com addEventListener.

   Criar elementos, ler campo de texto e remover itens ficam para a parte 2
   (../../manipulando-dom-lista).

   Mesmo formato das outras aulas: cartões roxos de desafio antes de cada
   trecho, e o código existente é AJUSTADO no lugar (replace/insert).

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

const INITIAL_ENTRIES = [];
const INITIAL_FILES = {};

/* Sem bibliotecas: só o navegador. */
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
  title:'Manipulando o DOM',
  eyebrow:'Coding · JavaScript no navegador',
  md:
`Até agora o JavaScript só escrevia no terminal. Hoje ele passa a **mexer na página**.

Vamos fazer um **contador de cliques** com dois arquivos, sem instalar nada:

- \`index.html\`: a página;
- \`script.js\`: o código que mexe nela.

São só três ideias:

1. **achar** um elemento da página;
2. **trocar** o texto dele;
3. **reagir** a um clique.

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'note',
  title:'O que é o DOM',
  md:
`Quando o navegador lê o HTML, ele monta uma **árvore de objetos** chamada **DOM**. Cada tag vira um item dessa árvore:

\`\`\`
document
└── body
    ├── h1
    ├── p
    └── button
\`\`\`

- O JavaScript chega nessa árvore pelo objeto **\`document\`**.
- Se o JavaScript muda um item da árvore, a **tela muda na hora**, sem recarregar a página.

> Pense assim: o HTML é a **receita**, o DOM é o **prato pronto**. O JavaScript mexe no prato.`
},
{
  part:'Preparação', op:'note',
  title:'Como testar',
  md:
`1. Crie uma pasta com os dois arquivos da aula.
2. Abra o \`index.html\` no navegador (dois cliques no arquivo).
3. Aperte **F12** e abra a aba **Console**: é ali que aparecem os \`console.log\` e os erros.
4. Mudou o código? Salve e aperte **F5** pra recarregar.`
},

/* ----------------------------------------------------------------------
   Parte 1: a página
   ---------------------------------------------------------------------- */
{
  part:'1 · A página', op:'file', target:'index.html',
  title:'Criar index.html',
  explain:'Primeiro a página. O JavaScript só consegue mexer no que existe no HTML.'
},
{
  part:'1 · A página', op:'code', file:'index.html',
  title:'Título, número e botão',
  explain:'Os três elementos que o JavaScript vai usar têm um <code>id</code>, que funciona como um <b>nome único</b>. O <code>&lt;script&gt;</code> fica no <b>fim do body</b>: quando ele roda, os elementos de cima já existem.',
  code:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Contador de cliques</title>
</head>
<body>
  <h1 id="titulo">Carregando...</h1>
  <p id="contador">0</p>
  <button id="botao-somar">+1</button>

  <script src="script.js"></script>
</body>
</html>
`
},

/* ----------------------------------------------------------------------
   Parte 2: achar um elemento
   ---------------------------------------------------------------------- */
{
  part:'2 · Achar elementos', op:'challenge', time:'3 min',
  title:'Achar o título',
  md:
`\`\`\`js
document.getElementById('titulo')
\`\`\`

procura na página o elemento com \`id="titulo"\` e **devolve ele**.

No \`script.js\`, guarde o \`<h1>\` numa constante chamada \`titulo\` e mostre ela no Console.

Depois responda: o que aparece se o id **não existir**? Teste com \`'nao-existe'\`.`
},
{
  part:'2 · Achar elementos', op:'file', target:'script.js',
  title:'Criar script.js',
  explain:'É o arquivo que o <code>&lt;script src="script.js"&gt;</code> do HTML carrega.'
},
{
  part:'2 · Achar elementos', op:'code', file:'script.js',
  title:'Achar o título',
  explain:'O primeiro <code>console.log</code> mostra o próprio <code>&lt;h1&gt;</code>. O segundo mostra <b><code>null</code></b>, que quer dizer <b>"não achei nada"</b>. Dica: no <code>getElementById</code> escreva só o nome do id, <b>sem o <code>#</code></b>.',
  code:
`const titulo = document.getElementById('titulo');

console.log(titulo);
console.log(document.getElementById('nao-existe'));
`
},

/* ----------------------------------------------------------------------
   Parte 3: textContent
   ---------------------------------------------------------------------- */
{
  part:'3 · Trocar o texto', op:'challenge', time:'3 min',
  title:'Trocar o texto do título',
  md:
`Todo elemento tem o **\`textContent\`**: o texto que está dentro dele.

- **Ler:** \`titulo.textContent\` devolve \`'Carregando...'\`.
- **Trocar:** \`titulo.textContent = 'outro texto'\` muda o que aparece na tela.

Apague os dois \`console.log\` e escreva uma linha que troque o título para **Contador de cliques**.`
},
{
  part:'3 · Trocar o texto', op:'replace', file:'script.js',
  find:
`console.log(titulo);
console.log(document.getElementById('nao-existe'));
`,
  title:'Mudar o título pelo JavaScript',
  explain:'Recarregue a página: o <code>Carregando...</code> do HTML some e aparece <b>Contador de cliques</b>. O arquivo HTML não mudou, o que mudou foi a página na memória do navegador, o <b>DOM</b>.',
  code:
`titulo.textContent = 'Contador de cliques';
`
},

/* ----------------------------------------------------------------------
   Parte 4: o botão
   ---------------------------------------------------------------------- */
{
  part:'4 · O botão', op:'note',
  title:'O plano do contador',
  md:
`Falta fazer o botão **+1** funcionar. Precisamos de três peças:

1. **achar** o número e o botão na página (já sabemos);
2. uma **variável** que guarda quantos cliques já teve;
3. uma **função** que soma 1 e mostra o novo valor na tela.

Depois é só dizer ao navegador: *"quando clicarem no botão, chame essa função"*.`
},
{
  part:'4 · O botão', op:'insert', file:'script.js',
  after:"const titulo = document.getElementById('titulo');",
  title:'Achar o número e o botão',
  explain:'Mais dois elementos. Deixar todos os <code>getElementById</code> juntos no começo mostra de quais partes da página o código depende.',
  code:
`const contador = document.getElementById('contador');
const botaoSomar = document.getElementById('botao-somar');
`
},
{
  part:'4 · O botão', op:'insert', file:'script.js',
  after:"const botaoSomar = document.getElementById('botao-somar');",
  title:'A variável que guarda os cliques',
  explain:'É <code>let</code> (e não <code>const</code>) porque o valor <b>vai mudar</b>. Começa em zero, igual ao <code>0</code> que está no HTML.',
  code:
`
let cliques = 0;
`
},
{
  part:'4 · O botão', op:'note',
  title:'Reagir a um clique',
  md:
`Para o navegador **ficar esperando** o clique, a gente registra um **ouvinte**:

\`\`\`js
botao.addEventListener('click', funcao);
\`\`\`

- O primeiro valor é **qual evento** esperar: \`'click'\`.
- O segundo é **qual função** chamar **toda vez** que ele acontecer.
- A função vai **sem parênteses**: \`somar\`, não \`somar()\`. Com parênteses ela rodaria na hora, uma vez só.`
},
{
  part:'4 · O botão', op:'challenge', time:'6 min',
  title:'Fazer o botão contar',
  md:
`Escreva no \`script.js\`:

1. uma função \`somar\` que:
   - soma 1 em \`cliques\`;
   - mostra o valor no \`contador\` com \`textContent\`;
2. o \`addEventListener\` que liga o botão a essa função.

> Dica: o \`textContent\` aceita um número, o JavaScript converte pra texto sozinho.

**Teste:** clique no botão várias vezes. O número na tela sobe?`
},
{
  part:'4 · O botão', op:'code', file:'script.js',
  title:'A função somar e o ouvinte',
  explain:'A cada clique o navegador chama <code>somar</code>: ela soma 1 na variável e <b>escreve o novo valor na tela</b>. Mudar só a variável não basta, é o <code>textContent</code> que atualiza a página.',
  code:
`
function somar() {
  cliques = cliques + 1;
  contador.textContent = cliques;
}

botaoSomar.addEventListener('click', somar);
`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Achar, trocar e reagir',
  md:
`## O que vimos hoje
- **DOM**: a árvore que o navegador monta a partir do HTML. O JavaScript chega nela por \`document\`.
- **\`getElementById('id')\`**: acha **um** elemento pelo id. Devolve \`null\` se não existir. Sem \`#\`.
- **\`textContent\`**: lê e troca o texto de um elemento.
- **\`addEventListener('click', funcao)\`**: a função roda a cada clique. Sem parênteses.

## Exercícios pra casa
1. **Botão Zerar:** um segundo botão que volta o contador pra \`0\`.
2. **Botão -1:** um botão que diminui 1.
3. **Mensagem:** abaixo do número, mostre \`Você clicou N vezes\` usando um novo \`<p>\`.

> Na próxima aula: **criar elementos novos** na página e montar uma lista de compras.`
},
];

global.AULA_MANIPULANDO_DOM = {
  meta: {
    titulo:    'Manipulando o DOM',
    projeto:   'manipulando-dom',
    subtitulo: 'Coding · HTML e JavaScript puros',
    vazio:     'Projeto vazio.<br>Só index.html e script.js.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
