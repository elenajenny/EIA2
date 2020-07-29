"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    // ausgwählte Farbe zum Füllen
    let selectedcolor = "#ff0000";
    let selectedform = "circle";
    let selectedanimation = "position";
    let symbols = [];
    let chosenName;
    // Ausprobieren
    // let canvasheight: number;
    // let canvaswidth: number;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        // Klick auf Farbe
        let red = document.querySelector("#red");
        red.addEventListener("click", setColor);
        let blue = document.querySelector("#blue");
        blue.addEventListener("click", setColor);
        let green = document.querySelector("#green");
        green.addEventListener("click", setColor);
        let yellow = document.querySelector("#yellow");
        yellow.addEventListener("click", setColor);
        // Klick auf Regel Button
        let rules = document.querySelector("#rules");
        rules.addEventListener("click", rulesVisibility);
        // Generate
        let generate = document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);
        // Klick auf Canvas Größe
        let standard = document.querySelector("#standard");
        standard.addEventListener("click", handleCanvasSize);
        let small = document.querySelector("#small");
        small.addEventListener("click", handleCanvasSize);
        let medium = document.querySelector("#medium");
        medium.addEventListener("click", handleCanvasSize);
        let large = document.querySelector("#large");
        large.addEventListener("click", handleCanvasSize);
        // Delete Button, um den Canvas zu säubern
        let deleteBtn = document.querySelector("#delete");
        deleteBtn.addEventListener("click", clearCanvas);
        let save = document.querySelector("#save");
        save.addEventListener("click", savePicture);
        let picture = document.querySelector("#picturename");
        picture.addEventListener("oninput", enterName);
        // Klick auf die verschiedenen Form Icons
        let circle = document.querySelector("#circleicon");
        circle.addEventListener("click", setForm);
        let triangle = document.querySelector("#triangleicon");
        triangle.addEventListener("click", setForm);
        let square = document.querySelector("#squareicon");
        square.addEventListener("click", setForm);
        let flash = document.querySelector("#flashicon");
        flash.addEventListener("click", setForm);
        // Klick auf die verschiedenen Animationsformen
        let position = document.querySelector("#position");
        position.addEventListener("click", setAnimation);
        let rotate = document.querySelector("#rotate");
        rotate.addEventListener("click", setAnimation);
    }
    function rulesVisibility() {
        console.log("show rules");
        let rulesdiv = document.querySelector("#overlay");
        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        }
        else {
            rulesdiv.style.display = "none";
        }
    }
    function handleCanvasSize() {
        // Canvas sizes
        let standardsize = document.querySelector("#standard");
        let smallsize = document.querySelector("#small");
        let mediumsize = document.querySelector("#medium");
        let largesize = document.querySelector("#large");
        let canvas = document.querySelector("canvas");
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
    function generateSymbols(_event) {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde
        let element = new MagicCanvas.canvasElement(selectedform, selectedcolor, selectedanimation);
        symbols.push(element);
        element.draw();
    }
    function setColor(event) {
        // Element wird über das Event mit Hilfe der id geholt 
        let actualid = event.target.getAttribute("id");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
        }
        else if (actualid == "blue") {
            selectedcolor = "#000890";
        }
        else if (actualid == "green") {
            selectedcolor = "#0D6217";
        }
        else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
        }
        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }
    function setForm(event) {
        // console.log("hallo");
        let formid = event.currentTarget.getAttribute("id");
        if (formid == "circleicon") {
            selectedform = "circle";
            console.log("rufe drawcircle auf");
        }
        else if (formid == "triangleicon") {
            selectedform = "triangle";
            console.log("rufe drawtriangle auf");
        }
        else if (formid == "squareicon") {
            selectedform = "square";
            console.log("rufe drawsquare auf");
        }
        else if (formid == "flashicon") {
            selectedform = "flash";
            console.log("rufe drawflash auf");
        }
        console.log(selectedform);
    }
    function setAnimation(event) {
        let animationid = event.currentTarget.getAttribute("id");
        if (animationid == "position") {
            selectedanimation = "position";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
        }
        console.log(selectedanimation);
    }
    function clearCanvas() {
        console.log("delete");
        // Array leeren
        let index = MagicCanvas.canvasElement[length];
        symbols.splice(index, 1);
        // // Store the current transformation matrix
        // crc2.save();
        // // Use the identity matrix while clearing the canvas
        // crc2.setTransform(1, 0, 0, 1, 0, 0);
        // crc2.clearRect(0, 0, canvaswidth, canvasheight);
        // // Restore the transform
        // crc2.restore();
    }
    function enterName() {
        // let name: any = (<HTMLInputElement>document.getElementById("#picturename")).value;
        // chosenName = name;
        // console.log("name:" + chosenName);
        let name = document.getElementById("#picturename").value;
        document.getElementById("pictures").innerHTML = "You wrote: " + name;
    }
    function savePicture(event) {
        // let name: any;
        // (document.querySelector("#picturename") as HTMLInputElement).value = name;
        // let name: any = (<HTMLInputElement>document.getElementById("#picturename")).value;
        // let namepicture: string = event.currentTarget.value;
        console.log("name:" + chosenName);
    }
    function draganddrop(_event) {
        console.log("it is draganddropping");
        // Funktion nacher so aufrufen
        // symbols.onmousedown = function(event): void {
        //     // (1) prepare to moving: make absolute and on top by z-index
        //     symbols.style.position = "absolute";
        //     symbols.style.zIndex = 1000;
        //     // move it out of any current parents directly into body
        //     // to make it positioned relative to the body
        //     document.body.append(symbols);
        //     // centers the symbols at (pageX, pageY) coordinates
        //     function moveAt(pageX, pageY): void {
        //       symbols.style.left = pageX - symbols.offsetWidth / 2 + "px";
        //       symbols.style.top = pageY - symbols.offsetHeight / 2 + "px";
        //     }
        //     // move our absolutely positioned symbols under the pointer
        //     moveAt(event.pageX, event.pageY);
        //     function onMouseMove(event): void {
        //       moveAt(event.pageX, event.pageY);
        //     }
        //     // (2) move the symbols on mousemove
        //     document.addEventListener("mousemove", onMouseMove);
        //     // (3) drop the symbols, remove unneeded handlers
        //     symbols.onmouseup = function() {
        //       document.removeEventListener("mousemove", onMouseMove);
        //       symbols.onmouseup = null;
        //     };
        //   };
    }
})(MagicCanvas || (MagicCanvas = {}));
// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
// Optional: alle Elemente hören sich auf zu bewegen während das neue ELement verschoben wird
//# sourceMappingURL=Main.js.map