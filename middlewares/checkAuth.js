const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userEmail = req.session.userEmail;
    return res.redirect('/');
  }
  return next();
};
const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.login = req.session.userLogin;
    res.locals.userEmail = req.session.userEmail;
    return next();
  }
  return next();
};
module.exports = { checkSession, checkAuth };
