namespace L11_Viruses {
    export class Killercell extends Moveable {
        public position: Vector; 
        public velocity: Vector;
        public size: number;
        
        public radius: number;
        public infected: boolean = false;

        constructor(_size: number, _position?: Vector) {
            super(_position);
            console.log("Killercell constructor");

            if (_position)
            this.position = _position;
            else
            this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100);

            this.size = _size;
        }

        static getDifference(_v0: Vector, _v1: Vector): Vector {
        let vector: Vector = new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        return vector;
        }

        public draw(): void {
            if (this.contact == true) {
                this.KillercellInfected();
            } else {
                this.drawKillercell();
            }
        }

        public drawKillercell(): void {
            let radius: number = 20;

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

        public KillercellInfected(): void {
            let radius: number = 20;

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FE5252");
            gradient.addColorStop(1, "#BD0101");


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
        
        

        // isHit(_virusposition: Vector, _radiusvirus: number): boolean {
        //     let distX: number = this.position.x - _virusposition.x;
        //     let distY: number = this.position.y - _virusposition.y;
        //     let rSum: number = _radiusvirus + this.radius + 10;
        //     let distance: number = (distX * distX) + (distY * distY);

        //     if (distance <= rSum * rSum) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    }
    
}   