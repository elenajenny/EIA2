namespace L04_HomeHelper {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Die Anwendung startet");

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);

        let order: HTMLInputElement = <HTMLInputElement>document.querySelector("#form");
        order.addEventListener("change", displayOrder);

        generateContent(data);

    }

    function displayAmount(_event: Event): void {

        let value: string = (<HTMLInputElement>_event.target).value;

        let text: HTMLElement = <HTMLElement>document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }



    function displayOrder(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");
        order.innerHTML = "";
        let formData: FormData = new FormData(document.forms[0]);
        
    
        

        for (let entry of formData) {
            console.log("Entry:" + entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            let portion: number = Number(formData.get("Menge"));
            let price: number = Number(item.getAttribute("price"));

            switch (entry[0]) {
                case "Einkauf":
                order.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                let unit: string = String(item.getAttribute("unit"));
                console.log("unit:" + unit);
                order.innerHTML += "" + unit + ":";
                console.log("price:" + price);
                break;

                case "Menge":
                order.innerHTML += "" + portion + "|";
                break;

                case "Supermarkt":
                order.innerHTML += " " + entry[1];
                break;
            }
        }
    }
}
case "Haushalt":
                order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " ";
                break;

                case "Bank":
                order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + "|";
                break; 

                case "Amount":
                order.innerHTML += " " + entry[1] + "€";
                break;

                case "Zahlung":
                order.innerHTML += "<br>" + "" + entry[1];
                break;
                