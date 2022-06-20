const expressAsyncHandler = require("express-async-handler");
const Note = require("../modules/NotesModel");

const GetSingleNote = expressAsyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.json({
        staus: 404,
        message: "note not found",
      });
    }
  } catch (error) {
    res.json({ status: 500, message: `some error occured ${error}` });
  }
});

module.exports = GetSingleNote;
