/* =========================================================================
   AULA: Construindo a página com TypeScript (disciplina de Coding)

   Aula 1 de 3 da série "Minhas tecnologias". Para iniciantes: foco na
   lógica, quase nada de CSS, e cada exercício é pequeno e se apoia no
   anterior. A progressão:
   1. TypeScript essencial no terminal (src/treino.ts): tipos, funções
      tipadas, arrays, forEach e template strings;
   2. DOM com TypeScript (index.html + src/app.ts): selecionar com o tipo
      certo, criar, inserir e remover elementos;
   3. laboratório em três níveis: a lista "Minhas tecnologias".

   Mesmo formato das outras aulas: cartões roxos de desafio antes de cada
   trecho, e o código existente é AJUSTADO no lugar (replace/insert).

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

const INITIAL_ENTRIES = [];
const INITIAL_FILES = {};

/* O único pacote da aula é o próprio TypeScript. O índice em que ele
   "acende" na lateral é calculado no fim do arquivo (etapa do package.json). */
const DEPS = [
  {name:'typescript', ver:'~5.9.2'},
];

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
  title:'Construindo a página com TypeScript',
  eyebrow:'Coding · TypeScript + DOM · Aula 1 de 3',
  md:
`Hoje a turma monta, passo a passo, uma lista **"Minhas tecnologias"** para o portfólio. O foco é a **lógica**: a página vai ficar simples de propósito.

1. **TypeScript essencial** (\`src/treino.ts\`): tipos, funções, listas, \`forEach\` e template strings, tudo no terminal;
2. **DOM com TypeScript** (\`src/app.ts\`): encontrar, criar e remover elementos da página;
3. **Laboratório**: a lista ganha campo, botão, contador e botão remover.

Cada exercício é pequeno e usa o que o anterior deixou pronto. Em **3 aulas** esse mesmo projeto vai ser organizado e publicado na internet.

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'note',
  title:'Onde paramos',
  md:
`Nas aulas anteriores vocês viram:

- **Git e GitHub:** repositório, commit, push e o primeiro arquivo \`.ts\`;
- **JavaScript no navegador:** variáveis, funções, \`if\`, o DOM e \`setInterval\`;
- **Placar de futebol:** \`getElementById\`, \`textContent\` e \`addEventListener\`.

No placar, só **alteramos** elementos que **já existiam** no HTML. Hoje o raciocínio é o mesmo, mas com **TypeScript** e **criando elementos do zero**, direto pelo código.`
},
{
  part:'Preparação', op:'note',
  title:'Por que TypeScript?',
  md:
`**TypeScript = JavaScript + tipos.** O navegador continua rodando JavaScript: o TypeScript é **verificado e convertido** antes.

Em JavaScript, este erro passa batido:

\`\`\`js
function somar(a, b) {
  return a + b;
}
somar(2, "3"); // "23", roda sem reclamar
\`\`\`

Em TypeScript, o **editor e o \`tsc\`** avisam na hora que \`"3"\` não é um número:

\`\`\`ts
function somar(a: number, b: number): number {
  return a + b;
}
somar(2, "3"); // erro antes de rodar
\`\`\`

> O erro aparece **antes** de alguém usar o programa.`
},
{
  part:'Preparação', op:'note',
  title:'Montando o projeto',
  md:
`No terminal, dentro de uma pasta nova chamada \`minhas-tecnologias\`:

\`\`\`
npm init -y
npm install -D typescript
\`\`\`

- \`npm init -y\` cria o **package.json**, o "manifesto" do projeto;
- \`npm install -D typescript\` baixa o TypeScript. O \`-D\` instala como **dependência de desenvolvimento**: só é preciso pra compilar.

A estrutura que vamos ter no fim:

\`\`\`
minhas-tecnologias/
├─ index.html
├─ src/
│  ├─ treino.ts
│  └─ app.ts
├─ dist/         (gerado pelo tsc)
├─ node_modules/ (baixado pelo npm)
├─ package.json
└─ tsconfig.json
\`\`\`

> O navegador **não executa \`.ts\`**: o \`tsc\` converte \`src/*.ts\` em \`dist/*.js\`, e o HTML carrega o \`.js\`.`
},
{
  part:'Preparação', op:'file', target:'package.json',
  title:'Criar package.json',
  explain:'O arquivo que o <code>npm init -y</code> gera. Vamos digitá-lo já com os <b>scripts</b>.'
},
{
  part:'Preparação', op:'code', file:'package.json',
  title:'O manifesto e os scripts',
  explain:'<code>scripts</code> são atalhos: <code>npm run build</code> compila uma vez, <code>npm run dev</code> recompila a cada salvamento e <code>npm run treino</code> compila e roda o <code>treino.ts</code> no terminal. O <code>typescript</code> fica em <code>devDependencies</code>: só serve pra desenvolver.',
  code:
`{
  "name": "minhas-tecnologias",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "treino": "tsc && node dist/treino.js",
    "check-aula": "node aula/tools/check-sync.js"
  },
  "devDependencies": {
    "typescript": "~5.9.2"
  }
}
`
},
{
  part:'Preparação', op:'file', target:'tsconfig.json',
  title:'Criar tsconfig.json',
  explain:'A configuração do compilador. O <code>npx tsc --init</code> gera um arquivo enorme; aqui usamos só o que importa.'
},
{
  part:'Preparação', op:'code', file:'tsconfig.json',
  title:'tsconfig.json: o mínimo que importa',
  explain:'<b>rootDir</b>: onde ficam os <code>.ts</code>. <b>outDir</b>: para onde vai o <code>.js</code> gerado. <b>strict</b>: liga todas as verificações. Rode <code>npx tsc --watch</code> e o TypeScript recompila sozinho a cada salvamento.',
  code:
`{
  "compilerOptions": {
    "target": "ES2020",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
`
},

