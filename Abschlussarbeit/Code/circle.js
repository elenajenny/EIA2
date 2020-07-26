"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    class Circle {
        // constructor(_size: number, _position?: Vector) {
        //     if (_position)
        //     this.position = _position;
        //     else
        //     this.position = new Vector (0, 0);
        //     this.velocity = new Vector(0, 0);
        //     this.velocity.random(20, 80);
        //     this.size = _size;
        // }
        draw() {
            let r = 20;
            MagicCanvas.crc2.save();
            MagicCanvas.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            MagicCanvas.crc2.scale(this.size, this.size);
            MagicCanvas.crc2.translate(-50, -50);
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.arc(0, 0, r, 0, 2 * Math.PI);
            MagicCanvas.crc2.restore();
            MagicCanvas.crc2.strokeStyle = "#FFFFFF";
            MagicCanvas.crc2.stroke();
        }
    }
    MagicCanvas.Circle = Circle;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=circle.js.map