import { CanvasLocal } from './canvasLocal.js';
import { CanvasCart } from './canvasCart.js';
var canvas;
var graphics;
var categorie = document.getElementById("value");
var data = [];
canvas = document.getElementById('barchart');
graphics = canvas.getContext('2d');
function graficar(evt) {
    evt.preventDefault();
    var args = categorie.value;
    var factores = args.split(','); //.map(elem => parseFloat(elem));
    if (factores.length % 2 === 0) {
        var miCanvas = new CanvasLocal(graphics, canvas, factores);
        miCanvas.paint();
    }
    else {
        alert("Debes ingresar pares de números...");
    }
}
function graficarCartesiano(evt) {
    evt.preventDefault();
    var args = categorie.value;
    var factores = args.split(','); //.map(elem => parseFloat(elem));
    if (factores.length % 2 === 0) {
        var miCanvas = new CanvasCart(graphics, canvas, factores);
        miCanvas.paint();
    }
    else {
        alert("Debes ingresar pares coordenados...");
    }
}
document.getElementById("calcular").addEventListener("click", graficar, false);
document.getElementById("graficar").addEventListener("click", graficarCartesiano, false);
