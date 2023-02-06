import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/login/register';
import { Login } from './components/login/login';
import { Forgotpassword } from './components/login/forgotpassword';
import Verification from './components/login/verification';
import ChangePassword from './components/login/changepassword';
import Activation from './components/login/Activation';
import { UserProvider } from './context/UserContext';
import Portal from './Portal';

import CreateLink from './components/shortlinks/createlink';
import { Urldirect } from './components/shortlinks/Urldirect';
import { ListUrl } from './components/shortlinks/listUrl';



function App() {
  return (

    <BrowserRouter>

      <ToastContainer theme="dark" />
      <UserProvider>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/user/activation/:userId" element={<Activation />} />
          <Route path='/ForgotPassword' element={<Forgotpassword />} />
          <Route path='/Verification' element={<Verification />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          <Route path='/Portal' element={<Portal />}>
            <Route path="shortlink" element={<CreateLink />} />
            <Route path="listurl" element={<ListUrl />} />
          </Route>
          <Route path="/:userid" element={<Urldirect />} />


        </Routes>

      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

