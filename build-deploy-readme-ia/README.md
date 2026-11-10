# Do computador para o mundo

Aula 3 de 3 da série **Minhas tecnologias**, da disciplina de Coding. Para
iniciantes: o projeto parte do resultado da aula anterior (código limpo) e
aprende a **publicar** com segurança. Sem CSS, 12 exercícios curtos:

1. **Projeto profissional** (exercícios 1 a 3): `package.json`, `.gitignore`
   e segredos (`.env.example`);
2. **Build e deploy** (exercícios 4 a 6): do `.ts` ao `.js`, erro de
   compilação, `noEmitOnError` e o passo a passo do GitHub Pages;
3. **Testes simples e IA** (exercícios 7 a 11, em
   [`src/temperatura.ts`](src/temperatura.ts) e [`src/email.ts`](src/email.ts)):
   funções "geradas por IA" com um erro escondido, que a turma descobre com
   `console.assert` e conserta;
4. **README** (exercício 12): o cartão de visitas do projeto.

Fecha com um checklist de publicação e revisão em dupla.

## Instalar e executar

```bash
npm install
npm run build    # compila src/*.ts para dist/*.js
npm run teste    # compila e roda os testes (silêncio = tudo passou)
```

Abra [`index.html`](index.html) no navegador depois do `build`: ele carrega
`dist/app.js`, que é gerado pelo TypeScript e **não** fica neste repositório
de aulas.

## Apresentação da aula

Abra [`aula/index.html`](aula/index.html) no navegador. Cada exercício
aparece primeiro como desafio e depois como a solução sendo digitada. Para
conferir se a apresentação ainda bate com os arquivos desta pasta:
`npm run check-aula`.
