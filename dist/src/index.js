import { CanvasLocal } from './canvasLocal.js';
import { CanvasCart } from './canvasCart.js';
var canvas;
var graphics;
var categorie = document.getElementById("value");
var orderType = document.getElementById("orderType"); // Nuevo
canvas = document.getElementById('barchart');
graphics = canvas.getContext('2d');
function parseData(ordenar, tipoOrden) {
    if (ordenar === void 0) { ordenar = false; }
    if (tipoOrden === void 0) { tipoOrden = 'asc'; }
    var args = categorie.value;
    var factores = args.split(',').map(function (elem) { return elem.trim(); }); // Limpiar espacios extra
    if (factores.length % 2 !== 0) {
        alert("Debes ingresar pares de datos (etiqueta, valor)...");
        return null;
    }
    if (ordenar) {
        // Agrupar en pares 
        var pares = [];
        for (var i = 0; i < factores.length; i += 2) {
            pares.push([factores[i], parseFloat(factores[i + 1])]);
        }
        // Ordenar los pares según el tipo de orden
        pares.sort(function (a, b) { return tipoOrden === 'asc' ? a[1] - b[1] : b[1] - a[1]; });
        // Reconstruir el array plano 
        factores = [];
        pares.forEach(function (pair) {
            factores.push(pair[0], pair[1].toString());
        });
    }
    return factores;
}
function graficar(evt) {
    evt.preventDefault();
    var factores = parseData(false);
    if (factores) {
        var miCanvas = new CanvasLocal(graphics, canvas, factores);
        miCanvas.paint();
    }
}
function graficarCartesiano(evt) {
    evt.preventDefault();
    var factores = parseData(false);
    if (factores) {
        var miCanvas = new CanvasCart(graphics, canvas, factores);
        miCanvas.paint();
    }
}
function graficarOrdenado(evt) {
    evt.preventDefault();
    var tipoOrden = orderType.value === 'desc' ? 'desc' : 'asc'; // Leemos el valor
    var factores = parseData(true, tipoOrden);
    if (factores) {
        var miCanvas = new CanvasLocal(graphics, canvas, factores);
        miCanvas.paint();
    }
}
document.getElementById("calcular").addEventListener("click", graficar, false);
document.getElementById("graficar").addEventListener("click", graficarCartesiano, false);
document.getElementById("ordenar").addEventListener("click", graficarOrdenado, false);
