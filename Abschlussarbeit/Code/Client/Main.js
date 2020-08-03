"use strict";
var MagicCanvas;
(function (MagicCanvas) {
    window.addEventListener("load", handleLoad);
    MagicCanvas.canvas = document.querySelector("canvas");
    //Heroku App Verlinkung
    let appurl = "https://magiccanvas.herokuapp.com/";
    // ausgwählte Farbe, Form und Animation zum Füllen
    //wahllos festgelegt, Code bekommt diese Möglichkeiten vorgegeben und es wird dann überprüft 
    //ob das oder etwas anderes ausgewählt wird
    let selectedcolor = "#ff0000";
    let selectedform = "circle";
    let selectedanimation = "position";
    //Array mit allen Eigenschaften
    MagicCanvas.symbols = [];
    // Bewegungen auf dem Canvas
    let isMoving = false; //bewegt sich das Element
    let moveX = 0; //Bewegung in x-Richtung
    let moveY = 0; //Bewegung in y-Richtung
    let draggedElementIndex = 0; //welches Element angesprochen wird ?
    let timeOut; //Zeitvariable, zum Neuladen ab bestimmter Zeit
    let animationRunning = false; //läuft die Animation 
    async function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        MagicCanvas.crc2 = canvas.getContext("2d");
        //Lade alle gespeicherten Bilder
        fillList();
        //Klick auf Hintergrundfarbe
        let white = document.querySelector("#white");
        white.addEventListener("click", setBackground);
        let black = document.querySelector("#black");
        black.addEventListener("click", setBackground);
        let beige = document.querySelector("#beige");
        beige.addEventListener("click", setBackground);
        // Klick auf Farbe
        let red = document.querySelector("#red");
        red.addEventListener("click", setColor);
        let blue = document.querySelector("#blue");
        blue.addEventListener("click", setColor);
        let green = document.querySelector("#green");
        green.addEventListener("click", setColor);
        let yellow = document.querySelector("#yellow");
        yellow.addEventListener("click", setColor);
        // Klick auf Regel Button
        let rules = document.querySelector("#rules");
        rules.addEventListener("click", rulesVisibility);
        // Generate
        let generate = document.querySelector("#generate");
        generate.addEventListener("click", generateSymbols);
        // Animationen
        let start = document.querySelector("#startanimation");
        start.addEventListener("click", animateElementsStart);
        let stop = document.querySelector("#stopanimation");
        stop.addEventListener("click", animateElementsStop);
        // Klick auf Canvas Größe
        let standard = document.querySelector("#standard");
        standard.addEventListener("click", handleCanvasSize);
        let small = document.querySelector("#small");
        small.addEventListener("click", handleCanvasSize);
        let medium = document.querySelector("#medium");
        medium.addEventListener("click", handleCanvasSize);
        let large = document.querySelector("#large");
        large.addEventListener("click", handleCanvasSize);
        // Klick auf die verschiedenen Form Icons
        let circle = document.querySelector("#circleicon");
        circle.addEventListener("click", setForm);
        let triangle = document.querySelector("#triangleicon");
        triangle.addEventListener("click", setForm);
        let square = document.querySelector("#squareicon");
        square.addEventListener("click", setForm);
        let flash = document.querySelector("#flashicon");
        flash.addEventListener("click", setForm);
        // Delete Button, um den Canvas zu säubern
        let deleteBtn = document.querySelector("#delete");
        deleteBtn.addEventListener("click", clearCanvas);
        //Name und Bild speichern
        let save = document.querySelector("#save");
        save.addEventListener("click", savePicture);
        // Klick auf die verschiedenen Animationsformen
        let position = document.querySelector("#position");
        position.addEventListener("click", setAnimation);
        let rotate = document.querySelector("#rotate");
        rotate.addEventListener("click", setAnimation);
        // Element verschieben
        // mousedown, mousemove, and mouseup
        canvas.addEventListener("mousedown", function (event) { startMove(canvas, event); });
        canvas.addEventListener("mousemove", function (event) { nowMove(canvas, event); });
        canvas.addEventListener("mouseup", function (event) { stopMove(canvas, event); });
    }
    async function savePicture(_event) {
        // eingetragener Name des Nutzers
        let nameSaved = document.getElementById("picturename").value;
        console.log("name:" + name);
        //konvertiert einen Wert in einen JSON string
        //Wert = Daten aus dem symbols Array
        let datasymbols = JSON.stringify(MagicCanvas.symbols);
        //Vorlage für die Antwort, erst App URL, dann ausgesuchter Name und die Daten des Bildes
        let response = await fetch(appurl + "?" + "action=insert&name" + nameSaved + "&data=" + datasymbols);
        let responseText = await response.text(); //stellt die Antwort als Text mit Typ string dar
        console.log(responseText);
        alert("Picture saved!");
    }
    //
    function rulesVisibility() {
        console.log("show rules");
        //selektiert das Div Element
        //Funktion wird mit click Event aufgerufen
        //es wird abgefragt, ob der div gerade sichtbar ist, wenn nicht, dann einblenden und 
        //sonst ausgeblendet lassen
        let rulesdiv = document.querySelector("#overlay");
        if (rulesdiv.style.display == "none") {
            rulesdiv.style.display = "block";
        }
        else {
            rulesdiv.style.display = "none";
        }
    }
    function handleCanvasSize() {
        //Canvas sizes als Radiobutton Input Elemente
        let standardsize = document.querySelector("#standard");
        let smallsize = document.querySelector("#small");
        let mediumsize = document.querySelector("#medium");
        let largesize = document.querySelector("#large");
        let canvas = document.querySelector("canvas");
        //überprüft welcher Radiobutton ausgewählt ist (mit checked) und wenn ausgewählt dann wird Größe geändert
        if (standardsize.checked == true) {
            canvas.setAttribute("style", "width: 500px");
            canvas.setAttribute("style", "height: 300px");
            console.log("standard");
        }
        if (smallsize.checked == true) {
            console.log("small");
            canvas.setAttribute("style", "width: 450px");
            canvas.setAttribute("style", "height: 250px");
        }
        if (mediumsize.checked == true) {
            canvas.setAttribute("style", "width: 550px");
            canvas.setAttribute("style", "height: 350px");
        }
        if (largesize.checked == true) {
            canvas.setAttribute("style", "width: 600px");
            canvas.setAttribute("style", "height: 400px");
        }
    }
    function setBackground() {
        let white = document.querySelector("#white");
        let black = document.querySelector("#black");
        let beige = document.querySelector("#beige");
        if (white.checked == true) {
            MagicCanvas.crc2.fillStyle = "#FFFFFF";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
        if (black.checked == true) {
            MagicCanvas.crc2.fillStyle = "#000000";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
        if (beige.checked == true) {
            MagicCanvas.crc2.fillStyle = "#FFE3BD";
            MagicCanvas.crc2.fill();
            MagicCanvas.crc2.fillRect(0, 0, MagicCanvas.crc2.canvas.width, MagicCanvas.crc2.canvas.height);
        }
    }
    function generateSymbols(_event) {
        console.log("generate Symbols");
        //ruft Constructor auf (new) und Eigenschaften werden dem Element zugeordnet
        let element = new MagicCanvas.canvasElement(selectedform, selectedcolor, selectedanimation);
        //Element wird dem Array symbols hinzugefügt
        MagicCanvas.symbols.push(element);
        //Element wird gezeichnet 
        element.draw();
    }
    function setColor(event) {
        // Element wird über das Event mit Hilfe der id geholt 
        let actualid = event.target.getAttribute("id");
        console.log("Event:" + event.target);
        // Farben divs
        let red = document.querySelector("#red");
        let blue = document.querySelector("#blue");
        let green = document.querySelector("#green");
        let yellow = document.querySelector("#yellow");
        // wenn die id des childs zb red ist dann wird die farbe mit selectedcolor überschrieben
        if (actualid == "red") {
            selectedcolor = "#7F0909";
            red.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "blue") {
            selectedcolor = "#000890";
            blue.style.border = "1px solid #ff0000";
            red.style.border = "none";
            green.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "green") {
            selectedcolor = "#0D6217";
            green.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            red.style.border = "none";
            yellow.style.border = "none";
        }
        else if (actualid == "yellow") {
            selectedcolor = "#EEE117";
            yellow.style.border = "1px solid #ff0000";
            blue.style.border = "none";
            green.style.border = "none";
            red.style.border = "none";
        }
        console.log("Event:" + event.target.getAttribute("id"));
        console.log(selectedcolor);
    }
    function setForm(event) {
        let formid = event.currentTarget.getAttribute("id");
        // Formen divs
        let circle = document.querySelector("#circleicon");
        let triangle = document.querySelector("#triangleicon");
        let square = document.querySelector("#squareicon");
        let flash = document.querySelector("#flashicon");
        if (formid == "circleicon") {
            selectedform = "circle";
            circle.style.border = "1px solid #ff0000";
            triangle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        }
        else if (formid == "triangleicon") {
            selectedform = "triangle";
            triangle.style.border = "1px solid #ff0000";
            circle.style.border = "none";
            square.style.border = "none";
            flash.style.border = "none";
        }
        else if (formid == "squareicon") {
            selectedform = "square";
            square.style.border = "1px solid #ff0000";
            flash.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }
        else if (formid == "flashicon") {
            selectedform = "flash";
            flash.style.border = "1px solid #ff0000";
            square.style.border = "none";
            circle.style.border = "none";
            triangle.style.border = "none";
        }
        console.log(selectedform);
    }
    function setAnimation(event) {
        let animationid = event.currentTarget.getAttribute("id");
        let position = document.querySelector("#position");
        let rotate = document.querySelector("#rotate");
        position.style.border = "0px solid #ff0000";
        rotate.style.border = "0px solid #ff0000";
        //wenn position ausgewählt wurde, dann wird der selectedanimation position zugeordnet und 
        //ein roter Rand rumgelegt damit man sieht, welche Animation ausgewählt wurde
        if (animationid == "position") {
            selectedanimation = "position";
            position.style.border = "1px solid #ff0000";
        }
        if (animationid == "rotate") {
            selectedanimation = "rotate";
            rotate.style.border = "1px solid #ff0000";
        }
        console.log(selectedanimation);
    }
    function animateElementsStop() {
        //Stop Button stoppt die Animation
        animationRunning = false;
        //animate Elements wird aufgerufen mit Parameter animationRunning
        animateElements(animationRunning);
        console.log("Stop");
    }
    function animateElementsStart() {
        animationRunning = true;
        animateElements(animationRunning);
        console.log("Start");
    }
    function animateElements(state = false) {
        let canvas = document.querySelector("canvas");
        //wenn der Status = false ist dann wird keine Animation aufgerufen
        if (state == false) {
            clearTimeout(timeOut); //verhindern das die Funktion erneut ausgeführt wird und Animation beenden
        }
        else {
            for (MagicCanvas.index = 0; MagicCanvas.index < MagicCanvas.symbols.length; MagicCanvas.index++) {
                //alle Symbols werden animiert innerhalb des canvas
                MagicCanvas.symbols[MagicCanvas.index].animate(canvas.width, canvas.height);
            }
            //mach etwas
            timeOut = setTimeout(function () {
                //wird aufgerufen
                clearForAnimation();
                animateElements(animationRunning);
            }, 25); //alle 25ms wird die Animation neu geladen, dass die Symbole sich bewegen
        }
    }
    //bewirkt, dass die Elemente immer neu gezeichnet werden und die vorherigen gelöscht werden
    //dass sie keine Elemente hinter sich herziehen / "Schweif"
    function clearForAnimation() {
        let canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        //Hintergrund wird immer neu geladen, wenn die Elemente neu gezeichnet werden, damit der Hintergrund nach dem canvas laden 
        //nicht verschwindet
        setBackground();
    }
    //Click Event auf delete Button
    //löscht alle Elemente auf dem Canvas bis auf den Hintergrund
    function clearCanvas() {
        console.log("delete");
        let canvas = document.querySelector("canvas");
        MagicCanvas.crc2.clearRect(0, 0, canvas.width, canvas.height);
        MagicCanvas.symbols = [];
        setBackground();
    }
    function drawAll() {
        let index = 0;
        //Elemente des Canvas immer wieder löschen, damit immer wieder neu gezeichnet werden kann
        clearForAnimation();
        //alle Elemente neu zeichnen, abhängig was ausgewählt wurde und im Array ist
        for (index = 0; index < MagicCanvas.symbols.length; index++) {
            MagicCanvas.symbols[index].draw();
        }
    }
    function startMove(canvas, event) {
        //Mouse position
        //offset hier damit move nicht aus aus dem Canvas raus sich bewegen kann
        moveX = event.offsetX;
        moveY = event.offsetY;
        console.log("moveX: " + moveX + " moveY: " + moveY);
        // neu skalieren für unterschiedliche Bildschirmgrößen
        moveX = Math.round(event.offsetX * (canvas.width / canvas.offsetWidth));
        moveY = Math.round(event.offsetY * (canvas.height / canvas.offsetHeight));
        //bekommt die Parameter wo die Mouse Position ist 
        //Element das verschoben werden soll ermitteln
        draggedElementIndex = getDraggedElement(moveX, moveY);
        //wenn die Position innerhalb des Canvas ist, dann wird Variable isMoving true gesetzt
        if (draggedElementIndex !== -1) {
            isMoving = true;
        }
    }
    function nowMove(canvas, event) {
        if (isMoving === true) {
            //aktuelle Position der Maus
            moveX = event.offsetX;
            moveY = event.offsetY;
            if (draggedElementIndex !== -1) {
                //Position der Elemente wreden der Maus Position zugeschrieben, sodass das Element an der Maus "klebt"
                MagicCanvas.symbols[draggedElementIndex].position.x = moveX;
                MagicCanvas.symbols[draggedElementIndex].position.y = moveY;
            }
            //Elemente werden gezeichnet
            drawAll();
        }
    }
    function stopMove(canvas, event) {
        if (isMoving === true) {
            console.log("moveX: " + moveX + " moveY: " + moveY);
            //überprüft ebenfalls Position von Maus und Element
            if (draggedElementIndex !== -1) {
                MagicCanvas.symbols[draggedElementIndex].position.x = moveX;
                MagicCanvas.symbols[draggedElementIndex].position.y = moveY;
                MagicCanvas.symbols[draggedElementIndex].draw();
            }
            //Bewegung zuende
            moveX = 0;
            moveY = 0;
            isMoving = false;
        }
    }
    function getDraggedElement(moveX = 0, moveY = 0) {
        let index = 0; //welches Element
        let foundIndex = -1; //Inedx des Elements welches durch den Benutzer verschoben werden soll
        for (index = 0; index < MagicCanvas.symbols.length; index++) {
            //Mausposition muss auf dem Element sein, um es zu bewegen 
            //x und y Position + Größe muss abgefragt werden dass man ermitteln kann wo sich die Maus im Verhältniss zum Symbol befindet
            if ((moveX <= MagicCanvas.symbols[index].position.x + MagicCanvas.symbols[index].size) && (moveX >= MagicCanvas.symbols[index].position.x)
                && (moveY <= MagicCanvas.symbols[index].position.y + MagicCanvas.symbols[index].size) && (moveY >= MagicCanvas.symbols[index].position.y)) {
                foundIndex = index;
                break;
            }
        }
        return foundIndex;
    }
    async function fillList() {
        // key = action, value = select
        let response = await fetch(appurl + "?" + "action=select");
        let responseText = await response.text();
        console.log(responseText);
    }
})(MagicCanvas || (MagicCanvas = {}));
//# sourceMappingURL=Main.js.map