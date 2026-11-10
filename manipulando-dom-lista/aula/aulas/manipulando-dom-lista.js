/* =========================================================================
   AULA: Manipulando o DOM, parte 2: lista de compras (disciplina de Coding)

   Continuação da aula "Manipulando o DOM" (parte 1: getElementById,
   textContent e clique no botão). Aqui a turma monta uma lista de compras
   em HTML e JavaScript puros, sem bibliotecas e sem npm. A progressão cobre:
   1. revisão rápida da parte 1 (selecionar, textContent, clique);
   2. criar e inserir elementos (createElement, appendChild) e contar
      filhos com children.length;
   3. ler o campo de texto (value) e reagir ao botão e ao Enter;
   4. remover o item clicado;
   5. a pegadinha do innerHTML +=, que recria os elementos e apaga os
      ouvintes já registrados.

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
  title:'Manipulando o DOM, parte 2',
  eyebrow:'Coding · JavaScript no navegador',
  md:
`Na aula passada você fez a página **reagir a um clique**. Hoje ela vai **criar elementos novos**.

Vamos montar uma **lista de compras** com dois arquivos, sem instalar nada:

- \`index.html\`: a estrutura da página;
- \`script.js\`: o código que manipula essa estrutura.

No caminho:

1. rever o que já sabemos: \`getElementById\`, \`textContent\`, clique;
2. **criar** itens com \`createElement\` e \`appendChild\`;
3. ler o que a pessoa digitou, com \`value\`;
4. clicar num item para **removê-lo**;
5. extra: a pegadinha do \`innerHTML +=\`.

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'note',
  title:'Revisão da aula passada',
  md:
`Três ferramentas que vamos usar o tempo todo:

\`\`\`js
const titulo = document.getElementById('titulo'); // achar um elemento pelo id
titulo.textContent = 'Lista de compras';          // trocar o texto dele
botao.addEventListener('click', funcao);          // reagir ao clique
\`\`\`

- \`getElementById\` recebe **só o nome** do id (sem \`#\`) e devolve \`null\` se não achar.
- \`addEventListener\` recebe a função **sem parênteses**.
- Pra testar: abra o \`index.html\`, aperte **F12** (Console) e **F5** pra recarregar depois de salvar.

> Hoje o DOM também aparece como **árvore**: \`ul\` é **pai** dos \`li\`, e os \`li\` são **filhos** do \`ul\`. Isso importa no \`children.length\`.`
},

/* ----------------------------------------------------------------------
   Parte 1: a página
   ---------------------------------------------------------------------- */
{
  part:'1 · A página', op:'file', target:'index.html',
  title:'Criar index.html',
  explain:'Primeiro a estrutura. O JavaScript só consegue mexer no que existe no HTML (ou no que ele mesmo criar).'
},
{
  part:'1 · A página', op:'code', file:'index.html',
  title:'Estrutura da lista de compras',
  explain:'Cada elemento que o JavaScript vai usar tem um <code>id</code> <b>único</b>. O <code>&lt;script&gt;</code> fica no <b>fim do body</b>: quando ele roda, todos os elementos de cima já existem no DOM.',
  code:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Lista de compras</title>
</head>
<body>
  <h1 id="titulo">Carregando...</h1>
  <p id="contador">0 itens</p>

  <input id="campo-item" placeholder="Ex.: arroz" />
  <button id="botao-adicionar">Adicionar</button>

  <ul id="lista"></ul>

  <script src="script.js"></script>
</body>
</html>
`
},

/* ----------------------------------------------------------------------
   Parte 2: o script (revisão)
   ---------------------------------------------------------------------- */
{
  part:'2 · O script', op:'file', target:'script.js',
  title:'Criar script.js',
  explain:'O mesmo arquivo que o <code>&lt;script src="script.js"&gt;</code> do HTML carrega.'
},
{
  part:'2 · O script', op:'code', file:'script.js',
  title:'Selecionar o título e trocar o texto',
  explain:'Revisão da aula passada: <code>getElementById</code> acha o <code>&lt;h1&gt;</code> e <code>textContent</code> troca o que aparece. Recarregue: o <code>Carregando...</code> do HTML some e aparece <b>Lista de compras</b>.',
  code:
`const titulo = document.getElementById('titulo');

titulo.textContent = 'Lista de compras';
`
},

/* ----------------------------------------------------------------------
   Parte 3: createElement, appendChild e children.length
   ---------------------------------------------------------------------- */
{
  part:'3 · Criar elementos', op:'note',
  title:'Criar e inserir: três passos',
  md:
`Pra colocar um item novo na lista:

\`\`\`js
const item = document.createElement('li'); // 1. cria
item.textContent = 'Arroz';                // 2. preenche
lista.appendChild(item);                   // 3. insere
\`\`\`

1. **\`document.createElement('li')\`** cria um \`<li>\` novo, mas **só na memória**: ele ainda não está na página.
2. **\`textContent\`** dá o texto dele.
3. **\`pai.appendChild(filho)\`** pendura o elemento como **último filho** do pai. Só agora ele aparece na tela.

E pra contar: **\`lista.children.length\`** é a quantidade de **elementos filhos** que a lista tem neste momento.`
},
{
  part:'3 · Criar elementos', op:'challenge', time:'4 min',
  title:'Quantos filhos?',
  md:
`Com a \`<ul id="lista">\` vazia, qual é o valor mostrado?

\`\`\`js
const lista = document.getElementById('lista');

const a = document.createElement('li');
const b = document.createElement('li');
const c = document.createElement('li');
a.textContent = 'Arroz';
b.textContent = 'Feijão';
c.textContent = 'Café';

lista.appendChild(a);
lista.appendChild(b);

console.log(lista.children.length);
\`\`\`

Responda antes de avançar, depois teste no Console.`
},
{
  part:'3 · Criar elementos', op:'note',
  title:'Resposta: 2',
  md:
`Três \`<li>\` foram **criados**, mas só dois foram **inseridos** com \`appendChild\`.

- \`c\` existe na memória, com texto e tudo, mas não é filho de ninguém: não aparece na tela e **não conta** em \`children.length\`.
- Criar não é inserir. Sem \`appendChild\`, o elemento não entra no DOM.

> Outra pegadinha: \`lista.appendChild(a)\` duas vezes não cria duas cópias. Um elemento só pode estar num lugar da árvore, então a segunda chamada só **move** o \`a\` pro fim, e \`children.length\` não muda.`
},
{
  part:'3 · Criar elementos', op:'insert', file:'script.js',
  after:"const titulo = document.getElementById('titulo');",
  title:'Selecionar contador e lista',
  explain:'Mais dois elementos que o código vai usar. Selecionar tudo no começo do arquivo deixa claro de quais partes da página o script depende.',
  code:
`const contador = document.getElementById('contador');
const lista = document.getElementById('lista');
`
},
{
  part:'3 · Criar elementos', op:'code', file:'script.js',
  title:'adicionarItem e atualizarContador',
  explain:'<code>adicionarItem</code> faz os três passos: cria, preenche, insere. Logo depois, <code>atualizarContador</code> lê <code>lista.children.length</code>, que já inclui o item que acabou de entrar. Recarregue: três itens na lista e <b>3 itens</b> no contador.',
  code:
`
function atualizarContador() {
  contador.textContent = \`\${lista.children.length} itens\`;
}

function adicionarItem(texto) {
  const item = document.createElement('li');
  item.textContent = texto;
  lista.appendChild(item);
  atualizarContador();
}

adicionarItem('Arroz');
adicionarItem('Feijão');
adicionarItem('Café');
`
},

