import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Footer from '../compnents/Footer';
import Auth from '../pages/Auth';
import User from '../pages/User';
import Nav from '../compnents/nav/Nav';
import IsLogin from '../compnents/IsLogin';

const Routers = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} exact={true} />
        <Route path='/login' element={<Auth />} exact={true} />
        <Route
          path='/profile'
          element={
            <IsLogin>
              <User />
            </IsLogin>
          }
          exact={true}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default Routers;
