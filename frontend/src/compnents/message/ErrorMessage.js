import React from 'react';
import './message.css';

const ErrorMessage = ({ message }) => {
  return <div className='message error'>{message}</div>;
};

export default ErrorMessage;
