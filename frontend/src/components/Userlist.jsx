import React, {useState, useEffect} from "react";
import "../styles/Userlist.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoBrush, IoTrash, IoPersonAddSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const {user} = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);   
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this User?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${uuid}`);
        setMsg('User deleted successfully.');
        setUsers(users.filter(user => user.uuid !== uuid)); 
        setTimeout(() => setMsg(''), 2500); 
      } catch (error) {
        setMsg('Failed to delete the User.');
        setTimeout(() => setMsg(''), 3000); 
      }
    }
  };

  return (
    <div>
      <h1 className="titleUsers">Users</h1>
      <h2 className="subtitleUsers">Control Users</h2>
      <Link to="/users/add" className="buttonAdd" >Add User <IoPersonAddSharp /></Link>
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
                  onClick={()=> handleDelete(user.uuid)} 
                  className="buttonDelete">Delete<IoTrash />
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <div className="notification is-success">{msg}</div>}            
    </div>
  );
};

export default Userlist;
