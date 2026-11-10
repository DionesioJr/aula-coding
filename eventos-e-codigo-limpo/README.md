# Eventos e código limpo

Aula 2 de 3 da série **Minhas tecnologias**, da disciplina de Coding. Para
iniciantes: foco na lógica, nenhum CSS e exercícios pequenos em sequência
(21 ao todo).

1. **Eventos** (exercícios 1 a 14, em [`eventos.html`](eventos.html) +
   [`src/eventos.ts`](src/eventos.ts)). Começa com três telas simples:
   - **contador de cliques** (botão **+ 1** e **Zerar**);
   - **o nome aparece em cima** conforme a pessoa digita (evento `input`,
     `event.target`, `if`/`else` e template string);
   - **calculadora de IMC** (ler campos com `Number`, calcular, classificar
     e proteger contra campo vazio).

   Depois: passar a função sem parênteses, formulário com `preventDefault`,
   a armadilha do `innerHTML +=` e a delegação de eventos.
2. **Código limpo** (exercícios 15 a 21, em [`src/limpo.ts`](src/limpo.ts)):
   nomes que explicam, uma função uma tarefa, retorno antecipado, teste de
   mesa, todos os caminhos retornam e números mágicos.
3. **Laboratório** (em [`src/app.ts`](src/app.ts)): a lista "Minhas
   tecnologias" começa **bagunçada** e é refatorada em 5 passos (nomes,
   `early return`, `createElement`, delegação, funções pequenas).

## Instalar e executar

```bash
npm install
npm run dev      # recompila a cada salvamento (deixe aberto)
npm run limpo    # compila e roda o src/limpo.ts no terminal
```

Abra [`eventos.html`](eventos.html) (telas de eventos) e
[`index.html`](index.html) (a lista) no navegador. Eles carregam
`dist/*.js`, que é gerado pelo TypeScript e **não** fica no repositório (rode
`npm run build` ou `npm run dev` primeiro).

## Apresentação da aula

Abra [`aula/index.html`](aula/index.html) no navegador. Cada exercício
aparece primeiro como desafio e depois como a solução sendo digitada. Para
conferir se a apresentação ainda bate com os arquivos desta pasta:
`npm run check-aula`.
