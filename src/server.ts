import { Productos } from './productos';
import { Carrito } from './carrito';
import express from 'express';
import { Router } from 'express';
import { NextFunction } from 'express';
const app = express();
const routerProducts = Router();
const routerCarrito = Router();
const products = new Productos();
const carrito = new Carrito();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarrito);
app.use(express.static(__dirname + './dist/public'));

function random(): boolean {
  const code: number = Math.floor(Math.random() * 2);
  if (code == 1) {
    const ADMIN = false;
    return ADMIN;
  } else {
    const ADMIN = true;
    return ADMIN;
  }
}
const valueADMIN = random();
console.log(valueADMIN);

//GET admin / usuarios
app.get('/*', (req, res) => {
  res.json({ error: -2, descripcion: `RUTA: https://localhost:${port} METHOD:GET no implementado` });
});
//PRODUCTOS
routerProducts.get('/', async (req, res) => {
  const allProducts = await products.getAll();
  res.json(allProducts);
});
routerProducts.get('/:id', async (req, res) => {
  const { id } = req.params;
  const producto = await products.getById(id);
  res.json(producto);
});
//CARRITO
routerCarrito.get('/', async (req, res) => {
  const getCarrito = await carrito.get();
  res.json(getCarrito);
});

//POST admin
app.post('/*', (req, res) => {
  res.json({ error: -2, descripcion: `RUTA: https://localhost:${port} METHOD:POST no implementado` });
});
//PRODUCTOS
routerProducts.post(
  '/',
  (req, res, next: NextFunction) => {
    if (valueADMIN) {
      next();
    } else {
      return res.json({ error: -1, descripcion: `RUTA: https://localhost:${port}/api/productos METHOD:POST no autorizado` });
    }
  },
  (req, res) => {
    const { body } = req;
    products.post(body);
    res.json({ success: true, producto: 'se ha subido el producto correctamente' });
  }
);
//CARRITO
routerCarrito.post('/', (req, res) => {
  carrito.postCarrito();
  res.json({ succes: 'true', carrito: 'se ha creado un carrito con exito' });
});
routerCarrito.post('/:idCarrito/:idProducto', async (req, res) => {
  const idCarrito = req.params.idCarrito;
  const idProducto = req.params.idProducto;
  const product = await products.getById(idProducto);
  carrito.postProduct(Number(idCarrito), product);
  res.json({ succes: 'true', carrito: 'se ha subido producto al carrito de manera exitosa' });
});
//PUT admin
app.put('/*', (req, res) => {
  res.json({ error: -2, descripcion: `RUTA: https://localhost:${port} METHOD:PUT no implementado` });
});
//PRODUCTOS
routerProducts.put('/:id');
routerProducts.put(
  '/:id',
  (req, res, next: NextFunction) => {
    if (valueADMIN) {
      next();
    } else {
      return res.json({ error: -1, descripcion: `RUTA: https://localhost:${port}/api/productos METHOD:PUT no autorizado` });
    }
  },
  async (req, res) => {
    const { id } = req.params;
    const allProductos = await products.getAll();
    if (id <= allProductos.length) {
      const { body } = req;
      console.log(body);
      await products.put(id, body.sniker, body.brand, body.price, body.thumbnail, body.description);
      res.json({ succes: true, producto: 'producto actualizado con exito' });
    } else {
      res.json({ error: true, producto: 'producto no encontrado' });
    }
  }
);

//DELETE admin
app.delete('/*', (req, res) => {
  res.json({ error: -2, descripcion: `RUTA: https://localhost:${port} METHOD:DELETE no implementado` });
});
//PRODUCTOS
routerProducts.delete(
  '/:id',
  (req, res, next: NextFunction) => {
    if (valueADMIN) {
      next();
    } else {
      return res.json({ error: -1, descripcion: `RUTA: https://localhost:${port}/api/productos METHOD:DELETE no autorizado` });
    }
  },
  async (req, res) => {
    const { id } = req.params;
    const allProductos = await products.getAll();
    if (id <= allProductos.length) {
      const { id } = req.params;
      await products.deleteById(id);
      res.json({ succes: true, producto: 'producto elimnado con exito' });
    } else {
      res.json({ error: true, producto: 'producto no encontrado' });
    }
  }
);
//CARRITO
routerCarrito.delete('/:idCarrito', async (req, res) => {
  const idCarrito = req.params.idCarrito;
  const carritos = await carrito.get();
  if (idCarrito <= carritos.length) {
    await carrito.deleteCarrito(Number(idCarrito));
    res.json({ succes: true, carrito: 'se ha eliminado el carrito' });
  } else {
    res.json({ error: true, carrito: 'no se ha encontrado ese carrito' });
  }
});
routerCarrito.delete('/:idCarrito/:idProducto', async (req, res) => {
  const idCarrito = req.params.idCarrito;
  const idProducto = req.params.idProducto;
  const carritos = await carrito.get();
  if (idCarrito <= carritos.length) {
    await carrito.deleteProduct(Number(idCarrito), Number(idProducto));
    res.json({ succes: true, carrito: 'se ha eliminado correctamente el producto del carrito' });
  } else {
    res.json({ error: true, carrito: 'carrito no encontrado' });
  }
});
app.listen(port, () => console.log(`The server is running in: http://localhost:${port}/api/productos`));
