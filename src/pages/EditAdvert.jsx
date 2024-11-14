import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditAdvert from '../components/FormEditAdvert'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditAdvert = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.auth);
  
    useEffect(() => {
        dispatch(getMe())
      }, [dispatch]);
    
      useEffect(() => {
        if(isError){
          navigate('/');
        }
        if(user && user.role !== 'admin'){
          navigate("/dashboard");
        }
      }, [isError, user, navigate]);

  return (
    <Layout>
        <FormEditAdvert/>
    </Layout>
  )
}

export default EditAdvert