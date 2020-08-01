namespace MagicCanvas {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

    let appurl: string = "https://magiccanvas.herokuapp.com/";

    // ausgwählte Farbe zum Füllen
    let selectedcolor: string = "#ff0000";
    let selectedform: string = "circle";
    let selectedanimation: string = "position";

    export let symbols: canvasElement[] = [];

    // Bewegungen auf dem Canvas
    let isMoving: boolean = false;
    let moveX: number = 0;
    let moveY: number = 0;
    let draggedElementIndex: number = 0;

    let timeOut: any;

    let animationRunning: boolean = false;
    export let xpos: number;
    export let ypos: number;
    export let index: number;

    async function handleLoad(_event: Event): Promise<void> {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");


        // let offer: string = await response.text();

        //Klick auf Hintergrundfarbe
        let white: HTMLInputElement = <HTMLInputElement>document.querySelector("#white");
        white.addEventListener("click", setBackground);
        let black: HTMLInputElement = <HTMLInputElement>document.querySelector("#black");
        black.addEventListener("click", setBackground);
        let beige: HTMLInputElement = <HTMLInputElement>document.querySelector("#beige");
        beige.addEventListener("click", setBackground);

        // Klick auf Farbe
        let red: HTMLDivElement = <HTMLDivElement>document.querySelector("#red");
        red.addEventListener("click", setColor);
        let blue: HTMLDivElement = <HTMLDivElement>document.querySelector("#blue");
        blue.addEventListener("click", setColor);
        let green: HTMLDivElement = <HTMLDivElement>document.querySelector("#green");
        green.addEventListener("click", setColor);
        let yellow: HTMLDivElement = <HTMLDivElement>document.querySelector("#yellow");
        yellow.addEventListener("click", setColor);

        // Animationen
        let start: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#startanimation");
        start.addEventListener("click", animateElementsStart);
        let stop: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#stopanimation");
        stop.addEventListener("click", animateElementsStop);

        // Klick auf Canvas Größe
        let standard: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        standard.addEventListener("click", handleCanvasSize);
        let small: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        small.addEventListener("click", handleCanvasSize);
        let medium: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        medium.addEventListener("click", handleCanvasSize);
        let large: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
        large.addEventListener("click", handleCanvasSize);

        // Klick auf die verschiedenen Form Icons
        let circle: HTMLDivElement = <HTMLDivElement>document.querySelector("#circleicon");
        circle.addEventListener("click", setForm);
        let triangle: HTMLDivElement = <HTMLDivElement>document.querySelector("#triangleicon");
        triangle.addEventListener("click", setForm);
        let square: HTMLDivElement = <HTMLDivElement>document.querySelector("#squareicon");
        square.addEventListener("click", setForm);
        let flash: HTMLDivElement = <HTMLDivElement>document.querySelector("#flashicon");
        flash.addEventListener("click", setForm);

        // Klick auf Regel Button
        let rules: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#rules");
        rules.addEventListener("click", rulesVisibility);

        // Generate
        let generate: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);


        // Delete Button, um den Canvas zu säubern
        let deleteBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#delete");
        deleteBtn.addEventListener("click", clearCanvas);

        //Name und Bild speichern
        let save: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#save");
        save.addEventListener("click", savePicture);


        // Klick auf die verschiedenen Animationsformen
        let position: HTMLDivElement = <HTMLDivElement>document.querySelector("#position");
        position.addEventListener("click", setAnimation);
        let rotate: HTMLDivElement = <HTMLDivElement>document.querySelector("#rotate");
        rotate.addEventListener("click", setAnimation);

        // Element verschieben
        // mousedown, mousemove, and mouseup
        canvas.addEventListener("mousedown", function (event) { startMove(canvas, event); });
        canvas.addEventListener("mousemove", function (event) { nowMove(canvas, event); });
        canvas.addEventListener("mouseup", function (event) { stopMove(canvas, event); });
    }

    async function savePicture(_event: Event): Promise<void> {
        // eingetragener Name des Nutzers
        let name: string = (<HTMLInputElement>document.getElementById("picturename")).value;
        console.log("name:" + name);

        // let element: CanvasElement = new CanvasElement(selectedform, selectedcolor, selectedanimation);
        let data: string = JSON.stringify(symbols);

        let query: URLSearchParams = new URLSearchParams(<any>data);
        let response: Response = await fetch(appurl + "?" + query.toString());
        let responseText: string = await response.text();
        console.log(responseText);
        alert("Picture saved!");
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
        // Canvas sizes
        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        if (standardsize.checked == true) {
            canvas.setAttribute("style", "width: 500px");
            canvas.setAttribute("style", "height: 300px");
            console.log("standard");
        }
        if (smallsize.checked == true) {
            console.log("small");
            canvas.setAttribute("style", "width: 450px");
            canvas.setAttribute("style", "height: 250px");
        }
        if (mediumsize.checked == true) {
            canvas.setAttribute("style", "width: 550px");
            canvas.setAttribute("style", "height: 350px");
        }
        if (largesize.checked == true) {
            canvas.setAttribute("style", "width: 600px");
            canvas.setAttribute("style", "height: 400px");
        }
    }


    function generateSymbols(_event: Event): void {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde

        let element: canvasElement = new canvasElement(selectedform, selectedcolor, selectedanimation);
        symbols.push(element);

        element.draw();
    }

    function setBackground(): void {

        let white: HTMLInputElement = <HTMLInputElement>document.querySelector("#white");
        let black: HTMLInputElement = <HTMLInputElement>document.querySelector("#black");
        let beige: HTMLInputElement = <HTMLInputElement>document.querySelector("#beige");

        if (white.checked == true) {
            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        }
        if (black.checked == true) {
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        }
        if (beige.checked == true) {
            crc2.fillStyle = "#FFE3BD";
            crc2.fill();
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        }

    }

    function setColor(event: any): void {
        // Element wird über das Event mit Hilfe der id geholt 
        let actualid: string = event.target.getAttribute("id");
        console.log("Event:" + event.target);

        // Farben divs
        let red: HTMLDivElement = <HTMLDivElement>document.querySelector("#red");
        let blue: HTMLDivElement = <HTMLDivElement>document.querySelector("#blue");
        let green: HTMLDivElement = <HTMLDivElement>document.querySelector("#green");
        let yellow: HTMLDivElement = <HTMLDivElement>document.querySelector("#yellow");

        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
            red.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
        } else if (actualid == "blue") {
            selectedcolor = "#000890";
            blue.style.border = "1px solid #ff0000";
            red.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
            // colorblue.style.border = "solid #FF0000";
        } else if (actualid == "green") {
            selectedcolor = "#0D6217";
            green.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            red.style.border = "none";
            yellow.style.border = "none";
        } else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
            yellow.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            red.style.border = "none";
        }

        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }

    function setForm(event: any): void {
        let formid: string = event.currentTarget.getAttribute("id");

        // Formen divs
        let circle: HTMLDivElement = <HTMLDivElement>document.querySelector("#circleicon");
        let triangle: HTMLDivElement = <HTMLDivElement>document.querySelector("#triangleicon");
        let square: HTMLDivElement = <HTMLDivElement>document.querySelector("#squareicon");
        let flash: HTMLDivElement = <HTMLDivElement>document.querySelector("#flashicon");

        if (formid == "circleicon") {
            selectedform = "circle";
            circle.style.border = "1px solid #ff0000";
            triangle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        } else if (formid == "triangleicon") {
            selectedform = "triangle";
            triangle.style.border = "1px solid #ff0000";
            circle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        } else if (formid == "squareicon") {
            selectedform = "square";
            square.style.border = "1px solid #ff0000";
            flash.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        } else if (formid == "flashicon") {
            selectedform = "flash";
            flash.style.border = "1px solid #ff0000";
            square.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }

        console.log(selectedform);
    }

    function setAnimation(event: any): void {
        let animationid: string = event.currentTarget.getAttribute("id");
        let positiondiv: HTMLDivElement = <HTMLDivElement>document.querySelector("#position");
        let rotatediv: HTMLDivElement = <HTMLDivElement>document.querySelector("#rotate");

        if (animationid == "position") {
            selectedanimation = "position";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
        }

        console.log(selectedanimation);
    }

    function animateElementsStop(): void {
        animationRunning = false;
        animateElements(animationRunning);
        console.log("Stop");
    }

    function animateElementsStart(): void {
        animationRunning = true;
        animateElements(animationRunning);
        console.log("Start");
    }

    function animateElements(state: boolean = false): void {
        let element: canvasElement = new canvasElement(selectedform, selectedcolor, selectedanimation);
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");

        if (state == false) {
            clearTimeout(timeOut);
        } else {
            for (index = 0; index < symbols.length; index++) {
                symbols[index].animate(canvas.width, canvas.height);
            }

            // do something
            timeOut = setTimeout(function (): void {
                // Kommentar einfügen
                clearForAnimation();
                animateElements(animationRunning);
            },  25);
        }
    }

    function clearForAnimation(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2.clearRect(0, 0, canvas.width, canvas.height);
    }

    function clearCanvas(): void {
        console.log("delete");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        symbols = [];
    }

    function drawAll(): void {
        let index: number = 0;

        clearForAnimation();

        for (index = 0; index < symbols.length; index++) {
            symbols[index].draw();
        }

    }

    function startMove(canvas: any, event: any): void {
        moveX = event.offsetX;
        moveY = event.offsetY;
        console.log("moveX: " + moveX + " moveY: " + moveY);

        draggedElementIndex = GetDraggedElement(moveX, moveY);
        if (draggedElementIndex !== -1) {
            isMoving = true;
        }
    }

    function nowMove(canvas: any, event: any): void {
        if (isMoving === true) {
            // moving
            moveX = event.offsetX;
            moveY = event.offsetY;
            if (draggedElementIndex !== -1) {
                symbols[draggedElementIndex].position.x = moveX;
                symbols[draggedElementIndex].position.y = moveY;
            }

            drawAll();
            //            console.log("MoveX: " +moveX + " moveY: " + moveY);
        }
    }

    function stopMove(canvas: any, event: any): void {
        if (isMoving === true) {

            console.log("moveX: " + moveX + " moveY: " + moveY);
            if (draggedElementIndex !== -1) {
                symbols[draggedElementIndex].position.x = moveX;
                symbols[draggedElementIndex].position.y = moveY;
                symbols[draggedElementIndex].draw();
            }
            moveX = 0;
            moveY = 0;
            isMoving = false;

        }
    }

    function GetDraggedElement(moveX: number = 0, moveY: number = 0) {
        let index: number = 0;
        let foundIndex: number = -1;

        for (index = 0; index < symbols.length; index++) {
            if ((moveX <= symbols[index].position.x + symbols[index].size) && (moveX >= symbols[index].position.x)
                && (moveY <= symbols[index].position.y + symbols[index].size) && (moveY >= symbols[index].position.y)) {
                foundIndex = index;
                break;

            }
        }

        return foundIndex;
    }
}
// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
