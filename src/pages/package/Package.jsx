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
  const [ arrayData, setArrayData ] = useState([])
  const [ clients, setClients ] = useState({})
  
  useEffect(function () {
    // let arrayData = []
    function nextDate(e, startDate) {
      return addMonths(new Date(startDate), e)
    }

    // const fetchClientsData = async () => {
    //   await axios.get(`../clients/find/${params.clientsId}`, {
    //     headers: { token: `Bearer ${accessTokenObj}` }
    //   })
    //   .then(res => {
    //     // setClients(res.data)
    //   })
    //   .catch(function (error) {
    //     if (error.response) {
    //       console.log(error.response);
    //     }
    //   });
    // };
    // fetchClientsData();

    const fetchData = async () => {
      console.log("data");
      await axios.get(`../clients/`, {
        //headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        console.log(data);
        setClients(data)
        let array = []
        data.profit.map((receive, i) => (

          array.push(
            {
              id: i+1,
              capital: "$" + clients.capitalAmount,
              month: receive.month,
              profit: "$" + (parseInt(clients.capitalAmount) * ( receive.porcentage / 100)).toFixed(0),
              profitPorcent: receive.porcentage,
              date: nextDate(i+1, data.startDate).toLocaleDateString("fr-FR"),
              leftDays: Math.ceil((new Date(nextDate(i+1, data.startDate)).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
              status: (data.checkinSend) ? "Sended" : "Pending",
            }
            )
              
        ))
        setArrayData(array)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    };
    fetchData();

    console.log(clients);

  },[accessTokenObj, params.clientsId, clients])
  
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
                  <span className="itemValue">{clients.clientName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telegram:</span>
                  <span className="itemValue">{clients.appId}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Binance Email:</span>
                  <span className="itemValue">{clients.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Binance Hash:</span>
                  <span className="itemValue">{clients.region}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Capital Amount:</span>
                  <span className="itemValue">{clients.prices}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Payment Method:</span>
                  <span className="itemValue">{clients.oldCredit}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start Date:</span>
                  <span className="itemValue">{clients.isCredit}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sended Profit:</span>
                  <span className="itemValue">{clients.isFrigo}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Profit:</span>
                  <span className="itemValue">{clients.isPromo}</span>
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