namespace MagicCanvas {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");

    // ausgwählte Farbe zum Füllen
    let selectedcolor: string = "#ff0000";
    let selectedform: string = "circle";
    let selectedanimation: string = "position";

    let symbols: canvasElement[] = [];

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        // Klick auf Farbe

        let red: HTMLDivElement = <HTMLDivElement>document.querySelector("#red");
        red.addEventListener("click", setColor);
        let blue: HTMLDivElement = <HTMLDivElement>document.querySelector("#blue");
        blue.addEventListener("click", setColor);
        let green: HTMLDivElement = <HTMLDivElement>document.querySelector("#green");
        green.addEventListener("click", setColor);
        let yellow: HTMLDivElement = <HTMLDivElement>document.querySelector("#yellow");
        yellow.addEventListener("click", setColor);

        // Klick auf Regel Button
        let rules: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#rules");
        rules.addEventListener("click", rulesVisibility);

        // Generate
        let generate: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);

        // Klick auf Canvas Größe
        let standard: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        standard.addEventListener("click", handleCanvasSize);
        let small: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        small.addEventListener("click", handleCanvasSize);
        let medium: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        medium.addEventListener("click", handleCanvasSize);
        let large: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
        large.addEventListener("click", handleCanvasSize);

        // Delete Button, um den Canvas zu säubern
        let deleteBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#delete");
        deleteBtn.addEventListener("click", clearCanvas);

        let save: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#save");
        save.addEventListener("click", savePicture);

        // Klick auf die verschiedenen Form Icons
        let circle: HTMLDivElement = <HTMLDivElement>document.querySelector("#circleicon");
        circle.addEventListener("click", setForm);
        let triangle: HTMLDivElement = <HTMLDivElement>document.querySelector("#triangleicon");
        triangle.addEventListener("click", setForm);
        let square: HTMLDivElement = <HTMLDivElement>document.querySelector("#squareicon");
        square.addEventListener("click", setForm);
        let flash: HTMLDivElement = <HTMLDivElement>document.querySelector("#flashicon");
        flash.addEventListener("click", setForm);

        // Klick auf die verschiedenen Animationsformen
        let position: HTMLDivElement = <HTMLDivElement>document.querySelector("#position");
        position.addEventListener("click", setAnimation);
        let rotate: HTMLDivElement = <HTMLDivElement>document.querySelector("#rotate");
        rotate.addEventListener("click", setAnimation);

        canvas.addEventListener("click", draganddrop);
        

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

        if (selectedanimation == "rotate") {
            crc2.restore();
            element.rotate();
        }
        element.draw();
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
            // positiondiv.style.border = "1px solid #ff0000";
            // rotatediv.style.border = "none";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
            // rotatediv.style.border = "1px solid #ff0000";
            // positiondiv.style.border = "none";
        }

        console.log(selectedanimation);
    }

    function clearCanvas(): void {
        console.log("delete");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2.clearRect(0, 0, canvas.width, canvas.height);
        symbols = [];
    }

    function savePicture(): void {
        let name: string = (<HTMLInputElement>document.getElementById("picturename")).value;
        console.log("name:" + name);
    }
    

    // function mouseDown(_event: MouseEvent): void {
    //     let mousePosY: number = _event.clientY;
    //     let mousePosX: number = _event.clientX;
    //     let canvasRect: DOMRect = canvas.getBoundingClientRect();

    //     let offsetX: number = mousePosX - canvasRect.left;
    //     let offsetY: number = mousePosY - canvasRect.top;
        
    //     for (let symbol of symbols) {

    //         if (symbol.position.x - symbol.radius.x < offsetX &&
    //             symbol.position.x + symbol.radius.x > offsetX &&
    //             symbol.position.y - symbol.radius.y < offsetY && symbol.position.y + symbol.radius.y > offsetY) {
    //             console.log(symbol);
    //             dragDrop = true;
    //             let index: number = symbols.indexOf(symbol);
    //             symbols.splice(index, 1);
    //             objectDragDrop = symbol;
    //             return;
    //         }
    //     }
    //  }
    // }

    function draganddrop(_event: MouseEvent): void {
        
        console.log("it is draganddropping");
    }
}

// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
// Optional: alle Elemente hören sich auf zu bewegen während das neue ELement verschoben wird
