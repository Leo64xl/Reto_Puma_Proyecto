import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className='title has-text-dark'>Dashboard</h1>
        <h2 className='subtitle'>
          ¡Welcome Back! {user && user.name}          
        </h2>
        <h1>youtubeapiiframe</h1>
    </div>
  )
}

export default Welcome