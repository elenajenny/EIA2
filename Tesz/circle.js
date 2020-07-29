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
            MagicCanvas.crc2.translate(10, 10);
            // 
            MagicCanvas.crc2.scale(10, 10);
            MagicCanvas.crc2.beginPath();
            MagicCanvas.crc2.arc(0, 0, r, 0, 2 * Math.PI);
            MagicCanvas.crc2.closePath();
            MagicCanvas.crc2.restore();
            //Linienfarbe
            MagicCanvas.crc2.strokeStyle = "#000000";
            MagicCanvas.crc2.stroke();
        }
    }
    MagicCanvas.Circle = Circle;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=circle.js.map