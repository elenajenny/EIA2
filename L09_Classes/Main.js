"use strict";
var L09_Viruses;
(function (L09_Viruses) {
    window.addEventListener("load", handleLoad);
    let viruses = [];
    let antibodies = [];
    let killercells = [];
    let bloodcells = [];
    let background;
    function handleLoad(_event) {
        console.log("particles moving");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09_Viruses.crc2 = canvas.getContext("2d");
        // createPaths();
        drawBackground();
        // drawPattern();
        //hier einzelne Funktionen für einzelnen Particles aufrufen
        createVirus(12);
        createAntibody(4);
        createKillercell(4);
        createBloodcell(9);
        // KillercellInfection(_event);
        window.setInterval(update, 20);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = L09_Viruses.crc2.createLinearGradient(0, 0, 0, L09_Viruses.crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");
        L09_Viruses.crc2.fillStyle = gradient;
        L09_Viruses.crc2.fillRect(0, 0, L09_Viruses.crc2.canvas.width, L09_Viruses.crc2.canvas.height);
        // }
        // function drawPattern(): void {
        console.log("Bloodvessel");
        // Muster
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        // pattern.fillStyle = "hsla(0, 100%, 60%, 0.1)";
        // pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
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
        L09_Viruses.crc2.fillStyle = L09_Viruses.crc2.createPattern(pattern.canvas, "repeat");
        // crc2.fillRect(0, 0, 750, 400);
        // let imagedata = crc2.getImageData(0, 0, pattern.canvas.width, pattern.canvas.height);
        // crc2.putImageData(imagedata, 40, 20);
        pattern.closePath();
        pattern.restore();
        background = L09_Viruses.crc2.getImageData(0, 0, 750, 400);
    }
    function createVirus(_nVirus) {
        console.log("Create Virus");
        for (let i = 0; i < _nVirus; i++) {
            let virus = new L09_Viruses.Virus(1.0);
            viruses.push(virus);
        }
    }
    function createAntibody(_nAntibodies) {
        console.log("Create Antibody");
        for (let i = 0; i < _nAntibodies; i++) {
            let antibody = new L09_Viruses.Antibody(1.0);
            antibodies.push(antibody);
        }
    }
    function createKillercell(_nKillercells) {
        console.log("Create Killercell");
        for (let i = 0; i < _nKillercells; i++) {
            let killercell = new L09_Viruses.Killercell(1.0);
            killercells.push(killercell);
        }
    }
    function createBloodcell(_nBloodcells) {
        console.log("Create Bloodcell");
        for (let i = 0; i < _nBloodcells; i++) {
            let bloodcell = new L09_Viruses.Bloodcell(1.0);
            bloodcells.push(bloodcell);
        }
    }
    function update() {
        console.log("Update");
        L09_Viruses.crc2.fillRect(0, 0, L09_Viruses.crc2.canvas.width, L09_Viruses.crc2.canvas.height);
        L09_Viruses.crc2.putImageData(background, 0, 0);
        //Update Funtion für Virus
        for (let virus of viruses) {
            virus.move(1 / 50);
            virus.draw();
        }
        //Update Funktion für Antibody
        for (let antibody of antibodies) {
            antibody.move(1 / 50);
            antibody.draw();
        }
        //Update Funktion für Killercell
        for (let killercell of killercells) {
            killercell.move(1 / 50);
            killercell.draw();
        }
        //Update Funktion für Bloodcell
        for (let bloodcell of bloodcells) {
            bloodcell.move(1 / 50);
            bloodcell.draw();
        }
    }
    // function KillercellInfection(_event: Event): void {
    //     // Bereich in dem der Virus auf die Killerzelle trifft 
    //     let virus:
    //         let virusposition: Vector = new Vector (Virus.position.x);
    //     let humancellHit: Killercell | null = getKillercellHit(hotspot);
    //     for (let virus of viruses) {
    //         // wenn der Virus auf die Killerzelle trifft, dann werden mehrere Funktionen aufgerufen
    //         if (humancellHit) {
    //             startInfection(virus);
    //         }
    //     }
    //     function getKillercellHit(_virusposition: Vector): Killercell | null {
    //         for (let killercell of killercells) {
    //             if (killercell.isHit(_virusposition))
    //                 return killercell;
    //         }
    //         return null;
    //     }
    //     function startInfection(_virus: Virus): void {
    //         window.setTimeout(function (): void {
    //             endInfection(_virus);
    //         },                5000);
    //     }
    // function endInfection(_virus: Virus) {
    //     console.log("hallo");
    //     }
    // }
})(L09_Viruses || (L09_Viruses = {}));
//# sourceMappingURL=Main.js.map