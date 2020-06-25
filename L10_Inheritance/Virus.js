"use strict";
var L10_Viruses;
(function (L10_Viruses) {
    class Virus extends L10_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Virus constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Viruses.Vector(0, 0);
            this.velocity = new L10_Viruses.Vector(0, 0);
            this.velocity.random(20, 80);
            this.size = _size;
        }
        draw() {
            let r1 = 20;
            let r2 = 7;
            let gradient = L10_Viruses.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(100, 72%, 49%, 1)");
            gradient.addColorStop(1, "HSLA(100, 72%, 61%, 0.6)");
            L10_Viruses.crc2.save();
            L10_Viruses.crc2.translate(this.position.x, this.position.y);
            L10_Viruses.crc2.fillStyle = gradient;
            // Skalierung vertikal und horizontal
            L10_Viruses.crc2.scale(this.size, this.size);
            L10_Viruses.crc2.translate(-50, -50);
            L10_Viruses.crc2.beginPath();
            L10_Viruses.crc2.arc(0, 0, r1, 0, 2 * Math.PI);
            L10_Viruses.crc2.closePath();
            L10_Viruses.crc2.fill();
            L10_Viruses.crc2.restore();
        }
    }
    L10_Viruses.Virus = Virus;
})(L10_Viruses || (L10_Viruses = {}));
//# sourceMappingURL=Virus.js.map