import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useParams, useHistory } from "react-router-dom";
import { api } from '../constants';
import './User.css';

function UserChange({ method }) {
  const [isLoading, setStatus] = useState(true);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [incomeSum, setIncomeSum] = useState('');
  const [passportId, setPassportId] = useState('');

  const history = useHistory();
  const { userId } = useParams();

  useEffect(() => {
    method === "change" && (async function func() {
      try {
        const response = await fetch(`${api}/users/${userId}`, { method: 'GET' });
        const { passportId, name, surname, incomeSum } = await response.json();
        setName(name);
        setSurname(surname);
        setIncomeSum(incomeSum);
        setPassportId(passportId);
        setStatus(false);
      } catch (err) { console.log(err); }
    })()
  }, []);

  const handleName = (event) => setName(event.target.value);
  const handleSurname = (event) => setSurname(event.target.value);
  const handleIncomeSum = (event) => setIncomeSum(event.target.value);
  const handlePassportId = (event) => setPassportId(event.target.value);


  const onChangeUser = async (e) => {
    e.preventDefault();

    try {
      let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passportId,
          name,
          surname,
          incomeSum
        }),
      }
      if (method === "change") {
        options.method = "PUT";
        options.body = JSON.stringify({
          passportId,
          name,
          surname,
          incomeSum
        });
      }
      
      const response = await fetch(`${api}/users`, options);
      const result = await response.json();
      result && history.replace('/');
    } catch (err) { console.log(err); }
  }
  
  return (
    <>
        {method === "change" && isLoading ? (
          <PacmanLoader color={'#36D7B7'} />
        ) : (
        <form onSubmit={onChangeUser}>
          <h3>{method === "change" ? 'Modify' : 'Create new'} taxpayer</h3> 
          <br/>
          <div className="form-group">
            <label htmlFor="passportId">Passport ID</label>
            <input disabled={method === "change"} type="text" className="form-control" required value={passportId} id="passportId" onChange={handlePassportId} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" required value={name} id="name" onChange={handleName} placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control" required value={surname} onChange={handleSurname} id="surname" placeholder="Enter surname" />
          </div>
          <div className="form-group">
            <label htmlFor="incomeSum">Income sum</label>
            <div className="d-flex justify-content-center align-items-center">
              <input type="number" className="form-control" required value={incomeSum} onChange={handleIncomeSum} id="incomeSum" placeholder="Enter income sum" />$
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{method === "change" ? 'Modify' : 'Create'}</button>
        </form>
      )}
    </>
  );
}

export default UserChange;
