const requiresLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged.');
      err.status = 401;
      return next(err);
    }
  }

export default requiresLogin;