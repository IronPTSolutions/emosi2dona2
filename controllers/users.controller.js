const Project = require("../models/Project.model");
const User = require("../models/User.model");

module.exports.profile = (req, res, next) => {
  function findProjectsAndRender(user) {
    Project.find({ owner: userId ? userId : req.user._id })
      .populate("owner")
      .then(projects => {
        const data = {
          projects: projects
        }
    
        if (user) {
          data.currentUser = user
        }

        res.render("profile", data);
      })
      .catch(next)
  }

  const { userId } = req.params;

  if (userId) {
    User.findById(userId)
      .then(user => {
        findProjectsAndRender(user)
      })
  } else {
    findProjectsAndRender()
  }
}

module.exports.listUsers = (req, res, next) => {
  User.find({ _id: { $ne: req.user._id } })
    .then(users => {
      res.render('users', { users: users })
    })
}