const getLoading = document.querySelector('.loading');
const getListCarrinho = document.querySelector('.cart__items');
const getAllCarrinho = document.querySelectorAll('.cart__items');
const getClearButtom = document.querySelector('.empty-cart');
const getSomatorio = document.querySelector('.total-price');

// function saveStorage() {
//   localStorage.setItem('cartItems', getListCarrinho.innerHTML); // requisito 4 para salvar os dados no localstorage;
// }

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

let somatorio = 0;
const somando = (valor) => {
  somatorio += valor;
  somatorio = parseFloat(somatorio.toFixed(2));
  getSomatorio.innerHTML = Math.abs(somatorio);
};

function cartItemClickListener(event) {
  const valorClicado = event.target.innerHTML;
  const indiceValor = valorClicado.indexOf('$');
  const valorRemovido = valorClicado.slice(indiceValor + 1);
  somando(-parseFloat(valorRemovido));
  event.target.remove();
  const allCartItems = getListCarrinho;
  localStorage.setItem('cart_items', allCartItems.innerHTML);
  // saveStorage(); // para o req 4
}

function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  somando(salePrice);
  // saveStorage(); // req 4
  return li;
}

const fetchMLitems = async (itemID) => {
  const listItem = await fetch(
    `https://api.mercadolibre.com/items/${itemID}`,
  );
  const listItemJson = await listItem.json();
  getListCarrinho.appendChild(createCartItemElement(
      listItemJson.id, listItemJson.title, listItemJson.price,
      ));
    localStorage.setItem('cart_items', getListCarrinho.innerHTML);
};

function createProductItemElement(sku, name, image) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const buttomAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttomAdd.addEventListener('click', () => fetchMLitems(sku));
  section.appendChild(buttomAdd);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const fetchML = async (option) => {
  const listProdutos = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${option}`,
  );
  const listProdutosJson = await listProdutos.json();
  const getSectionItens = document.querySelector('.items');
  listProdutosJson.results.forEach((produtoFinal) => {
    getSectionItens.appendChild(createProductItemElement(
      produtoFinal.id, produtoFinal.title, produtoFinal.thumbnail,
      ));
  });
  getLoading.remove();
};

getClearButtom.addEventListener('click', () => {
  getListCarrinho.innerHTML = '';//                    requisito 6 botao limpar
  getSomatorio.innerText = '';
  somatorio = 0;
  // saveStorage(); // req 4
});

window.onload = () => {
  fetchML('computador');
  // const listaSalva = localStorage.getItem('cartItems');
  // getListCarrinho.innerHTML = listaSalva; // requisito 4 salvar lista
  if (localStorage.length > 0) {
    getListCarrinho.innerHTML = localStorage.getItem('cart_items');
    getAllCarrinho.forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
 };
