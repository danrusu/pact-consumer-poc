const path = require('path');
const testProducts = require('../data/products.json');
const { ProductService } = require('../src/ProductService');

const {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} = require('@pact-foundation/pact');
const { like } = MatchersV3;

const producerMock = new PactV3({
  consumer: 'pact-consumer-poc',
  provider: 'pact-provider-poc',
  port: process.env.PACT_PRODUCER_MOCK_PORT || 1122,
  dir: path.resolve(process.cwd(), 'pact', 'pacts'),
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  logLevel: 'warn',
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
});

describe('ProductService Pact test', () => {
  describe('server healthcheck', () => {
    test('server is up', async () => {
      // Arrange
      // set up Pact interactions
      producerMock.addInteraction({
        uponReceiving: 'get health',
        withRequest: {
          method: 'GET',
          path: '/health',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        },
      });

      await producerMock.executeTest(async mockService => {
        console.log(`PACT Producer Mock URL: ${mockService.url}`);

        const productService = new ProductService(mockService.url);

        // Act & Assert
        // make request to Pact mock server
        const isHealthy = await productService.getHealth();

        expect(isHealthy).toStrictEqual(true);
      });
    });
  });

  describe('getting all products', () => {
    test('products exist', async () => {
      // Arrange
      // set up Pact interactions
      producerMock.addInteraction({
        states: [{ description: 'products exist' }],
        uponReceiving: 'get all products',
        withRequest: {
          method: 'GET',
          path: '/products',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like(testProducts),
        },
      });

      await producerMock.executeTest(async mockService => {
        console.log(`PACT Producer Mock URL: ${mockService.url}`);

        const productService = new ProductService(mockService.url);

        // Act & Assert
        // make request to Pact mock server
        const products = await productService.getProducts();

        expect(products).toStrictEqual(testProducts);
      });
    });
  });

  describe('getting one product by ID', () => {
    test('product with ID 100 exists', async () => {
      // Arrange
      producerMock.addInteraction({
        states: [{ description: 'product with ID 100 exists' }],
        uponReceiving: 'get product with ID 100',
        withRequest: {
          method: 'GET',
          path: '/products/100',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: like(testProducts[0]),
        },
      });

      await producerMock.executeTest(async mockService => {
        const productService = new ProductService(mockService.url);

        // Act & Assert
        const product = await productService.getProduct(100);

        expect(product).toStrictEqual(testProducts[0]);
      });
    });
  });
});
