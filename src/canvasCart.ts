export class CanvasCart {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  protected coorX: number;
  protected coorY: number;
  protected pasoX: number;
  protected pasoY: number;
    
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement, data: string[]){
    this.graphics = g;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.coorX = parseFloat(data[0]);
    this.coorY = parseFloat(data[1]);
    this.rWidth = Math.max(Math.abs(this.coorX),Math.abs(this.coorY)) * 4+2;
    this.rHeight =  this.rWidth;
    
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX / 2;
    this.centerY = this.maxY / 2;
    this.pasoX = (this.rWidth-2) / 20;
    this.pasoY = (this.rHeight-2) / 20;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number): number{ return Math.round(this.centerY - y / this.pixelSize); }
  
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }

  paint() {
    this.graphics.fillStyle = 'white';
    this.graphics.fillRect(0, 0, this.maxX, this.maxY);
    this.drawLine(this.iX(-this.rWidth/2+1), this.iY(0), this.iX(this.rWidth/2-1), this.iY(0));
    this.drawLine(this.iX(0), this.iY(-this.rHeight/2+1), this.iX(0), this.iY(this.rHeight/2-1));

    //dibuja la cuadricula
    this.graphics.strokeStyle = 'lightgray';
    for (let x = -this.rWidth/2+1; x <= this.rWidth/2-1; x+=this.pasoX){
      this.drawLine(this.iX(x), this.iY(-this.rHeight / 2 + 1), this.iX(x), this.iY(this.rHeight / 2 - 1));
      
    }
    for (let y = -this.rHeight/2+1; y <= this.rHeight/2-1; y+=this.pasoY){
      this.drawLine(this.iX(-this.rWidth / 2 + 1), this.iY(y), this.iX(this.rWidth / 2 - 1), this.iY(y));
    }
    //dibuja las divisiones
    this.graphics.strokeStyle = 'black';
    for (let x = -this.rWidth/2+1; x <= this.rWidth/2-1; x+=this.pasoX){
      this.drawLine(this.iX(x), this.iY(-0.2), this.iX(x), this.iY(0.2));
      this.graphics.strokeText(x+"", this.iX(x), this.iY(0)+10);
    }
    let cont = 0;
    for (let y = -this.rHeight/2+1; y <= this.rHeight/2-1; y+=this.pasoY){
      this.drawLine(this.iX(-0.2), this.iY(y), this.iX(0.2), this.iY(y));
      cont++
      if (cont === 11) 
        continue;  
      else
        this.graphics.strokeText(y + "", this.iX(0) - 13, this.iY(y) + 10);
    }
    this.graphics.strokeText("X", this.iX(this.rWidth/2-2), this.iY(0)-10);
    this.graphics.strokeText("Y", this.iX(0) + 10, this.iY(this.rHeight / 2 - 2));
    this.graphics.fillStyle = 'red';
    this.graphics.beginPath();
    this.graphics.arc(this.iX(this.coorX), this.iY(this.coorY), 5, 0, Math.PI * 2, true)
    this.graphics.fill();
    //dibujar la funcion
   /*  this.graphics.strokeStyle = 'red';
    let paso: number = 0.1;
    for (let x = -3; x <= 3; x+=paso){
      this.drawLine(this.iX(x), this.iY(this.fx(x)), this.iX(x+paso), this.iY(this.fx(x+paso)));
    } */
  
    
  }



}