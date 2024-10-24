import { accounts } from '../data/data';
import AccountCard from '../compnents/AccountCard';
import { useEffect, useState } from 'react';
import InputField from '../compnents/InputField';
import {
  useGetProfilQuery,
  useUpdateProfilMutation,
} from '../redux/slices/userApiSlice';
import { useSelector } from 'react-redux';
import Spinner from '../compnents/spinner/Spinner';
import ErrorMessage from '../compnents/message/ErrorMessage';
import SuccessMessage from '../compnents/message/SuccessMessage';

const User = () => {
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setSuccesMessage] = useState('');

  const { user } = useSelector((state) => state.auth);
  const token = user?.body?.token;
  const { data, isError, isLoading, isSuccess, refetch } =
    useGetProfilQuery(token);

  const [
    updateProfil,
    {
      isError: updateError,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProfilMutation();

  useEffect(() => {
    if (data && data.body && data.body.userName) {
      setUserName(data.body.userName);
    }
  }, [data && data.body && data.body.userName]);

  useEffect(() => {
    if (!updateLoading && updateSuccess) {
      setTimeout(() => {
        setSuccesMessage('');
      }, 5000);
      setSuccesMessage("Nom d'utilisateur mise a jour avec success");
      refetch();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      setErrorMessage('Error de mise mise jour');
    }
  }, [updateError]);

  const updateProfilHandler = async () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    if (userName.trim() === '') {
      setErrorMessage("Veuillez saisir votre nom d'utilisateur");
      return;
    }

    await updateProfil({ userName, token }).unwrap();
  };

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {userName}!
        </h1>
        <div className='header-input '>
          <InputField
            value={userName}
            setValue={setUserName}
            label='user name'
            type='text'
            id='userName'
          />

          <button onClick={updateProfilHandler} className='edit-button'>
            Edit Name
          </button>
          {updateLoading && <Spinner />}
          {succesMessage && <SuccessMessage message={succesMessage} />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      </div>
      <h2 className='sr-only'>Accounts</h2>

      {accounts.map((account, index) => (
        <AccountCard key={index} {...account} />
      ))}
    </main>
  );
};

export default User;
