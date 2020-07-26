namespace MagicCanvas {
    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    let moveables: Moveable[] = [];

    
    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let rule: HTMLElement = <HTMLElement>document.querySelector("#rules");
        rule.addEventListener("click", rulesVisibility);

        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");
    
        standardsize.addEventListener("click", handleCanvasSize);
        smallsize.addEventListener("click", handleCanvasSize);
        mediumsize.addEventListener("click", handleCanvasSize);
        largesize.addEventListener("click", handleCanvasSize);

        let generate: HTMLElement = <HTMLElement>document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);
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
        console.log("canvassize");
    
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        
        let standardsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#standard");
        let smallsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#small");
        let mediumsize: HTMLInputElement = <HTMLInputElement>document.querySelector("#medium");
        let largesize: HTMLInputElement = <HTMLInputElement>document.querySelector("#large");

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

    

    function generateSymbols (_event: Event): void {
        console.log("generate Symbols");
        

    }
    
    

}