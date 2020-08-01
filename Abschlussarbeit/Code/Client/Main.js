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
    // Bewegungen auf dem Canvas
    let isMoving = false;
    let moveX = 0;
    let moveY = 0;
    let draggedElementIndex = 0;
    let timeOut;
    let animationRunning = false;
    async function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        // let offer: string = await response.text();
        //Klick auf Hintergrundfarbe
        let white = document.querySelector("#white");
        white.addEventListener("click", setBackground);
        let black = document.querySelector("#black");
        black.addEventListener("click", setBackground);
        let beige = document.querySelector("#beige");
        beige.addEventListener("click", setBackground);
        // Klick auf Farbe
        let red = document.querySelector("#red");
        red.addEventListener("click", setColor);
        let blue = document.querySelector("#blue");
        blue.addEventListener("click", setColor);
        let green = document.querySelector("#green");
        green.addEventListener("click", setColor);
        let yellow = document.querySelector("#yellow");
        yellow.addEventListener("click", setColor);
        // Animationen
        let start = document.querySelector("#startanimation");
        start.addEventListener("click", animateElementsStart);
        let stop = document.querySelector("#stopanimation");
        stop.addEventListener("click", animateElementsStop);
        // Klick auf Canvas Größe
        let standard = document.querySelector("#standard");
        standard.addEventListener("click", handleCanvasSize);
        let small = document.querySelector("#small");
        small.addEventListener("click", handleCanvasSize);
        let medium = document.querySelector("#medium");
        medium.addEventListener("click", handleCanvasSize);
        let large = document.querySelector("#large");
        large.addEventListener("click", handleCanvasSize);
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
        // Delete Button, um den Canvas zu säubern
        let deleteBtn = document.querySelector("#delete");
        deleteBtn.addEventListener("click", clearCanvas);
        //Name und Bild speichern
        let save = document.querySelector("#save");
        save.addEventListener("click", savePicture);
        // Klick auf die verschiedenen Animationsformen
        let position = document.querySelector("#position");
        position.addEventListener("click", setAnimation);
        let rotate = document.querySelector("#rotate");
        rotate.addEventListener("click", setAnimation);
        // Element verschieben
        // mousedown, mousemove, and mouseup
        canvas.addEventListener("mousedown", function (e) { startMove(canvas, e); });
        canvas.addEventListener("mousemove", function (e) { nowMove(canvas, e); });
        canvas.addEventListener("mouseup", function (e) { stopMove(canvas, e); });
    }
    async function savePicture(_event) {
        // eingetragener Name des Nutzers
        let name = document.getElementById("picturename").value;
        console.log("name:" + name);
        // let element: CanvasElement = new CanvasElement(selectedform, selectedcolor, selectedanimation);
        let data = JSON.stringify(MagicCanvas.symbols);
        let query = new URLSearchParams(data);
        let response = await fetch("index.html?" + name + query.toString());
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
        let canvas = document.querySelector("canvas");
        if (state == false) {
            clearTimeout(timeOut);
        }
        else {
            for (MagicCanvas.index = 0; MagicCanvas.index < MagicCanvas.symbols.length; MagicCanvas.index++) {
                MagicCanvas.symbols[MagicCanvas.index].animate(canvas.width, canvas.height);
            }
            // do something
            timeOut = setTimeout(function () {
                // Kommentar einfügen
                clearForAnimation();
                animateElements(animationRunning);
            }, 25);
        }
    }
    function clearForAnimation() {
        let canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
    }
    function clearCanvas() {
        console.log("delete");
        let canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        MagicCanvas.symbols = [];
    }
    function drawAll() {
        let index = 0;
        clearForAnimation();
        for (index = 0; index < MagicCanvas.symbols.length; index++) {
            MagicCanvas.symbols[index].draw();
        }
    }
    function startMove(canvas, event) {
        moveX = event.offsetX;
        moveY = event.offsetY;
        console.log("moveX: " + moveX + " moveY: " + moveY);
        draggedElementIndex = GetDraggedElement(moveX, moveY);
        if (draggedElementIndex !== -1) {
            isMoving = true;
        }
    }
    function nowMove(canvas, event) {
        if (isMoving === true) {
            // moving
            moveX = event.offsetX;
            moveY = event.offsetY;
            if (draggedElementIndex !== -1) {
                MagicCanvas.symbols[draggedElementIndex].position.x = moveX;
                MagicCanvas.symbols[draggedElementIndex].position.y = moveY;
            }
            drawAll();
            //            console.log("MoveX: " +moveX + " moveY: " + moveY);
        }
    }
    function stopMove(canvas, event) {
        if (isMoving === true) {
            console.log("moveX: " + moveX + " moveY: " + moveY);
            if (draggedElementIndex !== -1) {
                MagicCanvas.symbols[draggedElementIndex].position.x = moveX;
                MagicCanvas.symbols[draggedElementIndex].position.y = moveY;
                MagicCanvas.symbols[draggedElementIndex].draw();
            }
            moveX = 0;
            moveY = 0;
            isMoving = false;
        }
    }
    function GetDraggedElement(moveX = 0, moveY = 0) {
        let index = 0;
        let foundIndex = -1;
        for (index = 0; index < MagicCanvas.symbols.length; index++) {
            if ((moveX <= MagicCanvas.symbols[index].position.x + MagicCanvas.symbols[index].size) && (moveX >= MagicCanvas.symbols[index].position.x)
                && (moveY <= MagicCanvas.symbols[index].position.y + MagicCanvas.symbols[index].size) && (moveY >= MagicCanvas.symbols[index].position.y)) {
                foundIndex = index;
                break;
            }
        }
        return foundIndex;
    }
})(MagicCanvas || (MagicCanvas = {}));
// Klasse für alle Canvas Elemente
// Main: alle Werte holen (Farbe, Form, Animationsform)
// die Infos werden mit new Canvaselement mit paramtern mitgegeben (müssen im Constructor 
// vorher auch mitgegeben werden)
// neues Element wird in ein Array gepusht --> alle Canvas Elmente
// dieses array läuft durch eine Dauerschleife (für alle die sich bewegen oder rotieren)
//# sourceMappingURL=Main.js.map