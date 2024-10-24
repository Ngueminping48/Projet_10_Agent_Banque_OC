import { useEffect, useState } from 'react';
import InputField from '../compnents/InputField';
import AuthButton from '../compnents/AuthButton';
import {
  useSignInMutation,
  useSignUpMutation,
} from '../redux/slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../compnents/spinner/Spinner';
import ErrorMessage from '../compnents/message/ErrorMessage';
import SuccessMessage from '../compnents/message/SuccessMessage';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setSuccesMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signIn, { isLoading: signInLoading, isSuccess: signInSucces }] =
    useSignInMutation();

  const [signUp, { isLoading: signUpLoading, isSuccess: signUpSucces }] =
    useSignUpMutation();

  const handleAuth = async (e, action) => {
    e.preventDefault();
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    if (!email) {
      setErrorMessage('Email est obligatoire');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Email n'est pas valide");
      return;
    }

    if (password.trim() === '') {
      setErrorMessage('Mot de passe est obligatoire');
      return;
    }

    try {
      const response = await action({ email, password }).unwrap();
      if (action === signIn) {
        dispatch(setCredentials({ ...response }));
      } else {
        setSuccesMessage('Connexion envoyé avec success');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    }
  };

  const signInHandler = (e) => handleAuth(e, signIn);
  const signUpHandler = (e) => handleAuth(e, signUp);

  useEffect(() => {
    if (!signInLoading && signInSucces) {
      navigate('/profile');
      window.location.reload();
    }
  }, [signInSucces]);

  return (
    <main className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        {succesMessage && <SuccessMessage message={succesMessage} />}
        <form>
          <InputField
            value={email}
            setValue={setEmail}
            label='Email'
            type='text'
            id='email'
          />

          <InputField
            value={password}
            setValue={setPassword}
            label='Password'
            type='password'
            id='password'
          />

          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label for='remember-me'>Remember me</label>
          </div>
          {signInLoading || signUpLoading ? (
            <Spinner />
          ) : (
            <>
              <AuthButton onClick={signInHandler} text='Sign In' />
              <AuthButton onClick={signUpHandler} text='Sign Up' />
            </>
          )}

          {errorMessage && <ErrorMessage message={errorMessage} />}
        </form>
      </section>
    </main>
  );
};

export default Auth;
