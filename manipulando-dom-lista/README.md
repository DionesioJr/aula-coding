# Manipulando o DOM

Aula da disciplina de Coding: uma lista de compras em HTML e JavaScript
puros, sem bibliotecas e sem npm. Parte do zero e chega em eventos:

1. o que é o DOM;
2. selecionar elementos com `getElementById` (e o `null` quando o id não existe);
3. ler e trocar texto com `textContent`;
4. criar e inserir com `createElement` e `appendChild`, e contar com `children.length`;
5. eventos com `addEventListener` (clique no botão, Enter no campo, clique no item pra remover);
6. por que `innerHTML +=` apaga os ouvintes registrados nos elementos que já existiam.

## Executar

Abra [`index.html`](index.html) no navegador e use o Console (F12).
O código fica em [`script.js`](script.js).

O botão **Adicionar com innerHTML +=** tem um problema de propósito: depois
de usá-lo, os itens adicionados antes deixam de ser removidos com o clique.

## Apresentação da aula

Abra [`aula/index.html`](aula/index.html) no navegador.
