const Project = require("../models/Project.model");
const Like = require("../models/Like.model");

module.exports.getProject = (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      return Like.findOne({ user: req.user?._id, project: req.params.id })
        .then(like => {
          const liked = !!like;

          res.render("projectDetail", { project: project, liked: liked });
        })
    })
    .catch(next)
}

module.exports.like = (req, res, next) => {
  // Search if there is a like
  Like.findOneAndDelete({ user: req.user?._id, project: req.params.id })
    .then(like => {
      if (!like) {
        return Like.create({
          user: req.user._id,
          project: req.params.id
        })
          .then(() => res.json({ deleted: false }))
      } else {
        res.json({ deleted: true })
      }

    })
    .catch(next)
}