/* ----------------------------------------------------------------------
   Parte 4: eventos com addEventListener
   ---------------------------------------------------------------------- */
{
  part:'4 · Eventos', op:'note',
  title:'Reagir ao usuário',
  md:
`Até aqui, o script roda **uma vez** quando a página abre. Pra reagir a um clique, a gente **registra um ouvinte**:

\`\`\`js
botao.addEventListener('click', funcao);
\`\`\`

- O primeiro argumento é o **tipo do evento**: \`'click'\`, \`'keydown'\`, \`'input'\`...
- O segundo é a **função** que o navegador chama **toda vez** que o evento acontecer.
- Passe a função **sem parênteses**: \`adicionarItem\`, não \`adicionarItem()\`. Com parênteses, ela roda na hora e o que vai pro ouvinte é o **retorno** dela.

> O valor digitado num \`<input>\` fica em **\`campo.value\`** (não em \`textContent\`).`
},
{
  part:'4 · Eventos', op:'challenge', time:'7 min',
  title:'Adicionar pelo botão',
  md:
`Troque os três \`adicionarItem(...)\` fixos por um ouvinte:

1. Selecione o \`campo-item\` e o \`botao-adicionar\`.
2. Faça \`adicionarItem\` ler o texto de \`campoItem.value\` (sem espaços nas pontas) em vez de receber parâmetro.
3. Se o texto estiver vazio, não adicione nada.
4. Depois de adicionar, limpe o campo.
5. Registre o clique do botão com \`addEventListener\`.

**Bônus:** apertar **Enter** no campo também adiciona (evento \`'keydown'\`, tecla \`evento.key === 'Enter'\`).`
},
{
  part:'4 · Eventos', op:'insert', file:'script.js',
  after:"const lista = document.getElementById('lista');",
  title:'Selecionar campo e botão',
  explain:'Os dois elementos que faltavam: o campo onde o usuário digita e o botão que dispara o evento.',
  code:
`const campoItem = document.getElementById('campo-item');
const botaoAdicionar = document.getElementById('botao-adicionar');
`
},
{
  part:'4 · Eventos', op:'replace', file:'script.js',
  find:
`function adicionarItem(texto) {
`,
  title:'Ler o texto do campo',
  explain:'O texto agora vem de <code>campoItem.value</code>. O <code>return</code> sai cedo quando o campo está vazio (ou só com espaços, por causa do <code>trim()</code>), e nada é criado.',
  code:
`function adicionarItem() {
  const texto = campoItem.value.trim();
  if (texto === '') {
    return;
  }

`
},
{
  part:'4 · Eventos', op:'replace', file:'script.js',
  find:
`adicionarItem('Arroz');
adicionarItem('Feijão');
adicionarItem('Café');
`,
  title:'Registrar o clique',
  explain:'<code>adicionarItem</code> vai <b>sem parênteses</b>: o navegador guarda a função e chama ela a cada clique. A lista agora começa vazia e cresce conforme o usuário adiciona.',
  code:
`botaoAdicionar.addEventListener('click', adicionarItem);
`
},
{
  part:'4 · Eventos', op:'insert', file:'script.js',
  after:
`  atualizarContador();
}

botaoAdicionar`,
  title:'Limpar o campo depois de adicionar',
  explain:'<code>value = \'\'</code> esvazia o campo, e <code>focus()</code> devolve o cursor pra ele: dá pra digitar o próximo item sem clicar de novo.',
  code:
`  campoItem.value = '';
  campoItem.focus();
`
},
{
  part:'4 · Eventos', op:'code', file:'script.js',
  title:'Bônus: Enter também adiciona',
  explain:'O navegador passa um <b>objeto de evento</b> pra função ouvinte. Em <code>keydown</code>, <code>evento.key</code> diz qual tecla foi apertada. Um elemento pode ter vários ouvintes, de tipos diferentes.',
  code:
`
campoItem.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    adicionarItem();
  }
});
`
},
{
  part:'4 · Eventos', op:'challenge', time:'5 min',
  title:'Clicar no item remove',
  md:
`Cada \`<li>\` criado em \`adicionarItem\` deve ganhar **seu próprio ouvinte** de clique:

- clicou no item → ele some da lista (\`item.remove()\`);
- o contador atualiza.

> O ouvinte é registrado **no elemento**, logo depois do \`createElement\`. Guarde isso: vai ser a chave da próxima parte.`
},
{
  part:'4 · Eventos', op:'insert', file:'script.js',
  after:'  item.textContent = texto;',
  title:'Ouvinte em cada item',
  explain:'Cada <code>li</code> tem o seu ouvinte, e a função dele lembra <b>qual</b> <code>item</code> remover. Depois de remover, <code>children.length</code> já diminuiu, então o contador fica certo.',
  code:
`  item.addEventListener('click', () => {
    item.remove();
    atualizarContador();
  });
`
},

