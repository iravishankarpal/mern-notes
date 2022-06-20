const Note = require("../modules/NotesModel");
const asyncHandler = require("express-async-handler");
const AllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  // console.log("allnotes", req.user, notes);
  res.send(notes);
});

module.exports = AllNotes;
