// const getListCarrinho = document.querySelector('.cart__items');
// const getClearButtom = document.querySelector('.empty-cart');
// const getLoading = document.querySelector('.loading');// tem algo errado com os gets, req 7 deletar loading

// function saveStorage () {
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

function cartItemClickListener(event) {
  event.target.remove();
  // saveStorage(); // para o req 4
}

function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // saveStorage(); // req 4
  return li;
}

let somatorio = 0;
const somando = (valor) =>  {
  const getSomatorio = document.querySelector('.total-price');
  somatorio += Math.round(valor);
  const valorSomado = document.createElement('li');
  valorSomado.innerHTML = `Valor total compra: $${somatorio}`;  // nao passou no teste e nao esta de forma assincrona req 5
  getSomatorio.innerHTML = '';
  getSomatorio.appendChild(valorSomado);
}

const fetchMLitems = async (itemID) => {
  const listItem = await fetch(
    `https://api.mercadolibre.com/items/${itemID}`,
  );
  const listItemJson = await listItem.json();
  const getCartItem = document.querySelector('.cart__items');

    getCartItem.appendChild(createCartItemElement(
      listItemJson.id, listItemJson.title, listItemJson.base_price,
      ));
      somando(listItemJson.base_price);// parte do req 5
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
};

// document.querySelector('.empty-cart').addEventListener('clicl', () => {
//   getListCarrinho.innerHTML = '';                    requisito 6 botao limpar
//  saveStorage(); // req 4
// });

window.onload = () => {
  fetchML('computador');
  // const listaSalva = localStorage.getItem('cartItems');
  // getListCarrinho.innerHTML = listaSalva; // requisito 4 salvar lista
 };
