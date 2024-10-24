import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.png';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useEffect } from 'react';

const Nav = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {}, [user]);

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src={logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>

      {user ? (
        <div>
          <Link className='main-nav-item' to='/profile'>
            <i className='fa fa-user-circle'></i>
            Tony
          </Link>
          <Link onClick={logOut} className='main-nav-item' to='/'>
            <i className='fa fa-sign-out'></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className='main-nav-item' to='/login'>
            <i className='fa fa-user-circle'></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
