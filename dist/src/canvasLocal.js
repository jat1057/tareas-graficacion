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
        this.graphics.fillStyle = color;
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.lineTo(x3, y3);
        this.graphics.lineTo(x4, y4);
        this.graphics.closePath();
        this.graphics.stroke();
        this.graphics.fill();
    };
    CanvasLocal.prototype.maxH = function (h) {
        var max = h[0];
        for (var i = 1; i < h.length; i++) {
            if (max < h[i])
                max = h[i];
        }
        var res;
        var pot = 10;
        while (pot < max) {
            pot *= 10;
        }
        pot /= 10;
        res = Math.ceil(max / pot) * pot;
        return res;
    };
    CanvasLocal.prototype.darkenRGB = function (color, amount) {
        if (amount === void 0) { amount = 0.5; }
        var rgb = color.match(/\d+/g);
        if (!rgb)
            return color;
        var _a = rgb.map(Number), r = _a[0], g = _a[1], b = _a[2];
        r = Math.max(Math.floor(r * (1 - amount)), 0);
        g = Math.max(Math.floor(g * (1 - amount)), 0);
        b = Math.max(Math.floor(b * (1 - amount)), 0);
        return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
    };
    CanvasLocal.prototype.paint = function () {
        var maxEsc;
        var colors = [
            'rgb(8, 0, 255)', // azul
            'rgb(0, 255, 8)', // verde
            'rgb(219, 15, 137)', // rosa
            'rgb(255, 106, 0)', // naranja
            'rgb(0,255,255)', // cian
            'rgb(255,192,203)' // rosado claro
        ];
        this.graphics.fillStyle = 'white';
        this.graphics.fillRect(0, 0, this.maxX, this.maxY);
        maxEsc = this.maxH(this.h);
        this.graphics.strokeStyle = 'black';
        this.drawLine(this.iX(0), this.iY(0), this.iX(this.largeX - 0.6), this.iY(0));
        this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6.2 - 0.6));
        this.drawLine(this.iX(this.largeX), this.iY(0.6), this.iX(this.largeX), this.iY(6.2));
        this.drawLine(this.iX(this.largeX - 0.6), this.iY(0), this.iX(this.largeX), this.iY(0.6));
        var i = 0;
        for (var y = 0.6; y <= 6.2; y += 1.4) {
            this.drawLine(this.iX(0.6), this.iY(y), this.iX(this.largeX), this.iY(y));
            this.drawLine(this.iX(0), this.iY(y - 0.6), this.iX(0.6), this.iY(y));
            this.graphics.strokeText((maxEsc * i / 4) + "", this.iX(-0.5), this.iY(y - 0.7));
            i++;
        }
        var ind = 0;
        var barraAncho = 0.6;
        var profundidad = 0.3;
        var offsetX = 0.7;
        for (var i_1 = 0.5; i_1 <= this.data.length; i_1 += 2) {
            var baseColor = colors[ind % 6];
            var xCenter = i_1 + offsetX;
            var x1 = xCenter - barraAncho / 2;
            var x2 = xCenter + barraAncho / 2;
            var yBase = 0.1;
            var yTopValor = 6 * this.h[ind] / maxEsc - 0.1;
            var yTopTotal = 6 - 0.1;
            //  Parte coloreada 
            this.graphics.fillStyle = baseColor;
            this.graphics.fillRect(this.iX(x1), this.iY(yTopValor), this.iX(x2) - this.iX(x1), this.iY(yBase) - this.iY(yTopValor));
            // Cara lateral izquierda (color)
            this.drawRomboide(this.iX(x1), this.iY(yBase), this.iX(x1 - profundidad), this.iY(yBase + profundidad), this.iX(x1 - profundidad), this.iY(yTopValor + profundidad), this.iX(x1), this.iY(yTopValor), this.darkenRGB(baseColor, 0.5));
            //  Parte de fondo gris 
            var grisColor = 'rgb(200,200,200)';
            var gradient = this.graphics.createLinearGradient(0, this.iY(yTopTotal), 0, this.iY(yTopValor));
            gradient.addColorStop(0, 'rgb(220,220,220)'); // color arriba
            gradient.addColorStop(1, 'rgb(180,180,180)'); // color abajo
            this.graphics.fillStyle = gradient;
            this.graphics.fillRect(this.iX(x1), this.iY(yTopTotal), this.iX(x2) - this.iX(x1), this.iY(yTopValor) - this.iY(yTopTotal));
            // Cara lateral izquierda (gris)
            this.drawRomboide(this.iX(x1), this.iY(yTopValor), this.iX(x1 - profundidad), this.iY(yTopValor + profundidad), this.iX(x1 - profundidad), this.iY(yTopTotal + profundidad), this.iX(x1), this.iY(yTopTotal), this.darkenRGB(grisColor, 0.5));
            // Cara superior al final 
            this.drawRomboide(this.iX(x1), this.iY(yTopTotal), this.iX(x1 - profundidad), this.iY(yTopTotal + profundidad), this.iX(x2 - profundidad), this.iY(yTopTotal + profundidad), this.iX(x2), this.iY(yTopTotal), this.darkenRGB(grisColor, 0.3));
            ind++;
        }
        ind = 0;
        for (var x = 0; x < this.data.length; x += 2) {
            this.graphics.strokeText(this.labels[ind++], this.iX(x + 0.5 + offsetX), this.iY(-0.5));
        }
    };
    return CanvasLocal;
}());
export { CanvasLocal };
