import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace MagicCanvas {
    let server: Http.Server = Http.createServer();
    console.log(server);

    let CanvasCollection: Mongo.Collection;

    interface DataStructure {
        name: string;
        data: string;
    }

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    console.log("Server starting on port:" + port);

    let databaseurl: string = "mongodb+srv://Testuser:Furtwangen@eia2-euh5i.mongodb.net/MagicCanvas?retryWrites=true&w=majority";
    
    startServer(port);
    connectToDatabase(databaseurl);

    function startServer(_port: number | string): void {
    
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    
    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        CanvasCollection = mongoClient.db("MagicCanvas").collection("CanvasCollection");
        console.log("Database connection" + CanvasCollection != undefined);
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Whats up?");

        let action: string;
        let data: string;
        let name: string;

        _response.setHeader("content-type", "text/html; charset-utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }

            let value: string = "name:" + url.query["name"] + ", data" + url.query["data"];
            _response.write("value:" + value);
        
            let jsonString: string = JSON.stringify(value);
            _response.write(jsonString);

            if (url.query["action"] == "insert")
            storeCanvasCollection(jsonString);
        }

        _response.write("This is my response");
        _response.end();
    }

    function storeCanvasCollection (_data: any): void {
        CanvasCollection.insert(_data);
    }
}