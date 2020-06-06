"use strict";
var L07_HomeHelper;
(function (L07_HomeHelper) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Einkauf":
                    group = createDatalist(items, category);
                    break;
                case "Supermarkt":
                    group = createDatalistSupermarkt(items, category);
                    break;
                case "Haushalt":
                    group = createMultiple(items, category);
                    break;
                case "Bank":
                    group = createSingle(items, category);
                    break;
                case "Zahlung":
                    group = createSingleCash(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group) {
                fieldset.appendChild(group);
            }
        }
    }
    L07_HomeHelper.generateContent = generateContent;
    function createDatalist(_items, _category) {
        let group = document.createElement("div");
        let select = document.createElement("select");
        for (let item of _items) {
            let option = document.createElement("option");
            option.setAttribute("price", item.price.toFixed(2));
            option.setAttribute("unit", item.unit);
            option.value = item.name;
            select.name = _category;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            option.appendChild(label);
            select.appendChild(option);
        }
        group.appendChild(select);
        return group;
    }
    function createDatalistSupermarkt(_items, _category) {
        let group = document.createElement("div");
        let select = document.createElement("select");
        for (let item of _items) {
            let option = document.createElement("option");
            option.setAttribute("price", item.price.toFixed(2));
            option.value = item.name;
            select.name = _category;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            option.appendChild(label);
            select.appendChild(option);
        }
        group.appendChild(select);
        return group;
    }
    function createMultiple(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            // 
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
    function createSingle(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.setAttribute("id", "radio");
            radio.value = item.name;
            radio.name = _category;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(label);
            group.appendChild(radio);
        }
        return group;
    }
    function createSingleCash(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(label);
            group.appendChild(radio);
        }
        return group;
    }
})(L07_HomeHelper || (L07_HomeHelper = {}));
//# sourceMappingURL=generateContent.js.map