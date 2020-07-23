"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("handleLoad");
        generateSymbols(_event);
    }
    function generateSymbols(_event) {
        console.log("generate Symbols");
    }
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Main.js.map