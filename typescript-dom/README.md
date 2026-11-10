# Construindo a página com TypeScript

Aula 1 de 3 da série **Minhas tecnologias**, da disciplina de Coding. Pensada
para iniciantes: foco na lógica, quase nenhum CSS (só uma regra, para o
`classList`) e exercícios pequenos, cada um apoiado no anterior.

1. **TypeScript essencial** (exercícios 1 a 11, em
   [`src/treino.ts`](src/treino.ts)): tipos, funções tipadas, arrays,
   `forEach` e template strings, com os erros do compilador de propósito para
   aprender a lê-los;
2. **DOM com TypeScript** (exercícios 12 a 18, em [`index.html`](index.html) +
   [`src/app.ts`](src/app.ts)): selecionar com o tipo certo, criar
   (`createElement`, `appendChild`) e remover elementos;
3. **Laboratório** em três níveis: a lista ganha contador, campo + botão
   Adicionar, botão remover, sem repetidos e `classList.toggle`.

## Instalar e executar

```bash
npm install
npm run treino   # compila e roda o src/treino.ts no terminal
npm run build    # compila src/*.ts para dist/*.js
npm run dev      # recompila a cada salvamento
```

Depois do `build`, abra [`index.html`](index.html) no navegador: ele carrega
`dist/app.js`, que é gerado pelo TypeScript e **não** fica no repositório
(rode `npm run build` primeiro).

## Apresentação da aula

Abra [`aula/index.html`](aula/index.html) no navegador. Cada exercício
aparece primeiro como desafio e depois como a solução sendo digitada. Para
conferir se a apresentação ainda bate com os arquivos desta pasta:
`npm run check-aula`.
