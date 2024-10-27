import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { IoMail, IoShirt, IoPeople, IoCall, IoLocation, IoTrophy, IoPerson, IoCalendar, IoList, IoBag, IoSave } from 'react-icons/io5';
import {useNavigate, useParams} from 'react-router-dom'

const FormEditRegister = () => {

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
    const {id} = useParams();

    useEffect(() => {
        const getFormById = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/forms/${id}`);
            setNameForm(response.data.nameForm);
            setNameUser(response.data.nameUser);
            setNameUser2(response.data.nameUser2);
            setLastnameone(response.data.lastnameone);
            setLastnametwo(response.data.lastnametwo);
            setBirthday(response.data.birthday);
            setCategory1(response.data.category1);
            setTypekit(response.data.typekit);
            setTalla(response.data.talla);
            setTeam(response.data.team);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setOrigin(response.data.origin);
            } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
            }
        }
        getFormById();
    }, [id]);

    const updateForm = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/forms/${id}`, {
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
            navigate('/forms/register');
        } catch (error) {
            if(error.response) {
            setMsg(error.response.data.msg);
            }
        }
    }
    
    return (
        <div>
        <h1 className='title has-text-dark'>Register Edit</h1>
        <h2 className='subtitle mt-2'>Personal Data of {nameUser} | {nameForm}</h2>
        <div className='card has-text-dark' style={{backgroundColor: '#ffffff'}}>
            <div className='card-content' style={{backgroundColor: '#ffffff'}}>
                <div className='content'>
                <form                   
                  onSubmit={updateForm}
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
                      placeholder='Form Name'                                 
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
                        <option value='Infantil C varonil'>Infantil C varonil</option>
                        <option value='Infantil C femenil'>Infantil C femenil</option>
                        <option value='Infantil B varonil'>Infantil B varonil</option>
                        <option value='Infantil B femenil'>Infantil B femenil</option>
                        <option value='Infantil A varonil'>Infantil A varonil</option>
                        <option value='Infantil A femenil'>Infantil A femenil</option>
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
                              >Save Changes</button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditRegister