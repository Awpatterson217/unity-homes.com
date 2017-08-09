const http = require("http");                        
const url = require("url");
const path = require("path");
const fs = require("fs");

http.createServer(function(request, response) {
    
const cwd = process.cwd();
const pub = cwd + '/pub';
const name     = url.parse(request.url).pathname;
const filename = path.join(pub, name);

fs.readFile(filename, "binary", function(err, file) {

    if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
    }

    response.writeHead(200);
    response.write(file, "binary");
    response.end();

});
}).listen(3000);

console.log("Server is listening on port 3000.");