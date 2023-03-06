// ProductService will be used in Browser and in NodeJS contract tests
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

  getHealth() {
    return fetch(`${this.baseUrl}/health`).then(res => res.status === 200);
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
