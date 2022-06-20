const expressAsyncHandler = require("express-async-handler");
const Note = require("../modules/NotesModel");
const UpDateNote = expressAsyncHandler(async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);
    if (note == null) {
      res.json({ status: 404, message: `note not found ` });
    } else {
      if (note.user.toString() === req.user._id.toString()) {
        if (note) {
          note.title = title;
          note.category = category;
          note.content = content;
          await note.save((err, data) => {
            if (err)
              res.json({ status: 500, message: `updated error ${error}` });
            else res.json({ status: 200, message: `updated success ${data}` });
          });

          // await console.log("updatenote :", updatenote, typeof updatenote);
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

module.exports = UpDateNote;
