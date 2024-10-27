import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoAddCircle, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import "../styles/FormView.css";

const FormView = () => {
    const [forms, setForms] = useState([]);
    const {form} = useSelector((state) => state.auth);
    const [msg , setMsg] = useState("");
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        getForms();
    }, []);

    const getForms = async () => {
        const response = await axios.get("http://localhost:5000/forms");
        setForms(response.data);
    };

    const handleDelete = async (uuid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Register?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/forms/${uuid}`);
                setMsg('Register deleted successfully.');
                setForms(forms.filter(form => form.uuid !== uuid)); 
                setTimeout(() => setMsg(''), 2500); 
            } catch (error) {
                setMsg('Failed to delete the Register.');
                setTimeout(() => setMsg(''), 3000); 
            }
        }
    };

  return (
    <div>
      <h1 className="titleUsers">Forms</h1>
      {user && user.role === 'admin' && (
        <>
          <h2 className="subtitleUsers">List Complete Admin</h2>
        </>
      )}

      {user && user.role === 'user' && (
        <>
          <h2 className="subtitleUsers">List of my Registers</h2>
        </>
      )}
      <Link to="/forms/register/add" className="buttonAdd" >Add New Register <IoAddCircle /></Link>
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
              <td>{index+1}</td>              
              <td>{form.nameUser}</td>
              <td>{form.category1}</td>
              <td>{form.team}</td>
              <td>
              {user && (user.role === 'admin' || form.creatorId === 'user') && (
                <>
                  <Link to={`/forms/register/edit/${form.uuid}`} className="buttonEdit">Edit Register</Link>
                  <button onClick={() => handleDelete(form.uuid)} className="buttonDelete"><IoTrash /></button>
                </>
              )}
              {user && (user.role === 'user' || form.creatorId === 'admin') && (
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
  )
}

export default FormView