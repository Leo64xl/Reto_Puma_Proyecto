import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditRegister from '../components/FormEditRegister'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditRegister = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector(state => state.auth);
  
    useEffect(() => {
      dispatch(getMe())
    }, [dispatch]);
    
    useEffect(() => {
      if(isError){
        navigate('/');
        }
    }, [isError, user, navigate]);
  
  return (
    <Layout>
        <FormEditRegister/>
    </Layout>
  )
}

export default EditRegister