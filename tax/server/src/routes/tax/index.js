import express from 'express';
import User from '../../models/user';

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
        date,
        tax,
     } = req.body;

    User.findOne({_id: userId}, function(err, user){
        if(err) return res.send('User not found');
        const tax = new Tax({
            destination,
            amount,
            date,
            tax,
        });
        user.taxes.push(tax);
        user.save(function(err){
            if(err) {
                console.log(err);
                return res.send('Error to push new tax');
            }
            res.send(tax);
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