import { CanvasLocal } from './canvasLocal.js';
import { CanvasCart } from './canvasCart.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;
let categorie: HTMLInputElement = <HTMLInputElement>document.getElementById("value");
let data = [];

canvas = <HTMLCanvasElement>document.getElementById('barchart');
graphics = canvas.getContext('2d');

function graficar(evt: any) {
  evt.preventDefault();
  let args = categorie.value;
  let factores = args.split(',');//.map(elem => parseFloat(elem));

  if (factores.length % 2 === 0) {
    const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas, factores);
    miCanvas.paint();
  }
  else {
    alert("Debes ingresar pares de números...")
  }
}

function graficarCartesiano(evt: any) {
  evt.preventDefault();
  let args = categorie.value;
  let factores = args.split(',');//.map(elem => parseFloat(elem));

  if (factores.length % 2 === 0) {
    const miCanvas:CanvasCart = new CanvasCart(graphics, canvas, factores);
    miCanvas.paint();
    
  }
  else {
    alert("Debes ingresar pares coordenados...")
  }
}



document.getElementById("calcular").addEventListener("click", graficar, false);
document.getElementById("graficar").addEventListener("click", graficarCartesiano, false);
