var CanvasCart = /** @class */ (function () {
    function CanvasCart(g, canvas, data) {
        this.graphics = g;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.coorX = parseFloat(data[0]);
        this.coorY = parseFloat(data[1]);
        this.rWidth = Math.max(Math.abs(this.coorX), Math.abs(this.coorY)) * 4 + 2;
        this.rHeight = this.rWidth;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
        this.pasoX = (this.rWidth - 2) / 20;
        this.pasoY = (this.rHeight - 2) / 20;
    }
    CanvasCart.prototype.iX = function (x) { return Math.round(this.centerX + x / this.pixelSize); };
    CanvasCart.prototype.iY = function (y) { return Math.round(this.centerY - y / this.pixelSize); };
    CanvasCart.prototype.drawLine = function (x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    };
    CanvasCart.prototype.fx = function (x) {
        return Math.sin(x * 2.5);
    };
    CanvasCart.prototype.paint = function () {
        this.graphics.fillStyle = 'white';
        this.graphics.fillRect(0, 0, this.maxX, this.maxY);
        this.drawLine(this.iX(-this.rWidth / 2 + 1), this.iY(0), this.iX(this.rWidth / 2 - 1), this.iY(0));
        this.drawLine(this.iX(0), this.iY(-this.rHeight / 2 + 1), this.iX(0), this.iY(this.rHeight / 2 - 1));
        //dibuja la cuadricula
        this.graphics.strokeStyle = 'lightgray';
        for (var x = -this.rWidth / 2 + 1; x <= this.rWidth / 2 - 1; x += this.pasoX) {
            this.drawLine(this.iX(x), this.iY(-this.rHeight / 2 + 1), this.iX(x), this.iY(this.rHeight / 2 - 1));
        }
        for (var y = -this.rHeight / 2 + 1; y <= this.rHeight / 2 - 1; y += this.pasoY) {
            this.drawLine(this.iX(-this.rWidth / 2 + 1), this.iY(y), this.iX(this.rWidth / 2 - 1), this.iY(y));
        }
        //dibuja las divisiones
        this.graphics.strokeStyle = 'black';
        for (var x = -this.rWidth / 2 + 1; x <= this.rWidth / 2 - 1; x += this.pasoX) {
            this.drawLine(this.iX(x), this.iY(-0.2), this.iX(x), this.iY(0.2));
            this.graphics.strokeText(x + "", this.iX(x), this.iY(0) + 10);
        }
        var cont = 0;
        for (var y = -this.rHeight / 2 + 1; y <= this.rHeight / 2 - 1; y += this.pasoY) {
            this.drawLine(this.iX(-0.2), this.iY(y), this.iX(0.2), this.iY(y));
            cont++;
            if (cont === 11)
                continue;
            else
                this.graphics.strokeText(y + "", this.iX(0) - 13, this.iY(y) + 10);
        }
        this.graphics.strokeText("X", this.iX(this.rWidth / 2 - 2), this.iY(0) - 10);
        this.graphics.strokeText("Y", this.iX(0) + 10, this.iY(this.rHeight / 2 - 2));
        this.graphics.fillStyle = 'red';
        this.graphics.beginPath();
        this.graphics.arc(this.iX(this.coorX), this.iY(this.coorY), 5, 0, Math.PI * 2, true);
        this.graphics.fill();
        //dibujar la funcion
        /*  this.graphics.strokeStyle = 'red';
         let paso: number = 0.1;
         for (let x = -3; x <= 3; x+=paso){
           this.drawLine(this.iX(x), this.iY(this.fx(x)), this.iX(x+paso), this.iY(this.fx(x+paso)));
         } */
    };
    return CanvasCart;
}());
export { CanvasCart };
