"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_Homehelper;
(function (L07_Homehelper) {
    let orders;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    // let databaseurl: string = "mongodb://localhost:27017";
    let databaseurl = "mongodb+srv://Testuser:Furtwangen@eia2-euh5i.mongodb.net/test?retryWrites=true&w=majority";
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
        orders = mongoClient.db("HomeHelper").collection("Orders");
        console.log("Database connection" + orders != undefined);
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
            storeOrder(url.query);
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(L07_Homehelper = exports.L07_Homehelper || (exports.L07_Homehelper = {}));
//# sourceMappingURL=Server.js.map