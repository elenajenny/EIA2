namespace L11_Viruses {

    export class Antibody extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            super(_position);
            console.log("Antibody constructor");

            if (_position)
            this.position = _position;
            else
            this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(40, 100);

            this.size = _size;
        }
    

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);
            // Antibody
            crc2.beginPath();
          
            crc2.moveTo(75, 50);
            crc2.lineTo(100, 100);
            crc2.lineTo(100, 10);
        
            crc2.restore();

            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }
    }



















}