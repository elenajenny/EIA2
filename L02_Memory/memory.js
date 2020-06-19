"use strict";
let sequencearray = [];
window.addEventListener("load", handleLoad);
function handleLoad(_event) {
    //Daten speichern  
    let savebutton = document.querySelector("#save");
    savebutton.addEventListener("click", SaveData);
    //Spiel starten
    let startbutton = document.querySelector("#button");
    startbutton.addEventListener("click", StartGame);
    let select = document.querySelector("select");
    select.addEventListener("click", SelectSequence);
}
function SelectSequence(_event) {
    console.log("get value");
    let selected = document.querySelector("#select");
    let output = selected.value;
    console.log(output);
    sequencearray.push(output);
    //Console wird geleert und dann neu befüllt
    sequencearray = [];
    sequencearray.push(output);
    console.log(sequencearray);
}
function SaveData(_event) {
    //Eingabe Feld speichern
    let valueinput = document.querySelector("input").value;
    sequencearray.push(valueinput);
    console.log(sequencearray);
    //Zeit eingeben und speichern
    let timevalue = document.querySelector("#timeinput");
    let timearray = [];
    timevalue.addEventListener("input", function () {
        // timevalue
    });
}
function shuffleCards(_event) {
    //Array in einen String umwandeln
    let change = sequencearray.toString();
    console.log("zeig" + change);
    //Das Wort in einzelne Buchstaben aufteilen
    change.split(" ");
    let i = 0;
    for (i = 0; i < change.length + 1; i++) {
        let letter = change[i];
        console.log(change[i]);
    }
    //Buchstaben mischen 
    for (i = 0; i < change.length; i++) {
        let randomValue = change[Math.floor(change.length * Math.random())];
        console.log(randomValue);
        let addcard = document.createElement("div.card");
        addcard.innerHTML = randomValue;
        document.querySelector("#mail").appendChild(addcard);
        addcard.setAttribute("style", "top: 40%");
        console.log(addcard);
    }
}
function StartGame(_event) {
    console.log("Spiel wird gestartet");
    shuffleCards(_event);
}
//# sourceMappingURL=memory.js.map