// IMPORTANT
// The App will use ProductService in Browser
// The contract tests run in NodeJS and will also use ProductService
const isNodeJs = typeof window === 'undefined';

if (isNodeJs) {
  const fetch2 = require('node-fetch');

  function fetch(...args) {
    return fetch2(...args);
  }
}

class ProductService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getProducts() {
    return fetch(`${this.baseUrl}/products`).then(res => res.json());
  }

  getProduct(productId) {
    return fetch(`${this.baseUrl}/products/${productId}`).then(res =>
      res.json(),
    );
  }
}

if (isNodeJs) {
  module.exports = { ProductService };
}
