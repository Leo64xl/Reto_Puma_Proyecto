import React, {useEffect} from 'react'
import Layout from './Layout';
import FormView from '../components/FormView';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
 

const Forms = () => {
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
    if(user && user.role !== 'user'){
      navigate("/forms/view/admin");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <FormView/>
    </Layout>
  )
}

export default Forms