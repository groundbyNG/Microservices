import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { api } from '../constants';
import './Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [passportId, setPassportId] = useState('');

  const history = useHistory();

  const handlePassword = (event) => setPassword(event.target.value);
  const handlePassportId = (event) => setPassportId(event.target.value);

  useEffect(() => {
    localStorage.token && history.replace('/transaction');
  }, []);


  const onSignIn = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passportId,
          password
        }),
      }
      const response = await fetch(`${api}/signin`, options);
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
        <form onSubmit={onSignIn}>
          <h3>Welcome!</h3> 
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
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
          <div className="form-group">
            New user?<Link to="/signup"> Sign up!</Link>
          </div>
        </form>
  );
}

export default Login;
