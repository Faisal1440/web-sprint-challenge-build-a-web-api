const express = require("express");
const actionRouter = require("../routes/actions-Router");

const server = express();
server.use(express.json());


server.use("/api/Actions", actionsRouter);

module.exports = server;