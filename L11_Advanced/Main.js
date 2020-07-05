"use strict";
var L11_Viruses;
(function (L11_Viruses) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    let background;
    function handleLoad(_event) {
        console.log("particles moving");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L11_Viruses.crc2 = canvas.getContext("2d");
        drawBackground();
        window.setInterval(update, 20);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L11_Viruses.crc2.createLinearGradient(0, 0, 0, L11_Viruses.crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");
        L11_Viruses.crc2.fillStyle = gradient;
        L11_Viruses.crc2.fillRect(0, 0, L11_Viruses.crc2.canvas.width, L11_Viruses.crc2.canvas.height);
        console.log("Bloodvessel");
        // Muster
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.beginPath();
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
        L11_Viruses.crc2.fillStyle = L11_Viruses.crc2.createPattern(pattern.canvas, "repeat");
        L11_Viruses.crc2.fillRect(0, 0, 750, 400);
        pattern.closePath();
        pattern.restore();
        background = L11_Viruses.crc2.getImageData(0, 0, 750, 400);
    }
    function createVirus(_nVirus) {
        console.log("Create Virus");
        for (let i = 0; i < _nVirus; i++) {
            let virus = new L11_Viruses.Virus(1.0);
            moveables.push(virus);
        }
    }
    function createAntibody(_nAntibodies) {
        console.log("Create Antibody");
        for (let i = 0; i < _nAntibodies; i++) {
            let antibody = new L11_Viruses.Antibody(1.0);
            moveables.push(antibody);
        }
    }
    function createKillercell(_nKillercells) {
        console.log("Create Killercell");
        for (let i = 0; i < _nKillercells; i++) {
            let killercell = new L11_Viruses.Killercell(1.0);
            moveables.push(killercell);
        }
    }
    function createBloodcell(_nBloodcells) {
        console.log("Create Bloodcell");
        for (let i = 0; i < _nBloodcells; i++) {
            let bloodcell = new L11_Viruses.Bloodcell(1.0);
            moveables.push(bloodcell);
        }
    }
    function update() {
        if (Math.random() * 100 > 99) {
            createVirus(1);
            // deleteMoveable();
        }
        if (Math.random() * 100 > 99) {
            createAntibody(1);
        }
        if (Math.random() * 100 > 99) {
            createKillercell(1);
        }
        if (Math.random() * 100 > 98) {
            createBloodcell(1);
        }
        L11_Viruses.crc2.fillRect(0, 0, L11_Viruses.crc2.canvas.width, L11_Viruses.crc2.canvas.width);
        L11_Viruses.crc2.putImageData(background, 0, 0);
        // Update 
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            handleContact();
            moveable.draw();
        }
    }
    function handleContact() {
        let outerIndex = 0;
        let innerIndex = 0;
        let xContact = false;
        let yContact = false;
        for (outerIndex = 0; outerIndex < moveables.length; outerIndex++) {
            innerIndex = 0;
            xContact = false;
            yContact = false;
            for (innerIndex = 0; innerIndex < moveables.length; innerIndex++) {
                // Nicht sich selbst vergleichen
                if (innerIndex != outerIndex) {
                    // X Koordinaten prüfen 
                    if (moveables[outerIndex].position.x < moveables[innerIndex].position.x) {
                        if (moveables[outerIndex].position.x + moveables[outerIndex].radius >= moveables[innerIndex].position.x) {
                            xContact = true;
                        }
                    }
                    else {
                        if (moveables[outerIndex].position.x <= moveables[innerIndex].position.x + moveables[outerIndex].radius) {
                            xContact = true;
                        }
                    }
                    // Y Koordinaten prüfen 
                    if (moveables[outerIndex].position.y < moveables[innerIndex].position.y) {
                        if (moveables[outerIndex].position.y + moveables[outerIndex].radius >= moveables[innerIndex].position.y) {
                            yContact = true;
                        }
                    }
                    else {
                        if (moveables[outerIndex].position.y <= moveables[innerIndex].position.y + moveables[outerIndex].radius) {
                            yContact = true;
                        }
                    }
                    if (yContact == true && xContact == true) {
                        moveables[outerIndex].contact = true;
                        break;
                    }
                }
            }
        }
    }
})(L11_Viruses || (L11_Viruses = {}));
//# sourceMappingURL=Main.js.map