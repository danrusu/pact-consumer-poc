const productService = new ProductService(
  'https://pact-provider-poc.herokuapp.com',
);

const displayProducts = async () => {
  const products = await productService.getProducts();
  const productsHtml = products
    .map(
      product =>
        `<div id="${product.id}" class="product" onclick="displayProduct(${product.id})">` +
        `<span>${product.name}</span><span>${product.price}</span>` +
        '</div>',
    )
    .join('');

  document.getElementById('products').innerHTML = productsHtml;
};

const displayProduct = async productId => {
  const product = await productService.getProduct(productId);
  const productHtml = Object.entries(product).reduce(
    (acc, [key, val]) =>
      acc +
      `<div class="productDetail">` +
      `<span>${key}</span><span>${
        key === 'shop' ? val.name + ', ' + val.location : val
      }</span>` +
      '</div>',
    '',
  );
  document.getElementById('product').innerHTML = productHtml;
};
