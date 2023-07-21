const productService = new ProductService('http://localhost:1113');

const displayProducts = async () => {
  const products = await productService.getProducts();
  const productsHtml = products.map(product => productHtml(product)).join('');

  document.getElementById('products').innerHTML = productsHtml;
};

const displayProduct = async productId => {
  const product = await productService.getProduct(productId);
  const productHtml = Object.entries(product).reduce(
    (acc, [productDetailName, productDetailValue]) =>
      acc + productDetailHtml(productDetailName, productDetailValue),
    '<h3>Product details</h3>',
  );
  document.getElementById('product').innerHTML = productHtml;
};

function productHtml(product) {
  return (
    `<div id="${product.id}" class="product" onclick="displayProduct(${product.id})">` +
    `<span>${product.name}</span><span>${product.price}</span>` +
    '</div>'
  );
}

function productDetailHtml(name, value) {
  return (
    `<div class="productDetail">` +
    `<span>${name}</span><span>${
      value === 'shop' ? value.name + ', ' + value.location : value
    }</span>` +
    '</div>'
  );
}
