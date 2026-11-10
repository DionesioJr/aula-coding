/* =========================================================================
   AULA: Lógica básica e funções em TypeScript

   Diferente das outras aulas da plataforma, esta não constrói um app
   React Native: é TypeScript puro, sem interface. Oito atividades curtas,
   cada uma virando uma função em src/atividades.ts, testada com
   console.log em src/testes.ts.

   Mesmo formato das outras aulas: cartões roxos de desafio, a turma tenta
   sozinha antes de ver a função sendo digitada.

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

const INITIAL_ENTRIES = [];
const INITIAL_FILES = {};

/* Sem bibliotecas externas, só TypeScript e ts-node pra rodar. */
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
  title:'Lógica e funções em TypeScript',
  eyebrow:'Fundamentos · TypeScript',
  md:
`Oito atividades curtas de lógica básica, cada uma virando uma **função** com parâmetros e retorno tipados.

- **Sem interface, sem React Native.** Só \`if\`/\`else\`, laços e funções, testadas no terminal com \`console.log\`.
- **Cada atividade para num cartão roxo de desafio**: a turma tenta sozinha antes de ver a função sendo digitada.
- Tudo mora em dois arquivos: \`src/atividades.ts\` (as funções) e \`src/testes.ts\` (as chamadas que mostram o resultado).

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'note',
  title:'Uma função em TypeScript',
  md:
`Antes da primeira atividade, a forma que toda função desta aula vai seguir:

\`\`\`ts
function nome(parametro: tipo): tipoDeRetorno {
  // lógica
  return valor;
}
\`\`\`

- Cada **parâmetro** tem um tipo depois de \`:\`. Passar um valor do tipo errado é **erro de compilação**, não um bug descoberto em produção.
- O tipo depois dos parênteses é o **retorno**. O TypeScript confere que todo caminho da função devolve esse tipo.
- \`export\` na frente deixa a função visível pra quem importar o arquivo, é assim que \`src/testes.ts\` vai chamar cada uma.

> Nenhuma atividade usa \`any\`. Se o tipo não aparecer sozinho, é sinal de que falta pensar melhor no formato do dado.`
},
{
  part:'Preparação', op:'file', target:'src/atividades.ts',
  title:'Criar src/atividades.ts',
  explain:'Cada atividade acrescenta uma função nova no fim deste arquivo. A pasta <code>src</code> é criada junto.'
},
{
  part:'Preparação', op:'file', target:'src/testes.ts',
  title:'Criar src/testes.ts',
  explain:'Este arquivo só chama as funções de <code>atividades.ts</code> e imprime o resultado, pra testar sem precisar de interface.'
},
{
  part:'Preparação', op:'code', file:'src/testes.ts',
  title:'Importar o módulo de atividades',
  explain:'<code>import * as atividades</code> traz o arquivo inteiro sob um nome só. Cada função nova em <code>atividades.ts</code> fica disponível aqui sem precisar tocar nesta linha de novo.',
  code:
`import * as atividades from './atividades';
`
},

/* ----------------------------------------------------------------------
   Atividade 1: par ou ímpar
   ---------------------------------------------------------------------- */
{
  part:'Atividade 1 · Par ou ímpar', op:'challenge', time:'4 min',
  title:'estaParOuImpar',
  md:
`Escreva a função:

\`\`\`ts
function estaParOuImpar(numero: number): string
\`\`\`

Ela recebe um número inteiro e devolve a string \`'par'\` ou \`'ímpar'\`.

> Dica: o operador \`%\` (resto da divisão). Um número é par quando \`numero % 2\` dá \`0\`.`
},
{
  part:'Atividade 1 · Par ou ímpar', op:'code', file:'src/atividades.ts',
  title:'estaParOuImpar',
  explain:'<code>%</code> devolve o resto da divisão por 2: <code>0</code> pra número par, <code>1</code> (ou <code>-1</code>) pra ímpar. O <code>if</code> some sem <code>else</code> porque o segundo <code>return</code> já cobre o outro caso.',
  code:
`export function estaParOuImpar(numero: number): string {
  if (numero % 2 === 0) {
    return 'par';
  }
  return 'ímpar';
}
`
},
{
  part:'Atividade 1 · Par ou ímpar', op:'code', file:'src/testes.ts',
  title:'Testar estaParOuImpar',
  explain:'Roda com <code>npm start</code>: o terminal imprime <code>par</code> e depois <code>ímpar</code>.',
  code:
`
console.log(atividades.estaParOuImpar(4)); // 'par'
console.log(atividades.estaParOuImpar(7)); // 'ímpar'
`
},

