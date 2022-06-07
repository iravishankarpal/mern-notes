// const { response } = require("express");
const express = require("express");
const data = require("./data");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.get("/", (req, res) => {
  res.send(data);
});

app.get("/:id", (req, res) => {
  const note = data.find((x) => x._id === req.params.id);
  console.log(req.params);
  res.send(note);
});
const port = process.env.PORT || 5000;

app.listen(port, console.log(` server is reunning  ${port}`));
