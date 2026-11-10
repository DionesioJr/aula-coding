/* =========================================================================
   AULA: JavaScript básico, falando com o computador (disciplina de Coding)

   Um assunto só: o básico da linguagem, sem página e sem CSS, direto no
   terminal. Em vez de um programa grande, a turma faz NOVE EXEMPLOS
   PEQUENOS, um arquivo cada (de 3 a 20 linhas), do mais fácil ao mais
   difícil:

     1. mostrar uma mensagem (console.log)     6. funções
     2. variáveis (let e const)                7. if
     3. tipos de dados                         8. if / else
     4. contas                                 9. desafio: mini placar
     5. comparações

   Cada exemplo segue o mesmo ciclo: slide de TEORIA curto (o que é a
   coisa, com um exemplo mínimo) -> cartão roxo "Sua vez" (a turma cria
   sozinha) -> solução digitada -> teste no terminal. Os exemplos não
   dependem uns dos outros: cada arquivo roda sozinho.

   Esta aula é o começo da trilha: a próxima é "Manipulando o DOM", que
   usa as mesmas ideias para mudar uma página de verdade.

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* Projeto começa vazio: tudo é criado durante a aula. */
const INITIAL_ENTRIES = [];
const INITIAL_FILES = {};

/* Sem bibliotecas: só o Node (ou o Console do navegador). */
const DEP_STEP = 0;
const DEPS = [];

/* =========================================================================
   ROTEIRO
   ops: intro | note | challenge | outro | folder | file | code | insert | replace | clear | delete | rename
   ========================================================================= */
