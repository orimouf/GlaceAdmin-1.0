import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './style/dark.scss';
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Single from './pages/single/Single'
import New from './pages/new/New'
import List from './pages/list/List'
import Client from './pages/client/Client'
import Order from './pages/order/Order'
import Register from './pages/register/Register';
import Daily from './pages/daily/Daily'
import Error404 from './pages/error404/Error404'
import { investorInputs, userInputs } from './formSource'
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/authContext/AuthContext'
import Package from './pages/package/Package'
import Setprofit from './pages/setprofit/Setprofit'
import Withdrawal from './pages/withdrawal/Withdrawal'
import Pay from './pages/pay/Pay'


function App() {
  
  const { darkMode } = useContext(DarkModeContext)
  const { user } = useContext(AuthContext)

  return (
    <div className={darkMode ? "App dark" : "App"}>
      {/* <div id='popupBox' className='confirmBox'><Confirmbox /></div> */}
      <Routes>
        <Route path='/'>
          <Route index element={user ? <Home /> : <Navigate to="/login" /> } />
          <Route path='login' element={user ? <Navigate to="/" /> : <Login />} />
          {(user &&
          <>
            <Route path='*' element={<Error404 />}/>
            <Route path='users'>
              <Route index element={<List title="Users" />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<New inputs={userInputs} title="User" />} />
            </Route>
            <Route path='clients'>
              <Route index element={<Client title="Clients" />} />
              <Route path=':clientId' element={<Package />} />
              <Route path='new' element={<New inputs={investorInputs} title="Client" />} />
            </Route>
            <Route path='register'>
              <Route index element={<Register title="Register" />} />
              <Route path=':orderId' element={<Package />} />
              <Route path='new' element={<New inputs={investorInputs} title="Register" />} />
            </Route>
            <Route path='orders'>
              <Route index element={<Order title="Orders" />} />
              <Route path=':orderId' element={<Package />} />
              <Route path='new' element={<New inputs={investorInputs} title="Order" />} />
            </Route>
            <Route path='daily'>
              <Route index element={<Daily title="Daily" />} />
              <Route path=':dailyId' element={<Package />} />
              <Route path='new' element={<New inputs={investorInputs} title="Daily" />} />
            </Route>
            <Route path='setprofit'>
              <Route index element={<Setprofit title="setprofit" />} />
            </Route>
            <Route path='withdrawal'>
              <Route index element={<Withdrawal title="Withdrawal" />} />
            </Route>
            <Route path='pay'>
              <Route index element={<Pay title="Pay" />} />
            </Route>
          </>)
          || <Route path='*' element={<Error404 />}/> }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
