const express = require("express");
const actionsRouter = require("./routes/actions-Router");
const projectRouter = require("./routes/project-Router");
const server = express();
server.use(express.json());


server.use("/api/Action", actionsRouter);
server.use("/api/projects", projectRouter);
module.exports = server;