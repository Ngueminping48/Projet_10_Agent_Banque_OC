const AuthButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='sign-in-button'>
      {text}{' '}
    </button>
  );
};

export default AuthButton;
