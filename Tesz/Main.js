"use strict";
var MagicCanvas2;
(function (MagicCanvas2) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    let selectedcolor = "#FF0000";
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas2.crc2 = canvas.getContext("2d");
        document.querySelector("#rules").addEventListener("click", rulesVisibility);
        document.querySelector("#standard").addEventListener("click", handleCanvasSize);
        document.querySelector("#small").addEventListener("click", handleCanvasSize);
        document.querySelector("#medium").addEventListener("click", handleCanvasSize);
        document.querySelector("#large").addEventListener("click", handleCanvasSize);
        document.querySelector("#generate").addEventListener("click", generateSymbols);
        // Klick auf Farbe
        document.querySelector("#paletteid").addEventListener("click", setColor);
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
        MagicCanvas2.crc2.save();
        MagicCanvas2.crc2.translate(40, 40);
        // Skalierung vertikal und horizontal
        MagicCanvas2.crc2.scale(5, 5);
        // crc2.translate(-50, -50);
        MagicCanvas2.crc2.beginPath();
        MagicCanvas2.crc2.arc(0, 0, r, 0, 2 * Math.PI);
        MagicCanvas2.crc2.closePath();
        MagicCanvas2.crc2.restore();
        // Linienfarbe
        MagicCanvas2.crc2.strokeStyle = "#000000";
        MagicCanvas2.crc2.stroke();
        //Triangle
        MagicCanvas2.crc2.beginPath();
        MagicCanvas2.crc2.moveTo(70, 70);
        MagicCanvas2.crc2.lineTo(10, 70);
        MagicCanvas2.crc2.lineTo(10, 25);
        MagicCanvas2.crc2.closePath();
        // Linienfarbe
        MagicCanvas2.crc2.strokeStyle = "#000000";
        MagicCanvas2.crc2.stroke();
        //Rectangle
        MagicCanvas2.crc2.beginPath();
        MagicCanvas2.crc2.rect(10, 10, 55, 40);
        // Linienfarbe
        MagicCanvas2.crc2.strokeStyle = "#000000";
        MagicCanvas2.crc2.stroke();
        // Flash
        MagicCanvas2.crc2.beginPath();
        MagicCanvas2.crc2.translate(40, 40);
        MagicCanvas2.crc2.moveTo(0, 0);
        MagicCanvas2.crc2.lineTo(20, 0);
        MagicCanvas2.crc2.lineTo(15, 25);
        MagicCanvas2.crc2.lineTo(25, 25);
        MagicCanvas2.crc2.lineTo(10, 50);
        MagicCanvas2.crc2.moveTo(0, 0);
        MagicCanvas2.crc2.lineTo(0, 30);
        MagicCanvas2.crc2.lineTo(12, 30);
        MagicCanvas2.crc2.lineTo(10, 50);
        // Linienfarbe
        MagicCanvas2.crc2.strokeStyle = "#000000";
        MagicCanvas2.crc2.stroke();
    }
    function setColor(event) {
        //Element wird über das Event mithilfe der ID geholt
        let actualid = event.target.getAttribute("id");
        //wenn die ID des childs der Farbe entspricht, dann wird diese Farbe mit der überschrieben
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
    function setForm() {
        console.log("Hallo");
    }
    function savePicture() {
        console.log("Hallihallo");
        let name;
        document.querySelector;
    }
})(MagicCanvas2 || (MagicCanvas2 = {}));
//# sourceMappingURL=Main.js.map