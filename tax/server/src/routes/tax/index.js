import express from 'express';
import User from '../../models/user';
import Tax from '../../models/tax';

const tax = express.Router();
const jsonParser = express.json();
 
tax.get("/:id", function(req, res){
         
    const userId = req.params.id;
    User.findOne({_id: userId}, function(err, user){
          
        if(err) return res.send('User not found');
        res.send(user.taxes);
    });
});

tax.post("/:id", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        console.log(req.body);
    
    const userId = req.params.id;    
    const { 
        destination,
        amount,
        tax,
     } = req.body;

    User.findOne({_id: userId}, function(err, user){
        if(err) return res.send('User not found');
        const newTax = new Tax({
            destination,
            amount,
            date: new Date(),
            tax,
            taxRate: user.taxRate,
        });
        user.taxes.push(newTax);
        user.save(function(err){
            if(err) {
                console.log(err);
                return res.send('Error to push new tax');
            }
            res.send(newTax);
        });   
    });
});

tax.get("/:id/taxRate", function(req, res){
         
    const userId = req.params.id;
    User.findOne({_id: userId}, function(err, user){
          
        if(err) return res.send('User not found');
        res.send(user.taxRate);
    });
});


export default tax;