import "./login.scss"
import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/authContext/AuthContext"
import { login } from "../../context/authContext/ApiCalls"
import SyncIcon from '@mui/icons-material/Sync';

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const { isFetching, dispatch } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    let inputFN = document.getElementsByClassName("emailInput")[0]
    let inputPW = document.getElementsByClassName("passwordInput")[0]
    
    if (email && password ) {
      document.getElementsByClassName("textLogin")[0].innerHTML = ""
      document.getElementsByClassName("icnSpinner")[0].style = "display: inherit; margin: -10px;"
      login({ email, password }, dispatch)
    } else {
      email ? inputFN.style.border = "1px solid gray" : inputFN.style.border = "2px solid red"
      password ? inputPW.style.border = "1px solid gray" : inputPW.style.border = "2px solid red"
      document.getElementsByClassName("textLogin")[0].innerHTML = "LOGIN"
      document.getElementsByClassName("icnSpinner")[0].style = "display: none; margin: auto;"
    }

  }

  return (
      <div className="login">
        <form className="loginContainer">
          <h3 className="mb-5">Sign in</h3>
          <input className="emailInput" type="text" placeholder="Full Name" onChange={(e) => setemail(e.target.value)} />
          <input className="passwordInput" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="btn-login" onClick={handleLogin} disabled={isFetching}>
            <span className="textLogin">LOGIN</span>
            <span className="loadingLogin"><SyncIcon className="icnSpinner" /></span>
          </button>
          <hr className="my-4"></hr>
          <span className="msgLogin"></span>
        </form>
      </div>
  )
}

export default Login