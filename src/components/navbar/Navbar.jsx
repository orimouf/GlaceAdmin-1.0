import React from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import PopupMsg from '../popupmsg/Popupmsg'
// import { AuthContext } from '../../context/authContext/AuthContext';
// import { logout_ } from '../../context/authContext/ApiCalls';

const Navbar = () => {

  const { dispatchMode } = useContext(DarkModeContext)
  // const { dispatch } = useContext(AuthContext);

  // const handleLogout = (e) => {
  //   logout_(dispatch);
  // }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...' />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" onClick={() => dispatchMode({type:"TOGGLE"})} />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg" alt="" className="avatar"/>
          </div>
        </div>
      </div>
      <PopupMsg />
    </div>
  )
}

export default Navbar