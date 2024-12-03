import React, {useEffect} from 'react'
import Layout from './Layout'
import MyAccountMore from '../components/MyAccountMore'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/products");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <MyAccountMore/>
    </Layout>
  )
}

export default AccountDetails