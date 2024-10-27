import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormCheck.css'
import { IoMail, IoShirt, IoPeople, IoCall, IoLocation, IoTrophy, IoPerson, IoCalendar, IoList, IoBag } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const FormCheck = () => {
  const [nameForm, setNameForm] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [nameUser2, setNameUser2] = useState('');
  const [lastnameone, setLastnameone] = useState('');
  const [lastnametwo, setLastnametwo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [category1, setCategory1] = useState('');
  const [typekit, setTypekit] = useState('');
  const [talla, setTalla] = useState('');
  const [team, setTeam] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [origin, setOrigin] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveForm = async (e) => {
      e.preventDefault();      
      try {
          await axios.post('http://localhost:5000/forms', {
              nameForm: nameForm,
              nameUser: nameUser,
              nameUser2: nameUser2,
              lastnameone: lastnameone,
              lastnametwo: lastnametwo,
              birthday: birthday,
              category1: category1,
              typekit: typekit,
              talla: talla,
              team: team,
              phone: phone,
              email: email,
              origin: origin,
          });
          navigate('/forms/register');  /* This is the path to redirect after the form is saved */
      } catch (error) {
          if(error.response) {
          setMsg(error.response.data.msg);
          }
      } 
  };

const {user} = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className='title has-text-dark'>Forms</h1>
        <h2 className='subtitle mt-2'>Create New Register</h2>
        <div className='card has-text-dark' style={{backgroundColor: '#ffffff'}}>
            <div className='card-content' style={{backgroundColor: '#ffffff'}}>
                <div className='content'>
                <form                   
                  onSubmit={saveForm}
                  className='has-text-dark' 
                  style={{backgroundColor: '#ffffff'}}>
                  <p className='has-text-centered'>{msg}</p>
                <div className="field" style={{backgroundColor: '#ffffff'}}>
                  <label className='label has-text-dark'><IoTrophy /> Name Of Competition:</label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required                      
                      className="input2"
                      value={nameForm}
                      onChange={(e) => setNameForm(e.target.value)}
                      placeholder='Name Competition'                                 
                    />
                  </div>
                </div>               
                
                <div className="field">
                  <label 
                    className='label has-text-dark'><IoPerson /> Name:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required
                      className="input2"
                      placeholder='Name'  
                      value={nameUser}
                      onChange={(e) => setNameUser(e.target.value)}                               
                    />
                  </div>
                </div>
                
                <div className="field">
                  <label 
                    className='label has-text-dark'><IoPerson /> Second name:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required
                      className="input2"
                      placeholder='Middle name'  
                      value={nameUser2}
                      onChange={(e) => setNameUser2(e.target.value)}                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoPerson /> Surname:
                  </label> 
                  <div className="control">
                    <input 
                      type='text'
                      required 
                      className="input2"
                      placeholder='First surname'  
                      value={lastnameone}
                      onChange={(e) => setLastnameone(e.target.value)}                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoPerson /> Second surname:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required
                      className="input2"
                      placeholder='Second surname'  
                      value={lastnametwo}
                      onChange={(e) => setLastnametwo(e.target.value)}                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoCalendar /> Birthdate:
                  </label> 
                  <div className="control">
                    <input 
                      type='date' 
                      length='8'
                      required
                      className="input2"                      
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoList /> Category:
                  </label> 
                  <div className="control">
                  <div className='selectOptions3'>
                      <select                      
                        value={category1}
                        required
                        onChange={(e) => setCategory1(e.target.value)}>
                        <option value='Infantil Pañales Femenil'>Infantil Pañales Femenil</option>
                        <option value='Infantil Pañales Varonil'>Infantil Pañales Varonil</option>
                        <option value='Infantil AA Femenil'>Infantil AA Femenil</option>
                        <option value='Infantil AA Varonil'>Infantil AA Varonil</option>
                        <option value='Infantil C Varonil'>Infantil C Varonil</option>
                        <option value='Infantil C Femenil'>Infantil C Femenil</option>
                        <option value='Infantil B Varonil'>Infantil B Varonil</option>
                        <option value='Infantil B Femenil'>Infantil B Femenil</option>
                        <option value='Infantil A Varonil'>Infantil A Varonil</option>
                        <option value='Infantil A Femenil'>Infantil A Femenil</option>
                        <option value='Elite Varonil'>Elite Varonil</option>
                        <option value='Elite Femenil'>Elite Femenil</option>
                        <option value='Varonil Avanzados'>Varonil Avanzados</option>
                        <option value='Master 30 Varonil'>Master 30 Varonil</option>
                        <option value='Master 40 Varonil'>Master 40 Varonil</option>
                        <option value='Juvenil Varonil'>Juvenil Varonil</option>
                        <option value='Master 50'>Master 50</option>
                        <option value='Princiapaintes Libre Varonil'>Princiapaintes Libre Varonil</option>
                        <option value='Femenil Princiapaintes'>Femenil Princiapaintes</option>
                        <option value='Femenil 30'>Femenil 30</option>
                        <option value='Femenil 40'>Femenil 40</option>
                        <option value='Mamuts Varonil'>Mamut's Varonil</option>
                        <option value='Master 60 Varonil'>Master 60 Varonil</option>
                        <option value='Femenil 50'>Femenil 50</option>
                        <option value='Gravel Varonil'>Gravel Varonil</option>
                        <option value='Gravel Femenil'>Gravel Femenil</option>
                        <option value='Rodadores Femenil'>Rodadores Femenil</option>
                        <option value='Rodadores Varonil'>Rodadores Varonil</option>
                        <option value='E-BIKE Mutuo'>E-BIKE Mutuo</option>
                        </select>
                      </div>
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoBag /> Type of kit:
                  </label> 
                  <div className="control">
                  <div className='selectOptions3'>
                      <select                      
                        value={typekit}
                        required
                        onChange={(e) => setTypekit(e.target.value)}>
                        <option value='Kit Asociacion'>Kit Asociacion</option>
                        <option value='Kit Cachorro'>Kit Cachorro</option>
                        <option value='Kit Puma'>Kit Puma</option>
                      </select> 
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoShirt /> Talla:
                  </label> 
                  <div className="control">
                  <div className='selectOptions3'>
                      <select                      
                        value={talla}
                        required
                        onChange={(e) => setTalla(e.target.value)}>
                        <option value='XS'>XS</option>
                        <option value='S'>S</option>
                        <option value='M'>M</option>
                        <option value='G'>G</option>
                        <option value='GX'>GX</option>
                        <option value='GXX'>GXX</option>
                        <option value='GXXX'>GXXX</option>
                      </select> 
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoPeople /> Team:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required
                      className="input2"
                      placeholder='Team'  
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoCall /> Phone Number:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required
                      className="input2"
                      placeholder='+52 Phone Number'  
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}                               
                    />
                  </div>
                </div> 

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoMail /> Email:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      required
                      className="input2"
                      placeholder='Email'  
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}                               
                    />
                  </div>
                </div> 

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoLocation /> Located:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      className="input2"
                      required
                      placeholder='Located'  
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}                               
                    />
                  </div>
                </div>                            
                
                    <div className="field">
                        <div className='buttonSave'>
                            <button 
                              className='button is-success'
                              type='submit'                          
                              >
                                Save Register
                            </button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default FormCheck