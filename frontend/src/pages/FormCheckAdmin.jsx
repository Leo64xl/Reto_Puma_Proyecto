import React, {useEffect} from 'react'
import Layout from './Layout'
import FormAdmin from '../components/FormAdmin'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const FormCheckAdmin = () => {

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
        <FormAdmin/>
    </Layout>
  )
}

export default FormCheckAdmin