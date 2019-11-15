import express from 'express';

const logout = express.Router();

logout.get('/logout', (req, res, next) => {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.sendStatus(200);
        }
      });
    }
  });

export default logout;