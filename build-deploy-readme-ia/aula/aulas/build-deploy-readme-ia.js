/* =========================================================================
   AULA: Do computador para o mundo, build, deploy, README e IA
   (disciplina de Coding)

   Aula 3 de 3 da série "Minhas tecnologias". Para iniciantes: foco em
   entender o que vai (e o que não vai) para o Git, como o TypeScript vira
   JavaScript, como publicar e como usar IA com responsabilidade. A
   progressão:
   1. projeto profissional: package.json, .gitignore, segredos (.env);
   2. build: do .ts ao .js, erro de compilação e noEmitOnError, deploy no
      GitHub Pages (passo a passo, em cartões);
   3. testes simples (console.assert) e IA: um código "gerado" com erro
      escondido, escrito para a turma achar e consertar;
   4. README que convence e checklist de publicação.

   O projeto já começa com o resultado da aula anterior (código limpo).

   Mesmo formato das outras aulas: cartões roxos de desafio antes de cada
   trecho, e o código existente é AJUSTADO no lugar (replace/insert).

   Motor da apresentação: ../../shared/player/player.js
   ========================================================================= */
(function (global) {
'use strict';

/* ---------------------------------------------------------------------
   Projeto de partida: o resultado da aula anterior
   --------------------------------------------------------------------- */
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

const INICIAL_APP_TS =
`const campo = document.getElementById("campo") as HTMLInputElement;
const lista = document.getElementById("lista") as HTMLUListElement;
const total = document.getElementById("total") as HTMLSpanElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;

const techs: string[] = [];

function lerCampo(): string {
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

btnAdd.addEventListener("click", adicionar);

lista.addEventListener("click", (event) => {
  const alvo = event.target as HTMLElement;
  if (!alvo.matches(".remover")) return;

  const item = alvo.closest("li");
  if (item === null) return;

  const posicao = Array.from(lista.children).indexOf(item);
  techs.splice(posicao, 1);
  item.remove();
  atualizarTotal();
});
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

/* O TypeScript já está instalado desde a primeira aula. */
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
  title:'Do computador para o mundo',
  eyebrow:'Coding · Build, deploy, README e IA · Aula 3 de 3',
  md:
`Hoje o **Minhas tecnologias** sai do seu computador e vira um **link de portfólio**.

1. **Projeto profissional:** \`package.json\`, \`.gitignore\` e o cuidado com **segredos**;
2. **Build e deploy:** como o TypeScript vira JavaScript e como publicar;
3. **Testes simples e IA:** usar a IA **sem cair nas armadilhas dela**;
4. **README:** o cartão de visitas do projeto.

Tudo em passos curtos, sem CSS. O projeto já vem com o resultado da aula anterior (código limpo).

> **→** avança &nbsp;·&nbsp; **←** volta &nbsp;·&nbsp; **↑ ↓** mudam a velocidade.`
},
{
  part:'Preparação', op:'challenge', time:'5 min',
  title:'Revisão rápida: responda sem consultar',
  md:
`Três perguntas das aulas anteriores, **30 segundos cada**:

1. O que o \`innerHTML +=\` faz com os **ouvintes** de eventos?
2. Qual é o critério do **SRP** (uma função, uma tarefa)?
3. Para que serve um **early return**?

Quem responder, explica para a turma.`
},
{
  part:'Preparação', op:'note',
  title:'Respostas da revisão',
  md:
`1. **Recria** os elementos filhos a partir de texto. Os nós novos **não têm os ouvintes**, que se perdem.
2. Cada função tem **um único motivo para mudar**.
3. Tratar os **casos especiais primeiro** e sair da função, evitando \`if\` dentro de \`if\`.

> Para acompanhar: o projeto aberto é a lista **Minhas tecnologias** da aula passada, já organizada.`
},

/* ----------------------------------------------------------------------
   Parte 1: projeto profissional
   ---------------------------------------------------------------------- */
{
  part:'1 · Projeto profissional', op:'note',
  title:'Os arquivos de um projeto TypeScript',
  md:
`Nem tudo o que está na pasta do projeto vai para o **Git**. Quem vai e quem não vai:

**Vai para o Git:**
- \`src/app.ts\`: o seu código-fonte;
- \`dist/app.js\`: o JavaScript gerado (o GitHub Pages publica **esse** arquivo);
- \`package.json\`: o manifesto (nome, scripts, dependências);
- \`package-lock.json\`: as versões exatas instaladas;
- \`tsconfig.json\`: a configuração do TypeScript;
- \`.gitignore\`: a lista do que o Git deve ignorar;
- \`README.md\`: a apresentação do projeto.

**NÃO vai para o Git:**
- \`node_modules/\`: dependências baixadas pelo npm;
- \`.env\`: segredos e chaves, **só na sua máquina**.

> Sobre o \`dist/\`: como vamos publicar no **GitHub Pages**, que serve os arquivos do repositório como estão, o JavaScript compilado precisa ir para o Git. Em serviços que rodam o build na nuvem (Vercel, Netlify), o \`dist/\` costuma ir para o \`.gitignore\`.`
},
{
  part:'1 · Projeto profissional', op:'challenge', time:'5 min',
  title:'Exercício 1: complete o manifesto',
  md:
`O \`package.json\` é o **manifesto**: descreve o projeto.

- **\`scripts\`**: atalhos. \`npm run build\` roda o que estiver em \`"build"\`;
- **\`devDependencies\`**: pacotes só para **desenvolver** (o TypeScript);
- **\`dependencies\`**: o que o app usa **ao rodar**.

Abra o \`package.json\` e acrescente, logo depois da versão, uma **descrição** do projeto:

\`\`\`
"description": "Lista das tecnologias que estou aprendendo",
\`\`\`

> Cada linha de um objeto JSON termina com **vírgula**, menos a última. Esquecer uma vírgula quebra o arquivo inteiro.`
},
{
  part:'1 · Projeto profissional', op:'insert', file:'package.json', after:'  "version": "1.0.0",',
  title:'A descrição do projeto',
  explain:'Quem abrir o repositório (ou o <code>package.json</code>) entende <b>do que se trata</b> sem rodar nada. Repare na <b>vírgula</b> no fim da linha.',
  code:`  "description": "Lista das tecnologias que estou aprendendo",
`
},
{
  part:'1 · Projeto profissional', op:'note',
  title:'node_modules não vai para o Git',
  md:
`\`\`\`
package.json  →  npm install  →  node_modules/
a lista            lê a lista        pasta gerada
do que precisa     e baixa tudo      (pesada, reconstruível)
\`\`\`

Por que **não** versionar a \`node_modules\`:

- **Reconstruível:** qualquer pessoa recria com \`npm install\`;
- **Pesada:** milhares de arquivos que só incham o repositório;
- **Depende da máquina:** alguns pacotes mudam conforme o sistema.

Quem clona o repositório roda \`npm install\` e ganha uma \`node_modules\` **idêntica**, graças ao \`package.json\` e ao \`package-lock.json\`.`
},
{
  part:'1 · Projeto profissional', op:'challenge', time:'6 min',
  title:'Exercício 2: o .gitignore',
  md:
`O \`.gitignore\` diz ao Git **o que ignorar**. Um nome (ou pasta) por linha; linhas com \`#\` são comentários.

Crie o arquivo \`.gitignore\` ignorando:

1. \`node_modules/\` (as dependências);
2. \`.env\` (os segredos);
3. \`.DS_Store\` (lixo que o macOS cria).

Faça isso **antes do primeiro commit**.

> Depois de criar, rode \`git status\`: a \`node_modules\` e o \`.env\` **somem** da lista de arquivos a versionar.`
},
{
  part:'1 · Projeto profissional', op:'file', target:'.gitignore',
  title:'Criar .gitignore',
  explain:'Um arquivo na <b>raiz</b> do projeto, com esse nome exato (começa com ponto).'
},
{
  part:'1 · Projeto profissional', op:'code', file:'.gitignore',
  title:'O que o Git deve ignorar',
  explain:'A barra no fim de <code>node_modules/</code> indica uma <b>pasta</b>. Já fez commit da <code>node_modules</code> sem querer? <code>git rm -r --cached node_modules</code> tira do Git <b>sem apagar</b> a pasta do computador.',
  code:
`# dependências
node_modules/

# segredos
.env

# arquivos do sistema
.DS_Store
`
},
{
  part:'1 · Projeto profissional', op:'challenge', time:'5 min',
  title:'Exercício 3: segredos fora do código',
  md:
`Um aluno colocou isto no código e deu **push** no GitHub:

\`\`\`ts
const API_KEY = "minha-chave-secreta-123";
\`\`\`

1. Quem consegue ver essa chave?
2. Se ele **apagar a linha** num commit novo, o problema acabou?

A forma segura: guardar a chave numa **variável de ambiente**, num arquivo \`.env\` (que está no \`.gitignore\`). E publicar um **\`.env.example\`**, sem os valores, só para mostrar **quais variáveis existem**.

Crie o \`.env.example\` com a linha \`API_KEY=\`.`
},
{
  part:'1 · Projeto profissional', op:'note',
  title:'Vazou uma chave? E no front-end?',
  md:
`1. **Quem vê:** qualquer pessoa com acesso ao repositório.
2. **Apagar não resolve:** o **histórico do Git** ainda guarda a chave antiga.

Se uma chave vazar:

1. **Revogue:** gere uma chave nova e **desative a antiga** no serviço;
2. **Remova** do código e use variável de ambiente;
3. **Lembre:** o histórico do Git ainda guarda a chave antiga, por isso o passo 1 é sempre revogar.

No **front-end**, todo o código vai para o navegador e **qualquer pessoa pode ler**. Uma chave realmente secreta fica no **servidor**, nunca no JavaScript da página.`
},
{
  part:'1 · Projeto profissional', op:'file', target:'.env.example',
  title:'Criar .env.example',
  explain:'Este arquivo <b>vai</b> para o Git: mostra quais variáveis o projeto usa, sem os valores. Quem clonar copia para <code>.env</code> e preenche.'
},
{
  part:'1 · Projeto profissional', op:'code', file:'.env.example',
  title:'Quais variáveis existem',
  explain:'Sem valor depois do <code>=</code>. O <code>.env</code> de verdade (com a chave) fica só na sua máquina, e o <code>.gitignore</code> garante que ele não suba.',
  code:`API_KEY=
`
},

/* ----------------------------------------------------------------------
   Parte 2: build e deploy
   ---------------------------------------------------------------------- */
{
  part:'2 · Build e deploy', op:'note',
  title:'O navegador não executa TypeScript',
  md:
`\`\`\`
src/app.ts   →   tsc   →   dist/app.js   →   Navegador
o que você       verifica os    JavaScript       executa
escreve          tipos e tira   puro             o .js
                 as anotações
\`\`\`

Lado a lado:

\`\`\`ts
// src/app.ts
const n: number = 5;
function dobro(x: number): number {
  return x * 2;
}
\`\`\`

\`\`\`js
// dist/app.js
const n = 5;
function dobro(x) {
  return x * 2;
}
\`\`\`

Os **tipos somem**, a lógica é a mesma.`
},
{
  part:'2 · Build e deploy', op:'challenge', time:'6 min',
  title:'Exercício 4: rode o build e leia o resultado',
  md:
`No terminal:

\`\`\`
npm run build
\`\`\`

1. Qual arquivo apareceu na pasta \`dist/\`?
2. Abra o \`dist/app.js\` ao lado do \`src/app.ts\`. O que **sumiu**? O que **ficou igual**?
3. O \`index.html\` carrega qual dos dois, o \`.ts\` ou o \`.js\`?

> Esquecer de rodar o build antes do commit é o erro mais comum: o site continua com o **JavaScript antigo**.`
},
{
  part:'2 · Build e deploy', op:'challenge', time:'6 min',
  title:'Exercício 5: build com erro',
  md:
`O **build é um filtro de qualidade**: o erro aparece **antes** do usuário.

Provoque um: troque \`techs.push(nome)\` por \`techs.push(123)\` (o array \`techs\` é uma lista de **texto**) e rode o build.

1. Qual **arquivo**, **linha** e **motivo** a mensagem mostra?
2. O arquivo \`dist/app.js\` foi atualizado mesmo com o erro?

Depois **volte** para \`techs.push(nome)\`.`
},
{
  part:'2 · Build e deploy', op:'replace', file:'src/app.ts',
  find:`  techs.push(nome);
`,
  title:'Provocar um erro de build',
  explain:'O <code>tsc</code> mostra: <b>src/app.ts</b> (arquivo), <b>linha e coluna</b> e <b>Argument of type \'number\' is not assignable to parameter of type \'string\'</b>. Por padrão ele <b>ainda gera</b> o <code>.js</code> mesmo com erro.',
  code:`  techs.push(123);
`
},
{
  part:'2 · Build e deploy', op:'replace', file:'src/app.ts',
  find:`  techs.push(123);
`,
  title:'Voltar ao código certo',
  explain:'Build quebrado <b>não se publica</b>. Corrigiu, rode de novo e confira que não há mais erro.',
  code:`  techs.push(nome);
`
},
{
  part:'2 · Build e deploy', op:'challenge', time:'4 min',
  title:'Exercício 6: não gerar o .js se tiver erro',
  md:
`Por padrão o \`tsc\` **avisa** o erro, mas ainda **gera** o \`.js\`. Dá para publicar um site quebrado sem perceber.

Existe uma opção que **impede** isso: \`"noEmitOnError": true\`. Com ela, se houver erro, o \`tsc\` **não gera nada** até você corrigir.

Acrescente no \`tsconfig.json\`, dentro de \`compilerOptions\`.

> Cuidado com a **vírgula**: ao acrescentar uma linha depois de \`"strict": true\`, ele precisa de vírgula.`
},
{
  part:'2 · Build e deploy', op:'replace', file:'tsconfig.json',
  find:`    "strict": true
`,
  title:'noEmitOnError',
  explain:'Agora <b>erro de tipo = nada de <code>.js</code> novo</b>. O site continua com a última versão boa até você corrigir.',
  code:
`    "strict": true,
    "noEmitOnError": true
`
},
{
  part:'2 · Build e deploy', op:'note',
  title:'Local × nuvem: o que é deploy',
  md:
`- **Local:** \`localhost\` ou \`file://\`. Só **você** vê, só no seu computador.
- **Nuvem:** \`usuario.github.io/projeto\`. **Qualquer pessoa** acessa pelo link.

**Deploy** é levar o projeto do seu computador para um servidor na nuvem e ganhar uma **URL pública**.

O que o deploy **faz**:
- deixa o projeto acessível por uma URL pública;
- permite que avaliadores **testem de verdade**;
- transforma o trabalho em **peça de portfólio**.

O que o deploy **não faz**:
- **não esconde** nem criptografa o código: o front-end é visível no navegador (experimente \`Ctrl+U\` em qualquer site);
- **não substitui o Git**: o versionamento continua;
- **não converte** o projeto para outra linguagem.`
},
{
  part:'2 · Build e deploy', op:'note',
  title:'Publicando no GitHub Pages: passo a passo',
  md:
`Onde hospedar: **GitHub Pages** (publica sites estáticos direto do repositório), **Vercel** e **Netlify** (conectam ao GitHub e rodam o build a cada push). Usamos o **GitHub Pages**: a turma já tem conta e repositório.

1. **Build:** \`npm run build\` gera o \`dist/app.js\`;
2. **Push:** \`git add .\`, \`git commit -m "mensagem"\` e \`git push\`;
3. **Settings:** no repositório, **Settings → Pages**;
4. **Branch:** *Deploy from a branch* → \`main\` / \`/ (root)\` → **Save**;
5. **URL:** em alguns minutos o link aparece.

Seu link: \`seu-usuario.github.io/nome-do-repositorio\`

> O GitHub Pages serve o \`index.html\` da **raiz**. Por isso o \`dist/\` precisa estar no repositório. Se o repositório for **privado**, o Pages pode depender do plano da conta: use **público**.`
},
{
  part:'2 · Build e deploy', op:'note',
  title:'Atualizar é repetir o ciclo',
  md:
`\`\`\`
Editar → Build → Commit → Push → Site atualizado
   ↑                                  │
   └──────────── e começa de novo ────┘
\`\`\`

Cada \`git push\` na branch \`main\` publica a versão nova **automaticamente**.

Erro mais comum: **esquecer o build** antes do commit. O site continua com o JavaScript antigo.`
},

/* ----------------------------------------------------------------------
   Parte 3: testes simples e IA
   ---------------------------------------------------------------------- */
{
  part:'3 · Testes simples e IA', op:'note',
  title:'IA: copiloto, não piloto',
  md:
`**A IA pode ajudar a:**
- esboçar código e testes;
- explicar mensagens de erro;
- sugerir caminhos e alternativas.

**Só você pode:**
- entender o **problema** do cliente;
- **revisar e testar** cada linha;
- **assumir a responsabilidade** pelo que publica.

> Use a IA para **ir mais rápido**, nunca para **pular a parte de entender**.

Quem integra o código **responde por ele**, não importa quem (ou o quê) escreveu. Nos próximos exercícios a "IA" vai errar **de propósito**, e a turma precisa **achar o erro com testes**.`
},
{
  part:'3 · Testes simples e IA', op:'note',
  title:'Testar em uma linha: console.assert',
  md:
`\`\`\`ts
console.assert(condicao, "mensagem se falhar");
\`\`\`

- Se a condição for **verdadeira**: **silêncio**, nada aparece;
- Se for **falsa**: aparece \`Assertion failed: mensagem\` no terminal.

Receita para testar uma função:

1. **valores conhecidos:** casos em que você já sabe a resposta;
2. **bordas:** zero, negativos, vazio, muito grande.

> Teste que **não falha** = função confiável. Teste que falha = bug achado **antes** do cliente.`
},
{
  part:'3 · Testes simples e IA', op:'file', target:'src/temperatura.ts',
  title:'Criar src/temperatura.ts',
  explain:'Aqui moram os testes da temperatura.'
},
{
  part:'3 · Testes simples e IA', op:'replace', file:'package.json',
  find:`    "dev": "tsc --watch",
`,
  title:'Um script para rodar os testes',
  explain:'<code>npm run teste</code> compila e roda o arquivo de testes. Com <code>console.assert</code>, <b>silêncio é sucesso</b>.',
  code:
`    "dev": "tsc --watch",
    "teste": "tsc && node dist/temperatura.js",
`
},
{
  part:'3 · Testes simples e IA', op:'challenge', time:'8 min',
  title:'Exercício 7: o erro que compila',
  md:
`Alguém pediu para uma IA: **"converta Celsius para Fahrenheit"**. Ela respondeu isto, com cara de certo:

\`\`\`ts
function paraFahrenheit(c: number): number {
  return (c * 9) / 5 - 32;
}
\`\`\`

1. **Compila?** Sim.
2. **Está certo?** Vamos **testar**. Escreva três \`console.assert\` com valores que você **já conhece**:
   - \`0 °C\` é \`32 °F\`;
   - \`100 °C\` é \`212 °F\`;
   - \`-40 °C\` é \`-40 °F\` (o ponto onde as duas escalas coincidem).

Rode \`npm run teste\`. O que aparece?`
},
{
  part:'3 · Testes simples e IA', op:'code', file:'src/temperatura.ts',
  title:'O código "gerado pela IA" e os testes',
  explain:'<b>Três falhas</b>: <code>Assertion failed: 0 °C</code>, <code>100 °C</code> e <code>-40 °C</code>. O código compila e roda sem erro, mas está <b>errado</b>. Isso se chama <b>alucinação</b>: parece certo, só o teste revela.',
  code:
`// Gerado pela IA: "converta Celsius para Fahrenheit"
function paraFahrenheit(c: number): number {
  return (c * 9) / 5 - 32;
}

console.assert(paraFahrenheit(0) === 32, "0 °C");
console.assert(paraFahrenheit(100) === 212, "100 °C");
console.assert(paraFahrenheit(-40) === -40, "-40 °C");
`
},
{
  part:'3 · Testes simples e IA', op:'challenge', time:'4 min',
  title:'Exercício 8: ache o erro e conserte',
  md:
`Olhe a fórmula:

\`\`\`ts
return (c * 9) / 5 - 32;
\`\`\`

A fórmula correta é **°F = °C × 9 ÷ 5 + 32**. O que está trocado?

Conserte e rode os testes de novo: se o terminal ficar **em silêncio**, os três passaram.`
},
{
  part:'3 · Testes simples e IA', op:'replace', file:'src/temperatura.ts',
  find:`  return (c * 9) / 5 - 32;
`,
  title:'O sinal estava trocado',
  explain:'Era <code>+ 32</code>, não <code>- 32</code>. Agora os três testes passam e o terminal fica <b>em silêncio</b>: 100 °C = 212 °F, e -40 °C = -40 °F.',
  code:`  return (c * 9) / 5 + 32;
`
},
{
  part:'3 · Testes simples e IA', op:'challenge', time:'6 min',
  title:'Exercício 9: a função inversa, com testes',
  md:
`Agora **você** escreve, sem IA: \`paraCelsius(f)\`, que converte **Fahrenheit para Celsius**.

\`\`\`
°C = (°F - 32) × 5 ÷ 9
\`\`\`

Escreva **os testes primeiro** (valores conhecidos):

- \`32 °F\` é \`0 °C\`;
- \`212 °F\` é \`100 °C\`;
- \`-40 °F\` é \`-40 °C\`.

> **Dica de ouro:** se o seu \`paraCelsius\` e o \`paraFahrenheit\` forem corretos, um **desfaz** o outro.`
},
{
  part:'3 · Testes simples e IA', op:'code', file:'src/temperatura.ts',
  title:'paraCelsius',
  explain:'Os mesmos três pontos conhecidos, no sentido inverso. Terminal em silêncio: <b>passou</b>.',
  code:
`
function paraCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

console.assert(paraCelsius(32) === 0, "32 °F");
console.assert(paraCelsius(212) === 100, "212 °F");
console.assert(paraCelsius(-40) === -40, "-40 °F");
`
},
{
  part:'3 · Testes simples e IA', op:'file', target:'src/email.ts',
  title:'Criar src/email.ts',
  explain:'Um segundo exemplo: validar e-mail.'
},
{
  part:'3 · Testes simples e IA', op:'replace', file:'package.json',
  find:`"tsc && node dist/temperatura.js"`,
  title:'O script passa a rodar os dois arquivos',
  explain:'O <code>&amp;&amp;</code> encadeia: roda o primeiro e, <b>se der certo</b>, o próximo.',
  code:`"tsc && node dist/temperatura.js && node dist/email.js"`
},
{
  part:'3 · Testes simples e IA', op:'challenge', time:'10 min',
  title:'Exercício 10: teste a função da IA',
  md:
`A IA gerou uma função para **validar e-mail**:

\`\`\`ts
function ehEmailValido(email: string): boolean {
  return email.includes("@");
}
\`\`\`

Ela acerta com \`"ana@email.com"\`. Mas **está boa**? Escreva \`console.assert\` para estes casos e descubra:

- \`"ana@email.com"\` → válido;
- \`""\` → inválido (vazio);
- \`"ana"\` → inválido (sem @);
- \`"@email.com"\` → inválido (sem nome);
- \`"ana@"\` → inválido (sem domínio);
- \`"ana@email"\` → inválido (sem ponto);
- \`"a@@b.com"\` → inválido (dois @).

Quantos testes **falham**?

> Lição: um caso feliz não prova nada. **Teste as bordas.**`
},
{
  part:'3 · Testes simples e IA', op:'code', file:'src/email.ts',
  title:'Os testes revelam o problema',
  explain:'<b>Quatro falhas</b>: <code>sem nome</code>, <code>sem domínio</code>, <code>sem ponto</code> e <code>dois @</code>. A função só confere se existe <b>um</b> <code>@</code>, e aceita lixo como <code>"@"</code>.',
  code:
`// Gerado pela IA: "valide um e-mail"
function ehEmailValido(email: string): boolean {
  return email.includes("@");
}

console.assert(ehEmailValido("ana@email.com") === true, "e-mail válido");
console.assert(ehEmailValido("") === false, "vazio");
console.assert(ehEmailValido("ana") === false, "sem @");
console.assert(ehEmailValido("@email.com") === false, "sem nome");
console.assert(ehEmailValido("ana@") === false, "sem domínio");
console.assert(ehEmailValido("ana@email") === false, "sem ponto");
console.assert(ehEmailValido("a@@b.com") === false, "dois @");
`
},
{
  part:'3 · Testes simples e IA', op:'challenge', time:'10 min',
  title:'Exercício 11: conserte até todos os testes passarem',
  md:
`Agora o contrário: **os testes mandam**, você conserta a função.

Regras do e-mail (versão simples):

1. dividir o texto no \`@\` com \`split("@")\`: tem que dar **exatamente 2 partes**;
2. a parte **antes** do \`@\` não pode ser vazia;
3. a parte **depois** do \`@\` tem que ter um **ponto**.

Use **early return** (\`return false\` nos casos ruins) e \`return true\` no fim.

> Terminal **em silêncio** = os sete testes passaram.`
},
{
  part:'3 · Testes simples e IA', op:'replace', file:'src/email.ts',
  find:`  return email.includes("@");
`,
  title:'A função conferida pelos testes',
  explain:'Cada caso inválido vira um <code>return false</code> e o <code>return true</code> fica por último. O <code>split("@")</code> devolve uma lista: <code>"a@@b.com"</code> vira <code>["a", "", "b.com"]</code>, <b>3 partes</b>.',
  code:
`  const partes = email.split("@");
  if (partes.length !== 2) return false;
  if (partes[0] === "") return false;
  if (!partes[1].includes(".")) return false;
  return true;
`
},
{
  part:'3 · Testes simples e IA', op:'note',
  title:'Alucinação e responsabilidade',
  md:
`**Alucinação:** o modelo gera código **sintaticamente correto** e com cara de certo, mas **errado para o contexto**. Só **revisão e teste** revelam, como vimos na temperatura e no e-mail.

**Evite:**
- colar direto porque "a IA já testou";
- publicar sem testar porque "compilou";
- apagar comentários para esconder o uso;
- trocar a documentação pelo histórico de prompts.

**Prefira:**
- ler e entender **cada linha**;
- testar com **casos reais e de borda**;
- validar com os **requisitos** do cliente;
- assumir a **autoria técnica** do que integrar.`
},
{
  part:'3 · Testes simples e IA', op:'note',
  title:'Checklist antes de aceitar código gerado',
  md:
`1. **Entendo cada linha?** Se não sei explicar, não integro.
2. **Testei as bordas?** Zero, negativo, vazio, muito grande.
3. **Tem segredo no código?** Chave e senha não ficam no código.
4. **\`innerHTML\` com dado do usuário?** Prefira \`textContent\`.
5. **Segue o padrão do projeto?** Nomes claros, uma função uma tarefa, early return.
6. **A biblioteca existe mesmo?** A IA pode **inventar** pacotes e funções.

> Fotografe este cartão e use no laboratório.`
},

/* ----------------------------------------------------------------------
   Parte 4: README
   ---------------------------------------------------------------------- */
{
  part:'4 · README', op:'note',
  title:'README: o cartão de visitas',
  md:
`O README é a **primeira coisa** que recrutadores e avaliadores veem. Muitas vezes, é o **único** arquivo que eles leem.

O que colocar:

1. **O que faz:** uma ou duas frases;
2. **Tecnologias:** TypeScript, HTML...;
3. **Como executar:** os comandos, passo a passo;
4. **Link publicado:** a URL do GitHub Pages;
5. **Imagem:** um print ou GIF do projeto.

O que **não** colocar:
- **senhas, tokens e chaves:** o README é público; o \`.env\` existe para isso;
- **o código-fonte inteiro:** ele já está no repositório;
- **o histórico de commits:** o Git já mostra isso;
- **texto genérico:** sem descrição, instruções nem link, ninguém testa.`
},
{
  part:'4 · README', op:'note',
  title:'Markdown em 1 minuto',
  md:
`O README é escrito em **Markdown** (arquivo \`.md\`). O que você escreve → o que aparece:

- \`# Título\` → título principal
- \`## Subtítulo\` → seção
- \`- item\` → lista com marcador
- \`**negrito**\` → destaque
- texto entre **crases** → comando ou trecho de código
- \`[texto](url)\` → link
- \`![print](img.png)\` → imagem

> O GitHub mostra uma **prévia** na aba *Preview* quando você edita o README pelo site.`
},
{
  part:'4 · README', op:'challenge', time:'10 min',
  title:'Exercício 12: escreva o README do projeto',
  md:
`Crie o \`README.md\` do **Minhas tecnologias** com **quatro seções**:

1. título e uma frase dizendo **o que faz**;
2. \`## Tecnologias\`: uma lista;
3. \`## Como executar\`: os **três comandos**, na ordem (\`npm install\`, \`npm run build\`, abrir o \`index.html\`);
4. \`## Versão publicada\`: o link do GitHub Pages.

> Troque \`seu-usuario\` pelo seu usuário do GitHub. E nada de chaves ou senhas!`
},
{
  part:'4 · README', op:'file', target:'README.md',
  title:'Criar README.md',
  explain:'Na <b>raiz</b> do projeto, com esse nome: o GitHub mostra o conteúdo dele na página do repositório.'
},
{
  part:'4 · README', op:'code', file:'README.md',
  title:'Um README que convence',
  explain:'Curto, direto e <b>útil</b>: quem chegar sabe o que é, com o que foi feito, como rodar e onde ver funcionando.',
  code:
`# Minhas Tecnologias

Lista interativa das tecnologias que estou aprendendo, feita com TypeScript, HTML e DOM.

## Tecnologias

- TypeScript
- HTML

## Como executar

1. \`npm install\`
2. \`npm run build\`
3. Abra o \`index.html\` no navegador

## Versão publicada

https://seu-usuario.github.io/minhas-tecnologias
`
},

/* ----------------------------------------------------------------------
   Laboratório final
   ---------------------------------------------------------------------- */
{
  part:'Laboratório final', op:'challenge', time:'30 min',
  title:'Checklist de publicação',
  md:
`Hora de publicar o **Minhas tecnologias**. Marque cada item:

1. **\`.gitignore\`:** \`node_modules\` e \`.env\` fora do Git (\`git status\` conferido);
2. **Build limpo:** \`npm run build\` **sem erros**;
3. **Testes rápidos:** \`npm run teste\` **em silêncio**;
4. **README:** descrição, tecnologias, como executar;
5. **Commit e push:** com mensagens **claras**;
6. **GitHub Pages:** Settings → Pages → \`main\` / root;
7. **Teste o link:** abra no **celular** também;
8. **Link no README** e no seu perfil do GitHub.

Problemas comuns: **esqueceu o build** (site sem JavaScript), **caminho do script errado** (\`dist/app.js\`), **repositório privado**.`
},
{
  part:'Laboratório final', op:'note',
  title:'Entrega e revisão em dupla',
  md:
`**Entrega:**
- **Repositório:** \`github.com/usuario/minhas-tecnologias\`
- **Link publicado:** \`usuario.github.io/minhas-tecnologias\`

**Revisão em dupla:** troquem os links. Abra o projeto do colega **no celular** e confira:

- o **README** (descrição, como executar, link);
- o **checklist de IA** (código que ele não entende? sem testes?);
- se **adicionar e remover** itens funciona.

> **Projeto publicado + README bom = um portfólio que fala por você.**`
},

/* ----------------------------------------------------------------------
   Fechamento
   ---------------------------------------------------------------------- */
{
  part:'Fechamento', op:'outro',
  title:'Seu projeto está no ar',
  md:
`## As 3 aulas em uma tela
- **Aula 1, TypeScript e DOM:** tipos e funções tipadas, \`forEach\` e template strings, \`getElementById\` e \`as\`, \`createElement\`, \`appendChild\`, \`remove\`, \`children.length\`.
- **Aula 2, Eventos e código limpo:** \`addEventListener\` e \`event\`, \`preventDefault\`, \`innerHTML +=\` perde ouvintes, delegação, SRP e early return.
- **Aula 3, Do código à nuvem:** \`package.json\` e \`node_modules\`, \`.gitignore\` e segredos, build com \`tsc\`, deploy no GitHub Pages, README, IA com responsabilidade e \`console.assert\`.

## Exercícios pra casa
1. **Mais testes:** escreva 3 \`console.assert\` para a função \`ehValido\` do \`app.ts\` (vazio, repetido, válido).
2. **Segundo validador:** peça a uma IA uma função que valide **telefone** e **teste as bordas** antes de usar. Ela errou? Anote **como** você descobriu.
3. **README com print:** acrescente um print (ou GIF) do projeto funcionando.
4. **Link no perfil:** coloque o link publicado no seu perfil do GitHub.

> Projeto no ar, README bom, testes passando. **Bom portfólio!**`
},
];

global.AULA_BUILD_DEPLOY_README_IA = {
  meta: {
    titulo:    'Do computador para o mundo',
    projeto:   'minhas-tecnologias',
    subtitulo: 'Coding · Build, deploy, README e IA',
    vazio:     'Projeto vazio.',
  },
  inicial: { entries: INITIAL_ENTRIES, files: INITIAL_FILES },
  deps:    { titulo: 'Dependências', desde: DEP_STEP, lista: DEPS },
  steps:   STEPS,
};

})(window);
