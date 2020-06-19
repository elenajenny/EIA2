"use strict";
var L09_Viruses;
(function (L09_Viruses) {
    class Antibody {
        constructor(_size, _position) {
            console.log("Antibody constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Viruses.Vector(0, 0);
            this.velocity = new L09_Viruses.Vector(0, 0);
            this.velocity.random(100, 200);
            this.size = _size;
        }
        move(_timeslice) {
            // console.log("Antibody move");
            let offset = new L09_Viruses.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L09_Viruses.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L09_Viruses.crc2.canvas.height;
            if (this.position.x > L09_Viruses.crc2.canvas.width)
                this.position.x -= L09_Viruses.crc2.canvas.width;
            if (this.position.y > L09_Viruses.crc2.canvas.height)
                this.position.y -= L09_Viruses.crc2.canvas.height;
        }
        draw() {
            L09_Viruses.crc2.save();
            L09_Viruses.crc2.translate(this.position.x, this.position.y);
            L09_Viruses.crc2.scale(this.size, this.size);
            L09_Viruses.crc2.translate(-50, -50);
            // Antibody
            L09_Viruses.crc2.beginPath();
            L09_Viruses.crc2.moveTo(this.position.x, this.position.y);
            L09_Viruses.crc2.lineTo(10, -8);
            L09_Viruses.crc2.moveTo(this.position.x, this.position.y);
            L09_Viruses.crc2.lineTo(-10, 8);
            L09_Viruses.crc2.closePath();
            L09_Viruses.crc2.fill();
            L09_Viruses.crc2.restore();
            L09_Viruses.crc2.strokeStyle = "#FFFFFF";
            L09_Viruses.crc2.stroke();
        }
    }
    L09_Viruses.Antibody = Antibody;
})(L09_Viruses || (L09_Viruses = {}));
//# sourceMappingURL=Antibody.js.map