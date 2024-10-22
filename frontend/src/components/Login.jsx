import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";
import "../styles/Login.css"; 
import { IoMail, IoLockClosed, IoLogIn } from "react-icons/io5"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector(
      (state) => state.auth
    );

    useEffect(() =>{
      if(user || isSuccess){
        navigate("/dashboard");
      }
      dispatch(reset());
    },[user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
      e.preventDefault();
      dispatch(LoginUser({email, password}));
    };

  return (
    <section className="hero has-background-grey-light is-fullwidht" style={{ padding: '91px' }}>
      <div className="hero-body">
        <div className="container" style={{minHeight: "58vh"}}>
          <div className="columns is-centered">
            <div className="column is-4">             
              <form 
                onSubmit={Auth}
                className='box has-background-light has-text-dark'
              >              
              <h1 className='has title has-text-dark'>Sign In</h1>
                <div className="field">
                  <label className='label has-text-dark'><IoMail /> Email:</label> 
                  <div className="control">
                    <input 
                      type='text' 
                      className="input2"
                      required
                      value={email}                  
                      onChange={(e) => setEmail(e.target.value)}  
                      placeholder='Email'             
                    />
                  </div>
                </div>
                <div className="field">
                  <label className='label has-text-dark'><IoLockClosed /> Password:</label> 
                  <div className="control">
                    <input 
                      type='password' 
                      className="input2" 
                      required
                      value={password}                  
                      onChange={(e) => setPassword(e.target.value)}  
                      placeholder='******'   
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button 
                    type='submit' 
                    className='button is-success is-fullwidth has-text-light'
                    >
                      {isLoading ? 'Succesfulled' : Login} Login <IoLogIn />
                  </button>
                  <div 
                      className='loadingMsg'>
                       { isError && <p className='has-text-centered'>{message}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;