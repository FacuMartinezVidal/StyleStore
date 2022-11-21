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
      return getProduct;
    } catch (error) {
      console.log(error);
    }
  };
  post = async (newProduct: { sniker: string; brand: string; id?: string }) => {
    try {
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
  put = async (id: string, sniker: string, brand: string) => {
    try {
      const products: any = await this.getAll();
      const getProduct = products.find((product: any) => product.id === id);
      if (getProduct) {
        getProduct.sniker = sniker;
        getProduct.brand = brand;
      } else {
        return { error: 'Product not found' };
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
        return { error: 'No product witch such id ' };
      }
      const filterProducts: object[] = products.filter((producto: any) => producto.id != id);
      await fs.promises.writeFile(this.filePath, JSON.stringify(filterProducts, null));
    } catch (error) {
      console.log(error);
    }
  };
}

// async function print() {
//   const objeto = new Productos();
//   console.log(await objeto.getAll());
// }
// print();
