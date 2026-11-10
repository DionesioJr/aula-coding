# JavaScript e DOM: da variável ao placar

Aula da disciplina de Coding para quem está começando: JavaScript puro, sem
bibliotecas, sem npm e **sem CSS**. O foco é a lógica. A turma sai do zero e
termina com um placar de futebol funcionando no navegador, em 13 exercícios
curtos:

1. variáveis (`let`/`const`), tipos, operadores, funções e `if`/`else`
   (exercícios 1 a 7, em [`treino.js`](treino.js));
2. o DOM: `getElementById` e `textContent` (exercício 8, em
   [`index.html`](index.html) + [`app.js`](app.js));
3. tempo: `setInterval`, um contador que anda sozinho (exercícios 9 a 12);
4. eventos: `addEventListener`, reagir ao clique (exercício 13, em
   [`placar.html`](placar.html) + [`placar.js`](placar.js));
5. desafio em três níveis: o placar (dois times, corrigir e zerar,
   cronômetro com `clearInterval` e vencedor).

## Executar

- **`treino.js`**: no terminal, `node treino.js` (ou cole no Console do
  navegador, F12).
- **`index.html`** (contador) e **`placar.html`** (placar): abra no navegador
  (dois cliques) e use o Console (F12) para ver erros e `console.log`.

Não precisa instalar nada.

## Apresentação da aula

Abra [`aula/index.html`](aula/index.html) no navegador. Cada exercício
aparece primeiro como desafio (a turma tenta sozinha) e depois como a solução
sendo digitada. Para conferir se a apresentação ainda bate com os arquivos
desta pasta: `node aula/tools/check-sync.js`.
