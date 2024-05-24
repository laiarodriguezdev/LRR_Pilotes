export class Pilota{
    constructor(x,y, velX, velY, color, mida)
    {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.mida = mida;
    }
    dibuixa(ctx){
        ctx.beginPath(); //COMENÇA A DIBUIXAR
        ctx.fillStyle = this.color; //COLOR AMB EL QUE PRINTAREM LA PILOTA
        ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); // DIBUIXA UN ARC
        ctx.fill(); //ACABA EL DIBUIX AMB EL COLOR
    }
}