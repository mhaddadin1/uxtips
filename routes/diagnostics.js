const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  readFromFile("./db/diagnostics.json").then((data) =>
    res.json(JSON.parse(data))
  );
  // TODO: Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { errors } = req.body;

  const newDiagnostic = {
    time: Date.now(),
    error_id: uuidv4(),
    errors,
  };

  readAndAppend(newDiagnostic, "./db/diagnostics.json");
  res.json(`diagnostic added successfully 🚀`);
});

module.exports = diagnostics;
