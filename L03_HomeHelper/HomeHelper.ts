namespace L_03HomeHelper {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log("Die Anwendung startet");

        // let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        // slider.addEventListener("input", displayAmount);

        let order: HTMLInputElement = <HTMLInputElement>document.querySelector("#form");
        order.addEventListener("change", displayOrder);

        
        displayAmount(_event);

    }

    function displayAmount(_event: Event): void {

        let value: string = (<HTMLInputElement>_event.target).value;

        let text: HTMLElement = <HTMLElement>document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";

        console.log("Gewünschter Betrag:" + value + "€");
    }
    

    function displayOrder(_event: Event): void {
        let order: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");
        order.innerHTML = "";
        let formData: FormData = new FormData(document.forms[0]);
        
    
        

        for (let entry of formData) {
            console.log("Entry:" + entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
        

            if (entry[0] == "Datalist") {
                console.log("Datalist");
                let portion: number = Number(formData.get("anzahl"));
                let price: number = Number(item.getAttribute("price"));
                let unit: string = String(item.getAttribute("unit")); 
                order.innerHTML = "" + entry[1] + " " + price * portion + "€" + " " +  unit + ":";
            }
            else if (entry[0] == "anzahl") {
                let portion: number = Number(formData.get("anzahl"));
                order.innerHTML += " " + portion + "";
                console.log("show" + portion);
            }
            else if (entry[0] == "DatalistSupermarkt") {
                order.innerHTML += " " + " |" + " " + entry[1];
            }

            else if (entry[0] == "home") {
                console.log ("home");
                let price: number = Number(item.getAttribute("price"));
                order.innerHTML +=  "<br>" + "" + entry[1] + " " + price + "€" + " " +   ":";
            }
            else if (entry [0] == "bank") {
                console.log("bank");
                let price: number = Number(item.getAttribute("price"));
                order.innerHTML +=  "<br>" + "" + entry[1] + " " + price + "€" + " ";

            }
            else if (entry [0] == "Amount") {
                console.log ("Amount");
                order.innerHTML += "" + entry[1];

            }
            else if (entry[0] == "cash") {
                console.log("cash");
                order.innerHTML +=  "<br>" + "" + entry[1];
            }
        
        }
    }
}