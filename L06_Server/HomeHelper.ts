namespace L06_HomeHelper {
    window.addEventListener("load", handleLoad);

    let appurl: string = "https://elenapp.herokuapp.com/";

    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#orderForm");

    async function handleLoad(_event: Event): Promise<void> {
        console.log("Die Anwendung startet");

        let response: Response = await fetch("Data.json");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);

        generateContent(data);

        let handleform: HTMLInputElement = <HTMLInputElement>document.querySelector("#orderForm");
        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        let reset: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=reset]");

        slider.addEventListener("input", displayAmount);
        handleform.addEventListener("change", handleChange);
        submit.addEventListener("click", sendOrder);
        reset.addEventListener("click", resetOrder);

    }

    async function sendOrder(_event: Event): Promise<void> {
        console.log("send order");
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("index.html?" + query.toString());
        alert("Order sent!");

        let response: Response = await fetch(appurl + "?" + query.toString());
        let message: string = await response.text();

    }

    
    


    function handleChange(_event: Event): void {
        displayOrder(_event);
    }

    function displayOrder(_event: Event): void {
       
        let formData: FormData = new FormData(document.forms[0]);
        let list: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");
        let totalPrice: number = 0;

        list.innerHTML = "";

        for (let entry of formData) {
            console.log("Entry:" + entry);
           
            let portion: number = Number(formData.get("Menge"));
            let item: HTMLElement;
            let price: number;
            switch (entry[0]) {

                case "Einkauf":
                    if (portion > 0) {
                        item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                        price = Number(item.getAttribute("price"));
                        list.innerHTML += "" + entry[1] + " " + price * portion + "€" + " ";
                        let unit: string = String(item.getAttribute("unit"));
                        list.innerHTML += "" + unit + ":" + portion + "  bei"; 
                        console.log("Item:" + item);
                        console.log("list:" + list);
                        console.log("unit:" + unit);
                        console.log("price:" + price);
                        totalPrice += price * portion;
                    }
                    break;

                case "Supermarkt":
                    if (portion > 0) {
                            list.innerHTML += " " + entry[1];
                        }
                    break;

                case "Haushalt":
                    item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " " + "<br>";
                    totalPrice += price;
                    break;


                case "Bank":
                    item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += " : " + "" + entry[1] + " " + price + "€";
                    totalPrice += price;
                    
                    // let value: any = (<HTMLInputElement>_event.target).value;
                    // if (value > 0) {
                    //     list.innerHTML += " " + value + "€";
                    // }
                    
                    break;

                
                case "Amount":
                    
                    let radio: HTMLInputElement = <HTMLInputElement>document.querySelector("#radio");
        
                    if (radio.checked) {
                                list.innerHTML += " " + entry[1] + "€";
                            } 
                            
                    break;
               

                case "Zahlung":
                    item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));

                    let payment: HTMLDivElement = <HTMLDivElement>document.querySelector("#payment");
                    
                    
                    totalPrice += price;
                    payment.innerHTML = "<br>" + "" + entry[1] + ":" + totalPrice.toFixed(2) + "€";
                    console.log(totalPrice);
                    break;
            }

        }

       
    }
    function displayAmount(_event: Event): void {

        let value: string = (<HTMLInputElement>_event.target).value;

        let text: HTMLElement = <HTMLElement>document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }

    function resetOrder(_event: Event): void {
        let list: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");
        let payment: HTMLDivElement = <HTMLDivElement>document.querySelector("#payment");
                    
        list.innerHTML = "";
        payment.innerHTML = "";
        
    }



}

