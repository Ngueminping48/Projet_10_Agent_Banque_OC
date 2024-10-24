import React from 'react';
import './message.css';
const SuccessMessage = ({ message }) => {
  return <div className='message success'>{message}</div>;
};

export default SuccessMessage;
