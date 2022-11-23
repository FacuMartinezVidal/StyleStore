import { Productos } from './productos';
import express from 'express';
import { Router } from 'express';
const app = express();
const routerProducts = Router();
const products = new Productos();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducts);
app.use(express.static(__dirname + './dist/public'));

//GET admin / usuarios
routerProducts.get('/', async (req, res) => {
  const allProducts = await products.getAll();
  res.json(allProducts);
});
routerProducts.get('/:id', async (req, res) => {
  const { id } = req.params;
  const producto = await products.getById(id);
  res.json(producto);
});

//POST admin
routerProducts.post('/', (req, res) => {
  const { body } = req;
  products.post(body);
  res.json({ success: true, producto: 'se ha subido correctamente' });
});

//PUT admin
routerProducts.put('/:id', async (req, res) => {
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
});

//DELETE admin
routerProducts.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const allProductos = await products.getAll();
  if (id <= allProductos.length) {
    const { id } = req.params;
    await products.deleteById(id);
    res.json({ succes: true, producto: 'producto eliminado' });
  } else {
    res.json({ error: true, producto: 'producto no encontrado' });
  }
});
app.listen(port, () => console.log(`The server is running in: http://localhost:${port}`));