/* ----------------------------------------------------------------------
   Parte 1: TypeScript essencial
   ---------------------------------------------------------------------- */
{
  part:'1 · TypeScript essencial', op:'file', target:'src/treino.ts',
  title:'Criar src/treino.ts',
  explain:'A pasta <code>src</code> nasce junto. Aqui moram os exercícios que rodam no terminal: <code>npm run treino</code>.'
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'4 min',
  title:'Exercício 1: uma função com tipos',
  md:
`Em TypeScript, cada **parâmetro** e o **retorno** têm um tipo, escrito depois de \`:\`.

\`\`\`ts
function nome(parametro: tipo): tipoDoRetorno {
  return valor;
}
\`\`\`

Escreva \`somar(a, b)\`, que recebe **dois números** e devolve **um número** (a soma). Mostre \`somar(2, 3)\` no terminal.

> Rode com \`npm run treino\`.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'somar tipada',
  explain:'<code>(a: number, b: number)</code> é o que <b>entra</b>; <code>: number</code> depois dos parênteses é o que <b>sai</b>.',
  code:
`// Exercício 1: função com tipos
function somar(a: number, b: number): number {
  return a + b;
}

console.log(somar(2, 3)); // 5
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'3 min',
  title:'Exercício 2: provoque um erro',
  md:
`Agora a graça do TypeScript. Acrescente esta linha e **leia a mensagem** (no terminal ou sublinhada no editor):

\`\`\`ts
console.log(somar(2, "3"));
\`\`\`

1. Onde o erro aparece: **antes** ou **depois** de rodar?
2. O que a mensagem diz?`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'O erro aparece na hora',
  explain:'O <code>tsc</code> acusa: <b>Argument of type \'string\' is not assignable to parameter of type \'number\'</b>. O erro vem <b>antes</b> de executar. Leia sempre a mensagem inteira: ela diz o arquivo, a linha e o motivo.',
  code:
`
console.log(somar(2, "3"));
`
},
{
  part:'1 · TypeScript essencial', op:'replace', file:'src/treino.ts',
  find:`
console.log(somar(2, "3"));
`,
  title:'Apagar o erro de propósito',
  explain:'O código precisa compilar sem erros: tiramos a linha que só servia de teste.'
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'4 min',
  title:'Exercício 3: tipos básicos',
  md:
`Os três tipos que mais aparecem:

- \`string\`: texto, **entre aspas**;
- \`number\`: números;
- \`boolean\`: \`true\` ou \`false\`.

Crie quatro variáveis:

1. \`nome\` (string) com \`"Ana"\`;
2. \`idade\` (number) com \`20\`;
3. \`aprovado\` (boolean) com \`true\`;
4. \`cidade\` com \`"Campo Grande"\`, **sem** escrever o tipo.

Mostre as quatro no terminal. Qual tipo o TypeScript deu pra \`cidade\`?`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'Anotação e inferência',
  explain:'<b>Anotação:</b> <code>: tipo</code> logo depois do nome. <b>Inferência:</b> sem anotação, o TypeScript <b>descobre pelo valor</b>; aqui <code>cidade</code> virou <code>string</code> sozinho. Passe o mouse sobre ela no editor pra ver.',
  code:
`
// Exercício 3: tipos básicos
let nome: string = "Ana";
let idade: number = 20;
let aprovado: boolean = true;
let cidade = "Campo Grande"; // inferido: string

console.log(nome, idade, aprovado, cidade); // Ana 20 true Campo Grande
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'3 min',
  title:'Exercício 4: tipo errado',
  md:
`Tente guardar um **texto** numa variável de **número**:

\`\`\`ts
idade = "vinte";
\`\`\`

Veja o editor **sublinhar** o erro. Qual é a mensagem?`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'number não aceita texto',
  explain:'<b>Type \'string\' is not assignable to type \'number\'</b>: uma variável <code>number</code> só guarda número. O tipo é conferido só ao <b>compilar</b>; depois de convertido, o JavaScript não tem mais tipos.',
  code:
`
idade = "vinte";
`
},
{
  part:'1 · TypeScript essencial', op:'replace', file:'src/treino.ts',
  find:`
idade = "vinte";
`,
  title:'Apagar o erro de propósito',
  explain:'De novo: o arquivo volta a compilar.'
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'3 min',
  title:'Exercício 5: uma lista de textos',
  md:
`Uma lista de textos tem o tipo \`string[]\`.

Crie \`linguagens\` com **4 linguagens** (por exemplo JavaScript, TypeScript, Python e Java) e mostre **quantas** são.

> \`lista.length\` devolve o tamanho.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'Arrays',
  explain:'<code>string[]</code> é uma lista <b>só de textos</b>: acrescentar um número nela dá erro. O <code>length</code> conta os itens.',
  code:
`
// Exercício 5: array
const linguagens: string[] = ["JavaScript", "TypeScript", "Python", "Java"];
console.log(linguagens.length); // 4
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'4 min',
  title:'Exercício 6: a função media',
  md:
`Crie \`media(a, b)\`: recebe **dois números** e devolve **um número**, a média.

Teste com \`8\` e \`6\`.

> Pense nos **tipos**: o que entra? O que sai?`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'media tipada',
  explain:'Mesmo molde do <code>somar</code>: dois <code>number</code> entram, um <code>number</code> sai. (8 + 6) / 2 = 7.',
  code:
`
// Exercício 6: media
function media(a: number, b: number): number {
  return (a + b) / 2;
}

console.log(media(8, 6)); // 7
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'4 min',
  title:'Exercício 7: arrow function e void',
  md:
`Existe uma forma **mais curta** de escrever função, a **arrow function**:

\`\`\`ts
const dobro = (n: number): number => n * 2;
\`\`\`

1. Escreva \`dobro\` e mostre \`dobro(4)\`.
2. Escreva \`avisar(texto)\`, que **não devolve nada**: só mostra o texto no terminal. O retorno de quem não devolve nada é \`void\`.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'=> e void',
  explain:'A seta <code>=></code> substitui <code>function</code> e o <code>return</code> fica implícito. <code>void</code> quer dizer "esta função não devolve valor".',
  code:
`
// Exercício 7: arrow function e void
const dobro = (n: number): number => n * 2;
console.log(dobro(4)); // 8

function avisar(texto: string): void {
  console.log(texto);
}
avisar("Oi, turma!"); // Oi, turma!
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'4 min',
  title:'Exercício 8: texto com valores',
  md:
`Montar uma frase com valores no meio tem **dois jeitos**:

\`\`\`ts
const antiga = nome + " tem " + idade + " anos";   // concatenação
const nova = \`\${nome} tem \${idade} anos\`;          // template string
\`\`\`

A template string usa **crase** (\`) no lugar das aspas e \`\${ }\` para colocar o valor.

Monte a frase \`Ana tem 20 anos\` do jeito novo e mostre.

> Crase no teclado ABNT2: a tecla à direita do \`´\`, apertada **junto com espaço**.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'Template string',
  explain:'Com concatenação é fácil esquecer um espaço ou uma aspa. Na template string, o texto fica <b>do jeito que sai</b>.',
  code:
`
// Exercício 8: template string
const mensagem = \`\${nome} tem \${idade} anos\`;
console.log(mensagem); // Ana tem 20 anos
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'4 min',
  title:'Exercício 9: um item por volta',
  md:
`O \`forEach\` roda uma função **uma vez para cada item** da lista:

\`\`\`ts
lista.forEach((item) => {
  // 1ª volta: item = primeiro; 2ª volta: item = segundo...
});
\`\`\`

Mostre **cada linguagem** de \`linguagens\` no terminal, uma por linha.

> Esse padrão (lista + \`forEach\`) é a base pra gerar elementos na tela mais adiante.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'forEach',
  explain:'Quatro itens, quatro voltas. O nome entre parênteses (<code>linguagem</code>) é livre: é o item da vez.',
  code:
`
// Exercício 9: forEach
linguagens.forEach((linguagem) => {
  console.log(linguagem);
});
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'5 min',
  title:'Exercício 10: forEach com posição',
  md:
`Precisa da **posição** do item? O \`forEach\` entrega como segundo parâmetro, começando em **0**:

\`\`\`ts
lista.forEach((item, i) => { ... });
\`\`\`

Mostre, com **template string**:

\`\`\`
Linguagem 1: JavaScript
Linguagem 2: TypeScript
...
\`\`\`

> A posição começa em 0, mas a numeração da lista deve começar em 1.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'forEach + template string',
  explain:'<code>i + 1</code> dentro do <code>\\${ }</code>: dá pra fazer conta no meio da template string.',
  code:
`
// Exercício 10: forEach com posição
linguagens.forEach((linguagem, i) => {
  console.log(\`Linguagem \${i + 1}: \${linguagem}\`);
});
`
},
{
  part:'1 · TypeScript essencial', op:'challenge', time:'3 min',
  title:'Exercício 11: leia a mensagem com calma',
  md:
`Chame \`media("8", 6)\` e leia **a mensagem inteira** do \`tsc\`.

1. Qual **arquivo** e qual **linha**?
2. Qual argumento está errado?
3. O que o TypeScript esperava?

> Aprender a ler erro é metade de programar.`
},
{
  part:'1 · TypeScript essencial', op:'code', file:'src/treino.ts',
  title:'Mensagem de erro',
  explain:'<b>Argument of type \'string\' is not assignable to parameter of type \'number\'</b>: o 1º argumento é texto, o parâmetro pede número. O erro aponta o arquivo, a linha e a coluna.',
  code:
`
console.log(media("8", 6));
`
},
{
  part:'1 · TypeScript essencial', op:'replace', file:'src/treino.ts',
  find:`
console.log(media("8", 6));
`,
  title:'Apagar o erro de propósito',
  explain:'Fim do treino. O <code>treino.ts</code> está limpo e compilando.'
},

/* ----------------------------------------------------------------------
   Parte 2: DOM com TypeScript
   ---------------------------------------------------------------------- */
{
  part:'2 · DOM com TypeScript', op:'note',
  title:'A árvore e seus filhos',
  md:
`Cada tag do HTML vira um **nó** na árvore do DOM.

\`\`\`
body
├── h1
└── ul#lista
    ├── li
    ├── li
    └── li
\`\`\`

- **\`children\`** lista os **filhos** de um nó que são elementos;
- **\`children.length\`** conta quantos filhos ele tem. Na árvore acima, \`lista.children.length\` vale \`3\`.

No placar só **mudamos** elementos que já existiam. Agora vamos **criar** elementos novos pelo código.`
},
{
  part:'2 · DOM com TypeScript', op:'file', target:'index.html',
  title:'Criar index.html',
  explain:'Uma página bem simples: um título e uma <b>lista vazia</b>. Quem vai preencher a lista é o TypeScript.'
},
{
  part:'2 · DOM com TypeScript', op:'code', file:'index.html',
  title:'Título, lista vazia e script',
  explain:'A lista tem <code>id="lista"</code> pra o código achá-la. O <code>&lt;script&gt;</code> aponta para <b><code>dist/app.js</code></b>, nunca para o <code>.ts</code>: o navegador só entende JavaScript.',
  code:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Minhas tecnologias</title>
</head>
<body>
  <h1>Minhas tecnologias</h1>
  <ul id="lista"></ul>

  <script src="dist/app.js"></script>
</body>
</html>
`
},
{
  part:'2 · DOM com TypeScript', op:'file', target:'src/app.ts',
  title:'Criar src/app.ts',
  explain:'O código da página. Depois de salvar, rode <code>npm run build</code> (ou deixe <code>npm run dev</code> aberto) pra gerar <code>dist/app.js</code>.'
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'5 min',
  title:'Exercício 12: achar a lista com o tipo certo',
  md:
`\`getElementById("lista")\` encontra o elemento, mas o TypeScript só sabe que é um "elemento qualquer, **ou \`null\`** se não achar".

Para dizer **qual** elemento é, usamos **\`as\`** com o tipo da tag:

- \`<ul>\` → \`HTMLUListElement\`
- \`<input>\` → \`HTMLInputElement\`
- \`<button>\` → \`HTMLButtonElement\`
- \`<span>\` → \`HTMLSpanElement\`

Guarde a lista numa constante \`lista\` do tipo certo e mostre ela no Console do navegador.

> Com o tipo certo, o editor passa a **sugerir** as propriedades do elemento.`
},
{
  part:'2 · DOM com TypeScript', op:'code', file:'src/app.ts',
  title:'getElementById + as',
  explain:'O <code>as HTMLUListElement</code> é uma <b>type assertion</b>: você <b>avisa</b> ao TypeScript o tipo. Ela <b>não verifica nada</b> na hora de rodar.',
  code:
`const lista = document.getElementById("lista") as HTMLUListElement;
console.log(lista);
`
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'4 min',
  title:'Exercício 13: o perigo do null',
  md:
`O que acontece se o **id estiver errado**? Procure \`"titlo"\` (faltou o "u"):

\`\`\`ts
const titulo = document.getElementById("titlo");
\`\`\`

1. O que \`titulo\` vale?
2. Escreva um \`if\` que mostra \`"id errado!"\` quando isso acontecer.

> Erro clássico do Console: **Cannot read properties of null**. Causa nº 1: id digitado errado.`
},
{
  part:'2 · DOM com TypeScript', op:'code', file:'src/app.ts',
  title:'Checando o null',
  explain:'Com o id errado o resultado é <code>null</code>, <b>com ou sem</b> o <code>as</code>. O <code>if</code> evita o erro na hora de usar o elemento.',
  code:
`
const titulo = document.getElementById("titlo");
if (titulo === null) {
  console.log("id errado!");
}
`
},
{
  part:'2 · DOM com TypeScript', op:'replace', file:'src/app.ts',
  find:`
const titulo = document.getElementById("titlo");
if (titulo === null) {
  console.log("id errado!");
}
`,
  title:'Apagar o teste do id errado',
  explain:'Já aprendemos o que fazer. Tiramos o teste pra não poluir o Console.'
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'5 min',
  title:'Exercício 14: criar um item (e esquecer de colocar)',
  md:
`Criar um elemento tem **três passos**:

1. **\`createElement\`**: cria o elemento, **só na memória**;
2. **\`textContent\`**: define o texto dele;
3. **\`appendChild\`**: coloca no pai. **Só agora aparece na tela**.

Faça só os **dois primeiros** passos para um \`<li>\` com o texto **Git**, e mostre \`lista.children.length\`.

1. O item aparece na página?
2. Quanto vale \`children.length\`?

Depois acrescente o passo 3 e compare.`
},
{
  part:'2 · DOM com TypeScript', op:'code', file:'src/app.ts',
  title:'createElement e textContent',
  explain:'Atualize a página: <b>nada aparece</b> e o Console mostra <code>0</code>. O <code>li</code> existe na memória, mas ainda não está na árvore.',
  code:
`
const item = document.createElement("li");
item.textContent = "Git";
console.log(lista.children.length);
`
},
{
  part:'2 · DOM com TypeScript', op:'insert', file:'src/app.ts', after:'item.textContent = "Git";',
  title:'appendChild: agora aparece',
  explain:'Com o <code>appendChild</code>, o <b>Git</b> aparece na tela e o Console mostra <code>1</code>. Sem ele, o elemento existe, mas a página não sabe dele.',
  code:`lista.appendChild(item);
`
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'6 min',
  title:'Exercício 15: virar uma função',
  md:
`Para criar **vários** itens, repetir esses três passos seria cansativo. Vamos **guardar a receita numa função**:

\`\`\`ts
function criarItem(nome: string): void
\`\`\`

Ela recebe o **nome** da tecnologia, cria o \`<li>\`, coloca o texto e insere na lista. Não devolve nada (\`void\`).

Troque o código solto pela função e chame \`criarItem("Git")\` e \`criarItem("TypeScript")\`.`
},
{
  part:'2 · DOM com TypeScript', op:'replace', file:'src/app.ts',
  find:`const item = document.createElement("li");
item.textContent = "Git";
lista.appendChild(item);
console.log(lista.children.length);
`,
  title:'criarItem',
  explain:'Os mesmos três passos, agora dentro de uma função: <code>"Git"</code> virou o <b>parâmetro</b> <code>nome</code>. Dois itens aparecem e o Console mostra <code>2</code>.',
  code:
`function criarItem(nome: string): void {
  const li = document.createElement("li");
  li.textContent = nome;
  lista.appendChild(li);
}

criarItem("Git");
criarItem("TypeScript");
console.log(lista.children.length);
`
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'5 min',
  title:'Exercício 16: a lista vem de um array',
  md:
`Em vez de chamar \`criarItem\` na mão, guarde os nomes **num array** e deixe o \`forEach\` fazer o trabalho:

1. crie \`techs\`, um \`string[]\`, com \`"Git"\` e \`"TypeScript"\`;
2. use \`forEach\` para chamar \`criarItem\` de cada nome.

> Cada volta do \`forEach\` cria um \`li\` **novo** e o insere. Por isso a lista termina com um item por nome.`
},
{
  part:'2 · DOM com TypeScript', op:'replace', file:'src/app.ts',
  find:`criarItem("Git");
criarItem("TypeScript");
`,
  title:'forEach desenha a lista',
  explain:'Agora é só <b>acrescentar um nome ao array</b> pra ele aparecer na página. O array virou a "fonte da verdade" e a tela é só o desenho dele.',
  code:
`const techs: string[] = ["Git", "TypeScript"];

techs.forEach((nome) => criarItem(nome));
`
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'6 min',
  title:'Exercício 17: contar os itens (Laboratório, nível 1)',
  md:
`**Laboratório · Nível 1:** a página precisa mostrar **quantas tecnologias** existem.

1. No HTML, um parágrafo \`<span id="total">0</span> tecnologias\`;
2. No TypeScript, selecione o \`total\` (é um \`HTMLSpanElement\`);
3. A cada item criado, escreva em \`total\` o valor de \`lista.children.length\`.

> \`textContent\` só aceita **texto**: converta o número com \`String(...)\`.`
},
{
  part:'2 · DOM com TypeScript', op:'insert', file:'index.html', before:'  <ul id="lista"></ul>',
  title:'O parágrafo do total',
  explain:'O número fica dentro de um <code>&lt;span&gt;</code> com <code>id</code>: assim o código troca só o número.',
  code:`  <p><span id="total">0</span> tecnologias</p>
`
},
{
  part:'2 · DOM com TypeScript', op:'insert', file:'src/app.ts', after:'const lista = document.getElementById("lista") as HTMLUListElement;',
  title:'Selecionar o total',
  explain:'Mais um elemento com o tipo certo: <code>HTMLSpanElement</code>.',
  code:`const total = document.getElementById("total") as HTMLSpanElement;
`
},
{
  part:'2 · DOM com TypeScript', op:'insert', file:'src/app.ts', after:'  lista.appendChild(li);',
  title:'Atualizar o total a cada item',
  explain:'<code>children.length</code> é um número; <code>String(...)</code> o transforma em texto para o <code>textContent</code>.',
  code:`  total.textContent = String(lista.children.length);
`
},
{
  part:'2 · DOM com TypeScript', op:'replace', file:'src/app.ts',
  find:`console.log(lista.children.length);
`,
  title:'Apagar o console.log',
  explain:'A tela já mostra o total. O <code>console.log</code> de teste não é mais necessário. <b>Nível 1 completo.</b>'
},
{
  part:'2 · DOM com TypeScript', op:'note',
  title:'Removendo elementos',
  md:
`Três formas de tirar coisas da página:

\`\`\`ts
lista.removeChild(item); // pelo pai: precisa de quem é o pai
item.remove();           // o próprio elemento, mais direto
lista.innerHTML = "";    // limpa TODOS os filhos
\`\`\`

Os dois primeiros tiram **um** nó da árvore. Vamos usar o \`remove()\` no nível 3.

> Depois de remover, **atualize o total**: o \`children.length\` mudou.`
},
{
  part:'2 · DOM com TypeScript', op:'challenge', time:'5 min',
  title:'Exercício 18: textContent ou innerHTML?',
  md:
`Sem escrever código no projeto. Abra o **Console** (F12) da página e rode, **uma linha de cada vez**:

\`\`\`js
document.querySelector("h1").textContent = "<b>Oi</b>";
document.querySelector("h1").innerHTML = "<b>Oi</b>";
\`\`\`

1. O que cada linha mostra na tela?
2. Qual dos dois é **seguro** para um texto que **o usuário digitou**?`
},
{
  part:'2 · DOM com TypeScript', op:'note',
  title:'Seguro × cuidado',
  md:
`- **\`textContent\`** trata tudo como **texto puro**. \`"<b>Oi</b>"\` aparece **com as tags**, na tela. **Ideal para o que o usuário digita.**
- **\`innerHTML\`** **interpreta o texto como HTML**: \`"<b>Oi</b>"\` vira **Oi** em negrito. Com dado do usuário, abre brecha para **código malicioso** (XSS).

Também existe \`querySelector("#lista")\`: encontra pelo **seletor CSS** (com o \`#\`) e devolve o **primeiro** que combinar. \`querySelectorAll("li")\` devolve **todos**.

> Regra prática: texto vindo do usuário, **sempre \`textContent\`**.`
},

/* ----------------------------------------------------------------------
   Laboratório: níveis 2 e 3
   ---------------------------------------------------------------------- */
{
  part:'Laboratório · Nível 2', op:'challenge', time:'15 min',
  title:'Laboratório: adicionar pelo campo',
  md:
`**Nível 2 · Intermediário.** A lista deixa de ser fixa: quem usa a página adiciona tecnologias.

1. No HTML: um \`<input id="campo">\` e um \`<button id="btnAdd">Adicionar</button>\`;
2. No TypeScript: selecione os dois (\`HTMLInputElement\` e \`HTMLButtonElement\`);
3. Ouça o clique no botão e **leia o texto** do campo com \`campo.value.trim()\`;
4. **Ignore texto vazio** e **limpe o campo** depois de adicionar.

Vamos devagar: primeiro só ler, depois criar, depois proteger.`
},
{
  part:'Laboratório · Nível 2', op:'insert', file:'index.html', after:'  <h1>Minhas tecnologias</h1>',
  title:'O campo e o botão',
  explain:'O <code>placeholder</code> é o texto cinza de ajuda dentro do campo.',
  code:
`  <input id="campo" placeholder="Ex.: Git">
  <button id="btnAdd">Adicionar</button>
`
},
{
  part:'Laboratório · Nível 2', op:'insert', file:'src/app.ts', after:'const total = document.getElementById("total") as HTMLSpanElement;',
  title:'Selecionar o campo e o botão',
  explain:'Cada elemento com o <b>tipo exato</b> da tag: o editor passa a sugerir <code>.value</code> pro input.',
  code:
`const campo = document.getElementById("campo") as HTMLInputElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
`
},
{
  part:'Laboratório · Nível 2', op:'code', file:'src/app.ts',
  title:'Passo 1: só ler o campo',
  explain:'Digite algo, clique e veja no Console. O <code>trim()</code> tira espaços do começo e do fim: <code>"  Git  "</code> vira <code>"Git"</code>.',
  code:
`
btnAdd.addEventListener("click", () => {
  const nome = campo.value.trim();
  console.log(nome);
});
`
},
{
  part:'Laboratório · Nível 2', op:'replace', file:'src/app.ts',
  find:`  console.log(nome);
`,
  title:'Passo 2: criar o item',
  explain:'Agora o clique cria o item e limpa o campo. Mas <b>cuidado</b>: clique com o campo vazio. O que acontece?',
  code:
`  criarItem(nome);
  campo.value = "";
`
},
{
  part:'Laboratório · Nível 2', op:'replace', file:'src/app.ts',
  find:`  criarItem(nome);
  campo.value = "";
`,
  title:'Passo 3: ignorar texto vazio',
  explain:'Com o campo vazio, aparecia um item sem nome. O <code>if (nome !== "")</code> só deixa passar quando <b>tem</b> texto. <b>Nível 2 completo.</b>',
  code:
`  if (nome !== "") {
    criarItem(nome);
    campo.value = "";
  }
`
},
{
  part:'Laboratório · Nível 3', op:'challenge', time:'20 min',
  title:'Laboratório: o craque',
  md:
`**Nível 3 · Craque.** Três melhorias:

1. um botão **remover** em cada item (crie com \`createElement\`, ouça o clique, chame \`li.remove()\`);
2. **sem repetidos**: não adicione uma tecnologia que já está na lista (\`includes\`);
3. clicar no **nome** do item **risca** ele (\`classList.toggle\`).

A cada passo, teste na página.

> \`classList\` liga e desliga **classes**: \`add\` liga, \`remove\` desliga e \`toggle\` **alterna** (liga se estava desligada, desliga se estava ligada).`
},
{
  part:'Laboratório · Nível 3', op:'replace', file:'src/app.ts',
  find:`  li.textContent = nome;
  lista.appendChild(li);
`,
  title:'Botão remover',
  explain:'O botão é criado <b>dentro de <code>criarItem</code></b>, então cada item tem o seu. Ao clicar: o <code>li</code> se remove e o total é recalculado.',
  code:
`  li.textContent = nome;

  const remover = document.createElement("button");
  remover.textContent = "remover";
  remover.addEventListener("click", () => {
    li.remove();
    total.textContent = String(lista.children.length);
  });
  li.appendChild(remover);

  lista.appendChild(li);
`
},
{
  part:'Laboratório · Nível 3', op:'replace', file:'src/app.ts',
  find:`    li.remove();
`,
  title:'Remover também do array',
  explain:'O array <code>techs</code> é a lista "de verdade". Se o item sair só da tela, ele continuaria no array e não daria pra adicionar de novo. <code>splice(posição, 1)</code> apaga <b>1</b> item daquela posição.',
  code:
`    li.remove();
    techs.splice(techs.indexOf(nome), 1);
`
},
{
  part:'Laboratório · Nível 3', op:'replace', file:'src/app.ts',
  find:`  if (nome !== "") {
    criarItem(nome);
    campo.value = "";
  }
`,
  title:'Sem repetidos',
  explain:'<code>includes</code> responde <code>true</code> se o texto já está no array; o <code>!</code> inverte: "<b>se não</b> está". Só então guardamos no array, criamos o item e limpamos o campo.',
  code:
`  if (nome !== "") {
    if (!techs.includes(nome)) {
      techs.push(nome);
      criarItem(nome);
      campo.value = "";
    }
  }
`
},
{
  part:'Laboratório · Nível 3', op:'insert', file:'index.html', after:'  <title>Minhas tecnologias</title>',
  title:'Uma única regra de CSS',
  explain:'O <b>único CSS da aula</b>: uma classe chamada <code>feito</code> que risca o texto. O TypeScript só <b>liga e desliga</b> essa classe; o visual fica no CSS.',
  code:
`  <style>
    .feito { text-decoration: line-through; }
  </style>
`
},
{
  part:'Laboratório · Nível 3', op:'replace', file:'src/app.ts',
  find:`  li.textContent = nome;
`,
  title:'classList.toggle',
  explain:'O nome agora mora num <code>&lt;span&gt;</code>, pra o clique no <b>nome</b> não se confundir com o clique no botão. <code>toggle("feito")</code> alterna a classe a cada clique. <b>Nível 3 completo.</b>',
  code:
`  const texto = document.createElement("span");
  texto.textContent = nome;
  texto.addEventListener("click", () => {
    li.classList.toggle("feito");
  });
  li.appendChild(texto);
`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Minhas tecnologias, versão 1',
  md:
`## Conceitos de hoje
- **Tipos:** \`string\`, \`number\`, \`boolean\`, \`string[]\`. Anotação (\`: tipo\`) ou inferência.
- **Funções tipadas:** o que entra e o que sai; \`void\` quando não devolve nada.
- **\`forEach\`:** uma volta por item (e a posição como 2º parâmetro). **Template string:** \`\${valor}\`.
- **\`getElementById\` + \`as\`:** encontrar com o tipo certo. \`null\` se o id estiver errado.
- **\`createElement\` → \`textContent\` → \`appendChild\`:** criar, configurar, inserir. Sem o \`appendChild\`, nada aparece.
- **\`remove()\`** tira do DOM. **\`classList.toggle\`** liga e desliga uma classe.
- **\`textContent\`** é seguro; **\`innerHTML\`** exige cuidado.

## Exercícios pra casa
1. **Limpar tudo:** um botão que remove todos os itens da lista e zera o total (e o array \`techs\`).
2. **Tecnologia em maiúsculas:** ao adicionar, guarde o nome com a primeira letra maiúscula.
3. **Mensagem de erro:** se a pessoa tentar adicionar um item repetido, mostre \`"Já está na lista"\` num parágrafo.
4. **Contador singular/plural:** \`1 tecnologia\` e \`2 tecnologias\`.

> Terminou? Faça **commit e push**: o projeto volta na próxima aula pra ser **organizado**.`
},
];

/* A dependência do TypeScript "acende" na etapa que cria o package.json */
const DEP_STEP = STEPS.findIndex(s => s.op === 'code' && s.file === 'package.json');

global.AULA_TYPESCRIPT_DOM = {
  meta: {
    titulo:    'Construindo a página com TypeScript',
    projeto:   'minhas-tecnologias',
    subtitulo: 'Coding · TypeScript + DOM',
    vazio:     'Projeto vazio.<br>Vamos criar a pasta, o TypeScript e a página.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