const STEPS = [

/* ----------------------------------------------------------------------
   TEORIA GERAL
   ---------------------------------------------------------------------- */
{
  part:'Teoria', op:'intro',
  title:'JavaScript básico: falando com o computador',
  eyebrow:'Coding · JavaScript no terminal',
  md:
`Hoje você dá os **primeiros passos em JavaScript**, a linguagem que faz as páginas da internet **pensarem e reagirem**. Antes de mexer em página nenhuma, vamos aprender a **conversar com o computador** pelo terminal.

Em vez de um programa grande, são **nove exemplos pequenos**, um arquivo cada, do mais fácil ao mais difícil:

1. **Mostrar uma mensagem** (\`console.log\`)
2. **Variáveis** (\`let\` e \`const\`)
3. **Tipos de dados** (número, texto, verdadeiro ou falso)
4. **Contas** (somar, subtrair, \`+=\`, \`++\`)
5. **Comparações** (\`<\`, \`>\`, \`===\`)
6. **Funções** (uma receita que você reutiliza)
7. **O \`if\`** (decidir)
8. **\`if\` / \`else\`** (decidir entre vários caminhos)
9. **Desafio:** um mini placar de futebol no terminal

> Nos cartões **roxos** a aula para e é a vez da turma. **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Teoria', op:'note',
  title:'O que é programar?',
  md:
`Um programa é uma **lista de instruções**, escritas em ordem, como uma receita de bolo:

\`\`\`
1. Pegue 2 ovos
2. Bata os ovos
3. Misture a farinha
\`\`\`

O computador é **muito obediente e nada esperto**: faz **exatamente** o que está escrito, **de cima para baixo, uma linha por vez**. Se faltar um passo, ele não adivinha: **para e mostra um erro**.

Cada instrução em JavaScript é uma **linha de código**, e termina com \`;\`.

> **Pergunta pra turma:** se a receita mandasse "misture a farinha" **antes** de "pegue a farinha", o que aconteceria?`
},
{
  part:'Teoria', op:'note',
  title:'O que é JavaScript?',
  md:
`Uma página web é feita de três linguagens, cada uma com um papel:

- **HTML**, a estrutura: o que existe na página. É o **esqueleto**.
- **CSS**, a aparência: cores e tamanhos. É a **roupa**.
- **JavaScript**, o comportamento: contar, decidir, reagir a cliques. São os **músculos**.

O JavaScript roda **no navegador** (é o que faz a página mexer) e também **no computador**, pelo programa **Node**. Hoje usamos o segundo: **sem página, sem CSS**, só o terminal. Assim o foco fica na **lógica**, que é a mesma nos dois lugares.

> Nas próximas aulas essa mesma lógica vai mudar uma página de verdade.`
},
{
  part:'Teoria', op:'note',
  title:'Como rodar um exemplo',
  md:
`Cada exemplo é um arquivo \`.js\`. Para rodar, abra o terminal na pasta do projeto e use o **Node**:

\`\`\`bash
node exemplos/ex1-mensagem.js
\`\`\`

- Confira se o Node está instalado: \`node -v\` mostra a versão.
- Sem o Node? Cole o código no **Console** do navegador (**F12 → Console**), o resultado aparece ali.
- Mudou o código? **Salve** e rode de novo.

> Apareceu um **erro vermelho**? Calma: ele diz **em qual linha** está o problema. Ler o erro faz parte do trabalho.`
},
{
  part:'Teoria', op:'note',
  title:'Como cada exemplo funciona',
  md:
`Todo exemplo segue os mesmos quatro passos:

1. **Teoria:** um slide curto explicando a peça nova do dia.
2. **Sua vez** (cartão roxo): vocês criam o exemplo **sozinhos**.
3. **Solução:** o código aparece sendo digitado, pra comparar com o de vocês.
4. **Teste:** rodar e ver o resultado no terminal.

Os exemplos ficam na pasta \`exemplos/\`, um arquivo cada, e **cada um roda sozinho**: não precisa do anterior.

> Errou? Ótimo, é pra isso que serve o "Sua vez". Compare com a solução e descubra **onde** foi a diferença.`
},

/* ----------------------------------------------------------------------
   EXEMPLO 1: mostrar uma mensagem
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 1: mostrar uma mensagem', op:'note',
  title:'Teoria: console.log, o programa que fala',
  md:
`Para a gente **ver** o que o programa está fazendo, ele precisa **falar**. Em JavaScript, quem fala é o \`console.log\`: o que estiver entre os parênteses **aparece no terminal**.

\`\`\`js
console.log("Olá!");
\`\`\`

\`\`\`
console.log(  "Olá!"  );
│             └─ o que vai ser mostrado
└─ o comando "mostrar no terminal"
\`\`\`

- **Texto** vai sempre **entre aspas**: \`"Olá!"\`.
- **Números** não levam aspas: \`2026\`.
- **Contas** são resolvidas antes de mostrar: \`7 + 3\` aparece como \`10\`.
- Várias coisas de uma vez: separe por **vírgula**.
- Tudo depois de \`//\` é **comentário**: o computador ignora, é só uma nota pra gente.

> **Pense:** o que aparece se escrevermos \`console.log("7 + 3")\`, **com aspas**?`
},
{
  part:'Exemplo 1: mostrar uma mensagem', op:'challenge', time:'3 min',
  title:'Sua vez: Exemplo 1, a primeira mensagem',
  md:
`Crie o arquivo \`exemplos/ex1-mensagem.js\` e mostre no terminal:

1. o texto \`Olá, mundo!\`;
2. o número \`2026\`;
3. o resultado da conta \`7 + 3\`;
4. duas coisas na **mesma linha**: o texto \`"Gols:"\` e o número \`3\`.

> Funcionou se aparecem **quatro linhas** no terminal.`
},
{
  part:'Exemplo 1: mostrar uma mensagem', op:'file', target:'exemplos/ex1-mensagem.js',
  title:'Solução: criar o Exemplo 1',
  explain:'A pasta <code>exemplos</code> é criada junto, automaticamente.'
},
{
  part:'Exemplo 1: mostrar uma mensagem', op:'code', file:'exemplos/ex1-mensagem.js',
  title:'Quatro console.log',
  explain:'Uma linha por mensagem. Na última, a vírgula separa as duas coisas e o terminal coloca um espaço entre elas.',
  code:
`// Exemplo 1: mostrar uma mensagem
console.log("Olá, mundo!");
console.log(2026);
console.log(7 + 3); // 10
console.log("Gols:", 3); // Gols: 3
`
},
{
  part:'Exemplo 1: mostrar uma mensagem', op:'note',
  title:'Teste: o terminal fala',
  md:
`Rode \`node exemplos/ex1-mensagem.js\`. O terminal deve mostrar:

\`\`\`
Olá, mundo!
2026
10
Gols: 3
\`\`\`

Agora **quebre de propósito**, pra ver o que acontece:

1. Tire as aspas de \`"Olá, mundo!"\` e rode: aparece um **erro vermelho**. Leia a mensagem, ela aponta a linha.
2. Desfaça. Depois escreva \`console.log("7 + 3")\`: com aspas é **texto**, o computador **não faz a conta**, só repete o que está escrito.`
},

/* ----------------------------------------------------------------------
   EXEMPLO 2: variáveis
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 2: variáveis', op:'note',
  title:'Teoria: variável, uma caixa com nome',
  md:
`Um programa precisa **lembrar** das coisas: o placar, o nome do time. Pra isso existem as **variáveis**: uma **caixa com nome** que guarda um valor.

\`\`\`js
let contador = 0;
\`\`\`

\`\`\`
let   contador   =   0;
│     │                └─ o valor guardado
│     └─ o nome da caixa
└─ palavra que cria a caixa
\`\`\`

Existem dois tipos de caixa:

- **\`let\`**: o valor **pode mudar** depois.
- **\`const\`**: o valor é **fixo**, não muda nunca.

\`\`\`js
let vidas = 3;
vidas = 2;              // pode: let aceita novo valor
const mascote = "Leão"; // const: fica assim pra sempre
\`\`\`

> **Pergunta pra turma:** no placar de um jogo, o que **muda** (\`let\`) e o que **nunca muda** (\`const\`)?`
},
{
  part:'Exemplo 2: variáveis', op:'challenge', time:'3 min',
  title:'Sua vez: Exemplo 2, caixas com nome',
  md:
`Crie \`exemplos/ex2-variaveis.js\`:

1. uma variável \`contador\` começando em \`0\`, que depois passa a valer \`5\`;
2. uma constante \`time\` com o texto \`"Brasil"\`;
3. mostre as duas no terminal.

Depois tente trocar o valor de \`time\` (\`time = "Argentina";\`). O que acontece?`
},
{
  part:'Exemplo 2: variáveis', op:'file', target:'exemplos/ex2-variaveis.js',
  title:'Solução: criar o Exemplo 2',
},
{
  part:'Exemplo 2: variáveis', op:'code', file:'exemplos/ex2-variaveis.js',
  title:'let e const',
  explain:'<code>let</code> aceita nova atribuição. Texto vai sempre entre aspas. A última linha está comentada de propósito: no teste vocês vão tirar o <code>//</code>.',
  code:
`// Exemplo 2: variáveis
let contador = 0;
contador = 5;
const time = "Brasil";

console.log(contador); // 5
console.log(time); // Brasil

// time = "Argentina"; // tire o // e rode: dá erro, const não muda
`
},
{
  part:'Exemplo 2: variáveis', op:'note',
  title:'Teste: o erro da const',
  md:
`Rode o exemplo. O terminal mostra:

\`\`\`
5
Brasil
\`\`\`

Agora **tire o \`//\`** da última linha e rode de novo. Aparece:

\`\`\`
TypeError: Assignment to constant variable.
\`\`\`

É o computador te protegendo: o que é \`const\` **não pode ser trocado**. Volte o \`//\`.

> Regra prática: comece com \`const\`. Só use \`let\` quando o valor **realmente precisar mudar**.`
},

/* ----------------------------------------------------------------------
   EXEMPLO 3: tipos de dados
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 3: tipos de dados', op:'note',
  title:'Teoria: todo valor tem um tipo',
  md:
`Todo valor tem um **tipo**, que diz **que espécie de coisa ele é**. Por enquanto, três:

- **\`number\`**: números, para fazer contas. Ex.: \`10\`, \`3.5\`.
- **\`string\`**: texto, sempre entre aspas. Ex.: \`"Brasil"\`.
- **\`boolean\`**: só dois valores, \`true\` (verdadeiro) e \`false\` (falso), **sem aspas**.

O operador **\`typeof\`** responde qual é o tipo:

\`\`\`js
console.log(typeof 3.5); // number
\`\`\`

> Cuidado: \`"10"\` **com aspas** é **texto**, não número. Parece igual, mas se comporta diferente.
>
> No placar, os gols são **number**, o nome do time é **string** e "o jogo acabou?" é **boolean**.`
},
{
  part:'Exemplo 3: tipos de dados', op:'challenge', time:'3 min',
  title:'Sua vez: Exemplo 3, que tipo é esse?',
  md:
`Crie \`exemplos/ex3-tipos.js\` e mostre o \`typeof\` de:

1. o número \`10\`;
2. o texto \`"Preparado?"\`;
3. o valor \`true\`;
4. o texto \`"10"\` (com aspas!).

> **Antes de rodar**, escreva o seu palpite para cada um. Algum vai te surpreender?`
},
{
  part:'Exemplo 3: tipos de dados', op:'file', target:'exemplos/ex3-tipos.js',
  title:'Solução: criar o Exemplo 3',
},
{
  part:'Exemplo 3: tipos de dados', op:'code', file:'exemplos/ex3-tipos.js',
  title:'typeof',
  explain:'<code>number</code> para contas, <code>string</code> para texto, <code>boolean</code> para verdadeiro ou falso. O <code>"10"</code> com aspas é <b>string</b>.',
  code:
`// Exemplo 3: tipos de dados
console.log(typeof 10); // number
console.log(typeof "Preparado?"); // string
console.log(typeof true); // boolean
console.log(typeof "10"); // string, as aspas viram texto
`
},
{
  part:'Exemplo 3: tipos de dados', op:'note',
  title:'Teste: a surpresa do "10"',
  md:
`O terminal deve mostrar:

\`\`\`
number
string
boolean
string
\`\`\`

A última linha é a pegadinha: \`10\` e \`"10"\` **parecem** iguais, mas o primeiro é número e o segundo é **texto**. Isso vai importar já já, nas comparações.

> Experimente: \`typeof false\`, \`typeof 3.5\`, \`typeof ""\` (aspas vazias). Acertou o palpite?`
},

/* ----------------------------------------------------------------------
   EXEMPLO 4: contas
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 4: contas', op:'note',
  title:'Teoria: contas e somar 1',
  md:
`O JavaScript faz contas com os símbolos de sempre:

- \`+\` soma &nbsp;·&nbsp; \`-\` subtrai &nbsp;·&nbsp; \`*\` multiplica &nbsp;·&nbsp; \`/\` divide

Para **guardar** o resultado, usamos uma variável. E somar 1 é tão comum (um gol!) que existem **três jeitos** de escrever a mesma coisa:

\`\`\`js
let gols = 0;
gols = gols + 1;  // gols recebe gols mais 1
gols += 1;        // atalho do de cima
gols++;           // atalho do atalho (só serve pra somar 1)
\`\`\`

> O \`=\` em programação **não é "igual"**: é "**guarde** o resultado da direita na caixa da esquerda". Por isso \`gols = gols + 1\` faz sentido.`
},
{
  part:'Exemplo 4: contas', op:'challenge', time:'4 min',
  title:'Sua vez: Exemplo 4, somar 1 de três jeitos',
  md:
`Crie \`exemplos/ex4-contas.js\`:

1. mostre o resultado de \`10 + 5\`, \`10 - 5\`, \`10 * 5\` e \`10 / 5\`;
2. crie \`pontos\` valendo \`5\` e aplique **os três jeitos** de somar 1, um depois do outro;
3. mostre \`pontos\`. Qual número aparece?`
},
{
  part:'Exemplo 4: contas', op:'file', target:'exemplos/ex4-contas.js',
  title:'Solução: criar o Exemplo 4',
},
{
  part:'Exemplo 4: contas', op:'code', file:'exemplos/ex4-contas.js',
  title:'Contas e os três jeitos',
  explain:'As três últimas somas fazem a mesma coisa: somam 1 ao que já estava na caixa. 5 + 1 + 1 + 1 = <b>8</b>.',
  code:
`// Exemplo 4: contas
console.log(10 + 5); // 15
console.log(10 - 5); // 5
console.log(10 * 5); // 50
console.log(10 / 5); // 2

let pontos = 5;
pontos = pontos + 1;
pontos += 1;
pontos++;
console.log(pontos); // 8
`
},
{
  part:'Exemplo 4: contas', op:'note',
  title:'Teste: três jeitos, o mesmo resultado',
  md:
`O terminal deve mostrar:

\`\`\`
15
5
50
2
8
\`\`\`

Para ver cada jeito funcionando, coloque um \`console.log(pontos);\` **depois de cada soma**: aparece 6, 7 e 8.

> Desafio rápido: troque \`pontos++\` por \`pontos--\` (com dois sinais de menos). O que você acha que ele faz?`
},

/* ----------------------------------------------------------------------
   EXEMPLO 5: comparações
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 5: comparações', op:'note',
  title:'Teoria: comparar é fazer uma pergunta',
  md:
`Comparar é **fazer uma pergunta** ao computador. A resposta é sempre um **boolean**: \`true\` (sim) ou \`false\` (não).

\`\`\`js
console.log(3 < 5); // true:  3 é menor que 5? sim
console.log(3 > 5); // false: 3 é maior que 5? não
\`\`\`

- \`<\` menor &nbsp;·&nbsp; \`>\` maior &nbsp;·&nbsp; \`<=\` menor ou igual &nbsp;·&nbsp; \`>=\` maior ou igual
- \`===\` **igual** &nbsp;·&nbsp; \`!==\` **diferente**

> Atenção: são **três** sinais em \`===\`. Um só (\`=\`) **guarda** um valor numa variável; três **perguntam** se são iguais. E o \`===\` compara **valor e tipo**: \`5 === "5"\` é \`false\`.`
},
{
  part:'Exemplo 5: comparações', op:'challenge', time:'4 min',
  title:'Sua vez: Exemplo 5, adivinhe a resposta',
  md:
`Crie \`exemplos/ex5-comparacoes.js\` com estas cinco linhas:

\`\`\`js
console.log(5 < 10);
console.log(10 <= 10);
console.log(5 === "5");
console.log(5 !== 6);
console.log("gol" === "gol");
\`\`\`

**Antes de rodar**, escreva se cada linha mostra \`true\` ou \`false\`. Depois rode e compare.

> Pegadinha na terceira linha: lembre do \`"10"\` do Exemplo 3.`
},
{
  part:'Exemplo 5: comparações', op:'file', target:'exemplos/ex5-comparacoes.js',
  title:'Solução: criar o Exemplo 5',
},
{
  part:'Exemplo 5: comparações', op:'code', file:'exemplos/ex5-comparacoes.js',
  title:'Cinco perguntas, cinco respostas',
  explain:'<code>5 === "5"</code> é <b>false</b>: o primeiro é number, o segundo é string. Por isso, sempre <code>===</code> e <code>!==</code>.',
  code:
`// Exemplo 5: comparações
console.log(5 < 10); // true
console.log(10 <= 10); // true
console.log(5 === "5"); // false, número e texto são tipos diferentes
console.log(5 !== 6); // true
console.log("gol" === "gol"); // true
`
},
{
  part:'Exemplo 5: comparações', op:'note',
  title:'Teste: acertou os palpites?',
  md:
`O terminal deve mostrar:

\`\`\`
true
true
false
true
true
\`\`\`

Errou algum? Sem problema: é aí que se aprende. O mais comum é a **terceira**, por causa do tipo.

> Experimente: troque \`5 === "5"\` por \`5 == "5"\` (dois sinais). Dá \`true\`! O \`==\` ignora o tipo e **engana**. Por isso usamos sempre \`===\`.`
},

/* ----------------------------------------------------------------------
   EXEMPLO 6: funções
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 6: funções', op:'note',
  title:'Teoria: função, uma receita com nome',
  md:
`Quando uma tarefa se repete, colocamos ela numa **função**: uma **receita com nome** que você escreve **uma vez** e usa **quantas vezes quiser**.

\`\`\`js
function dobro(numero) {
  return numero * 2;
}

console.log(dobro(4)); // 8
\`\`\`

\`\`\`
   entra          função           sai
    (4)   ───►   dobro(...)   ───►  (8)
 parâmetro      numero * 2        return
\`\`\`

- **\`function dobro(numero) { ... }\`** só **escreve a receita**. Nada acontece ainda.
- **\`dobro(4)\`** **usa** a receita. Isso se chama **chamar** a função.
- **\`numero\`** é o **parâmetro**: o que entra. **\`return\`** é o que sai.

> **Pergunta pra turma:** o que \`dobro(10)\` devolve?`
},
{
  part:'Exemplo 6: funções', op:'challenge', time:'4 min',
  title:'Sua vez: Exemplo 6, a função adicionar',
  md:
`Crie \`exemplos/ex6-funcoes.js\`:

1. a função \`adicionar(valor)\`, que **devolve** \`valor + 1\`;
2. **chame** com \`9\` e mostre o resultado;
3. chame com \`41\`;
4. chame \`adicionar(adicionar(1))\`, uma chamada **dentro** da outra. Quanto dá?

> Diferença: **definir** (\`function adicionar...\`) é escrever a receita. **Chamar** (\`adicionar(9)\`) é usá-la.`
},
{
  part:'Exemplo 6: funções', op:'file', target:'exemplos/ex6-funcoes.js',
  title:'Solução: criar o Exemplo 6',
},
{
  part:'Exemplo 6: funções', op:'code', file:'exemplos/ex6-funcoes.js',
  title:'function e return',
  explain:'Sem <code>return</code>, a função devolve <code>undefined</code>. A última chamada resolve de dentro pra fora: <code>adicionar(1)</code> vale 2, e <code>adicionar(2)</code> vale 3.',
  code:
`// Exemplo 6: funções
function adicionar(valor) {
  return valor + 1;
}

console.log(adicionar(9)); // 10
console.log(adicionar(41)); // 42
console.log(adicionar(adicionar(1))); // 3
`
},
{
  part:'Exemplo 6: funções', op:'note',
  title:'Teste: uma receita, vários usos',
  md:
`O terminal deve mostrar:

\`\`\`
10
42
3
\`\`\`

Repare: **escrevemos a função uma vez** e usamos três vezes. Se um dia o \`+ 1\` virar \`+ 2\`, a gente muda em **um lugar só**.

> Experimente: apague a palavra \`return\` e rode. O que aparece no lugar dos números?`
},

/* ----------------------------------------------------------------------
   EXEMPLO 7: if
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 7: if', op:'note',
  title:'Teoria: if, o programa que decide',
  md:
`Até agora o programa executa **todas** as linhas. O \`if\` ("se") deixa ele **escolher**: o bloco entre \`{ }\` só roda **se** a pergunta der \`true\`.

\`\`\`js
let temperatura = 35;

if (temperatura > 30) {
  console.log("Que calor!");
}
\`\`\`

\`\`\`
if ( pergunta ) {
  // roda só se a resposta for true
}
// daqui pra baixo roda sempre
\`\`\`

> Se \`temperatura\` fosse \`20\`, **nada** apareceria: o bloco seria pulado.`
},
{
  part:'Exemplo 7: if', op:'challenge', time:'5 min',
  title:'Sua vez: Exemplo 7, o if trava no 10',
  md:
`Crie \`exemplos/ex7-if.js\`:

1. uma variável \`gols\` valendo \`9\`;
2. escreva: **se** \`gols\` for menor que 10, some 1 a \`gols\`;
3. mostre \`gols\`;
4. **repita o mesmo \`if\`** e mostre de novo.

O que acontece na **segunda** vez?`
},
{
  part:'Exemplo 7: if', op:'file', target:'exemplos/ex7-if.js',
  title:'Solução: criar o Exemplo 7',
},
{
  part:'Exemplo 7: if', op:'code', file:'exemplos/ex7-if.js',
  title:'if: só faz se for verdade',
  explain:'Na primeira vez 9 &lt; 10, então soma. Na segunda 10 &lt; 10 é <b>false</b>: o bloco é pulado e o valor <b>trava em 10</b>.',
  code:
`// Exemplo 7: if
let gols = 9;

if (gols < 10) {
  gols = gols + 1;
}
console.log(gols); // 10

if (gols < 10) {
  gols = gols + 1;
}
console.log(gols); // 10, o if não deixou passar
`
},
{
  part:'Exemplo 7: if', op:'note',
  title:'Teste: o limite funciona',
  md:
`O terminal mostra \`10\` **duas vezes**. O segundo \`if\` perguntou "10 é menor que 10?", a resposta foi \`false\` e o bloco foi **pulado**.

É assim que um programa impõe **limites**: um contador que não passa de 10, um placar que não fica negativo.

> Experimente: troque \`gols < 10\` por \`gols <= 10\` e rode de novo. O que mudou? Por quê?`
},

/* ----------------------------------------------------------------------
   EXEMPLO 8: if / else
   ---------------------------------------------------------------------- */
{
  part:'Exemplo 8: if / else', op:'note',
  title:'Teoria: else, o "senão"',
  md:
`Com \`else\` ("senão") você diz **o que fazer quando a resposta é não**.

\`\`\`js
let idade = 15;

if (idade >= 18) {
  console.log("Pode votar");
} else {
  console.log("Ainda não pode votar");
}
\`\`\`

\`\`\`
if ( pergunta ) {
  // se for true
} else if ( outra pergunta ) {
  // senão, se esta for true
} else {
  // senão, todo o resto
}
\`\`\`

- As perguntas são feitas **em ordem**: a **primeira** que der \`true\` decide, e as outras são ignoradas.
- O \`else\` final pega **tudo que sobrou**.`
},
{
  part:'Exemplo 8: if / else', op:'challenge', time:'6 min',
  title:'Sua vez: Exemplo 8, quem venceu?',
  md:
`Crie \`exemplos/ex8-if-else.js\` com a função \`quemVenceu(golsA, golsB)\`. Ela **devolve**:

- \`"Time A venceu"\` se A fez mais gols;
- \`"Time B venceu"\` se B fez mais gols;
- \`"Empate"\` nos outros casos.

Teste com \`(2, 1)\`, \`(0, 3)\` e \`(1, 1)\`.

> Dica: \`else if\` encadeia mais uma pergunta antes do \`else\` final.`
},
{
  part:'Exemplo 8: if / else', op:'file', target:'exemplos/ex8-if-else.js',
  title:'Solução: criar o Exemplo 8',
},
{
  part:'Exemplo 8: if / else', op:'code', file:'exemplos/ex8-if-else.js',
  title:'else if e else',
  explain:'As perguntas são feitas em ordem; a primeira verdadeira decide. O <code>else</code> final pega o que sobrou, que aqui só pode ser o empate.',
  code:
`// Exemplo 8: if / else
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
{
  part:'Exemplo 8: if / else', op:'note',
  title:'Teste: três caminhos',
  md:
`O terminal deve mostrar:

\`\`\`
Time A venceu
Time B venceu
Empate
\`\`\`

Cada chamada seguiu **um caminho diferente** dentro da mesma função. Funções e \`if\` juntos: é daqui que sai quase todo programa.

> Experimente: chame \`quemVenceu(5, 5)\` e \`quemVenceu(0, 0)\`. Qual caminho cada um segue?`
},

/* ----------------------------------------------------------------------
   DESAFIO FINAL
   ---------------------------------------------------------------------- */
{
  part:'Desafio final', op:'challenge', time:'10 min',
  title:'Desafio: um mini placar no terminal',
  md:
`Hora de **juntar tudo**. Crie \`exemplos/ex9-mini-placar.js\`:

1. duas variáveis, \`golsA\` e \`golsB\`, começando em \`0\`;
2. a função \`adicionar(valor)\`, que devolve \`valor + 1\`;
3. a função \`quemVenceu(a, b)\` do exemplo anterior;
4. o time A faz **dois** gols e o time B faz **um** (use \`adicionar\`);
5. mostre o placar e quem venceu.

Resultado esperado:

\`\`\`
Placar: 2 x 1
Time A venceu
\`\`\`

> Use o que você já escreveu nos exemplos 6 e 8: copiar e juntar também é programar.`
},
{
  part:'Desafio final', op:'file', target:'exemplos/ex9-mini-placar.js',
  title:'Solução: criar o desafio',
},
{
  part:'Desafio final', op:'code', file:'exemplos/ex9-mini-placar.js',
  title:'Variáveis, funções e if juntos',
  explain:'Duas variáveis guardam o placar, as duas funções fazem o trabalho e o <code>console.log</code> mostra o resultado. É a mesma ideia do placar que vamos fazer na página.',
  code:
`// Desafio: mini placar no terminal
let golsA = 0;
let golsB = 0;

function adicionar(valor) {
  return valor + 1;
}

function quemVenceu(a, b) {
  if (a > b) {
    return "Time A venceu";
  } else if (b > a) {
    return "Time B venceu";
  } else {
    return "Empate";
  }
}

golsA = adicionar(golsA);
golsA = adicionar(golsA);
golsB = adicionar(golsB);

console.log("Placar:", golsA, "x", golsB); // Placar: 2 x 1
console.log(quemVenceu(golsA, golsB)); // Time A venceu
`
},
{
  part:'Fechamento', op:'outro',
  title:'O que você aprendeu',
  md:
`Você já sabe **mostrar, guardar, comparar, decidir e reutilizar**: a base de qualquer programa.

- **\`console.log\`** mostra o resultado no terminal.
- **Variáveis**: \`let\` pode mudar, \`const\` é fixa.
- **Tipos**: \`number\`, \`string\` e \`boolean\`.
- **Contas** e atalhos: \`+=\` e \`++\`.
- **Comparações** respondem \`true\` ou \`false\`. Use sempre \`===\`.
- **Funções**: definir é escrever a receita, chamar é usá-la.
- **\`if\` / \`else\`** fazem o programa decidir.

## Exercícios pra casa

1. **Maior de dois:** uma função \`maior(a, b)\` que devolve o maior dos dois números.
2. **Situação da nota:** uma função que recebe a nota e devolve \`"Aprovado"\` (7 ou mais), \`"Recuperação"\` (de 5 até menos de 7) ou \`"Reprovado"\`.
3. **Placar de outro jogo:** refaça o mini placar com times e gols diferentes, e um empate.
4. **Mostre o seu código** para a turma!

> **Próxima aula:** Manipulando o DOM. As mesmas ideias, agora mudando uma **página de verdade**.`
},
];

global.AULA_JAVASCRIPT_BASICO = {
  meta: {
    titulo:    'JavaScript básico: falando com o computador',
    projeto:   'javascript-basico',
    subtitulo: 'Coding · JavaScript puro · no terminal',
    vazio:     'Projeto vazio.<br>Vamos criar os exemplos, um por um.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
