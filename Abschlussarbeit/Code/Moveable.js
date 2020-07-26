"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    class Moveable {
        constructor(_position) {
            // console.log("Moveable constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new MagicCanvas.Vector(0, 0);
            this.velocity = new MagicCanvas.Vector(0, 0);
        }
        draw() {
            // console.log("Moveable move");
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += MagicCanvas.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += MagicCanvas.crc2.canvas.height;
            if (this.position.x > MagicCanvas.crc2.canvas.width)
                this.position.x -= MagicCanvas.crc2.canvas.width;
            if (this.position.y > MagicCanvas.crc2.canvas.height)
                this.position.y -= MagicCanvas.crc2.canvas.height;
        }
    }
    MagicCanvas.Moveable = Moveable;
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Moveable.js.map