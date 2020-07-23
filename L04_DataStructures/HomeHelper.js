"use strict";
var L04_HomeHelper;
(function (L04_HomeHelper) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Die Anwendung startet");
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
        let order = document.querySelector("#form");
        order.addEventListener("change", displayOrder);
        L04_HomeHelper.generateContent(L04_HomeHelper.data);
    }
    function displayAmount(_event) {
        let value = _event.target.value;
        let text = document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }
    function displayOrder(_event) {
        let order = document.querySelector("#list");
        order.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            console.log("Entry:" + entry);
            let item = document.querySelector("[value='" + entry[1] + "']");
            let portion = Number(formData.get("Menge"));
            let price = Number(item.getAttribute("price"));
            switch (entry[0]) {
                case "Einkauf":
                    order.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                    let unit = String(item.getAttribute("unit"));
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
})(L04_HomeHelper || (L04_HomeHelper = {}));
"Haushalt";
order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " ";
break;
"Bank";
order.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + "|";
break;
"Amount";
order.innerHTML += " " + entry[1] + "€";
break;
"Zahlung";
order.innerHTML += "<br>" + "" + entry[1];
break;
//# sourceMappingURL=HomeHelper.js.map