const checkAuth = (req, res, next) => {
	if (req.session.userId) {
		res.locals.userId = req.session.userId;
    return res.redirect('/');
  }
  return next();
};
const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
		res.locals.login = req.session.userLogin;
		console.log('login', res.locals.login)
    return next();
  }
  return next();
};
module.exports = {checkSession, checkAuth};
