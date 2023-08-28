const usersHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  let users = ["Kiran", "Srinivas", "Kishore"];

  if (url === "/") {
    res.write("<html>");
    res.write("<title>Add User</title>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='user'></input><button type='submit'>Add User</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log("parseBody=", parseBody);

      const newUser = parseBody.split("=")[1];
      users.push(newUser);
      console.log("users=>", users);
    });
    console.log("users=", users);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }

  if (url === "/users") {
    res.write("<html><body><li>");
    users.map((user) => {
      res.write(`<ul>${user}</ul>`);
    });
    res.write("</li></body></html>");
    return res.end();
  }
};

module.exports = usersHandler;
