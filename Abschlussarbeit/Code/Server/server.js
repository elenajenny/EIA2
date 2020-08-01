"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
// import { Url, UrlWithParsedQuery } from "url";
const Url = require("url");
const Mongo = require("mongodb");
var MagicCanvas;
(function (MagicCanvas) {
    let server = Http.createServer();
    console.log(server);
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port:" + port);
    server.addListener("request", handleRequest);
    let databaseurl = "mongodb+srv://Testuser:Furtwangen@eia2-euh5i.mongodb.net/MagicCanvas?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseurl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    let pictures;
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        pictures = mongoClient.db("HomeHelper").collection("Orders");
        console.log("Database connection" + pictures != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("Whats up?");
        _response.setHeader("content-type", "text/html; charset-utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.write("This is my response");
        _response.end();
    }
})(MagicCanvas = exports.MagicCanvas || (exports.MagicCanvas = {}));
//# sourceMappingURL=server.js.map