"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    let selectedcolor = "#FF0000";
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        // Klick auf Farbe
        let palettecolor = document.querySelector("#paletteid");
        palettecolor.addEventListener("click", setColor);
        document.querySelector("#red").addEventListener("click", setColor);
        document.querySelector("#blue").addEventListener("click", setColor);
        document.querySelector("#green").addEventListener("click", setColor);
        document.querySelector("#yellow").addEventListener("click", setColor);
        let rule = document.querySelector("#rules");
        rule.addEventListener("click", rulesVisibility);
        document.querySelector("#standard").addEventListener("click", handleCanvasSize);
        document.querySelector("#small").addEventListener("click", handleCanvasSize);
        document.querySelector("#medium").addEventListener("click", handleCanvasSize);
        document.querySelector("#large").addEventListener("click", handleCanvasSize);
        let generate = document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);
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
        console.log("canvassize");
        let canvas = document.querySelector("canvas");
        let standardsize = document.querySelector("#standard");
        let smallsize = document.querySelector("#small");
        let mediumsize = document.querySelector("#medium");
        let largesize = document.querySelector("#large");
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
    function generateSymbols(_event) {
        console.log("generate Symbols");
        // Bedingung: erst geklickt werden, wenn alles nötige ausgewählt wurde
        //Kreis
        // circle.draw();
        let r = 5;
        MagicCanvas.crc2.save();
        MagicCanvas.crc2.translate(40, 40);
        // Skalierung vertikal und horizontal
        MagicCanvas.crc2.scale(5, 5);
        // crc2.translate(-50, -50);
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.arc(0, 0, r, 0, 2 * Math.PI);
        MagicCanvas.crc2.closePath();
        MagicCanvas.crc2.restore();
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
        //Triangle
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.moveTo(70, 70);
        MagicCanvas.crc2.lineTo(10, 70);
        MagicCanvas.crc2.lineTo(10, 25);
        MagicCanvas.crc2.closePath();
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
        //Rectangle
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.rect(10, 10, 55, 40);
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
        // Flash
        MagicCanvas.crc2.beginPath();
        MagicCanvas.crc2.translate(40, 40);
        MagicCanvas.crc2.moveTo(0, 0);
        MagicCanvas.crc2.lineTo(20, 0);
        MagicCanvas.crc2.lineTo(15, 25);
        MagicCanvas.crc2.lineTo(25, 25);
        MagicCanvas.crc2.lineTo(10, 50);
        MagicCanvas.crc2.moveTo(0, 0);
        MagicCanvas.crc2.lineTo(0, 30);
        MagicCanvas.crc2.lineTo(12, 30);
        MagicCanvas.crc2.lineTo(10, 50);
        // Linienfarbe
        MagicCanvas.crc2.strokeStyle = "#000000";
        MagicCanvas.crc2.stroke();
    }
    function setColor(event) {
        //Element wird über das Event mithilfe der ID geholt
        let actualid = event.target.getAttribute("id");
        //wenn die ID des childs der Farbe entspricht, dann wird diese Farbe mit der selected color überschrieben
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
    }
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Main.js.map