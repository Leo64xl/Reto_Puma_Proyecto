import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoAddCircle, IoTrash, IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import "../styles/FormView.css";

const FormView = () => {
  const [forms, setForms] = useState([]);
  const [userForms, setUserForms] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getForms();
  }, [user]);

  const getForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forms");
      setForms(response.data);
      if (user && user.role === 'user') {
        const userForms = response.data.filter(form => form.userId === user.id);
        setUserForms(userForms);
      }
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Register?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/forms/${uuid}`);
        setMsg('Register deleted successfully.');
        setForms(forms.filter(form => form.uuid !== uuid));
        if (user && user.role === 'user') {
          setUserForms(userForms.filter(form => form.uuid !== uuid));
        }
        setTimeout(() => setMsg(''), 2500);
      } catch (error) {
        setMsg('Failed to delete the Register.');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  return (
    <div>
      <h1 className="title has-text-dark mt-1">Register</h1>
      {user && user.role === 'admin' && (
        <>
          <h2 className="subtitle mt-1">List Complete Admin</h2>
        </>
      )}

      {user && user.role === 'user' && (
        <>
          <h2 className="subtitle mt-1">My Register</h2>
        </>
      )}

      {user && user.role === 'user' && userForms.length === 0 && (
        <Link to="/forms/register/add" className="buttonAdd">Add New Register <IoAddCircle /></Link>
      )}

      {user && user.role === 'user' && userForms.length > 0 && (
        <div className="register-message">
           You have already made a register <IoCheckmarkCircle className="checkmark-icon" />
        </div>
      )}

      <div className="designTableUsers">
        <table className="tableDesing2">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Team</th>
              <th>Actions Register</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((form, index) => (
              <tr key={form.uuid}>
                <td>{index + 1}</td>
                <td>{form.nameUser}</td>
                <td>{form.category1}</td>
                <td>{form.team}</td>
                <td>
                  {user && (user.role === 'admin' || form.userId === user.id) && (
                    <>
                      <Link to={`/forms/register/edit/${form.uuid}`} className="buttonEdit">Edit Register</Link>
                      <button onClick={() => handleDelete(form.uuid)} className="buttonDelete"><IoTrash /></button>
                    </>
                  )}
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

export default FormView;