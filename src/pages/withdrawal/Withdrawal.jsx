import React from 'react'
import "./withdrawal.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios'
import { withdrawalColumns } from "../../datatablesource"
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from "react"
import { addMonths } from 'date-fns'
import { DateForma } from "../../function/dateForma"
import SyncIcon from '@mui/icons-material/Sync';
import Goback from "../../components/goback/Goback"

const Withdrawal = () => {
    const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
    const [ arrayData, setArrayData ] = useState([])
    const [ weekEnd, setWeekEnd ] = useState([])
    const [ weekStart, setWeekStart ] = useState([])

    useEffect(function () {
        
        const fetchInvesterData = async () => {
          await axios.get(`../packages/`, {
              headers: { token: `Bearer ${accessTokenObj}` }
          })
          .then(res => {
              let notEmpty = false
              const data = res.data  
              const filterData = data.filter(e => {
                e.profit.filter((ele, i) => {
                  const start = Date.parse( DateForma(weekStart, "FM") )
                  const end = Date.parse( DateForma(weekEnd, "FM") )
                  const thisDate = Date.parse( DateForma(addMonths(new Date(e.startDate), i+1).toISOString(), "DB") )
                  if(thisDate >= start && thisDate <= end){
                    document.getElementById("msgRequest").style.display = "none"
                    document.getElementById("msgRequest").innerHTML = ""
                    notEmpty = true
                    const Obj = {
                      id: ele.id,
                      profitPorcent: ele.porcentage,
                      date: DateForma(addMonths(new Date(e.startDate), i+1).toISOString(), "DB"),
                      status: (data.checkinSend) ? "Sended" : "Pending",
                    }
                    setArrayData(arrayData => [...arrayData, Obj].flat())
                    document.getElementsByClassName("weeklyWithdrawal")[0].style = "opacity: 1;"
                    document.getElementsByClassName("weeklyWithdrawal")[0].children[0].style.display = "block"
                    document.getElementsByClassName("weeklyWithdrawal")[0].children[1].style.display = "none"
                    setWeekEnd([])
                    setWeekStart([])
                  }
                })
                
              })
              if (!notEmpty) {
                document.getElementById("msgRequest").style.display = "block"
                document.getElementById("msgRequest").innerHTML = `No Profit to withdrawal in this <b> Time Period</b>`
                document.getElementsByClassName("weeklyWithdrawal")[0].style = "opacity: 1;"
                document.getElementsByClassName("weeklyWithdrawal")[0].children[0].style.display = "block"
                document.getElementsByClassName("weeklyWithdrawal")[0].children[1].style.display = "none"
                setWeekEnd([])
                setWeekStart([])
              }                        
          })
          .catch(function (error) {console.log(error.response)})
        }
        
        if(weekEnd.length !== 0 && weekStart.length !== 0) fetchInvesterData();
    },[accessTokenObj, weekEnd, weekStart])

    const handleDate = (e) => {
        e.preventDefault();
        setArrayData([])

        if (e.target[0].value !== "" && e.target[1].value !== "") {
            e.target[2].style = "pointer-events: none; opacity: 0.7;"
            e.target[2].children[0].style.display = "none"
            e.target[2].children[1].style.display = "block"            

            setWeekStart(e.target[0].value)
            setWeekEnd(e.target[1].value)
        }
    }
  
  return (
    <div className="package">
      <Sidebar />
      <div className="packageContainer">
        <Navbar/>
        <Goback title="Packages" btn={<div></div>}/>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="detailItem">
                  <span className="itemKey">Full Name:</span>
                  {/* <span className="itemValue">{investor.fullName}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telegram:</span>
                  {/* <span className="itemValue">{investor.telegram}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Binance Email:</span>
                  {/* <span className="itemValue">{investor.binanceEmail}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Binance Hash:</span>
                  {/* <span className="itemValue">{investor.binanceHash}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Capital Amount:</span>
                  {/* <span className="itemValue">${investor.capitalAmount}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Payment Method:</span>
                  {/* <span className="itemValue">{myPackage.PaymentMethod}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start Date:</span>
                  {/* <span className="itemValue">{myPackage.startDate}</span> */}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sended Profit:</span>
                  {/* <span className="itemValue">${sendProfitPorcent}</span> */}
                </div>
            </div>
          </div>
        </div>
        <div className="midel">
            <div className="formContainer">
                <form className="weeklyProfitForm" onSubmit={handleDate}>
                    <div>
                        <label>Week Start : </label>
                        <input type="date" id="weekStart" />
                    </div>
                    <div>
                        <label>Week End : </label>
                        <input type="date" id="weekStart" />
                    </div>
                    <button type="submit" className="action weeklyWithdrawal">
                        <b>Weekly Withdrawal</b>
                    <div><SyncIcon className="icnSpinner" /></div></button>
                </form>
                <div className="hidenMsg"><span id="msgRequest"></span></div>
            </div>
        </div>
        
        <div className="bottom dataTable">
            <h1 className="title">Last Transactions</h1>
            <DataGrid
                className="datagrid"
                rows={arrayData}
                columns={withdrawalColumns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                checkboxSelection
            />
        </div>
      </div>
    </div>
  )
}

export default Withdrawal