namespace MagicCanvas2 {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    let moveables: Moveable[] = [];

    let selectedcolor: string = "#FF0000";

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");

    
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        
        document.querySelector("#rules").addEventListener("click", rulesVisibility);
        document.querySelector("#standard").addEventListener("click", handleCanvasSize);
        document.querySelector("#small").addEventListener("click", handleCanvasSize);
        document.querySelector("#medium").addEventListener("click", handleCanvasSize);
        document.querySelector("#large").addEventListener("click", handleCanvasSize);

        document.querySelector("#generate").addEventListener("click", generateSymbols);

        // Klick auf Farbe
        document.querySelector("#paletteid") .addEventListener("click", setColor);
        document.querySelector("#red").addEventListener("click", setColor);
        document.querySelector("#blue").addEventListener("click", setColor);
        document.querySelector("#green").addEventListener("click", setColor);
        document.querySelector("#yellow").addEventListener("click", setColor);

      
        // let deletebutton: HTMLElement = <HTMLElement>document.querySelector("#delete");
        // deletebutton.addEventListener("click", );

        document.querySelector("#save").addEventListener("click", savePicture);
      

        // Klick auf die verschiedenen Form Icons
        document.querySelector("#circleicon").addEventListener("click", setForm);
        document.querySelector("#triangleicon").addEventListener("click", setForm);
        document.querySelector("#squareicon").addEventListener("click", setForm);
        document.querySelector("#flashicon").addEventListener("click", setForm);

    }

    function rulesVisibility(): void {
        console.log("show rules");
        let rulesdiv: HTMLElement = <HTMLElement>document.querySelector("#overlay");

        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        } else {
            rulesdiv.style.display = "none";
        }
    }

    function handleCanvasSize(): void {
        console.log("canvassize");

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");

        if (standardsize.checked == true) {
            canvas.setAttribute("style", "width: 700px");
            canvas.setAttribute("style", "height: 400px");
            console.log("standard");
        }
        if (smallsize.checked == true) {
            canvas.setAttribute("style", "width: 400px");
            console.log("small");
        }
        if (mediumsize.checked == true) {
            canvas.setAttribute("style", "width: 600px");
        }
        if (largesize.checked == true) {
            canvas.setAttribute("style", "width: 800px");
        }
    }


    function generateSymbols(_event: Event): void {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde

        //Kreis
        // circle.draw();
        let r: number = 5;
        crc2.save();
        crc2.translate(40, 40);
        // Skalierung vertikal und horizontal
        crc2.scale(5, 5);
        // crc2.translate(-50, -50);
        crc2.beginPath();
        crc2.arc(0, 0, r, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.restore();
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();

        //Triangle
        crc2.beginPath();
        crc2.moveTo(70, 70);
        crc2.lineTo(10, 70);
        crc2.lineTo(10, 25);
        crc2.closePath();
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();

        //Rectangle
        crc2.beginPath();
        crc2.rect(10, 10, 55, 40);
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();

        // Flash
        crc2.beginPath();
        crc2.translate(40, 40);
        crc2.moveTo(0, 0);
        crc2.lineTo(20, 0);
        crc2.lineTo(15, 25);
        crc2.lineTo(25, 25);
        crc2.lineTo(10, 50);
        crc2.moveTo(0, 0);
        crc2.lineTo(0, 30);
        crc2.lineTo(12, 30);
        crc2.lineTo(10, 50);
        // Linienfarbe
        crc2.strokeStyle = "#000000";
        crc2.stroke();

        
    }

    function setColor(event: any): void {
        //Element wird über das Event mithilfe der ID geholt
        let actualid: string = event.target.getAttribute("id");
        //wenn die ID des childs der Farbe entspricht, dann wird diese Farbe mit der überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
        } else if (actualid == "blue") {
            selectedcolor = "#000890";
        } else if (actualid == "green") {
            selectedcolor = "#0D6217";
        } else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
        }
       
        console.log("Event:" + event.target.getAttribute("id"));
    }

    function setForm() {
        console.log ("Hallo");
    }

    function savePicture() {
        console.log("Hallihallo");
        let name: string; 
        document.querySelector
    }






}