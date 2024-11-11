import React, {useEffect} from 'react'
import Layout from './Layout'
import SectionAdvertesiments from '../components/SectionAdvertesiments';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Advertesiments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector(state => state.auth);
  
    useEffect(() => {
      dispatch(getMe())
    }, [dispatch]);
  
    useEffect(() => {
      if(isError){
        navigate('/');
      }
    }, [isError, navigate]);
  return (
    <Layout>
        <SectionAdvertesiments/>
    </Layout>
  )
}

export default Advertesiments