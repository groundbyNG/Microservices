import express from 'express';
import axios from 'axios';
import requiresLogin from '../../middleware/auth';

export const taxRouter = express.Router();

export const sendUserCreateRequest = (req, res, next) => {
    const {
        passportId,
        name,
        surname,
    } = req.body;
    axios.post(
        `http://localhost:8787/api/users/`, 
        JSON.stringify({
            passportId, name, surname, incomeSum: 0
        }),
        {headers: {'Content-Type': 'application/json'}}
    )
    .then((response) => {
        console.log('Tax created user', response.status);
        next();
    })
    .catch((error) => {
        next(error);
    })
}

export const sendTaxRequest = (req, res, next) => {
    const {
        destination,
        amount,
        tax,
    } = req.body;
    axios.post(
        `http://localhost:8787/api/taxes/${req.session.userId}`, 
        JSON.stringify({
            destination,
            amount,
            tax,
        }),
        {headers: {'Content-Type': 'application/json'}}
    )
    .then((response) => {
        console.log('Tax saved transaction', response.status);
        next();
    })
    .catch((error) => {
        next(error);
    })
}

taxRouter.get("/", requiresLogin, function(req, res){
    axios.get(`http://localhost:8787/api/taxes/${req.session.userId}/taxRate`)
    .then((response) => {
        console.log(response);
        res.send(200);
    })
});