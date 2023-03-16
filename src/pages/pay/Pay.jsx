import React from 'react'
import "./pay.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import Featured from '../../components/featured/featured';

const Single = () => {

  const myPackage = {
    username: "@AmirHarrouche",
    phone: "0781289566",
    name: "MINI",
    capital: "1000",
    PaymentMethod: "Payeer",
    profitPorcent: [12,11,14,10.5,10,10,10,10,10.8,10.2],
    isApproved: [1,1,1,0,0,0,0,0,0,0],
    capitalPorcent: 10,
    WithdrawalEvery: 10,
    totalWithdrawal: 10,
    myWithdrawal: 3,
    myWithdrawalAmount: "670",
    currentWeek: 3,
    startDate: "10/06/2022",
    finDate: "01/14/2023"
  }

  function nextDate(e) {
    return new Date(new Date(myPackage.startDate).getTime() + ((myPackage.WithdrawalEvery * (e + 1)) * (1000 * 3600 * 24)))
  }

  let arrayData = [] 
  let packageInfo = {
    username: myPackage.username,
    capital: myPackage.capital,
    receiveProfitPorcent: myPackage.profitPorcent.reduce((a,b,i) => (myPackage.isApproved[i])?(a+b):(a+0)),
    receiveCapitalPorcent: (myPackage.isApproved.filter(elm => elm).reduce((a,b)=>(a+b)) * myPackage.capitalPorcent),
    totalProfitPorcent: myPackage.profitPorcent.reduce((a,b) => (a+b)),
    totalCapitalPorcent: (myPackage.totalWithdrawal * myPackage.capitalPorcent)
  }

  myPackage.profitPorcent.map((receive, i) => (
    
    arrayData.push(
      {
        id: i+1,
        package: myPackage.name,
        username: myPackage.username,
        capital: "$" + myPackage.capital,
        capitalBack: "$" + (myPackage.capital * ( 10 / 100)).toFixed(0),
        profit: "$" + (myPackage.capital * ( receive / 100)).toFixed(0),
        capitalPorcent: myPackage.capitalPorcent,
        profitPorcent: receive,
        date: nextDate(i).toLocaleDateString("fr-FR"),
        leftDays: Math.ceil((new Date(nextDate(i).toLocaleDateString("en-EN")).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
        status: (myPackage.isApproved[i]) ? "Approved" : "Pending",
      }
    ) 
  
  ))

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="detailItem">
                  <span className="itemKey">Package Name:</span>
                  <span className="itemValue">{myPackage.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{myPackage.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{myPackage.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Capital Amount:</span>
                  <span className="itemValue">${myPackage.capital}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Payment Method:</span>
                  <span className="itemValue">{myPackage.PaymentMethod}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date:</span>
                  <span className="itemValue">{myPackage.startDate}</span>
                </div>
            </div>
          </div>
        </div>
        <div className="midel">
          <div className="left">
          </div>
          <div className="right">
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List data={arrayData} packageInfo={packageInfo} />
        </div>
      </div>
    </div>
  )
}

export default Single