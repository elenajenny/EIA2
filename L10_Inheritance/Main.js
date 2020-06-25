"use strict";
var L10_Viruses;
(function (L10_Viruses) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    let background;
    function handleLoad(_event) {
        console.log("particles moving");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Viruses.crc2 = canvas.getContext("2d");
        drawBackground();
        //hier einzelne Funktionen für einzelnen Particles aufrufen
        createVirus(12);
        createAntibody(4);
        createKillercell(4);
        createBloodcell(9);
        window.setInterval(update, 20);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L10_Viruses.crc2.createLinearGradient(0, 0, 0, L10_Viruses.crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");
        L10_Viruses.crc2.fillStyle = gradient;
        L10_Viruses.crc2.fillRect(0, 0, L10_Viruses.crc2.canvas.width, L10_Viruses.crc2.canvas.height);
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
        L10_Viruses.crc2.fillStyle = L10_Viruses.crc2.createPattern(pattern.canvas, "repeat");
        L10_Viruses.crc2.fillRect(0, 0, 750, 400);
        pattern.closePath();
        pattern.restore();
        background = L10_Viruses.crc2.getImageData(0, 0, 750, 400);
    }
    function createVirus(_nVirus) {
        console.log("Create Virus");
        for (let i = 0; i < _nVirus; i++) {
            let virus = new L10_Viruses.Virus(1.0);
            moveables.push(virus);
        }
    }
    function createAntibody(_nAntibodies) {
        console.log("Create Antibody");
        for (let i = 0; i < _nAntibodies; i++) {
            let antibody = new L10_Viruses.Antibody(1.0);
            moveables.push(antibody);
        }
    }
    function createKillercell(_nKillercells) {
        console.log("Create Killercell");
        for (let i = 0; i < _nKillercells; i++) {
            let killercell = new L10_Viruses.Killercell(1.0);
            moveables.push(killercell);
        }
    }
    function createBloodcell(_nBloodcells) {
        console.log("Create Bloodcell");
        for (let i = 0; i < _nBloodcells; i++) {
            let bloodcell = new L10_Viruses.Bloodcell(1.0);
            moveables.push(bloodcell);
        }
    }
    function update() {
        console.log("Update");
        L10_Viruses.crc2.fillRect(0, 0, L10_Viruses.crc2.canvas.width, L10_Viruses.crc2.canvas.height);
        L10_Viruses.crc2.putImageData(background, 0, 0);
        //Update Funtion für Virus
        for (let virus of moveables) {
            virus.move(1 / 50);
            virus.draw();
        }
        //Update Funktion für Antibody
        for (let antibody of moveables) {
            antibody.move(1 / 50);
            antibody.draw();
        }
        //Update Funktion für Killercell
        for (let killercell of moveables) {
            killercell.move(1 / 50);
            killercell.draw();
        }
        //Update Funktion für Bloodcell
        for (let bloodcell of moveables) {
            bloodcell.move(1 / 50);
            bloodcell.draw();
        }
    }
    // function testPosition(_event: Event): void {
    //     // Bereich in dem der Virus auf die Killerzelle trifft 
    //     for (let virus of moveables) {
    //         let humancellHit: Killercell | null = getKillercellHit(virus.position);
    //         // wenn der Virus auf die Killerzelle trifft, dann werden mehrere Funktionen aufgerufen
    //         if (humancellHit) {
    //             getKillercellHit(virus.position);
    //         }
    //     }
    // }
    // function startInfection(): void {
    //     window.setTimeout(function (): void {
    //        console.log("setTimeout");
    //     },                5000);
    // }
    // function getKillercellHit(_virusposition: Vector): Killercell | null {
    //     for (let killercell of moveables) {
    //         if (killercell.isHit(_virusposition)) {
    //             startInfection();
    //             return killercell;
    //         }  
    //     }
    //     return null;
    // }
    // function endInfection(_virus: Virus) {
    //     console.log("hallo");
    // }
})(L10_Viruses || (L10_Viruses = {}));
//# sourceMappingURL=Main.js.map