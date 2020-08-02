"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var MagicCanvas;
(function (MagicCanvas) {
    let server = Http.createServer();
    console.log(server);
    let CanvasCollection;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    let databaseurl = "mongodb+srv://Testuser:Furtwangen@eia2-euh5i.mongodb.net/EIA2?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseurl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        CanvasCollection = mongoClient.db("MagicCanvas").collection("CanvasCollection");
        console.log("Database connection" + CanvasCollection != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("Whats up?");
        let action;
        let data;
        let name;
        _response.setHeader("content-type", "text/html; charset-utf-8");
        // _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            if (url.query["action"] == "insert") {
                let value = "name:" + url.query["name"] + ", data:" + url.query["data"];
                _response.write("value:" + value);
                let jsonString = JSON.stringify(value);
                _response.write(jsonString);
                storeCanvasCollection(jsonString);
            }
            if (url.query["action"] == "select") {
                _response.write("radCanvasCollection");
                // readCanvasCollection(_response);
            }
        }
        _response.write("This is my response");
        _response.end();
    }
    function storeCanvasCollection(_data) {
        CanvasCollection.insert(_data);
    }
    function readCanvasCollection(_response) {
        // err = error
        CanvasCollection.find({}).toArray(function (err, result) {
            // Wenn Fehler passiert, diesen rausschmeißen
            _response.write("vor error");
            if (err)
                throw err;
            _response.write(result);
        });
    }
})(MagicCanvas = exports.MagicCanvas || (exports.MagicCanvas = {}));
//# sourceMappingURL=Server.js.map