const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} request received\n`;

  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("home page");
        break;
      case "/about":
        res.end("about page");
        break;
      default:
        res.end("400 not found");
    }
  });
});

myServer.listen(8000, () => console.log("serevr started"));
