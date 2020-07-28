namespace MagicCanvas {
    export class Circle {
        public position: Vector;
        public velocity: Vector;
        public size: number;

        // constructor(_size: number, _position?: Vector) {
            
        //     if (_position)
        //     this.position = _position;
        //     else
        //     this.position = new Vector (0, 0);

        //     this.velocity = new Vector(0, 0);
        //     this.velocity.random(20, 80);

        //     this.size = _size;
        // }

        public draw(): void {
            let r: number = 20;

            crc2.save();
            crc2.translate(10, 10);
            // 
            crc2.scale(10, 10);
            crc2.beginPath();
            crc2.arc(0, 0, r, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.restore();
            //Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
        }

        // public move(_timeslice: number): void {
        //     // console.log("Moveable move");
        //     let offset: Vector = this.velocity.copy();
        //     offset.scale(_timeslice);
        //     this.position.add(offset);

        //     if (this.position.x < 0)
        //         this.position.x += crc2.canvas.width;
        //     if (this.position.y < 0)
        //         this.position.y += crc2.canvas.height;
        //     if (this.position.x > crc2.canvas.width)
        //         this.position.x -= crc2.canvas.width;
        //     if (this.position.y > crc2.canvas.height)
        //         this.position.y -= crc2.canvas.height;
        // }
    }
}