/* ----------------------------------------------------------------------
   Atividade 2: maior de dois
   ---------------------------------------------------------------------- */
{
  part:'Atividade 2 · Maior de dois', op:'challenge', time:'3 min',
  title:'maiorDeDois',
  md:
`\`\`\`ts
function maiorDeDois(a: number, b: number): number
\`\`\`

Recebe dois números e devolve o maior deles.`
},
{
  part:'Atividade 2 · Maior de dois', op:'code', file:'src/atividades.ts',
  title:'maiorDeDois',
  explain:'Dois parâmetros, uma comparação, dois caminhos de retorno: a função mais curta da aula.',
  code:
`
export function maiorDeDois(a: number, b: number): number {
  if (a > b) {
    return a;
  }
  return b;
}
`
},
{
  part:'Atividade 2 · Maior de dois', op:'code', file:'src/testes.ts',
  title:'Testar maiorDeDois',
  explain:'Um caso em que o primeiro argumento ganha, outro em que o segundo ganha.',
  code:
`
console.log(atividades.maiorDeDois(10, 3)); // 10
console.log(atividades.maiorDeDois(2, 8)); // 8
`
},

/* ----------------------------------------------------------------------
   Atividade 3: maior de três
   ---------------------------------------------------------------------- */
{
  part:'Atividade 3 · Maior de três', op:'challenge', time:'5 min',
  title:'maiorDeTres',
  md:
`\`\`\`ts
function maiorDeTres(a: number, b: number, c: number): number
\`\`\`

Recebe três números e devolve o maior deles.

> Dica: guarde o primeiro numa variável \`maior\` e vá comparando os outros dois contra ela, atualizando quando encontrar um valor maior.`
},
{
  part:'Atividade 3 · Maior de três', op:'code', file:'src/atividades.ts',
  title:'maiorDeTres',
  explain:'<code>maior</code> começa em <code>a</code> e só é <b>atualizada</b> quando encontra algo maior. Dá pra estender esse mesmo padrão pra qualquer quantidade de números.',
  code:
`
export function maiorDeTres(a: number, b: number, c: number): number {
  let maior = a;
  if (b > maior) {
    maior = b;
  }
  if (c > maior) {
    maior = c;
  }
  return maior;
}
`
},
{
  part:'Atividade 3 · Maior de três', op:'code', file:'src/testes.ts',
  title:'Testar maiorDeTres',
  explain:'O maior aparecendo em posições diferentes: no meio, e por último.',
  code:
`
console.log(atividades.maiorDeTres(4, 9, 6)); // 9
console.log(atividades.maiorDeTres(1, 2, 3)); // 3
`
},

/* ----------------------------------------------------------------------
   Atividade 4: fatorial
   ---------------------------------------------------------------------- */
{
  part:'Atividade 4 · Fatorial', op:'challenge', time:'5 min',
  title:'calcularFatorial',
  md:
`\`\`\`ts
function calcularFatorial(n: number): number
\`\`\`

O fatorial de \`n\` (escrito \`n!\`) é o produto de todos os inteiros de \`1\` até \`n\`. Por definição, \`0! = 1\`.

Exemplo: \`5! = 5 × 4 × 3 × 2 × 1 = 120\`.

> Dica: um \`for\` que começa em \`2\` e multiplica um acumulador a cada volta.`
},
{
  part:'Atividade 4 · Fatorial', op:'code', file:'src/atividades.ts',
  title:'calcularFatorial',
  explain:'<code>resultado</code> começa em <code>1</code>, não em <code>0</code>: multiplicar por zero sempre daria zero. O laço começa em <code>2</code> porque multiplicar por <code>1</code> não muda nada.',
  code:
`
export function calcularFatorial(n: number): number {
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado = resultado * i;
  }
  return resultado;
}
`
},
{
  part:'Atividade 4 · Fatorial', op:'code', file:'src/testes.ts',
  title:'Testar calcularFatorial',
  explain:'Com <code>n = 0</code> o laço nunca roda (a condição <code>2 &lt;= 0</code> já é falsa), e a função devolve o <code>1</code> inicial, exatamente o caso especial da definição.',
  code:
`
console.log(atividades.calcularFatorial(5)); // 120
console.log(atividades.calcularFatorial(0)); // 1
`
},

