"use strict";
var L10_Viruses;
(function (L10_Viruses) {
    class Bloodcell extends L10_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Bloodcell constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Viruses.Vector(0, 0);
            this.velocity = new L10_Viruses.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        draw() {
            L10_Viruses.crc2.save();
            L10_Viruses.crc2.translate(this.position.x, this.position.y);
            // Ellipse
            L10_Viruses.crc2.beginPath();
            L10_Viruses.crc2.ellipse(this.position.x, this.position.y, 10, 5, Math.PI / 1, 0, 2 * Math.PI);
            L10_Viruses.crc2.closePath();
            L10_Viruses.crc2.stroke();
            L10_Viruses.crc2.fill();
            L10_Viruses.crc2.restore();
            L10_Viruses.crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            L10_Viruses.crc2.fill();
            L10_Viruses.crc2.strokeStyle = "#FBAFAF";
            L10_Viruses.crc2.stroke();
        }
    }
    L10_Viruses.Bloodcell = Bloodcell;
})(L10_Viruses || (L10_Viruses = {}));
//# sourceMappingURL=Bloodcell.js.map