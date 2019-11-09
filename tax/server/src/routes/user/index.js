import express from 'express';
import User from '../../models/user';
import countTaxRate from '../../helpers/countTaxRate';

const users = express.Router();
const jsonParser = express.json();

users.get("/", function(req, res){
        
    User.find({}, function(err, users){
 
        if(err) return console.log(err);
        res.send(users)
    });
});
 
users.get("/:id", function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return res.send('Not found');
        res.send(user);
    });
});
    
users.post("/", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const { name, surname, incomeSum } = req.body;
    const user = new User({ name, surname, incomeSum, taxes: [], taxRate: countTaxRate(incomeSum)});
        
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});
     
users.delete("/:id", function(req, res){
         
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
                
        if(err) return console.log(err);
        res.send(user);
    });
});
    
users.put("/", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const { id, name, surname, incomeSum } = req.body;
    const oldUser = User.findOne({_id: id});

    const newUser = { 
        name,
        surname, 
        incomeSum, 
        taxes: oldUser.taxes,
        taxRate: oldUser.incomeSum !== incomeSum ? countTaxRate(incomeSum) : oldUser.taxRate,
    };
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(user);
    });
});

export default users;