import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import { api } from '../constants';
import './Home.css';

function Home() {
  const [users, setUsers] = useState(false);

  useEffect(() => { getUsers(); }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(`${api}/users`, { method: 'GET' });
      const result = await response.json();
      setUsers(result);
    } catch (err) { console.log(err); }
  }

  const onRemoveUser = async(userId) => {
    try {
      await fetch(`${api}/users/${userId}`, { method: 'DELETE' });
      await getUsers();
    } catch (err) { console.log(err); }
  }

  return (
    <>
      {!users ? (
        <PacmanLoader color={'#36D7B7'} />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Income Sum</th>
                <th scope="col">Tax Rate</th>
                <th scope="col">Taxes</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return(
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.incomeSum}$</td>
                      <td>{user.taxRate}%</td>
                      <td><Link to={`/user/${user._id}`}>{user.taxes.length}</Link></td>
                      <td>
                        <Link to={`/change/${user._id}`}>
                          <button type="button" className="btn btn-warning btn-sm">Modify</button>
                        </Link>
                        <button type="button" onClick={() => {onRemoveUser(user._id)}} className="btn btn-danger btn-sm">Remove</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Link to="/add"><button type="button" className="btn btn-info">Add</button></Link>
        </div>
      )}
    </>
  );
}

export default Home;
