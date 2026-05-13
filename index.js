//
// title: Uptime monitoring application
// author:shams all labib
// date: 5/13/2026
//

// dependencies

const http = require("http");
// after 20 min
const { handleReqRes } = require("./helper/handleReqRes");

// app module - module scaffolding

const app = {};

// configuration

app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening on port ${app.config.port}`);
  });
};

app.handleReqRes = handleReqRes;

// step-10 : ekhane handleReqRes ke helper folder er modde deya, jate code choto o bujhte subidha hoy

app.createServer();
