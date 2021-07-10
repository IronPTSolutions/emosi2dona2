module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
    next()
  } else {
    res.redirect('/profile')
  }
}

module.exports.checkAdmin = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    next()
  } else {
    res.redirect('/profile')
  }
}

module.exports.checkRole = (role) => (req, res, next) => {
  if (req.user.role === role) {
    next()
  } else {
    res.redirect('/profile')
  }
}