import React, {useState, useEffect} from 'react'
import { IoMail, IoShirt, IoPeople, IoCall, IoLocation, IoTrophy, IoPerson, IoCalendar, IoList, IoBag, IoArrowBack } from 'react-icons/io5';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

//formulario donde se visualizan productos por admin

const FormAdmin = () => {
 
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

  return (
    <div>
        <h1 className='title has-text-dark'>Register</h1>
        <h2 className='subtitle mt-2'>Details of {nameUser} | {nameForm}</h2>
        <div className='card has-text-dark' style={{backgroundColor: '#ffffff'}}>
            <div className='card-content' style={{backgroundColor: '#ffffff'}}>
                <div className='content'>
                <form                 
                  className='has-text-dark' 
                  style={{backgroundColor: '#ffffff'}}>
                  <p className='has-text-centered'>{msg}</p>
                <div className="field" style={{backgroundColor: '#ffffff'}}>
                  <label className='label has-text-dark'><IoTrophy /> Name Of Competition:</label> 
                  <div className="control">
                    <input 
                      type='text'                                           
                      className="input2"
                      value={nameForm}
                      disabled                                
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
                      className="input2"                      
                      value={nameUser}
                      disabled
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
                      className="input2"                      
                      value={nameUser2}
                      disabled
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
                      className="input2"                       
                      value={lastnameone}
                      disabled                               
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
                      className="input2"                      
                      value={lastnametwo}
                      disabled                              
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoCalendar /> Birthdate:
                  </label> 
                  <div className="control">
                    <input 
                      type='text'                                             
                      className="input2"                      
                      value={birthday}
                      disabled                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoList /> Category:
                  </label> 
                  <div className="control">
                      <input
                        type='text' 
                        className="input2"                       
                        value={category1}
                        disabled
                      />                     
                      </div>
                  </div>                

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoBag /> Type of kit:
                  </label> 
                  <div className="control">                  
                      <input
                        type='text' 
                        className="input2"                       
                        value={typekit}
                        disabled
                      />                    
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoShirt /> Talla:
                  </label> 
                  <div className="control">
                    <input 
                      type='text' 
                      className="input2"                       
                      value={talla}
                      disabled                               
                    />
                  </div>
                </div>

                <div className="field">
                  <label 
                    className='label has-text-dark'><IoPeople /> Team:
                  </label> 
                  <div className="control">
                    <input 
                      type='text'                      
                      className="input2"                       
                      value={team}
                      disabled                               
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
                      disabled                      
                      className="input2"                       
                      value={phone}                                                     
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
                      value={email}
                      disabled                              
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
                      disabled  
                      value={origin}                                                    
                    />
                  </div>
                </div>                          
                     <Link to="/forms/view/admin" className="buttonAdd mt-2" ><IoArrowBack /> Return Page</Link>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAdmin