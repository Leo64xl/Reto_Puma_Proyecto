import React, {useEffect} from 'react'
import Layout from './Layout'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import FormAddAD from '../components/FormAddAD';

const AddAdvert = () => {
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
      if(user && user.role !== 'admin'){
        navigate("/dashboard");
      }
    }, [isError, user, navigate]);

  return (
    <Layout>
        <FormAddAD/>
    </Layout> 
  )
}

export default AddAdvert