const express = require("express");
const actionsRouter = require("./routes/actions-Router");

const server = express();
server.use(express.json());


server.use("/api/Action", actionsRouter);

module.exports = server;