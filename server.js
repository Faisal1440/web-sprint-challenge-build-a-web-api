const express = require("express");
const server = express();
server.use(express.json());

// server.use("/api/actions", actionRouter);

module.exports = server;