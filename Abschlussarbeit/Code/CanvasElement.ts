namespace MagicCanvas {
    export class canvasElement {
        public position: Vector;
        public velocity: Vector;
        // public size: number;
        public selectedcolor: string;
        public selectedform: string;
        // public rotateangle: number;
        public selectedanimation: string;
        public directionx: number = 1;
        public directiony: number = 1;
        active: boolean;
        radius: number;
        // ELement ist aktiv wenn es nicht mehr in der Mitte ist
    //     active: boolean;

        constructor(_form: string, _color: string, _animation: string, _position?: Vector) {
            // super(_position);

            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(20, 80);

            this.selectedform = _form;
            this.selectedcolor = _color;
            this.selectedanimation = _animation; 
            // if (_selectedform)
            //     crc2.fillStyle = _selectedcolor;
            // crc2.fill();   
            
        }

        public animate(): void {
            if (this.selectedanimation == "position")
                this.move();
            else if (this.selectedanimation == "rotate")
                this.rotate();
        }

        public move(): void {
            let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
            xpos = symbols[index].position.x;
            ypos = symbols[index].position.y;

            if (xpos > canvas.width)
                // -1 damit es sich in die entgegengesetze Richtung weiter bewegt
                symbols[index].directionx = -1;

            if (ypos > canvas.height)
                symbols[index].directiony = -1;

            if (xpos < 0)
                symbols[index].directionx = 1;

            if (ypos < 0)
                symbols[index].directiony = 1;

            xpos = xpos + symbols[index].directionx;
            ypos = ypos + symbols[index].directiony;

            symbols[index].position.x = xpos;
            symbols[index].position.y = ypos;

            // console.log("symbols[index].position.y: " + symbols[index].position.y.toString);
            // console.log("symbols[index].directiony " + symbols[index].directiony.toString);

            symbols[index].draw();
        }

        public rotate(): void {
            //Matrix transformation
            crc2.save();
            crc2.translate(70, -10);
            //um 45 Grad rotieren
            crc2.rotate(Math.PI / 4);
        }

        public draw(): void {
            if (this.selectedform == "circle")
                this.drawCircle();
            else if (this.selectedform == "square")
                this.drawSquare();
            else if (this.selectedform == "triangle")
                this.drawTriangle();
            else if (this.selectedform == "flash")
                this.drawFlash();
        }

        private drawCircle(): void {
            let r: number = 4;
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            crc2.scale(5, 5);
            // crc2.translate(-50, -50);
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, r, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.restore();
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
            // mit Farbe füllen
            crc2.fillStyle = this.selectedcolor;
            crc2.fill();
        }

        private drawTriangle(): void {
            crc2.beginPath();
            crc2.moveTo(this.position.x + 70, this.position.y + 70);
            crc2.lineTo(this.position.x + 10, this.position.y + 70);
            crc2.lineTo(this.position.x + 10, this.position.y + 25);
            crc2.closePath();
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
            // mit Farbe füllen
            crc2.fillStyle = this.selectedcolor;
            crc2.fill();
        }

        private drawSquare(): void {
            crc2.beginPath();
            crc2.rect(this.position.x, this.position.y, 55, 40);
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
            // mit Farbe füllen
            crc2.fillStyle = this.selectedcolor;
            crc2.fill();
        }

        private drawFlash(): void {
            crc2.beginPath();
            crc2.translate(40, 40);
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x + 20, this.position.y);
            crc2.lineTo(this.position.x + 15, this.position.y + 25);
            crc2.lineTo(this.position.x + 25, this.position.y + 25);
            crc2.lineTo(this.position.x + 10, this.position.y + 50);
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x, this.position.y + 30);
            crc2.lineTo(this.position.x + 12, this.position.y + 30);
            crc2.lineTo(this.position.x + 10, this.position.y + 50);
            // Linienfarbe
            crc2.strokeStyle = "#000000";
            crc2.stroke();
            // mit Farbe füllen
            crc2.fillStyle = this.selectedcolor;
            crc2.fill();
        }
    }
}    