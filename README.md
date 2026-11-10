# Aulas de Coding

Plataforma com as aulas de lógica de programação (TypeScript, JavaScript e
DOM). Cada aula é uma apresentação
interativa que constrói um app passo a passo, direto no navegador, sem
instalar nada. [`index.html`](index.html) é a página inicial, com um card
por aula.

Publicado na Vercel como site estático (sem build): a raiz do repositório é
servida como está, então basta apontar o projeto da Vercel para este
repositório sem nenhuma configuração extra.

## Estrutura

Cada aula mora numa pasta com nome descritivo (o que ela implementa, não o
número da aula). A ordem abaixo é a da página inicial: da aula **mais simples
para a mais complexa**.

```
index.html                      página inicial (catálogo de aulas)
shared/player/                   motor da apresentação, usado por todas as aulas
javascript-basico/                1. JavaScript básico: console.log, variáveis, tipos, funções e if, no terminal (iniciantes)
  aula/
    index.html                   apresentação interativa
    aulas/*.js                    conteúdo da aula (etapas, slides, desafios)
  exemplos/                      um arquivo por exemplo (o código que os alunos digitam)
manipulando-dom/                  2. DOM, parte 1: contador de cliques (iniciantes)
  aula/
    index.html                   apresentação interativa
    aulas/*.js                    conteúdo da aula (etapas, slides, desafios)
manipulando-dom-lista/            3. DOM, parte 2: lista de compras, createElement e remover
  aula/...                        idem
logica-e-funcoes-typescript/      4. TypeScript puro (sem React Native), lógica básica e funções
  aula/...                        idem
javascript-dom-placar/            5. DOM, tempo e eventos até um placar de futebol (sem CSS)
  aula/...                        idem
typescript-dom/                   6. TypeScript + DOM, aula 1 de 3: tipos e a lista "Minhas tecnologias"
  aula/...                        idem
eventos-e-codigo-limpo/           7. aula 2 de 3: eventos (contador, nome, IMC, delegação) e código limpo
  aula/...                        idem
build-deploy-readme-ia/           8. aula 3 de 3: .gitignore, build, GitHub Pages, README e IA com testes
  aula/...                        idem
```

## Como cada aula deve ser

- **Um assunto por aula.** O título e o campo `conceito` do card dizem qual é;
  tudo o que a aula mostra serve a esse assunto.
- **Começa devagar.** Antes de qualquer código, os primeiros slides explicam o
  que é cada coisa que vai aparecer, em linguagem simples, um conceito por vez.
- **Exemplos simples de implementação.** Cada conceito novo vem com um
  exemplo pequeno que funciona sozinho, antes de qualquer exemplo composto.
- **Complexidade crescente dentro da aula**, e entre aulas: uma aula só usa o
  que as anteriores da lista já ensinaram.

As aulas de React Native ficam no repositório de Mobile (`Aulas/Mobile/mobile`),
não aqui.

Cada pasta de aula também tem o código usado em aula (`src/`,
`package.json`), isso é o código que os alunos acompanham sendo digitado na
apresentação, não faz parte do site publicado.

## Adicionar uma aula nova

1. Duplique uma pasta de aula existente (ex.: `logica-e-funcoes-typescript/`)
   com um nome descritivo do que a aula implementa (ex.:
   `listas-e-repeticao/`).
2. Escreva o conteúdo da aula em `<pasta>/aula/aulas/minha-aula.js`: use
   [`shared/player/README.md`](shared/player/README.md) como referência do
   formato (`meta`, `inicial`, `steps`). O arquivo
   `<pasta>/aula/aulas/_template.js` é o ponto de partida.
3. Em `<pasta>/aula/index.html`, aponte os `<script>`/`<link>` do player
   para `../../shared/player/...` (copie o `index.html` de uma aula
   existente e troque só o título e o nome do arquivo em `aulas/`).
4. Acrescente um item ao array `AULAS` em [`index.html`](index.html) da
   raiz, com `titulo`, `subtitulo`, `conceito`, `resumo` e o `href` para
   `<pasta>/aula/index.html`.

O player é compartilhado (`shared/player/`), não copie essa pasta para a
aula nova, todas as aulas usam a mesma versão.

## Rodar localmente

Não precisa de servidor: abra `index.html` (ou o `aula/index.html` de
qualquer pasta de aula) direto no navegador, ou sirva a pasta com qualquer
servidor estático:

```bash
npx serve .
```

Para rodar o código TypeScript de uma aula específica:

```bash
cd logica-e-funcoes-typescript
npm install
```

