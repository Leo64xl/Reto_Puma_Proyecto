import React, {useState, useEffect} from 'react'
import { IoMail, IoLockClosed } from "react-icons/io5"; 
import '../styles/FormEditUser.css'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const FormEditUser = () => {

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [role, setRole] = useState('');    
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
      const getUserById = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/${id}`);
          setName(response.data.name);
          setEmail(response.data.email);          
          setRole(response.data.role);
        } catch (error) {
          if(error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
      getUserById();
    }, [id]);

    const updateUser = async (e) => {
      e.preventDefault();
      try {
          await axios.patch(`http://localhost:5000/users/${id}`, {
            name: name,
            email: email,
            password: password,
            confPassword: confPassword,
            role: role
          });
          navigate('/users');
      } catch (error) {
        if(error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

  return (
    <div>
        <h1 className='title has-text-dark'>Users</h1>
        <h2 className='subtitle'>Update User</h2>
        <div className='card has-text-dark' style={{backgroundColor: '#ffffff'}}>
            <div className='card-content' style={{backgroundColor: '#ffffff'}}>
                <div className='content'>
                <form 
                   onSubmit={updateUser}
                   className='has-text-dark' 
                   style={{backgroundColor: '#ffffff'}}>
                   <p className='has-text-centered'>{msg}</p>
                    <div className="field" style={{backgroundColor: '#ffffff'}}>
                      <label className='label has-text-dark'><IoMail /> Name:</label> 
                      <div className="control">
                        <input 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type='text' 
                          className="input2"
                          placeholder='Name'                                 
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label has-text-dark'><IoMail /> Email:</label> 
                      <div className="control">
                        <input 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type='text' 
                          className="input2"
                          placeholder='Email'                                 
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label has-text-dark'><IoLockClosed /> Password:</label> 
                      <div className="control">
                        <input 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type='password' 
                          className="input2" 
                          placeholder='******'   
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label has-text-dark'><IoLockClosed />Confirm Password:</label> 
                      <div className="control">
                        <input 
                          value={confPassword}
                          onChange={(e) => setConfPassword(e.target.value)}
                          type='password' 
                          className="input2" 
                          placeholder='******'   
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className='label has-text-dark'><IoLockClosed /> Role:</label> 
                      <div className="control">
                        <div className='selectOptions'>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                        <div className='buttonSave'>
                            <button 
                              type='submit'
                              className='button is-success'>Update User</button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditUser