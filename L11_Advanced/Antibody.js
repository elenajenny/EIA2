"use strict";
var L11_Viruses;
(function (L11_Viruses) {
    class Antibody extends L11_Viruses.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Antibody constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L11_Viruses.Vector(0, 0);
            this.velocity = new L11_Viruses.Vector(0, 0);
            this.velocity.random(40, 100);
            this.size = _size;
        }
        draw() {
            L11_Viruses.crc2.save();
            L11_Viruses.crc2.translate(this.position.x, this.position.y);
            L11_Viruses.crc2.scale(this.size, this.size);
            L11_Viruses.crc2.translate(-50, -50);
            // Antibody
            L11_Viruses.crc2.beginPath();
            L11_Viruses.crc2.moveTo(75, 50);
            L11_Viruses.crc2.lineTo(100, 100);
            L11_Viruses.crc2.lineTo(100, 10);
            L11_Viruses.crc2.restore();
            L11_Viruses.crc2.strokeStyle = "#FFFFFF";
            L11_Viruses.crc2.stroke();
        }
    }
    L11_Viruses.Antibody = Antibody;
})(L11_Viruses || (L11_Viruses = {}));
//# sourceMappingURL=Antibody.js.map