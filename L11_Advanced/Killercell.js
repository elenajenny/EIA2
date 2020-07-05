"use strict";
var L11_Viruses;
(function (L11_Viruses) {
    class Killercell extends L11_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            this.infected = false;
            console.log("Killercell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L11_Viruses.Vector(0, 0);
            this.velocity = new L11_Viruses.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        static getDifference(_v0, _v1) {
            let vector = new L11_Viruses.Vector(_v0.x - _v1.x, _v0.y - _v1.y);
            return vector;
        }
        draw() {
            if (this.contact == true) {
                this.KillercellInfected();
            }
            else {
                this.drawKillercell();
            }
        }
        drawKillercell() {
            let radius = 20;
            let gradient = L11_Viruses.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            L11_Viruses.crc2.save();
            L11_Viruses.crc2.translate(this.position.x, this.position.y);
            L11_Viruses.crc2.scale(this.size, this.size);
            L11_Viruses.crc2.translate(-50, -50);
            L11_Viruses.crc2.fillStyle = gradient;
            L11_Viruses.crc2.beginPath();
            L11_Viruses.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L11_Viruses.crc2.closePath();
            L11_Viruses.crc2.fill();
            L11_Viruses.crc2.restore();
        }
        KillercellInfected() {
            let radius = 20;
            let gradient = L11_Viruses.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FE5252");
            gradient.addColorStop(1, "#BD0101");
            L11_Viruses.crc2.save();
            L11_Viruses.crc2.translate(this.position.x, this.position.y);
            L11_Viruses.crc2.scale(this.size, this.size);
            L11_Viruses.crc2.translate(-50, -50);
            L11_Viruses.crc2.fillStyle = gradient;
            L11_Viruses.crc2.beginPath();
            L11_Viruses.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L11_Viruses.crc2.closePath();
            L11_Viruses.crc2.fill();
            L11_Viruses.crc2.restore();
        }
    }
    L11_Viruses.Killercell = Killercell;
})(L11_Viruses || (L11_Viruses = {}));
//# sourceMappingURL=Killercell.js.map