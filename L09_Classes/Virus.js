"use strict";
var L09_Viruses;
(function (L09_Viruses) {
    class Virus {
        constructor(_size, _position) {
            console.log("Virus constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Viruses.Vector(0, 0);
            this.velocity = new L09_Viruses.Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        move(_timeslice) {
            // console.log("Asteroid move");
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
            // let nProtein: number = 6;
            // Radien
            let r1 = 20;
            let r2 = 7;
            let gradient = L09_Viruses.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(100, 72%, 49%, 1)");
            gradient.addColorStop(1, "HSLA(100, 72%, 61%, 0.6)");
            L09_Viruses.crc2.save();
            L09_Viruses.crc2.translate(this.position.x, this.position.y);
            L09_Viruses.crc2.fillStyle = gradient;
            // Skalierung vertikal und horizontal
            L09_Viruses.crc2.scale(this.size, this.size);
            L09_Viruses.crc2.translate(-50, -50);
            L09_Viruses.crc2.beginPath();
            L09_Viruses.crc2.arc(0, 0, r1, 0, 2 * Math.PI);
            L09_Viruses.crc2.closePath();
            L09_Viruses.crc2.fill();
            L09_Viruses.crc2.restore();
            // crc2.stroke(virusPaths[this.size]);
        }
        isInfecting(_virusposition) {
            let viruspositionx = this.position.x;
            let viruspositiony = this.position.y;
        }
    }
    L09_Viruses.Virus = Virus;
})(L09_Viruses || (L09_Viruses = {}));
//# sourceMappingURL=Virus.js.map