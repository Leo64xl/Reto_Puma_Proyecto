import React, { useEffect } from 'react';
import LayoutWithoutSidebar from './LayoutWithoutSidebar';
import Welcome from '../components/Welcome';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Dashboards = () => {
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
    <LayoutWithoutSidebar>
     <Welcome/>
    </LayoutWithoutSidebar> 
  )
}

export default Dashboards