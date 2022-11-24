import { connect } from 'http2';

const fs = require('fs');
export class Productos {
  private filePath: string;
  constructor() {
    this.filePath = './products.json';
  }
  getAll = async () => {
    try {
      const getProducts = await fs.promises.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(getProducts);
      return products;
    } catch (error) {
      console.log(error);
    }
  };
  getById = async (id: string) => {
    try {
      const products: object[] = await this.getAll();
      const getProduct = products.find((product: any) => product.id === id);
      if (getProduct) {
        return getProduct;
      } else {
        return { error: 'true', description: 'No product with such id' };
      }
    } catch (error) {
      console.log(error);
    }
  };
  post = async (newProduct: { sniker: string; brand: string; price: string; thumbnail: string; description: string; timestamp: string; code: string; id?: string }) => {
    try {
      const fechaActual = Date.now();
      const fecha: Date = new Date(fechaActual);
      const fechaFormat: string = fecha.toLocaleString();
      newProduct['timestamp'] = fechaFormat;
      const code: number = Math.floor(Math.random() * 1000);
      const formatCode: string = code.toLocaleString();
      newProduct['code'] = formatCode;
      const products: object[] = await this.getAll();
      if (products.length === 0) {
        const id: string = '0';
        newProduct.id = id;
      } else {
        const id = products.length + 1;
        const fixId: string = id.toString();
        newProduct.id = fixId;
      }
      products.push(newProduct);
      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null));
    } catch (error) {
      console.log(error);
    }
  };
  put = async (id: string, sniker: string, brand: string, price: string, thumbnail: string, description: string) => {
    try {
      const products: any = await this.getAll();
      const getProduct = products.find((product: any) => product.id === id);
      if (getProduct) {
        getProduct.sniker = sniker;
        getProduct.brand = brand;
        getProduct.price = price;
        getProduct.thumbnail = thumbnail;
        getProduct.description = description;
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteById = async (id: string) => {
    try {
      const products: object[] = await this.getAll();
      const getProduct = products.find((product: any) => product.id === id);
      if (!getProduct) {
        console.log({ error: 'true', description: 'No product witch such id ' });
      }
      const filterProducts: object[] = products.filter((producto: any) => producto.id != id);
      await fs.promises.writeFile(this.filePath, JSON.stringify(filterProducts, null));
    } catch (error) {
      console.log(error);
    }
  };
}
