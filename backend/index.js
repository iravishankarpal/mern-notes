const express = require("express");
const app = express();
require("dotenv").config();
var port = process.env.port;
app.listen(port, console.log(`server is  running ${port}`));

app.get("/", (req, res) => {
  res.send(`server is  running ${port}`);
});

// middleware
app.use(express.json());
const moargan = require("morgan");
app.use(moargan("dev"));
var cors = require("cors");
app.use(cors());
// fetching all notes
var notes = require("./Data");
app.get("/allNotes", (req, res) => {
  res.send(notes);
});
// fetchin only one notes
app.get("/note/:id", (req, res) => {
  var note = notes.filter((x) => req.params.id === x._id);
  res.send(note);
});

// connection of database
const connectionDB = require("./dbConnection");
connectionDB()
  .then(() => console.log(`connected to database mongodb `))
  .catch((err) => console.log(`connection to database fail error is ${err}`));

// creating routing ports  for api  and also its type of middleware
const registerPoint = require("./Routes/userRegister");
const NotesRoute = require("./Routes/NotesRoute");
app.use("/api/users", registerPoint);
app.use("/user", NotesRoute);
// for all the  which is not match
app.all("*", (req, res) => {
  var url = req.originalUrl;
  res.json({
    status: 404,
    message: `${url} is wrong or method is wrong or parameter is missing `,
  });
});
