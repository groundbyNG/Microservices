import express from 'express';
import Transaction from '../../models/transaction';
import requiresLogin from '../../middleware/auth';
import { sendTaxRequest } from '../tax';

const transactionRouter = express.Router();
const jsonParser = express.json();

transactionRouter.post("/", requiresLogin, jsonParser, sendTaxRequest, function(req, res){
    const {
        destination,
        amount,
        tax,
    } = req.body;

    const transaction = new Transaction({ 
        destination,
        amount,
        tax,
        passportId: req.session.userId,
        date: new Date(),
    });
    
    transaction.save(function(err){
        if(err) return console.log(err);
        res.sendStatus(400);
    });
});
 
transactionRouter.get("/:id", requiresLogin, function(req, res){
         
    const id = req.params.id;
    Transaction.find({passportId: id}, function(err, transactions){
          
        if(err) return res.send('Not found');
        res.send(transactions);
    });
});
   
export default transactionRouter;