const expressAsyncHandler = require("express-async-handler");
const Note = require("../modules/NotesModel");
const DeleteNote = expressAsyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    // console.log("note :", note);
    if (note == null) {
      res.json({ status: 404, message: `note not found ` });
    } else {
      if (note.user.toString() === req.user._id.toString()) {
        if (note) {
          await note.remove((err, data) => {
            if (err)
              res.json({ status: 500, message: `deleted error ${error}` });
            else res.json({ status: 200, message: `deleted success ${data}` });
          });
        } else {
          res.json({ status: 404, message: `note not found ` });
        }
      } else {
        res.json({
          status: 501,
          message: `you are not authorized to perfom this actoin`,
        });
      }
    }
  } catch (error) {
    res.json({ status: 300, message: `${error}` });
  }
});

module.exports = DeleteNote;
