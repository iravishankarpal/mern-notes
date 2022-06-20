const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    category: {
      require: true,
      type: String,
    },
    content: {
      require: true,
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NotesSchema);

module.exports = Note;
