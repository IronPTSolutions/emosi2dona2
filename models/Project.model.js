const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Project must have an owner"]
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;