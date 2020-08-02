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
    let databaseurl = "mongodb+srv://Testuser:Furtwangen@eia2-euh5i.mongodb.net/MagicCanvas?retryWrites=true&w=majority";
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
        _response.setHeader("No-Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let value = "name:" + url.query["name"] + ", data" + url.query["data"];
            _response.write("value:" + value);
            let jsonString = JSON.stringify(value);
            _response.write(jsonString);
            if (url.query["action"] == "insert")
                storeCanvasCollection(jsonString);
        }
        _response.write("This is my response");
        _response.end();
    }
    function storeCanvasCollection(_data) {
        CanvasCollection.insert(_data);
    }
})(MagicCanvas = exports.MagicCanvas || (exports.MagicCanvas = {}));
//# sourceMappingURL=server.js.map