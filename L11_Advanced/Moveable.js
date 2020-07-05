"use strict";
var L11_Viruses;
(function (L11_Viruses) {
    class Moveable {
        constructor(_position) {
            // console.log("Moveable constructor");
            this.radius = 3;
            this.contact = false;
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L11_Viruses.Vector(0, 0);
            this.velocity = new L11_Viruses.Vector(0, 0);
        }
        draw() {
            // console.log("Moveable move");
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L11_Viruses.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L11_Viruses.crc2.canvas.height;
            if (this.position.x > L11_Viruses.crc2.canvas.width)
                this.position.x -= L11_Viruses.crc2.canvas.width;
            if (this.position.y > L11_Viruses.crc2.canvas.height)
                this.position.y -= L11_Viruses.crc2.canvas.height;
        }
    }
    L11_Viruses.Moveable = Moveable;
})(L11_Viruses || (L11_Viruses = {}));
//# sourceMappingURL=Moveable.js.map