"use strict";
var L11_Viruses;
(function (L11_Viruses) {
    class Bloodcell extends L11_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Bloodcell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L11_Viruses.Vector(0, 0);
            this.velocity = new L11_Viruses.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        draw() {
            L11_Viruses.crc2.save();
            L11_Viruses.crc2.translate(this.position.x, this.position.y);
            // Ellipse
            L11_Viruses.crc2.beginPath();
            L11_Viruses.crc2.ellipse(this.position.x, this.position.y, 10, 5, Math.PI / 1, 0, 2 * Math.PI);
            L11_Viruses.crc2.closePath();
            L11_Viruses.crc2.stroke();
            L11_Viruses.crc2.fill();
            L11_Viruses.crc2.restore();
            L11_Viruses.crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            L11_Viruses.crc2.fill();
            L11_Viruses.crc2.strokeStyle = "#FBAFAF";
            L11_Viruses.crc2.stroke();
        }
    }
    L11_Viruses.Bloodcell = Bloodcell;
})(L11_Viruses || (L11_Viruses = {}));
//# sourceMappingURL=Bloodcell.js.map