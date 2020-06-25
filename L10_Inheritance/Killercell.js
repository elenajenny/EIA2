"use strict";
var L10_Viruses;
(function (L10_Viruses) {
    class Killercell extends L10_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Killercell constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Viruses.Vector(0, 0);
            this.velocity = new L10_Viruses.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        draw() {
            let radius = 15;
            let gradient = L10_Viruses.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            L10_Viruses.crc2.save();
            L10_Viruses.crc2.translate(this.position.x, this.position.y);
            L10_Viruses.crc2.scale(this.size, this.size);
            L10_Viruses.crc2.translate(-50, -50);
            L10_Viruses.crc2.fillStyle = gradient;
            L10_Viruses.crc2.beginPath();
            L10_Viruses.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L10_Viruses.crc2.closePath();
            L10_Viruses.crc2.fill();
            L10_Viruses.crc2.restore();
        }
        isHit(_virusposition) {
            let hitsize = 15 * this.size;
            let difference = new L10_Viruses.Vector(_virusposition.x - this.position.x, _virusposition.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L10_Viruses.Killercell = Killercell;
})(L10_Viruses || (L10_Viruses = {}));
//# sourceMappingURL=Killercell.js.map