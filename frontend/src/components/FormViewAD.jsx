import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoDownload, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import "../styles/FormView.css";

const FormViewAD = () => {
    const [forms, setForms] = useState([]);
    const {form} = useSelector((state) => state.auth);
    const [msg, setMsg] = useState('');

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
    
    const handleDownloadExcel = async () => {
      try {
          const response = await axios.get('http://localhost:5000/download-excel', {
              responseType: 'blob', 
          });

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Forms.xlsx');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
      } catch (error) {
          setMsg('Error downloading Excel file.');
          setTimeout(() => setMsg(''), 3000);
      }
  };

    useEffect(() => {
        getForms();
    }, []);

    const getForms = async () => {
        const response = await axios.get("http://localhost:5000/forms");
        setForms(response.data);
    };
  
  return (
    <div>
      <h1 className="titleUsers">Forms</h1>
      <h2 className="subtitleUsers">List All Registers</h2>
      <button onClick={handleDownloadExcel} className="buttonAdd">Download All Registers <IoDownload /></button>
      <div className="designTableUsers">
        <table className="tableDesing2">
          <thead>
            <tr>
              <th>No</th>              
              <th>Name</th>              
              <th>Last Name</th>              
              <th>Email</th>              
              <th>Phone</th>
              <th>Actions Register</th>
              
            </tr>
          </thead>

          <tbody>
            {forms.map((form, index) => (
              <tr key={form.uuid}>
                <td>{index + 1}</td>              
                <td>{form.nameUser}</td>                
                <td>{form.lastnameone}</td>                
                <td>{form.email}</td>  
                <td>{form.phone}</td>          
                <td>
                  <Link to={`/forms/view/admin/form/${form.uuid}`} className="buttonEdit">View Register</Link>              
                  <button onClick={() => handleDelete(form.uuid)} className="buttonDelete"><IoTrash /></button>
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

export default FormViewAD