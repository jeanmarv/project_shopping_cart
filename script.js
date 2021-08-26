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
  // coloque seu código aqui
}

function createCartItemElement(sku, name, salePrice) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
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
};

function createProductItemElement(sku, name, image) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
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

window.onload = () => {
  fetchML('computador');
 };
