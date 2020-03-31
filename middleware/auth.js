module.exports = function(req, res, next) {
  if (!req.session.isAuthenticaded) {
    return res.redirect("/auth/login");
  }
  next();
};
