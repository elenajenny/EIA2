"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    class canvasElement {
        // ELement ist aktiv wenn es nicht mehr in der Mitte ist
        //     active: boolean;
        constructor(_form, _color, _animation, _position) {
            // super(_position);
            this.directionx = 1;
            this.directiony = 1;
            if (_position)
                this.position = _position;
            else
                this.position = new MagicCanvas.Vector(0, 0);
            this.velocity = new MagicCanvas.Vector(0, 0);
            this.velocity.random(20, 80);
            this.selectedform = _form;
            this.selectedcolor = _color;
            this.selectedanimation = _animation;
            // if (_selectedform)
            //     crc2.fillStyle = _selectedcolor;
            // crc2.fill();   
        }
        animate() {
            if (this.selectedanimation == "position")
                this.move(20);
            else if (this.selectedanimation == "rotate")
                this.rotate();
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0) {
                this.position.x += MagicCanvas.crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += MagicCanvas.crc2.canvas.height;
            }
            if (this.position.x > MagicCanvas.crc2.canvas.width) {
                this.position.x -= MagicCanvas.crc2.canvas.width;
            }
            if (this.position.y > MagicCanvas.crc2.canvas.height) {
                this.position.y -= MagicCanvas.crc2.canvas.height;
            }
        }
        rotate() {
            //Matrix transformation
            MagicCanvas.crc2.save();
            MagicCanvas.crc2.translate(70, -10);
            //um 45 Grad rotieren
            MagicCanvas.crc2.rotate(Math.PI / 4);
        }
        draw() {
            if (this.selectedform == "circle")
                this.drawCircle();
            else if (this.selectedform == "square")
                this.drawSquare();
            else if (this.selectedform == "triangle")
                this.drawTriangle();
            else if (this.selectedform == "flash")
                this.drawFlash();
        }
        drawCircle() {
            let r = 4;
            MagicCanvas.crc2.save();
            MagicCanvas.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            MagicCanvas.crc2.scale(5, 5);
            // crc2.translate(-50, -50);
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.arc(this.position.x, this.position.y, r, 0, 2 * Math.PI);
            MagicCanvas.crc2.closePath();
            MagicCanvas.crc2.restore();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        }
        drawTriangle() {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.moveTo(this.position.x + 70, this.position.y + 70);
            MagicCanvas.crc2.lineTo(this.position.x + 10, this.position.y + 70);
            MagicCanvas.crc2.lineTo(this.position.x + 10, this.position.y + 25);
            MagicCanvas.crc2.closePath();
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        }
        drawSquare() {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.rect(this.position.x, this.position.y, 55, 40);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        }
        drawFlash() {
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.translate(40, 40);
            MagicCanvas.crc2.moveTo(this.position.x, this.position.y);
            MagicCanvas.crc2.lineTo(this.position.x + 20, this.position.y);
            MagicCanvas.crc2.lineTo(this.position.x + 15, this.position.y + 25);
            MagicCanvas.crc2.lineTo(this.position.x + 25, this.position.y + 25);
            MagicCanvas.crc2.lineTo(this.position.x + 10, this.position.y + 50);
            MagicCanvas.crc2.moveTo(this.position.x, this.position.y);
            MagicCanvas.crc2.lineTo(this.position.x, this.position.y + 30);
            MagicCanvas.crc2.lineTo(this.position.x + 12, this.position.y + 30);
            MagicCanvas.crc2.lineTo(this.position.x + 10, this.position.y + 50);
            // Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
            // mit Farbe füllen
            MagicCanvas.crc2.fillStyle = this.selectedcolor;
            MagicCanvas.crc2.fill();
        }
    }
    MagicCanvas.canvasElement = canvasElement;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=CanvasElement.js.map