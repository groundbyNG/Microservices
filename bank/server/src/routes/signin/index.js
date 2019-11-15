import express from 'express';
import User from '../../models/user';

const signin = express.Router();
const jsonParser = express.json();
    
signin.post("/", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const { passportId, password } = req.body;

    User.authenticate(passportId, password, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return res.send(err);
        } else {
          req.session.userId = user.passportId;
          return res.sendStatus(200);
        }
    });
});
 
export default signin;