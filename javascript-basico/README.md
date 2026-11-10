# JavaScript básico: falando com o computador

Aula da disciplina de Coding para quem está começando, **a primeira da
trilha**. Um assunto só: o básico da linguagem, sem página, sem CSS e sem
instalar bibliotecas, direto no terminal. A turma faz nove exemplos pequenos,
um arquivo cada, do mais fácil ao mais difícil:

| Exemplo | Assunto | Arquivo |
| --- | --- | --- |
| 1 | mostrar uma mensagem (`console.log`) | [`ex1-mensagem.js`](exemplos/ex1-mensagem.js) |
| 2 | variáveis (`let` e `const`) | [`ex2-variaveis.js`](exemplos/ex2-variaveis.js) |
| 3 | tipos de dados (`number`, `string`, `boolean`) | [`ex3-tipos.js`](exemplos/ex3-tipos.js) |
| 4 | contas (`+`, `-`, `*`, `/`, `+=`, `++`) | [`ex4-contas.js`](exemplos/ex4-contas.js) |
| 5 | comparações (`<`, `>`, `===`) | [`ex5-comparacoes.js`](exemplos/ex5-comparacoes.js) |
| 6 | funções (definir e chamar) | [`ex6-funcoes.js`](exemplos/ex6-funcoes.js) |
| 7 | `if` | [`ex7-if.js`](exemplos/ex7-if.js) |
| 8 | `if` / `else` | [`ex8-if-else.js`](exemplos/ex8-if-else.js) |
| 9 | desafio: mini placar no terminal | [`ex9-mini-placar.js`](exemplos/ex9-mini-placar.js) |

Cada exemplo roda sozinho, não depende dos anteriores, e segue o mesmo ciclo:
slide de teoria curto, cartão "Sua vez" (a turma tenta sozinha), solução
digitada e teste no terminal.

Próxima aula da trilha: [`manipulando-dom`](../manipulando-dom/), que usa as
mesmas ideias para mudar uma página de verdade.

## Executar

Com o [Node](https://nodejs.org) instalado, no terminal, nesta pasta:

```bash
node exemplos/ex1-mensagem.js
```

Sem o Node, cole o conteúdo do arquivo no Console do navegador (F12).

## Apresentação da aula

Abra [`aula/index.html`](aula/index.html) no navegador. Para conferir se a
apresentação ainda bate com os arquivos desta pasta:
`node aula/tools/check-sync.js`.
