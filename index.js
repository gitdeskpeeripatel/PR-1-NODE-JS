const http = require("http");
const fs = require("fs");
const PORT = 8081;

const requestHandler = (req, res) => {
  let filename = "";
  let statusCode = 200;

  switch (req.url) {
    case "/":
      filename = "index.html";
      break;
    case "/about":
      filename = "about.html";
      break;
    case "/contact":
      filename = "contact.html";
      break;
    default:
      filename = "404.html";
      statusCode = 404; 
  }

  fs.readFile(filename, (err, result) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(result);
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port:", PORT);
  }
});
