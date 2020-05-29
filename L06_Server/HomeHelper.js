"use strict";
var L06_HomeHelper;
(function (L06_HomeHelper) {
    window.addEventListener("load", handleLoad);
    let appurl = "https://elenapp.herokuapp.com/";
    let form = document.querySelector("#orderForm");
    async function handleLoad(_event) {
        console.log("Die Anwendung startet");
        let response = await fetch("Data.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        L06_HomeHelper.generateContent(data);
        let handleform = document.querySelector("#orderForm");
        let slider = document.querySelector("#amount");
        let submit = document.querySelector("button[type=button]");
        let reset = document.querySelector("button[type=reset]");
        slider.addEventListener("input", displayAmount);
        handleform.addEventListener("change", handleChange);
        submit.addEventListener("click", sendOrder);
        reset.addEventListener("click", resetOrder);
    }
    async function sendOrder(_event) {
        console.log("send order");
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        await fetch("index.html?" + query.toString());
        alert("Order sent!");
        let response = await fetch(appurl + "?" + query.toString());
        let message = await response.text();
    }
    function handleChange(_event) {
        displayOrder(_event);
    }
    function displayOrder(_event) {
        let formData = new FormData(document.forms[0]);
        let list = document.querySelector("#list");
        let totalPrice = 0;
        list.innerHTML = "";
        for (let entry of formData) {
            console.log("Entry:" + entry);
            let portion = Number(formData.get("Menge"));
            let item;
            let price;
            switch (entry[0]) {
                case "Einkauf":
                    if (portion > 0) {
                        item = document.querySelector("[value='" + entry[1] + "']");
                        price = Number(item.getAttribute("price"));
                        list.innerHTML += "" + entry[1] + " " + price * portion + "€" + " ";
                        let unit = String(item.getAttribute("unit"));
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
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " " + "<br>";
                    totalPrice += price;
                    break;
                case "Bank":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += " : " + "" + entry[1] + " " + price + "€";
                    totalPrice += price;
                    // let value: any = (<HTMLInputElement>_event.target).value;
                    // if (value > 0) {
                    //     list.innerHTML += " " + value + "€";
                    // }
                    break;
                case "Amount":
                    let radio = document.querySelector("#radio");
                    if (radio.checked) {
                        list.innerHTML += " " + entry[1] + "€";
                    }
                    break;
                case "Zahlung":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    let payment = document.querySelector("#payment");
                    totalPrice += price;
                    payment.innerHTML = "<br>" + "" + entry[1] + ":" + totalPrice.toFixed(2) + "€";
                    console.log(totalPrice);
                    break;
            }
        }
    }
    function displayAmount(_event) {
        let value = _event.target.value;
        let text = document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }
    function resetOrder(_event) {
        let list = document.querySelector("#list");
        let payment = document.querySelector("#payment");
        list.innerHTML = "";
        payment.innerHTML = "";
    }
})(L06_HomeHelper || (L06_HomeHelper = {}));
//# sourceMappingURL=HomeHelper.js.map