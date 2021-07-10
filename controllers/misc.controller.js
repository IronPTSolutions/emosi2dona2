const Project = require("../models/Project.model");

module.exports.index = (req, res, next) => {
  Project.find()
    .populate("owner")
    .then(projects => {
      console.log(projects)
      res.render("index", { projects: projects })
    })

}