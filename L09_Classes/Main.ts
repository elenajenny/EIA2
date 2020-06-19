namespace L09_Viruses {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    let viruses: Virus[] = [];
    let antibodies: Antibody[] = [];
    let killercells: Killercell[] = [];
    let bloodcells: Bloodcell[] = [];

    let background: ImageData;


    function handleLoad(_event: Event): void {
        console.log("particles moving");
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // createPaths();

        drawBackground();
        // drawPattern();

        //hier einzelne Funktionen für einzelnen Particles aufrufen
        createVirus(12);
        createAntibody(4);
        createKillercell(4);
        createBloodcell(9);
        KillercellInfection(_event);


        window.setInterval(update, 20);

    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#FF938E");
        gradient.addColorStop(1, "#FD2117");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        // }

        // function drawPattern(): void {
        console.log("Bloodvessel");
        // Muster
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
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
        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        // crc2.fillRect(0, 0, 750, 400);

        // let imagedata = crc2.getImageData(0, 0, pattern.canvas.width, pattern.canvas.height);
        // crc2.putImageData(imagedata, 40, 20);


        pattern.closePath();
        pattern.restore();

        background = crc2.getImageData(0, 0, 750, 400);
    }

    function createVirus(_nVirus: number): void {
        console.log("Create Virus");
        for (let i: number = 0; i < _nVirus; i++) {
            let virus: Virus = new Virus(1.0);
            viruses.push(virus);
        }
    }

    function createAntibody(_nAntibodies: number): void {
        console.log("Create Antibody");
        for (let i: number = 0; i < _nAntibodies; i++) {
            let antibody: Antibody = new Antibody(1.0);
            antibodies.push(antibody);
        }
    }

    function createKillercell(_nKillercells: number): void {
        console.log("Create Killercell");
        for (let i: number = 0; i < _nKillercells; i++) {
            let killercell: Killercell = new Killercell(1.0);
            killercells.push(killercell);
        }
    }

    function createBloodcell(_nBloodcells: number): void {
        console.log("Create Bloodcell");
        for (let i: number = 0; i < _nBloodcells; i++) {
            let bloodcell: Bloodcell = new Bloodcell(1.0);
            bloodcells.push(bloodcell);
        }
    }

    function update(): void {
        console.log("Update");
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        crc2.putImageData(background, 0, 0);

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


    function KillercellInfection(_event: Event): void {
        // Bereich in dem der Virus auf die Killerzelle trifft 
        let virus:
            let virusposition: Vector = new Vector (Virus.position.x);
        let humancellHit: Killercell | null = getKillercellHit(hotspot);
        for (let virus of viruses) {
            // wenn der Virus auf die Killerzelle trifft, dann werden mehrere Funktionen aufgerufen
            if (humancellHit) {
                startInfection(virus);
            }
        }
        function getKillercellHit(_virusposition: Vector): Killercell | null {
            for (let killercell of killercells) {
                if (killercell.isHit(_virusposition))
                    return killercell;
            }
            return null;
        }

        function startInfection(_virus: Virus): void {

            window.setTimeout(function (): void {
                endInfection(_virus);
            },                5000);
        }

        function endInfection(_virus: Virus) {
            console.log("hallo");
            }




    }