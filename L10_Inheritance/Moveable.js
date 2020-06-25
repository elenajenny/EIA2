"use strict";
var L10_Viruses;
(function (L10_Viruses) {
    class Moveable {
        constructor(_position) {
            // console.log("Moveable constructor");
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Viruses.Vector(0, 0);
            this.velocity = new L10_Viruses.Vector(0, 0);
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L10_Viruses.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Viruses.crc2.canvas.height;
            if (this.position.x > L10_Viruses.crc2.canvas.width)
                this.position.x -= L10_Viruses.crc2.canvas.width;
            if (this.position.y > L10_Viruses.crc2.canvas.height)
                this.position.y -= L10_Viruses.crc2.canvas.height;
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    L10_Viruses.Moveable = Moveable;
})(L10_Viruses || (L10_Viruses = {}));
//# sourceMappingURL=Moveable.js.map