import 'dotenv/config';

import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';

import { loadSync } from '@grpc/proto-loader';

import path from 'path';

import { 
  createProduct,
  cloneProduct,
  getProductsByName,
  getAllProducts,
  updateProductData,
  deleteProduct
} from './implementations/product';

const productPath = path.resolve(__dirname, 'proto', 'product.proto');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const packageDefinition = loadSync(productPath, options);
  
const { product } = loadPackageDefinition(packageDefinition) as any;

const server = new Server();

server.addService(product.ProductService.service, {
  createProduct,
  cloneProduct,
  getProductsByName,
  getAllProducts,
  updateProductData,
  deleteProduct
});

server.bindAsync(`${process.env.SERVER_URL}`, ServerCredentials.createInsecure(), () => {
  server.start();
});


