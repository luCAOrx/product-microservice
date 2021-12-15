import { PrismaClient } from '@prisma/client'

import { promisify } from 'util';
import fileSystem from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function createProduct(call: any, callback: any) {
  const {
    thumbnail,
    nome,
    preco,
    ingredientes,
    disponibilidade,
    volume,
    outros
  } = call.request.product;

  try {
    const product = await prisma.products.create({
      data: {
        thumbnail,
        nome,
        preco,
        ingredientes,
        disponibilidade,
        volume,
        outros
      }
    });

    return callback(null, { product });
  } catch (error) {
    return callback(error, null);
  };
};

export async function cloneProduct(call: any, callback: any) {
  const { id } = call.request;

  try {
    const productClone = await prisma.products.findFirst({
      where: { id }
    });

    const product = await prisma.products.create({
      data: {
        thumbnail: String(productClone?.thumbnail),
        nome: String(productClone?.nome),
        preco: String(productClone?.preco),
        ingredientes: String(productClone?.ingredientes),
        disponibilidade: String(productClone?.disponibilidade),
        volume: String(productClone?.volume),
        outros: String(productClone?.outros)
      }
    });

    return callback(null, { product });
  } catch (error) {
    return callback(error, null);
  };
};

export async function getProductsByName(call: any, callback: any) {
  console.log(call.request);
  
  const { nome, page } = call.request;

  try {
    const products = await prisma.products.findMany({
      where: { nome },
      orderBy: { id: 'desc' },
      take: 5,
      skip: (Number(page) - 1) * 5
    });
    
    return callback(null, { products });
  } catch (error) {
    return callback(error, null);
  };
};

export async function getAllProducts(call: any, callback: any) {
  const { page } = call.request;

  try {
    const products = await prisma.products.findMany({
      orderBy: { id: 'desc' },
      take: 5,
      skip: (Number(page) - 1) * 5
    });

    return callback(null, { products })
  } catch (error) {
    callback(error, null);
  };
};

export async function updateProductData(call: any, callback: any) {
  const {
    id,
    thumbnail,
    nome,
    preco,
    ingredientes,
    disponibilidade,
    volume,
    outros
  } = call.request.product;

  try {
    const thumbnailInDataBase = await prisma.products.findFirst({
      where: { id },
      select: { thumbnail: true }
    })

    promisify(fileSystem.unlink)(path.resolve(
      __dirname, '..', '..', '..', '..', 'api', 'uploads', `product/${thumbnailInDataBase?.thumbnail}`,
    ));

    const product = await prisma.products.update({
      where: { id },
      data: {
        thumbnail,
        nome,
        preco,
        ingredientes,
        disponibilidade,
        volume,
        outros
      }
    });

    return callback(null, { product });
  } catch (error) {
    return callback(error, null);
  };
};

export async function deleteProduct(call: any, callback: any) {
  const { id } = call.request;

  try {
    const thumbnailInDataBase = await prisma.products.findFirst({
      where: { id },
      select: { thumbnail: true }
    });
    
    promisify(fileSystem.unlink)(path.resolve(
      __dirname, '..', '..', '..', '..', 'api', 'uploads', `product/${thumbnailInDataBase?.thumbnail}`,
    ));

    await prisma.products.delete({
      where: { id }
    });
 
    return callback(null, null)
  } catch (error) {
    return callback(error, null)
  };
};