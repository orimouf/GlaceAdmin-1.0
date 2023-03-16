import React from 'react'
import "./new.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// import { useState } from "react";
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import Goback from "../../components/goback/Goback";
import { addYears, addDays, addMonths } from 'date-fns'

const New = ({ inputs, title }) => {

  // const [ file, setFile ] = useState("")
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken  

  const handleSubmit = async (e) => {
    e.preventDefault()
    let jsonData = {}

    title === "User" ? 
      jsonData = {
        fullName: e.target[0].value,
        email: e.target[1].value,
        password: e.target[3].value,
        country: e.target[2].value,
        isAdmin: e.target[4].checked,
      } : 
      jsonData = {
        fullName: e.target[1].value,
        telegram: e.target[3].value,
        binanceHash: e.target[0].value,
        binanceEmail: e.target[2].value,
        capitalAmount: e.target[4].value,
      }

    if (e.target[0].value && e.target[1].value && e.target[2].value && e.target[3].value && e.target[4].value ) {
      if (title === "User") { 
        e.target[5].style = "pointer-events: none; opacity: 0.7;"
        e.target[5].children[0].style.display = "none"
        e.target[5].children[1].style.display = "block"

        await axios.post(`../auth/register`, jsonData, {
          headers: { token: `Bearer ${accessTokenObj}`}
        })
        .then(res => {
          const persons = res.data;
          document.getElementById("msgRequest").style.display = "none"       
          // popup msg in 4s
          TopPopUpMsg(4, `User ${persons.fullName} is added successfully.`)
          e.target.reset()
        
        }) 
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.code === 11000) {
              document.getElementById("msgRequest").style.display = "block"
              document.getElementById("msgRequest").innerHTML = `This <b>${Object.keys(error.response.data.keyValue)[0]}</b> already exist!`
            }
          }
        });
        e.target[5].style = ""
        e.target[5].children[0].style.display = "block"
        e.target[5].children[1].style.display = "none"
      } else {
        e.target[5].style = "pointer-events: none; opacity: 0.7;"
        e.target[5].children[0].style.display = "none"
        e.target[5].children[1].style.display = "block"

        await axios.post(`../investors`, jsonData, {
          headers: { token: `Bearer ${accessTokenObj}`}
        })
        .then(async (res) => {
          const persons = res.data;
          document.getElementById("msgRequest").style.display = "none"       
          // popup msg in 4s
          TopPopUpMsg(4, `Investor ${persons.fullName} is added successfully.`)
          // make package for this investor
          const date = new Date()
          const startDate = addDays(new Date(date), 2)
          const packageData = {
            investorId: persons._id,
            PaymentMethod: "Binance",
            myWithdrawal: 0,
            myWithdrawalAmount: 0,
            currentYear: 1,
            capitalLock: true,
            depositDate: date,
            startDate: startDate,
            nextProfitDate: addMonths(new Date(startDate), 1),
            capitalUnLockDate: addYears(new Date(startDate), 1),
            profit:[]
          }
          // { 
          //   id: `0${(date.getMonth()+1)}${date.getFullYear()}`, 
          //   year: date.getFullYear().toString(),
          //   month: months[date.getMonth()].toString(), 
          //   porcentage: 0, 
          //   checkinSend: false 
          // }

          await axios.post(`../packages`, packageData, {
            headers: { token: `Bearer ${accessTokenObj}`}
          })
          .then(res => {
            // const newPackage = res.data;
            document.getElementById("msgRequest").style.display = "none"       
            // popup msg in 4s
            TopPopUpMsg(4, `Package for ${persons.fullName} is added successfully.`)
          }).catch(function (error) {
            if (error.response) {
              if (error.response.data.code === 11000) {
                document.getElementById("msgRequest").style.display = "block"
                document.getElementById("msgRequest").innerHTML = `This <b>${Object.keys(error.response.data.keyValue)[0]}</b> already exist!`
              }
            }
          });
          e.target.reset()
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.code === 11000) {
              document.getElementById("msgRequest").style.display = "block"
              document.getElementById("msgRequest").innerHTML = `This <b>${Object.keys(error.response.data.keyValue)[0]}</b> already exist!`
            }
          }
        });
        e.target[5].style = ""
        e.target[5].children[0].style.display = "block"
        e.target[5].children[1].style.display = "none"
      } 
  
    } else {
      e.target[0].value ? e.target[0].style.borderBottom = "1px solid gray" : e.target[0].style.borderBottom = "2px solid red"
      e.target[1].value ? e.target[1].style.borderBottom = "1px solid gray" : e.target[1].style.borderBottom = "2px solid red"
      e.target[2].value ? e.target[2].style.borderBottom = "1px solid gray" : e.target[2].style.borderBottom = "2px solid red"
      e.target[3].value ? e.target[3].style.borderBottom = "1px solid gray" : e.target[3].style.borderBottom = "2px solid red"
      e.target[4].value ? e.target[4].style.borderBottom = "1px solid gray" : e.target[4].style.borderBottom = "2px solid red"
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Goback className="topBack" title={<h1>Add New {title}</h1>} btn={<div></div>} />
        </div>
        <div className="bottom">
          <div className="left">
            <img 
            src={//file ? URL.createObjectURL(file) :
               "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id936182806?k=20&m=936182806&s=612x612&w=0&h=pTQbzaZhCTxWEDhnJlCS2gj65S926ABahbFCy5Np0jg="}
            alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* <div className="formInput">
                <label htmlFor="file"> Image  <AddPhotoAlternateOutlinedIcon className="icon" /></label>
                <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{ display: "none" }}/>
              </div> */}

              {inputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} />
                  </div>
                )
              })}

              {title === "User" && 
                // return (
                  <div className="formInput checkbox">
                    <div className="checkbox">
                      <input type="checkbox" id="checkboxAdmin" name="checkboxAdmin" value="Admin"></input>
                      <label>Is Admin</label>
                    </div> 
                  </div>
                // )
              }
              <div className="formInput"><span id="msgRequest"></span></div>
              

              <div className="formInput">
                <button className="sendBtn">
                  <b>Send</b> 
                  <div><SyncIcon className="icnSpinner" /></div></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New