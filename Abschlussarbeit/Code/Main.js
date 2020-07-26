"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        let rule = document.querySelector("#rules");
        rule.addEventListener("click", rulesVisibility);
        let standardsize = document.querySelector("#standard");
        let smallsize = document.querySelector("#small");
        let mediumsize = document.querySelector("#medium");
        let largesize = document.querySelector("#large");
        standardsize.addEventListener("click", handleCanvasSize);
        smallsize.addEventListener("click", handleCanvasSize);
        mediumsize.addEventListener("click", handleCanvasSize);
        largesize.addEventListener("click", handleCanvasSize);
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
    }
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Main.js.map