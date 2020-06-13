"use strict";
var L08_Virus;
(function (L08_Virus) {
    let width = document.querySelector("#canvas.width");
    let height = document.querySelector("#canvas.height");
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        drawBackground();
        // drawBloodvessel({ x: 562.5, y: 200 });
        drawPattern();
        drawVirus({ x: 650, y: 300 });
        drawAntibody({ x: 30, y: 30 }, { x: 50, y: 50 });
        drawKillercells({ x: 350, y: 200 }, { x: 50, y: 50 });
        drawBloodcells({ x: 50, y: 20 }, { x: 10, y: 5 });
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawPattern() {
        console.log("Bloodvessel");
        // Muster
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = "hsla(0, 100%, 60%, 0.1)";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        pattern.strokeStyle = "#FB0C01";
        pattern.stroke();
        crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, 750, 400);
        pattern.closePath();
    }
    function drawVirus(_position) {
        console.log("Virus");
        let nViruses = 6;
        let nProtein = 6;
        // Radien
        let r1 = 20;
        let r2 = 7;
        for (let i = 0; i < nViruses; i++) {
            // let virus: Path2D = new Path2D();
            let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(100, 72%, 49%, 1)");
            gradient.addColorStop(1, "HSLA(100, 72%, 61%, 0.6)");
            let x = (Math.random() * _position.x);
            let y = (Math.random() * _position.y);
            let positionx = x;
            let positiony = y;
            for (let i = 0; i <= nProtein; i++) {
                crc2.save();
                crc2.translate(positionx, positiony);
                crc2.beginPath();
                crc2.rotate(60);
                crc2.moveTo(positionx, positiony + 20);
                crc2.lineTo(positionx, positiony + 40);
                crc2.strokeStyle = "#757575";
                crc2.lineWidth = 4;
                crc2.stroke();
                crc2.closePath();
                crc2.beginPath();
                crc2.moveTo(positionx, positiony + 10);
                crc2.arc(positionx, positiony + 40, r2, 0, 2 * Math.PI);
                crc2.fillStyle = "#11560B";
                crc2.fill();
            }
            // Kreis bzw. Membran
            crc2.save();
            // Position
            crc2.translate(positionx, positiony);
            crc2.fillStyle = gradient;
            crc2.beginPath();
            crc2.arc(0, 0, r1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
    function drawAntibody(_position, _size) {
        console.log("Antibody");
        let nAntibodies = 4;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let i = 0; i < nAntibodies; i++) {
            crc2.save();
            crc2.translate((Math.random() * _position.x), (Math.random() * _position.y));
            // Antibody
            crc2.beginPath();
            crc2.moveTo(_position.x, _position.y);
            crc2.lineTo(10, -8);
            crc2.moveTo(_position.x, _position.y);
            crc2.lineTo(-10, 8);
            crc2.closePath();
            crc2.restore();
            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            crc2.fill();
            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }
    }
    function drawKillercells(_position, _size) {
        console.log("Killercells");
        let nKillercells = 4;
        let radius = 15;
        for (let i = 0; i < nKillercells; i++) {
            let gradient = crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            let x = (Math.random() * _position.x);
            let y = (Math.random() * _position.y);
            let positionx = x;
            let positiony = y;
            crc2.save();
            // Position
            crc2.translate(positionx, positiony);
            crc2.fillStyle = gradient;
            crc2.beginPath();
            crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
            crc2.restore();
        }
    }
    function drawBloodcells(_position, _size) {
        console.log("Bloodcells");
        let nBloodcells = 9;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let i = 0; i < nBloodcells; i++) {
            crc2.save();
            crc2.translate((Math.random() * _position.x), (Math.random() * _position.y));
            // Ellipse
            crc2.beginPath();
            crc2.ellipse(_position.x, _position.y, _size.x, _size.y, Math.PI / 1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.stroke();
            crc2.fill();
            crc2.restore();
            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            crc2.fill();
            crc2.strokeStyle = "#FBAFAF";
            crc2.stroke();
        }
    }
})(L08_Virus || (L08_Virus = {}));
//# sourceMappingURL=script.js.map