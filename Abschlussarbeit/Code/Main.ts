namespace MagicCanvas {
    window.addEventListener("load", handleLoad);
    
    function handleLoad(_event: Event): void {
        console.log("handleLoad");

        let rule: HTMLElement = <HTMLElement>document.querySelector("#rules");
        rule.addEventListener("click", rulesVisibility);

        handleCanvasSize();

        generateSymbols(_event);
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


    

    function generateSymbols (_event: Event): void {
        console.log("generate Symbols");
    }
    

}