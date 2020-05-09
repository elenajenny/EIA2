"use strict";
var L_03HomeHelper;
(function (L_03HomeHelper) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Die Anwendung startet");
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
        let addButton = document.querySelector("#addrow");
        addButton.addEventListener("click", shoppingList);
        let order = document.querySelector("#form");
        order.addEventListener("change", displayOrder);
        // let removeRow: HTMLInputElement = <HTMLInputElement>document.querySelector("trash")
    }
    function displayAmount(_event) {
        let value = _event.target.value;
        let text = document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }
    function shoppingList(_event) {
        console.log("clicked");
        //Find a <table> element with id="myTable"
        let table = document.querySelector("#shop");
        //Create an empty <tr> element and add it to the 1st psition of the table
        let row = table.insertRow(1);
        //Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        //Add some text to the new cells
        cell1.innerHTML = "<input placeholder=\"Artikel\">";
        cell2.innerHTML = "<input placeholder=\"Menge + Einheit\">";
        cell3.innerHTML = "<input placeholder=\"Kosten\">";
        cell4.innerHTML = "<input placeholder=\"Ort\">";
        cell5.innerHTML = "<i class=\"fas fa-trash-alt\"></i>";
        // // function to delete a row.
        // function removeRow(table) {
        //     let deleteButton = document.querySelector("#trash");
        //     deleteButton.deleteRow(table.parentNode.parentNode.rowIndex);
        //     // let deleteButton: void = document.querySelector("#trash").addEventListener("click", function (): void {
        //     //     table.deleteRow(1); 
        //     // });
        // }
    }
    function displayOrder(_event) {
        let household = document.querySelector("#home");
        let bank = document.querySelector("#bank");
        let cash = document.querySelector("#cash");
        for (let i = 0; i < 1; i++) {
            let item = _event.target;
            let value = item.value;
            let spanElement = document.querySelector("#list");
            let price = Number(item.getAttribute("price"));
            console.log(price);
            if (household.checked == true) {
                spanElement.innerHTML += "<br>" + value + " " + price + "€";
            }
            else if (bank.checked == true) {
                spanElement.innerHTML += "<br>" + value + " " + price + "€";
            }
            else if (cash.checked == true) {
                spanElement.innerHTML += "<br>" + value + " " + price + "€";
            }
            else {
                spanElement.innerHTML += value + " ";
            }
        }
    }
})(L_03HomeHelper || (L_03HomeHelper = {}));
//# sourceMappingURL=HomeHelper.js.map