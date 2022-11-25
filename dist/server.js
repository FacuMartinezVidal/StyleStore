"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var productos_1 = require("./productos");
var carrito_1 = require("./carrito");
var express_1 = __importDefault(require("express"));
var express_2 = require("express");
var app = (0, express_1.default)();
var routerProducts = (0, express_2.Router)();
var routerCarrito = (0, express_2.Router)();
var products = new productos_1.Productos();
var carrito = new carrito_1.Carrito();
var port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarrito);
app.use(express_1.default.static(__dirname + './dist/public'));
function random() {
    var code = Math.floor(Math.random() * 2);
    if (code == 1) {
        var ADMIN = false;
        return ADMIN;
    }
    else {
        var ADMIN = true;
        return ADMIN;
    }
}
var valueADMIN = random();
console.log(valueADMIN);
//GET admin / usuarios
app.get('/*', function (req, res) {
    res.json({ error: -2, descripcion: "RUTA: https://localhost:".concat(port, " METHOD:GET no implementado") });
});
//PRODUCTOS
routerProducts.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, products.getAll()];
            case 1:
                allProducts = _a.sent();
                res.json(allProducts);
                return [2 /*return*/];
        }
    });
}); });
routerProducts.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, producto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, products.getById(id)];
            case 1:
                producto = _a.sent();
                res.json(producto);
                return [2 /*return*/];
        }
    });
}); });
//CARRITO
routerCarrito.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getCarrito;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, carrito.get()];
            case 1:
                getCarrito = _a.sent();
                res.json(getCarrito);
                return [2 /*return*/];
        }
    });
}); });
//POST admin
app.post('/*', function (req, res) {
    res.json({ error: -2, descripcion: "RUTA: https://localhost:".concat(port, " METHOD:POST no implementado") });
});
//PRODUCTOS
routerProducts.post('/', function (req, res, next) {
    if (valueADMIN) {
        next();
    }
    else {
        return res.json({ error: -1, descripcion: "RUTA: https://localhost:".concat(port, "/api/productos METHOD:POST no autorizado") });
    }
}, function (req, res) {
    var body = req.body;
    products.post(body);
    res.json({ success: true, producto: 'se ha subido el producto correctamente' });
});
//CARRITO
routerCarrito.post('/', function (req, res) {
    carrito.postCarrito();
    res.json({ succes: 'true', carrito: 'se ha creado un carrito con exito' });
});
routerCarrito.post('/:idCarrito/:idProducto', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCarrito, idProducto, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCarrito = req.params.idCarrito;
                idProducto = req.params.idProducto;
                return [4 /*yield*/, products.getById(idProducto)];
            case 1:
                product = _a.sent();
                carrito.postProduct(Number(idCarrito), product);
                res.json({ succes: 'true', carrito: 'se ha subido producto al carrito de manera exitosa' });
                return [2 /*return*/];
        }
    });
}); });
//PUT admin
app.put('/*', function (req, res) {
    res.json({ error: -2, descripcion: "RUTA: https://localhost:".concat(port, " METHOD:PUT no implementado") });
});
//PRODUCTOS
routerProducts.put('/:id');
routerProducts.put('/:id', function (req, res, next) {
    if (valueADMIN) {
        next();
    }
    else {
        return res.json({ error: -1, descripcion: "RUTA: https://localhost:".concat(port, "/api/productos METHOD:PUT no autorizado") });
    }
}, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, allProductos, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, products.getAll()];
            case 1:
                allProductos = _a.sent();
                if (!(id <= allProductos.length)) return [3 /*break*/, 3];
                body = req.body;
                console.log(body);
                return [4 /*yield*/, products.put(id, body.sniker, body.brand, body.price, body.thumbnail, body.description)];
            case 2:
                _a.sent();
                res.json({ succes: true, producto: 'producto actualizado con exito' });
                return [3 /*break*/, 4];
            case 3:
                res.json({ error: true, producto: 'producto no encontrado' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//DELETE admin
app.delete('/*', function (req, res) {
    res.json({ error: -2, descripcion: "RUTA: https://localhost:".concat(port, " METHOD:DELETE no implementado") });
});
//PRODUCTOS
routerProducts.delete('/:id', function (req, res, next) {
    if (valueADMIN) {
        next();
    }
    else {
        return res.json({ error: -1, descripcion: "RUTA: https://localhost:".concat(port, "/api/productos METHOD:DELETE no autorizado") });
    }
}, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, allProductos, id_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, products.getAll()];
            case 1:
                allProductos = _a.sent();
                if (!(id <= allProductos.length)) return [3 /*break*/, 3];
                id_1 = req.params.id;
                return [4 /*yield*/, products.deleteById(id_1)];
            case 2:
                _a.sent();
                res.json({ succes: true, producto: 'producto elimnado con exito' });
                return [3 /*break*/, 4];
            case 3:
                res.json({ error: true, producto: 'producto no encontrado' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//CARRITO
routerCarrito.delete('/:idCarrito', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCarrito, carritos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCarrito = req.params.idCarrito;
                return [4 /*yield*/, carrito.get()];
            case 1:
                carritos = _a.sent();
                if (!(idCarrito <= carritos.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, carrito.deleteCarrito(Number(idCarrito))];
            case 2:
                _a.sent();
                res.json({ succes: true, carrito: 'se ha eliminado el carrito' });
                return [3 /*break*/, 4];
            case 3:
                res.json({ error: true, carrito: 'no se ha encontrado ese carrito' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
routerCarrito.delete('/:idCarrito/:idProducto', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCarrito, idProducto, carritos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCarrito = req.params.idCarrito;
                idProducto = req.params.idProducto;
                return [4 /*yield*/, carrito.get()];
            case 1:
                carritos = _a.sent();
                if (!(idCarrito <= carritos.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, carrito.deleteProduct(Number(idCarrito), Number(idProducto))];
            case 2:
                _a.sent();
                res.json({ succes: true, carrito: 'se ha eliminado correctamente el producto del carrito' });
                return [3 /*break*/, 4];
            case 3:
                res.json({ error: true, carrito: 'carrito no encontrado' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () { return console.log("The server is running in: http://localhost:".concat(port, "/api/productos")); });
