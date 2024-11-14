import React, {useEffect} from 'react'
import Layout from './Layout'
import FormViewAD from '../components/FormViewAD'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const FormControl = () => {
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
      navigate("/forms/register");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <FormViewAD/>
    </Layout>
  )
}

export default FormControl