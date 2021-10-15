var CanvasLocal = /** @class */ (function () {
    function CanvasLocal(g, canvas, data) {
        this.graphics = g;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.data = data;
        this.rWidth = data.length + 4;
        this.largeX = data.length < 10 ? 8 : data.length;
        this.rHeight = 8;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / this.rWidth;
        this.centerY = this.maxY / 8 * 7;
        this.h = [];
        this.labels = [];
        this.asignaData();
    }
    CanvasLocal.prototype.asignaData = function () {
        var _this = this;
        this.data.forEach(function (el, ind) {
            if (ind % 2 === 0)
                _this.labels.push(el);
            else
                _this.h.push(parseFloat(el));
            console.log(el);
        });
    };
    CanvasLocal.prototype.iX = function (x) { return Math.round(this.centerX + x / this.pixelSize); };
    CanvasLocal.prototype.iY = function (y) { return Math.round(this.centerY - y / this.pixelSize); };
    CanvasLocal.prototype.drawLine = function (x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    };
    CanvasLocal.prototype.drawRomboide = function (x1, y1, x2, y2, x3, y3, x4, y4, color) {
        // Color de relleno
        this.graphics.fillStyle = color;
        // Comenzamos la ruta de dibujo, o path
        this.graphics.beginPath();
        // Mover a la esquina superior izquierda
        this.graphics.moveTo(x1, y1);
        // Dibujar la línea hacia la derecha
        this.graphics.lineTo(x2, y2);
        // Ahora la que va hacia abajo
        this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
        // La que va hacia la izquierda
        this.graphics.lineTo(x4, y4);
        // Y dejamos que la última línea la dibuje JS
        this.graphics.closePath();
        // Hacemos que se dibuje
        this.graphics.stroke();
        // Lo rellenamos
        this.graphics.fill();
    };
    CanvasLocal.prototype.fx = function (x) {
        return Math.sin(x * 2.5);
    };
    CanvasLocal.prototype.maxH = function (h) {
        var max = h[0];
        for (var i = 1; i < h.length; i++) {
            if (max < h[i])
                max = h[i];
        }
        //
        var res;
        var pot = 10;
        //se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
        while (pot < max) {
            pot *= 10;
        }
        pot /= 10;
        res = Math.ceil(max / pot) * pot;
        return res;
    };
    CanvasLocal.prototype.paint = function () {
        var maxEsc;
        var colors = ['magenta', 'red', 'green', 'yellow', 'cyan', 'pink'];
        this.graphics.fillStyle = 'white';
        this.graphics.fillRect(0, 0, this.maxX, this.maxY);
        maxEsc = this.maxH(this.h);
        this.graphics.strokeStyle = 'black';
        this.drawLine(this.iX(0), this.iY(0), this.iX(this.largeX - 0.6), this.iY(0));
        this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6.2 - 0.6));
        this.drawLine(this.iX(this.largeX), this.iY(0.6), this.iX(this.largeX), this.iY(6.2));
        this.drawLine(this.iX(this.largeX - 0.6), this.iY(0), this.iX(this.largeX), this.iY(0.6));
        //las 6 unidades se dividen entre 4 periodos de lineas cada una 
        //representara una escala de 1/4 del total maximo
        var i = 0;
        for (var y = 0.6; y <= 6.2; y += 1.4) {
            this.drawLine(this.iX(0.6), this.iY(y), this.iX(this.largeX), this.iY(y));
            this.drawLine(this.iX(0), this.iY(y - 0.6), this.iX(0.6), this.iY(y));
            //this.drawLine(this.iX(this.largeX), this.iY(y - 0.6), this.iX(this.largeX + 0.6), this.iY(y));
            this.graphics.strokeText((maxEsc * i / 4) + "", this.iX(-0.5), this.iY(y - 0.7));
            i++;
        }
        this.graphics.strokeStyle = 'black';
        var ind = 0;
        for (var i_1 = 0.5; i_1 <= this.data.length; i_1 += 2) {
            //this.graphics.strokeStyle = colors[ind];
            this.graphics.fillStyle = colors[ind % 6];
            //console.log(this.rHeight*h[ind]/maxEsc)
            this.drawLine(this.iX(i_1), this.iY(6 * this.h[ind] / maxEsc - 0.1), this.iX(i_1), this.iY(0.1));
            this.graphics.fillRect(this.iX(i_1), this.iY(6 * this.h[ind] / maxEsc - 0.1), this.iX(2) - this.iX(1), this.iY(0.2) - this.iY(6 * this.h[ind] / maxEsc));
            this.drawRomboide(this.iX(i_1 + 0.3), this.iY(6 * this.h[ind] / maxEsc + 0.2), this.iX(i_1 + 1.3), this.iY(6 * this.h[ind] / maxEsc + 0.2), this.iX(i_1 + 1), this.iY(6 * this.h[ind] / maxEsc - 0.1), this.iX(i_1), this.iY(6 * this.h[ind] / maxEsc - 0.1), colors[ind % 6]);
            this.drawRomboide(this.iX(i_1 + 1), this.iY(6 * this.h[ind] / maxEsc - 0.1), this.iX(i_1 + 1.3), this.iY(6 * this.h[ind] / maxEsc + 0.2), this.iX(i_1 + 1.3), this.iY(0.4), this.iX(i_1 + 1), this.iY(0.1), colors[ind % 6]);
            ind++;
        }
        ind = 0;
        for (var x = 0; x < this.data.length; x += 2) {
            this.graphics.strokeText(this.labels[ind++], this.iX(x + 0.5), this.iY(-0.5));
        }
        /*
            for (let y = 0; y< h.length; y++) {
              this.graphics.strokeText(colors[y], this.iX(9), this.iY(5 - y));
              this.graphics.fillStyle = colors[y];
              this.graphics.fillRect(this.iX(8.5), this.iY(5 - y), 10, 10);
            }
            */
    };
    return CanvasLocal;
}());
export { CanvasLocal };
