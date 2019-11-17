import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { PacmanLoader } from 'react-spinners';
import { api } from '../constants';
import './Transaction.css';

function Transaction() {
  const [status, setStatus] = useState('taxDefining');
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [tax, setTax] = useState(0);
  const [taxProcent, setTaxProcent] = useState(0);
  const history = useHistory();

  const handleDestination = (event) => setDestination(event.target.value);
  const handleAmount = (event) => setAmount(event.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'taxDefining') {
      try {
        setStatus('loading');
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${localStorage.token}` },
        }
        const response = await fetch(`${api}/tax`, options);
        const { taxRate } = await response.json();
        setStatus('confirmOperation');
        setTax((taxRate / 100 * amount).toFixed());
        setTaxProcent(taxRate);
      } catch (err) { console.log(err); }
    } else {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${localStorage.token}` },
          body: JSON.stringify({
            destination,
            amount,
            tax
          }),
        }
        const response = await fetch(`${api}/transaction`, options);
        const { status } = await response.json();
        if (status === 200) {
          setStatus('taxDefining');
          setStatus('');
          setDestination('');
          setAmount('');
          setTax('');
          setTaxProcent('');
          alert('Success');
        }
      } catch (err) { console.log(err); }
    }
  }

  const onLogout = () => {
    localStorage.clear();
    history.replace('/');
  }
  
  return (
    <>
        <form onSubmit={onSubmit}>
          <h3>Transfer to account</h3> 
          <br/>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" className="form-control" required value={destination} id="destination" onChange={handleDestination} />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <div className="d-flex justify-content-center align-items-center">
              <input type="number" className="form-control" required value={amount} onChange={handleAmount} id="amount" placeholder="Enter amount" />$
            </div>
          </div>
          {
            status === 'confirmOperation' && (
              <>
                <div className="form-group">
                  <p>Tax procent: {taxProcent}%</p>
                </div>
                <div className="form-group">
                  <p>Tax: {tax}$</p>
                </div>
              </>
            )
          }
          {
            status === 'loading' ? (
              <PacmanLoader color={'#36D7B7'} />
            ) : (
              <button type="submit" className="btn btn-primary">
                {status === 'confirmOperation' ? 'Confirm' : 'Continue'}
              </button>
            )
          }
          
        </form>
        <button className="logout btn btn-info" onClick={onLogout}>Logout</button>
    </>
  );
}

export default Transaction;
