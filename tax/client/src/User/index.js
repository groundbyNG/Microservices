import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useParams } from "react-router-dom";
import { api } from '../constants';
import './User.css';

function User() {
  const [user, setUser] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    (async function func() {
      try {
        const response = await fetch(`${api}/taxes/${userId}`, { method: 'GET' });
        const result = await response.json();
        setUser(result);
      } catch (err) { console.log(err); }
    })()
  }, []);
  
  return (
    <>
      {!user ? (
        <PacmanLoader color={'#36D7B7'} />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Destination number</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Tax</th>
                <th scope="col">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              {
                user.map((taxElem, index) => {
                  const date = new Date(taxElem.date);
                  return(
                    <tr key={taxElem._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{taxElem.destination}</td>
                      <td>{taxElem.amount}$</td>
                      <td>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</td>
                      <td>{taxElem.tax}$</td>
                      <td>{taxElem.taxRate}%</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default User;
