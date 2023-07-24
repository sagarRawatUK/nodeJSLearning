const http = require("http");

const jsonResponse = {
    firstName: "Sagar",
    lastName: "Rawat"
}
const server = http.createServer((request, response) => {

    if (request.url === '/') {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Home Page");
    } else if (request.url === '/api') {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(jsonResponse));
    } else if (request.url === '/about') {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("About Page");
    } else if (request.url === '/help') {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Help Page");
    } 
});

server.listen(3000, () => {
    console.log("Server running on port 3000")
});