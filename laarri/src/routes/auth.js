module.exports = {

  isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("message", "Necesitas iniciar sesión para entrar en esa zona de la página.");
    return res.redirect('/login');
  },

  isNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/profile');
  }
};
