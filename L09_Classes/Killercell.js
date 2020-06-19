"use strict";
var L09_Viruses;
(function (L09_Viruses) {
    class Killercell {
        constructor(_size, _position) {
            console.log("Killercell constructor");
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
            let radius = 15;
            let gradient = L09_Viruses.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            L09_Viruses.crc2.save();
            L09_Viruses.crc2.translate(this.position.x, this.position.y);
            L09_Viruses.crc2.scale(this.size, this.size);
            L09_Viruses.crc2.translate(-50, -50);
            L09_Viruses.crc2.fillStyle = gradient;
            L09_Viruses.crc2.beginPath();
            L09_Viruses.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L09_Viruses.crc2.closePath();
            L09_Viruses.crc2.fill();
            L09_Viruses.crc2.restore();
        }
        isHit(_virusposition) {
            let hitsize = 15 * this.size;
            let difference = new L09_Viruses.Vector(_virusposition.x - this.position.x, _virusposition.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L09_Viruses.Killercell = Killercell;
})(L09_Viruses || (L09_Viruses = {}));
//# sourceMappingURL=Killercell.js.map