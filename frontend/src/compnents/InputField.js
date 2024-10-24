import React from 'react';

const InputField = ({ type, label, value, setValue }) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        id={label}
      />
    </div>
  );
};

export default InputField;
