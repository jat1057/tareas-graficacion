export class CanvasLocal {
  protected graphics: CanvasRenderingContext2D;
  protected rWidth: number;
  protected rHeight: number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  protected data: string[];
  protected largeX: number;
  protected h: number[];
  protected labels: string[];

  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: string[]) {
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

  asignaData(): void {
    this.data.forEach((el, ind) => {
      if (ind % 2 === 0)
        this.labels.push(el);
      else
        this.h.push(parseFloat(el));
    });
  }

  iX(x: number): number { return Math.round(this.centerX + x / this.pixelSize); }
  iY(y: number): number { return Math.round(this.centerY - y / this.pixelSize); }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  drawRomboide(x1: number, y1: number, x2: number, y2: number,
    x3: number, y3: number, x4: number, y4: number, color: string) {
    this.graphics.fillStyle = color;
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.lineTo(x3, y3);
    this.graphics.lineTo(x4, y4);
    this.graphics.closePath();
    this.graphics.stroke();
    this.graphics.fill();
  }

  maxH(h: number[]): number {
    let max = h[0];
    for (let i = 1; i < h.length; i++) {
      if (max < h[i])
        max = h[i];
    }
    let res: number;
    let pot: number = 10;
    while (pot < max) {
      pot *= 10;
    }
    pot /= 10;
    res = Math.ceil(max / pot) * pot;
    return res;
  }

  darkenRGB(color: string, amount: number = 0.5): string {
    const rgb = color.match(/\d+/g);
    if (!rgb) return color;

    let [r, g, b] = rgb.map(Number);
    r = Math.max(Math.floor(r * (1 - amount)), 0);
    g = Math.max(Math.floor(g * (1 - amount)), 0);
    b = Math.max(Math.floor(b * (1 - amount)), 0);

    return `rgb(${r},${g},${b})`;
  }

  paint() {
    let maxEsc: number;
    let colors: string[] = [
      'rgb(8, 0, 255)',  // azul
      'rgb(0, 255, 8)',  // verde
      'rgb(219, 15, 137)', // rosa
      'rgb(255, 106, 0)', // naranja
      'rgb(0,255,255)',   // cian
      'rgb(255,192,203)'  // rosado claro
    ];

    this.graphics.fillStyle = 'white';
    this.graphics.fillRect(0, 0, this.maxX, this.maxY);

    maxEsc = this.maxH(this.h);

    this.graphics.strokeStyle = 'black';
    this.drawLine(this.iX(0), this.iY(0), this.iX(this.largeX - 0.6), this.iY(0));
    this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(6.2 - 0.6));
    this.drawLine(this.iX(this.largeX), this.iY(0.6), this.iX(this.largeX), this.iY(6.2));
    this.drawLine(this.iX(this.largeX - 0.6), this.iY(0), this.iX(this.largeX), this.iY(0.6));

    let i = 0;
    for (let y = 0.6; y <= 6.2; y += 1.4) {
      this.drawLine(this.iX(0.6), this.iY(y), this.iX(this.largeX), this.iY(y));
      this.drawLine(this.iX(0), this.iY(y - 0.6), this.iX(0.6), this.iY(y));
      this.graphics.strokeText((maxEsc * i / 4) + "", this.iX(-0.5), this.iY(y - 0.7));
      i++;
    }

    let ind = 0;
    const barraAncho = 0.6;
    const profundidad = 0.3;
    const offsetX = 0.7;

    for (let i = 0.5; i <= this.data.length; i += 2) {
      const baseColor = colors[ind % 6];
      const xCenter = i + offsetX;
      const x1 = xCenter - barraAncho / 2;
      const x2 = xCenter + barraAncho / 2;
      const yBase = 0.1;
      const yTopValor = 6 * this.h[ind] / maxEsc - 0.1;
      const yTopTotal = 6 - 0.1;

      //  Parte coloreada 
      this.graphics.fillStyle = baseColor;
      this.graphics.fillRect(
        this.iX(x1),
        this.iY(yTopValor),
        this.iX(x2) - this.iX(x1),
        this.iY(yBase) - this.iY(yTopValor)
      );

      // Cara lateral izquierda (color)
      this.drawRomboide(
        this.iX(x1), this.iY(yBase),
        this.iX(x1 - profundidad), this.iY(yBase + profundidad),
        this.iX(x1 - profundidad), this.iY(yTopValor + profundidad),
        this.iX(x1), this.iY(yTopValor),
        this.darkenRGB(baseColor, 0.5)
      );

      //  Parte de fondo gris 
      const grisColor = 'rgb(200,200,200)';
      const gradient = this.graphics.createLinearGradient(0, this.iY(yTopTotal), 0, this.iY(yTopValor));
      gradient.addColorStop(0, 'rgb(220,220,220)');  // color arriba
      gradient.addColorStop(1, 'rgb(180,180,180)');  // color abajo
      this.graphics.fillStyle = gradient;
      this.graphics.fillRect(
        this.iX(x1),
        this.iY(yTopTotal),
        this.iX(x2) - this.iX(x1),
        this.iY(yTopValor) - this.iY(yTopTotal)
      );
      

      // Cara lateral izquierda (gris)
      this.drawRomboide(
        this.iX(x1), this.iY(yTopValor),
        this.iX(x1 - profundidad), this.iY(yTopValor + profundidad),
        this.iX(x1 - profundidad), this.iY(yTopTotal + profundidad),
        this.iX(x1), this.iY(yTopTotal),
        this.darkenRGB(grisColor, 0.5)
      );

      // Cara superior al final 
      this.drawRomboide(
        this.iX(x1), this.iY(yTopTotal),
        this.iX(x1 - profundidad), this.iY(yTopTotal + profundidad),
        this.iX(x2 - profundidad), this.iY(yTopTotal + profundidad),
        this.iX(x2), this.iY(yTopTotal),
        this.darkenRGB(grisColor, 0.3)
      );

      ind++;
    }

    ind = 0;
    for (let x = 0; x < this.data.length; x += 2) {
      this.graphics.strokeText(this.labels[ind++], this.iX(x + 0.5 + offsetX), this.iY(-0.5));
    }
  }
}
