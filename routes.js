const fs = require("fs");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<title>Hello World</title>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    /* fs.writeFileSync('message.txt','Hello from Node JS');
    res.statusCode = 302;
    res.setHeader('Location','/'); */
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log("parseBody=", parseBody);

      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<title>Hello World</title>");
  res.write("<body><h2>Hello from NodeJs Server!</h2></body>");
  res.write("</html>");
  res.end();
};

module.exports = routesHandler;
