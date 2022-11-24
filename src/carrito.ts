const fs = require('fs');

export class Carrito {
  private filePath: string;
  constructor() {
    this.filePath = './carrito.json';
  }
  postProduct = async (idCarrito: number, product: any) => {
    try {
      const carritos: object[] = await this.get();
      const carrito: any = carritos[idCarrito - 1];
      carrito.push(product);
      await fs.promises.writeFile(this.filePath, JSON.stringify(carritos, null));
    } catch (error) {
      console.log(error);
    }
  };
  postCarrito = async () => {
    try {
      const carrito: Object[] = [];
      type infoCarrito = { id: string; timestamp: string };
      const carritos: object[] = await this.get();
      const fechaActual = Date.now();
      const fecha: Date = new Date(fechaActual);
      const fechaFormat: string = fecha.toLocaleString();
      if (carritos.length === 0) {
        const fixId: string = '0';
        const info: infoCarrito = { id: fixId, timestamp: fechaFormat };
        carrito.push(info);
      } else {
        const id = carritos.length + 1;
        const fixId: string = id.toString();
        const info: infoCarrito = { id: fixId, timestamp: fechaFormat };
        carrito.push(info);
        carritos.push(carrito);
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(carritos, null));
    } catch (error) {
      console.log(error);
    }
  };
  deleteCarrito = async (idCarrito: number) => {
    try {
      const carritos: [] = await this.get();
      let carritoFixed: [] = [];
      for (let i = 0; i < carritos.length; i++) {
        if (i != idCarrito - 1) {
          carritoFixed.push(carritos[i]);
        }
      }
      await fs.promises.writeFile(this.filePath, JSON.stringify(carritoFixed, null));
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (idCarrito: any, idProducto: any) => {
    try {
      const carritos: [] = await this.get();
      let carritoFixed: any = [];
      let subCarritoFixed: any = [];
      for (let i = 0; i < carritos.length; i++) {
        if (i == idCarrito - 1) {
          let carrito: [] = carritos[i];
          const info = carritos[i][0];
          subCarritoFixed.push(info);
          for (let z = 1; z < carrito.length; z++) {
            if (z != idProducto) {
              const producto = carritos[i][z];
              subCarritoFixed.push(producto);
              carritoFixed.push(subCarritoFixed);
            }
          }
        } else {
          let carrito: [] = carritos[i];
          carritoFixed.push(carrito);
        }
      }
      console.log(carritoFixed);
      await fs.promises.writeFile(this.filePath, JSON.stringify(carritoFixed, null));
    } catch (error) {
      console.log(error);
    }
  };
  get = async () => {
    try {
      const get = await fs.promises.readFile(this.filePath, 'utf-8');
      const data = JSON.parse(get);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
