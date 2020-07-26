"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("handleLoad");
        let rule = document.querySelector("#rules");
        rule.addEventListener("click", rulesVisibility);
        handleCanvasSize();
        generateSymbols(_event);
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
    function generateSymbols(_event) {
        console.log("generate Symbols");
    }
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Main.js.map