/* ----------------------------------------------------------------------
   Atividade 5: número primo
   ---------------------------------------------------------------------- */
{
  part:'Atividade 5 · Número primo', op:'challenge', time:'6 min',
  title:'ehPrimo',
  md:
`\`\`\`ts
function ehPrimo(n: number): boolean
\`\`\`

Um número é **primo** quando é maior que 1 e só é divisível por 1 e por ele mesmo.

1. Se \`n\` for menor que 2, não é primo.
2. Senão, teste se algum número entre \`2\` e \`n - 1\` divide \`n\` sem resto. Se algum dividir, não é primo.
3. Se nenhum dividir, é primo.`
},
{
  part:'Atividade 5 · Número primo', op:'code', file:'src/atividades.ts',
  title:'ehPrimo',
  explain:'O <code>return false</code> dentro do laço sai da função na hora em que encontra o primeiro divisor: não precisa continuar testando os outros. Se o laço terminar sem nunca entrar no <code>if</code>, nenhum divisor foi encontrado.',
  code:
`
export function ehPrimo(n: number): boolean {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
`
},
{
  part:'Atividade 5 · Número primo', op:'code', file:'src/testes.ts',
  title:'Testar ehPrimo',
  explain:'<code>7</code> não tem divisor entre 2 e 6, é primo. <code>8</code> divide por <code>2</code> na primeira volta do laço.',
  code:
`
console.log(atividades.ehPrimo(7)); // true
console.log(atividades.ehPrimo(8)); // false
`
},

/* ----------------------------------------------------------------------
   Atividade 6: classificar nota
   ---------------------------------------------------------------------- */
{
  part:'Atividade 6 · Classificar nota', op:'challenge', time:'4 min',
  title:'classificarNota',
  md:
`\`\`\`ts
function classificarNota(nota: number): string
\`\`\`

Recebe uma nota de 0 a 10 e devolve:

- \`'aprovado'\`, se a nota for 7 ou mais;
- \`'recuperação'\`, se a nota for de 5 até 6.9;
- \`'reprovado'\`, se for menor que 5.

> Dica: teste a condição mais alta primeiro. Se ela não for verdadeira, a próxima condição já sabe que a nota é menor que 7.`
},
{
  part:'Atividade 6 · Classificar nota', op:'code', file:'src/atividades.ts',
  title:'classificarNota',
  explain:'Três faixas, duas comparações: quando o código chega no segundo <code>if</code>, já sabe que a nota é menor que 7 (senão teria retornado antes). O <code>return</code> final cobre "menor que 5" sem precisar escrever essa condição.',
  code:
`
export function classificarNota(nota: number): string {
  if (nota >= 7) {
    return 'aprovado';
  }
  if (nota >= 5) {
    return 'recuperação';
  }
  return 'reprovado';
}
`
},
{
  part:'Atividade 6 · Classificar nota', op:'code', file:'src/testes.ts',
  title:'Testar classificarNota',
  explain:'Uma nota em cada faixa, pra passar pelos três <code>return</code> da função.',
  code:
`
console.log(atividades.classificarNota(8)); // 'aprovado'
console.log(atividades.classificarNota(6)); // 'recuperação'
console.log(atividades.classificarNota(3)); // 'reprovado'
`
},

/* ----------------------------------------------------------------------
   Atividade 7: inverter texto
   ---------------------------------------------------------------------- */
{
  part:'Atividade 7 · Inverter texto', op:'challenge', time:'5 min',
  title:'inverterTexto',
  md:
`\`\`\`ts
function inverterTexto(texto: string): string
\`\`\`

Recebe uma string e devolve ela de trás pra frente. \`'typescript'\` vira \`'tpircsepyt'\`.

> Dica: percorra \`texto\` de trás para frente com um \`for\` decrescente (\`i--\`), acumulando cada letra numa string nova.`
},
{
  part:'Atividade 7 · Inverter texto', op:'code', file:'src/atividades.ts',
  title:'inverterTexto',
  explain:'<code>texto.length - 1</code> é o índice do último caractere. O laço decrescente lê a string de trás pra frente, e cada letra é <b>concatenada</b> na string acumuladora <code>invertido</code>.',
  code:
`
export function inverterTexto(texto: string): string {
  let invertido = '';
  for (let i = texto.length - 1; i >= 0; i--) {
    invertido = invertido + texto[i];
  }
  return invertido;
}
`
},
{
  part:'Atividade 7 · Inverter texto', op:'code', file:'src/testes.ts',
  title:'Testar inverterTexto',
  explain:'A palavra some de um lado e reaparece invertida do outro.',
  code:
`
console.log(atividades.inverterTexto('typescript')); // 'tpircsepyt'
`
},

