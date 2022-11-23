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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = void 0;
var fs = require('fs');
var Productos = /** @class */ (function () {
    function Productos() {
        var _this = this;
        this.getAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var getProducts, products, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.readFile(this.filePath, 'utf-8')];
                    case 1:
                        getProducts = _a.sent();
                        products = JSON.parse(getProducts);
                        return [2 /*return*/, products];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var products, getProduct, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        products = _a.sent();
                        getProduct = products.find(function (product) { return product.id === id; });
                        return [2 /*return*/, getProduct];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.post = function (newProduct) { return __awaiter(_this, void 0, void 0, function () {
            var products, id, id, fixId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        products = _a.sent();
                        if (products.length === 0) {
                            id = '0';
                            newProduct.id = id;
                        }
                        else {
                            id = products.length + 1;
                            fixId = id.toString();
                            newProduct.id = fixId;
                        }
                        products.push(newProduct);
                        return [4 /*yield*/, fs.promises.writeFile(this.filePath, JSON.stringify(products, null))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.put = function (id, sniker, brand, price, thumbnail, description) { return __awaiter(_this, void 0, void 0, function () {
            var products, getProduct, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        products = _a.sent();
                        getProduct = products.find(function (product) { return product.id === id; });
                        if (!getProduct) return [3 /*break*/, 3];
                        getProduct.sniker = sniker;
                        getProduct.brand = brand;
                        getProduct.price = price;
                        getProduct.thumbnail = thumbnail;
                        getProduct.description = description;
                        return [4 /*yield*/, fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, { error: 'Product not found' }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var products, getProduct, filterProducts, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        products = _a.sent();
                        getProduct = products.find(function (product) { return product.id === id; });
                        if (!getProduct) {
                            return [2 /*return*/, { error: 'No product witch such id ' }];
                        }
                        filterProducts = products.filter(function (producto) { return producto.id != id; });
                        return [4 /*yield*/, fs.promises.writeFile(this.filePath, JSON.stringify(filterProducts, null))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.filePath = './products.json';
    }
    return Productos;
}());
exports.Productos = Productos;
// async function print() {
//   const objeto = new Productos();
//   console.log(await objeto.getAll());
// }
// print();
