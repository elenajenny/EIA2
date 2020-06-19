namespace L09_Viruses {

    export class Antibody {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("Antibody constructor");

            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);

            this.size = _size;
        }
        move(_timeslice: number): void {
            // console.log("Antibody move");
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);
            // Antibody
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(10, -8);
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(-10, 8);
            crc2.closePath();

            crc2.fill();
            crc2.restore();

            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }
    }



















}