/* ----------------------------------------------------------------------
   Atividade 8: contar vogais
   ---------------------------------------------------------------------- */
{
  part:'Atividade 8 · Contar vogais', op:'challenge', time:'6 min',
  title:'contarVogais',
  md:
`\`\`\`ts
function contarVogais(texto: string): number
\`\`\`

Recebe uma string e devolve quantas vogais (\`a\`, \`e\`, \`i\`, \`o\`, \`u\`, maiúsculas ou minúsculas) ela tem.

> Dica: uma string \`'aeiouAEIOU'\` com \`.includes(letra)\` resolve testar maiúscula e minúscula de uma vez, sem precisar de dez comparações.`
},
{
  part:'Atividade 8 · Contar vogais', op:'code', file:'src/atividades.ts',
  title:'contarVogais',
  explain:'<code>vogais.includes(texto[i])</code> pergunta "esse caractere está dentro da lista de vogais?". O <code>total</code> só sobe quando a resposta é sim.',
  code:
`
export function contarVogais(texto: string): number {
  const vogais = 'aeiouAEIOU';
  let total = 0;
  for (let i = 0; i < texto.length; i++) {
    if (vogais.includes(texto[i])) {
      total = total + 1;
    }
  }
  return total;
}
`
},
{
  part:'Atividade 8 · Contar vogais', op:'code', file:'src/testes.ts',
  title:'Testar contarVogais',
  explain:'\'Computador\' tem 4 vogais: o, u, a, o.',
  code:
`
console.log(atividades.contarVogais('Computador')); // 4
`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'note',
  title:'Rode tudo de uma vez',
  md:
`Com as oito funções prontas, no terminal, dentro da pasta do projeto:

\`\`\`bash
npm install
npm start
\`\`\`

\`npm start\` roda \`src/testes.ts\` com o \`ts-node\` e imprime, em ordem, o resultado de cada \`console.log\`. Se algum valor não bater com o comentário ao lado, é sinal de que a função tem um bug.`
},
{
  part:'Fechamento', op:'outro',
  title:'Oito funções, um padrão só',
  md:
`Toda atividade seguiu o mesmo formato: parâmetros tipados, um retorno tipado, e a lógica no meio decidindo qual \`return\` executar.

## Conceitos de hoje
Funções com parâmetros e retorno tipados, \`if\`/\`else\` (inclusive em cadeia, sem \`else\`), o operador \`%\`, laços \`for\` crescentes e decrescentes, acumuladores (\`let\` atualizado dentro do laço), comparação de strings com \`.includes\`, e \`import * as nome\` pra importar um módulo inteiro.

## Desafios pra casa
1. **FizzBuzz**: \`fizzBuzz(n: number): string\`, devolve \`'Fizz'\` se \`n\` for múltiplo de 3, \`'Buzz'\` se for múltiplo de 5, \`'FizzBuzz'\` se for múltiplo dos dois, e o próprio número (como string) nos outros casos.
2. **Soma de um array**: \`somarLista(numeros: number[]): number\`, percorre um array de números com \`for\` e devolve a soma de todos.
3. **Palíndromo**: \`ehPalindromo(texto: string): boolean\`, devolve se o texto é igual ao seu inverso (reaproveite \`inverterTexto\`).
4. **Validar senha**: \`senhaValida(senha: string): boolean\`, devolve \`true\` só se a senha tiver 8 caracteres ou mais **e** pelo menos um número.

> Entrega: as quatro funções acrescentadas em \`src/atividades.ts\`, com testes em \`src/testes.ts\` mostrando que funcionam.`
},
];

global.AULA_LOGICA_E_FUNCOES_TYPESCRIPT = {
  meta: {
    titulo:    'Lógica e funções em TypeScript',
    projeto:   'logica-e-funcoes-typescript',
    subtitulo: 'TypeScript puro · sem React Native',
    vazio:     'Projeto vazio.<br>Vamos criar as funções do zero.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
