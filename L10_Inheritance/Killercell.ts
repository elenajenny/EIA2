namespace L10_Viruses {
    export class Killercell extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            super(_position);
            console.log("Killercell constructor");

            if (_position)
                this.position = _position.copy();
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100);

            this.size = _size;
        }
     
        draw(): void {
            let radius: number = 15;

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");


            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);

            crc2.fillStyle = gradient;
            crc2.beginPath();
            crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
        
        isHit(_virusposition: Vector): boolean {
            let hitsize: number = 15 * this.size;
            let difference: Vector = new Vector(_virusposition.x - this.position.x, _virusposition.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    
}   