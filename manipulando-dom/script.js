const titulo = document.getElementById('titulo');
const contador = document.getElementById('contador');
const lista = document.getElementById('lista');
const campoItem = document.getElementById('campo-item');
const botaoAdicionar = document.getElementById('botao-adicionar');

titulo.textContent = 'Lista de compras';

function atualizarContador() {
  contador.textContent = `${lista.children.length} itens`;
}

function adicionarItem() {
  const texto = campoItem.value.trim();
  if (texto === '') {
    return;
  }

  const item = document.createElement('li');
  item.textContent = texto;
  item.addEventListener('click', () => {
    item.remove();
    atualizarContador();
  });
  lista.appendChild(item);
  atualizarContador();
  campoItem.value = '';
  campoItem.focus();
}

botaoAdicionar.addEventListener('click', adicionarItem);

campoItem.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    adicionarItem();
  }
});

const botaoInnerHtml = document.getElementById('botao-innerhtml');
botaoInnerHtml.addEventListener('click', () => {
  lista.innerHTML += `<li>${campoItem.value}</li>`;
  atualizarContador();
});
