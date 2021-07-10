const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Project",
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Like = mongoose.model("Like", likeSchema)

module.exports = Like