"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    let appurl = "https://magiccanvas.herokuapp.com/";
    let canvas = document.querySelector("canvas");
    // ausgwählte Farbe zum Füllen
    let selectedcolor = "#ff0000";
    let selectedform = "circle";
    let selectedanimation = "position";
    MagicCanvas.symbols = [];
    let timeOut;
    let animationRunning = false;
    async function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        let response = await fetch("Data.json");
        let offer = await response.text();
        //Klick auf Hintergrundfarbe
        let white = document.querySelector("#white");
        white.addEventListener("click", setBackground);
        let black = document.querySelector("#black");
        black.addEventListener("click", setBackground);
        let beige = document.querySelector("#beige");
        beige.addEventListener("click", setBackground);
        // Klick auf Canvas Größe
        let standard = document.querySelector("#standard");
        standard.addEventListener("click", handleCanvasSize);
        let small = document.querySelector("#small");
        small.addEventListener("click", handleCanvasSize);
        let medium = document.querySelector("#medium");
        medium.addEventListener("click", handleCanvasSize);
        let large = document.querySelector("#large");
        large.addEventListener("click", handleCanvasSize);
        // Klick auf Farbe
        let red = document.querySelector("#red");
        red.addEventListener("click", setColor);
        let blue = document.querySelector("#blue");
        blue.addEventListener("click", setColor);
        let green = document.querySelector("#green");
        green.addEventListener("click", setColor);
        let yellow = document.querySelector("#yellow");
        yellow.addEventListener("click", setColor);
        // Klick auf die verschiedenen Form Icons
        let circle = document.querySelector("#circleicon");
        circle.addEventListener("click", setForm);
        let triangle = document.querySelector("#triangleicon");
        triangle.addEventListener("click", setForm);
        let square = document.querySelector("#squareicon");
        square.addEventListener("click", setForm);
        let flash = document.querySelector("#flashicon");
        flash.addEventListener("click", setForm);
        // Klick auf Regel Button
        let rules = document.querySelector("#rules");
        rules.addEventListener("click", rulesVisibility);
        // Generate
        let generate = document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);
        // Animationen
        let start = document.querySelector("#startanimation");
        start.addEventListener("click", animateElementsStart);
        let stop = document.querySelector("#stopanimation");
        stop.addEventListener("click", animateElementsStop);
        // Delete Button, um den Canvas zu säubern
        let deleteBtn = document.querySelector("#delete");
        deleteBtn.addEventListener("click", clearCanvas);
        let save = document.querySelector("#save");
        save.addEventListener("click", savePicture);
        // Klick auf die verschiedenen Animationsformen
        let position = document.querySelector("#position");
        position.addEventListener("click", setAnimation);
        let rotate = document.querySelector("#rotate");
        rotate.addEventListener("click", setAnimation);
        canvas.addEventListener("mousedown", pickSymbol);
        canvas.addEventListener("mouseup", placeSymbol);
        canvas.addEventListener("mousemove", dragSymbol);
    }
    async function savePicture(_event) {
        // eingetragener Name des Nutzers
        let name = document.getElementById("picturename").value;
        console.log("name:" + name);
        // let element: CanvasElement = new CanvasElement(selectedform, selectedcolor, selectedanimation);
        let data = JSON.stringify(MagicCanvas.symbols);
        let query = new URLSearchParams(data);
        let response = await fetch("index.html?" + query.toString());
        alert("Picture saved!");
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
        MagicCanvas.symbols.push(element);
        if (selectedanimation == "rotate") {
            MagicCanvas.crc2.restore();
            // element.rotate();
        }
        element.draw();
    }
    function setBackground() {
        let white = document.querySelector("#white");
        let black = document.querySelector("#black");
        let beige = document.querySelector("#beige");
        if (white.checked == true) {
            MagicCanvas.crc2.fillStyle = "#FFFFFF";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
        if (black.checked == true) {
            MagicCanvas.crc2.fillStyle = "#000000";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
        if (beige.checked == true) {
            MagicCanvas.crc2.fillStyle = "#FFE3BD";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
    }
    function setColor(event) {
        // Element wird über das Event mit Hilfe der id geholt 
        let actualid = event.target.getAttribute("id");
        console.log("Event:" + event.target);
        // Farben divs
        let red = document.querySelector("#red");
        let blue = document.querySelector("#blue");
        let green = document.querySelector("#green");
        let yellow = document.querySelector("#yellow");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
            red.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "blue") {
            selectedcolor = "#000890";
            blue.style.border = "1px solid #ff0000";
            red.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
            // colorblue.style.border = "solid #FF0000";
        }
        else if (actualid == "green") {
            selectedcolor = "#0D6217";
            green.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            red.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
            yellow.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            red.style.border = "none";
        }
        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }
    function setForm(event) {
        let formid = event.currentTarget.getAttribute("id");
        // Formen divs
        let circle = document.querySelector("#circleicon");
        let triangle = document.querySelector("#triangleicon");
        let square = document.querySelector("#squareicon");
        let flash = document.querySelector("#flashicon");
        if (formid == "circleicon") {
            selectedform = "circle";
            circle.style.border = "1px solid #ff0000";
            triangle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        }
        else if (formid == "triangleicon") {
            selectedform = "triangle";
            triangle.style.border = "1px solid #ff0000";
            circle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        }
        else if (formid == "squareicon") {
            selectedform = "square";
            square.style.border = "1px solid #ff0000";
            flash.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }
        else if (formid == "flashicon") {
            selectedform = "flash";
            flash.style.border = "1px solid #ff0000";
            square.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }
        console.log(selectedform);
    }
    function setAnimation(event) {
        let animationid = event.currentTarget.getAttribute("id");
        let positiondiv = document.querySelector("#position");
        let rotatediv = document.querySelector("#rotate");
        if (animationid == "position") {
            selectedanimation = "position";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
        }
        console.log(selectedanimation);
    }
    function animateElementsStop() {
        animationRunning = false;
        animateElements(animationRunning);
        console.log("Stop");
    }
    function animateElementsStart() {
        animationRunning = true;
        animateElements(animationRunning);
        console.log("Start");
    }
    function animateElements(state = false) {
        let element = new MagicCanvas.canvasElement(selectedform, selectedcolor, selectedanimation);
        if (state == false) {
            clearTimeout(timeOut);
        }
        else {
            for (MagicCanvas.index = 0; MagicCanvas.index < MagicCanvas.symbols.length; MagicCanvas.index++) {
                if (selectedanimation == "position") {
                    element.move();
                }
                if (selectedanimation == "rotate") {
                    element.rotate();
                }
            }
            // do something
            timeOut = setTimeout(function () {
                // Kommentar einfügen
                // clearCanvas();
                animateElements(animationRunning);
            }, 25);
        }
    }
    function clearCanvas() {
        console.log("delete");
        let canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        MagicCanvas.symbols = [];
    }
    let drag = false;
    let objectDragDrop;
    let CanvasElement;
    function dragSymbol(_event) {
        let position = new MagicCanvas.Vector(_event.clientX - MagicCanvas.crc2.canvas.offsetLeft, _event.clientY - MagicCanvas.crc2.canvas.offsetTop);
        if (drag == true) {
            objectDragDrop.position.x = _event.clientX - CanvasElement.getBoundingClientRect().left;
            objectDragDrop.position.y = _event.clientY - CanvasElement.getBoundingClientRect().top;
        }
    }
    function pickSymbol(_event) {
        console.log("Mousedown");
        drag = true;
        let mousePosY = _event.clientY;
        let mousePosX = _event.clientX;
        let canvasRect = CanvasElement.getBoundingClientRect();
        let offsetX = mousePosX - canvasRect.left;
        let offsetY = mousePosY - canvasRect.top;
        for (let symbol of MagicCanvas.symbols) {
            if (symbol.position.x - symbol.radius < offsetX &&
                symbol.position.x + symbol.radius > offsetX &&
                symbol.position.y - symbol.radius < offsetY &&
                symbol.position.y + symbol.radius > offsetY) {
                console.log(symbol);
                let index = MagicCanvas.symbols.indexOf(symbol);
                MagicCanvas.symbols.splice(index, 1);
                objectDragDrop = symbol;
            }
        }
    }
    function placeSymbol(_event) {
        console.log("MouseUp");
        if (drag == true) {
            drag = false;
            MagicCanvas.symbols.push(objectDragDrop);
        }
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