/* ----------------------------------------------------------------------
   Extra: a pegadinha do innerHTML +=
   ---------------------------------------------------------------------- */
{
  part:'Extra · innerHTML +=', op:'note',
  title:'innerHTML: HTML como texto',
  md:
`Existe um atalho que aparece em muito tutorial:

\`\`\`js
lista.innerHTML += '<li>Arroz</li>';
\`\`\`

- **\`innerHTML\`** é o conteúdo do elemento **escrito como HTML** (uma string).
- Diferente de \`textContent\`, as tags **são interpretadas**: \`'<b>oi</b>'\` vira negrito.
- Parece fazer o mesmo que \`createElement\` + \`appendChild\` numa linha só. **Não faz.** Vamos provar.`
},
{
  part:'Extra · innerHTML +=', op:'insert', file:'index.html',
  after:'<button id="botao-adicionar">',
  title:'Um segundo botão, com innerHTML +=',
  explain:'Os dois botões vão adicionar itens na mesma lista, cada um de um jeito, pra comparar.',
  code:
`  <button id="botao-innerhtml">Adicionar com innerHTML +=</button>
`
},
{
  part:'Extra · innerHTML +=', op:'code', file:'script.js',
  title:'Adicionar com innerHTML +=',
  explain:'Esta versão <b>tem um problema de propósito</b>: o item é escrito como texto HTML e somado ao conteúdo atual da lista.',
  code:
`
const botaoInnerHtml = document.getElementById('botao-innerhtml');
botaoInnerHtml.addEventListener('click', () => {
  lista.innerHTML += \`<li>\${campoItem.value}</li>\`;
  atualizarContador();
});
`
},
{
  part:'Extra · innerHTML +=', op:'challenge', time:'6 min',
  title:'O que quebrou?',
  md:
`Faça este teste, nessa ordem:

1. Adicione **Arroz** e **Feijão** pelo botão **Adicionar**.
2. Clique em **Arroz**: ele some? (Deve sumir.)
3. Digite **Café** e adicione pelo botão **Adicionar com innerHTML +=**.
4. Clique em **Feijão**.

**O que acontece no passo 4? Por quê?**

> Pense no que \`lista.innerHTML += x\` faz por baixo: ele é igual a \`lista.innerHTML = lista.innerHTML + x\`.`
},
{
  part:'Extra · innerHTML +=', op:'note',
  title:'Os ouvintes foram embora',
  md:
`No passo 4, **nada acontece**: o Feijão não some mais.

\`lista.innerHTML += x\` é \`lista.innerHTML = lista.innerHTML + x\`, então o navegador:

1. **lê** a lista como texto: \`'<li>Feijão</li>'\` (ouvinte não vira texto);
2. **concatena** o item novo;
3. **apaga todos os filhos** da lista e **recria tudo** a partir da string.

O \`<li>\` que tinha o ouvinte foi **destruído**. O que está na tela é um \`<li>\` **novo**, com o mesmo texto, mas **sem nenhum ouvinte**. Por isso o clique não faz nada.

- Para inserir sem destruir: \`createElement\` + \`appendChild\`, como no botão **Adicionar**.
- De bônus, \`innerHTML\` com texto digitado pelo usuário **executa as tags**: digite \`<b>oi</b>\` no campo e veja. Com \`textContent\`, isso não acontece.`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Criar, ler e remover elementos',
  md:
`## Conceitos de hoje
- **Revisão:** \`getElementById\` acha o elemento, \`textContent\` troca o texto, \`addEventListener\` reage ao clique.
- **\`createElement\`** cria só na memória. **\`appendChild\`** insere como último filho. **\`children.length\`** conta só os filhos inseridos.
- **\`campo.value\`** é o que a pessoa digitou no \`<input>\`.
- **\`item.remove()\`** tira o elemento da página.
- **\`innerHTML +=\`** recria todos os filhos a partir de texto: os ouvintes registrados antes **se perdem**.

## Exercícios pra casa
1. **Limpar lista:** um botão \`Limpar\` que remove todos os itens e zera o contador.
2. **Singular e plural:** o contador mostra \`1 item\` e \`2 itens\`.
3. **Extra, corrigir o segundo botão:** reescreva o \`botao-innerhtml\` usando \`createElement\` e \`appendChild\`, e confirme que os itens antigos continuam removíveis.`
},
];

global.AULA_MANIPULANDO_DOM_LISTA = {
  meta: {
    titulo:    'Manipulando o DOM, parte 2',
    projeto:   'manipulando-dom-lista',
    subtitulo: 'Coding · HTML e JavaScript puros',
    vazio:     'Projeto vazio.<br>Só index.html e script.js.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
