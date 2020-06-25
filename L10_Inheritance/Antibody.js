"use strict";
var L10_Viruses;
(function (L10_Viruses) {
    class Antibody extends L10_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Antibody constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Viruses.Vector(0, 0);
            this.velocity = new L10_Viruses.Vector(0, 0);
            this.velocity.random(40, 100);
            this.size = _size;
        }
        draw() {
            L10_Viruses.crc2.save();
            L10_Viruses.crc2.translate(this.position.x, this.position.y);
            L10_Viruses.crc2.scale(this.size, this.size);
            L10_Viruses.crc2.translate(-50, -50);
            // Antibody
            L10_Viruses.crc2.beginPath();
            L10_Viruses.crc2.moveTo(this.position.x, this.position.y);
            L10_Viruses.crc2.lineTo(10, -8);
            L10_Viruses.crc2.moveTo(this.position.x, this.position.y);
            L10_Viruses.crc2.lineTo(-10, 8);
            L10_Viruses.crc2.closePath();
            L10_Viruses.crc2.fill();
            L10_Viruses.crc2.restore();
            L10_Viruses.crc2.strokeStyle = "#FFFFFF";
            L10_Viruses.crc2.stroke();
        }
    }
    L10_Viruses.Antibody = Antibody;
})(L10_Viruses || (L10_Viruses = {}));
//# sourceMappingURL=Antibody.js.map