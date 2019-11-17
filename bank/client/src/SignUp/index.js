import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { api } from '../constants';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passportId, setPassportId] = useState('');

  const history = useHistory();

  const handleName = (event) => setName(event.target.value);
  const handleSurname = (event) => setSurname(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handlePassportId = (event) => setPassportId(event.target.value);

  useEffect(() => {
    localStorage.passportId && history.replace('/transaction');
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passportId,
          name,
          surname,
          password
        }),
      }
      const response = await fetch(`${api}/signup`, options);
      const { err, token } = await response.json();
      if (!err) {
        localStorage.token = token;
        history.replace('/transaction');
      } else {
        alert(err);
      }
    } catch (err) { console.log(err); }
  }
  
  return (
        <form onSubmit={onSignUp}>
          <h3>Fullfill form below: </h3> 
          <br/>
          <div className="form-group">
            <label htmlFor="passportId">Passport ID</label>
            <input type="text" className="form-control" required value={passportId} id="passportId" onChange={handlePassportId} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" required value={password} onChange={handlePassword} id="password" placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" required value={name} id="name" onChange={handleName} placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control" required value={surname} onChange={handleSurname} id="surname" placeholder="Enter surname" />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
  );
}

export default SignUp;
