"use strict";
var L11_Viruses;
(function (L11_Viruses) {
    class Virus extends L11_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new L11_Viruses.Vector(0, 0);
            this.velocity = new L11_Viruses.Vector(0, 0);
            this.velocity.random(20, 80);
            this.size = _size;
        }
        draw() {
            let r1 = 20;
            let r2 = 7;
            let gradient = L11_Viruses.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(100, 72%, 49%, 1)");
            gradient.addColorStop(1, "HSLA(100, 72%, 61%, 0.6)");
            L11_Viruses.crc2.save();
            L11_Viruses.crc2.translate(this.position.x, this.position.y);
            L11_Viruses.crc2.fillStyle = gradient;
            // Skalierung vertikal und horizontal
            L11_Viruses.crc2.scale(this.size, this.size);
            L11_Viruses.crc2.translate(-50, -50);
            L11_Viruses.crc2.beginPath();
            L11_Viruses.crc2.arc(0, 0, r1, 0, 2 * Math.PI);
            L11_Viruses.crc2.closePath();
            L11_Viruses.crc2.fill();
            L11_Viruses.crc2.restore();
        }
    }
    L11_Viruses.Virus = Virus;
})(L11_Viruses || (L11_Viruses = {}));
//# sourceMappingURL=Virus.js.map