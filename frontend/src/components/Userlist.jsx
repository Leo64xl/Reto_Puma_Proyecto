import React, {useState, useEffect} from "react";
import "../styles/Userlist.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoBrush, IoTrash, IoAddCircle, IoHome } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Userlist = () => {
  const [users, setUsers] = useState([]);
    const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);   
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };
  return (
    <div>
      <h1 className="titleUsers">Users</h1>
      <h2 className="subtitleUsers">List of Users</h2>
      <Link to="/users/add" className="buttonAdd" >Add New <IoAddCircle /></Link>
      <div className="designTableUsers">
        <table className="tableDesing">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.uuid}`} className="buttonEdit">Edit<IoBrush /></Link>
                <button 
                  onClick={()=> deleteUser(user.uuid)} 
                  className="buttonDelete">Delete<IoTrash />
                </button>
              </td>
            </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Userlist;
