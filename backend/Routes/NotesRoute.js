const AllNotes = require("../RoutesControllers/FetchAllNotesController");
const CreateNote = require("../RoutesControllers/CreateNote");
const express = require("express");
const protect = require("../middleware/userAuthMW");
const GetSingleNote = require("../RoutesControllers/GetSingleNote");
const UpDateNote = require("../RoutesControllers/UpDateNote");
const DeleteNote = require("../RoutesControllers/DeleteNote");

const NotesRoute = express.Router();

NotesRoute.route("/all").get(protect, AllNotes);

NotesRoute.route("/create").post(protect, CreateNote);
NotesRoute.route("/:id")
  .get(protect, GetSingleNote)
  .put(protect, UpDateNote)
  .delete(protect, DeleteNote);
module.exports = NotesRoute;
