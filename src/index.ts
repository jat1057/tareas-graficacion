import { CanvasLocal } from './canvasLocal.js';
import { CanvasCart } from './canvasCart.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;
let categorie: HTMLInputElement = document.getElementById("value") as HTMLInputElement;
let orderType: HTMLSelectElement = document.getElementById("orderType") as HTMLSelectElement; // Nuevo

canvas = document.getElementById('barchart') as HTMLCanvasElement;
graphics = canvas.getContext('2d');

function parseData(ordenar: boolean = false, tipoOrden: 'asc' | 'desc' = 'asc'): string[] | null {
    let args = categorie.value;
    let factores = args.split(',').map(elem => elem.trim()); // Limpiar espacios extra

    if (factores.length % 2 !== 0) {
        alert("Debes ingresar pares de datos (etiqueta, valor)...");
        return null;
    }

    if (ordenar) {
        // Agrupar en pares 
        let pares: [string, number][] = [];
        for (let i = 0; i < factores.length; i += 2) {
            pares.push([factores[i], parseFloat(factores[i + 1])]);
        }

        // Ordenar los pares según el tipo de orden
        pares.sort((a, b) => tipoOrden === 'asc' ? a[1] - b[1] : b[1] - a[1]);

        // Reconstruir el array plano 
        factores = [];
        pares.forEach(pair => {
            factores.push(pair[0], pair[1].toString());
        });
    }

    return factores;
}

function graficar(evt: Event) {
    evt.preventDefault();
    let factores = parseData(false);

    if (factores) {
        const miCanvas = new CanvasLocal(graphics, canvas, factores);
        miCanvas.paint();
    }
}

function graficarCartesiano(evt: Event) {
    evt.preventDefault();
    let factores = parseData(false);

    if (factores) {
        const miCanvas = new CanvasCart(graphics, canvas, factores);
        miCanvas.paint();
    }
}

function graficarOrdenado(evt: Event) {
    evt.preventDefault();
    const tipoOrden = orderType.value === 'desc' ? 'desc' : 'asc'; // Leemos el valor
    let factores = parseData(true, tipoOrden);

    if (factores) {
        const miCanvas = new CanvasLocal(graphics, canvas, factores);
        miCanvas.paint();
    }
}

document.getElementById("calcular").addEventListener("click", graficar, false);
document.getElementById("graficar").addEventListener("click", graficarCartesiano, false);
document.getElementById("ordenar").addEventListener("click", graficarOrdenado, false);
