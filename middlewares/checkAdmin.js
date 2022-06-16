const checkAdmin = (req, res, next) => {
	if (res.locals.notAdminId === res.locals.userId) {
    return true;
  }
  return next();
};
module.exports = checkAdmin
