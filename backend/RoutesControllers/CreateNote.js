const expressAsyncHandler = require("express-async-handler");
const Note = require("../modules/NotesModel");

const createNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.json({ status: 400, message: "Please fill the all fildes" });
  } else {
    await new Note({
      user: req.user._id,
      title,
      content,
      category,
    }).save();
    // await note.
    res.json({ status: 200, message: " note is creted" });
  }
});

module.exports = createNote;
