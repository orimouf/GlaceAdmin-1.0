import React from 'react'
import "./package.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Chart from "../../components/chart/Chart"
// import List from "../../components/table/Table"
// import Featured from '../../components/featured/featured'
import axios from 'axios'
import { packageColumns } from "../../datatablesource"
import { DataGrid } from '@mui/x-data-grid'
import { addMonths } from 'date-fns'
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Goback from "../../components/goback/Goback"

const Package = () => {
  const params = useParams();
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken  
  const [ sendProfitPorcent, setSendProfitPorcent ] = useState(0)
  const [ totalProfitPorcent, setTotalProfitPorcent ] = useState(0)
  const [ arrayData, setArrayData ] = useState([])
  const [ myPackage, setMyPackage ] = useState([])
  const [ investor, setInvestor ] = useState({})
  
  useEffect(function () {
    // let arrayData = []
    function nextDate(e, startDate) {
      return addMonths(new Date(startDate), e)
    }

    const fetchUserData = async () => {
      await axios.get(`../investors/find/${params.investorId}`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        setInvestor(res.data)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    };
    fetchUserData();

    const fetchData = async () => {
      await axios.get(`../packages/find/${params.investorId}`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        setMyPackage(data)
        let array = []
        data.profit.map((receive, i) => (

          array.push(
            {
              id: i+1,
              capital: "$" + investor.capitalAmount,
              month: receive.month,
              profit: "$" + (parseInt(investor.capitalAmount) * ( receive.porcentage / 100)).toFixed(0),
              profitPorcent: receive.porcentage,
              date: nextDate(i+1, data.startDate).toLocaleDateString("fr-FR"),
              leftDays: Math.ceil((new Date(nextDate(i+1, data.startDate)).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
              status: (data.checkinSend) ? "Sended" : "Pending",
            }
            )
              
        ))
        setArrayData(array)
        setSendProfitPorcent((data.profit.map(e => e.checkinSend ? e.porcentage:0).reduce((a,b) => (a+b))) * parseInt(investor.capitalAmount) / 100)
        setTotalProfitPorcent((data.profit.map(e => e.porcentage).reduce((a,b) => (a+b))) * parseInt(investor.capitalAmount) / 100)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    };
    fetchData();

  },[accessTokenObj, params.investorId, investor])
  
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
                  <span className="itemValue">{investor.fullName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telegram:</span>
                  <span className="itemValue">{investor.telegram}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Binance Email:</span>
                  <span className="itemValue">{investor.binanceEmail}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Binance Hash:</span>
                  <span className="itemValue">{investor.binanceHash}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Capital Amount:</span>
                  <span className="itemValue">${investor.capitalAmount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Payment Method:</span>
                  <span className="itemValue">{myPackage.PaymentMethod}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start Date:</span>
                  <span className="itemValue">{myPackage.startDate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sended Profit:</span>
                  <span className="itemValue">${sendProfitPorcent}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Profit:</span>
                  <span className="itemValue">${totalProfitPorcent}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Investment Year:</span>
                  <span className="itemValue">{myPackage.currentYear}</span>
                </div>
            </div>
          </div>
        </div>
        {/* <div className="midel">
          <div className="left">
            <Featured />
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months )" />
          </div>
        </div> */}
        <div className="bottom dataTable">
            <h1 className="title">Last Transactions</h1>
            {/* <List data={arrayData} packageInfo={packageInfo} /> */}
            <DataGrid
                className="datagrid"
                rows={arrayData}
                columns={packageColumns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                checkboxSelection
            />
        </div>
      </div>
    </div>
  )
}

export default Package