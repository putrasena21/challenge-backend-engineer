const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const responseFormatter = require("./helpers/response.helper");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseFormatter);

const indexRouter = require("./routes");

app.use("/api/v1", indexRouter);

app.use((err, req, res, next) => res.serverError());

module.exports = app;
