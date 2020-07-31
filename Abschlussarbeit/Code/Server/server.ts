import * as Http from "http";
// import { Url, UrlWithParsedQuery } from "url";
import * as Url from "url";

export namespace MagicCanvas {
    let server: Http.Server = Http.createServer();
    console.log(server);

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    console.log("Server starting on port:" + port);

    server.listen(port);
    server.addListener("request", handleRequest);

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Whats up?");

        _response.setHeader("content-type", "text/html; charset-utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }

            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);
        }


        

        _response.write("This is my response");
        _response.end();
    }
}