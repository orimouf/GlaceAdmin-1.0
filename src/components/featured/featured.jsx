import React from 'react'
import "./featured.scss"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


const myPackage = {
    name: "MINI",
    amount: "1000",
    profitPorcent: [12,11,14,10.5,10,10,10,10,10.8,10.2],
    capitalPorcent: 10,
    WithdrawalEvery: "10 Days",
    totalWithdrawal: 10,
    myWithdrawal: 3,
    myWithdrawalAmount: "670",
    currentWeek: 3,
    startDate: "01/05/2022",
    finDate: "11/07/2022"
}

const myPackageProcess = (myPackage.myWithdrawal * 10)
var myCapital = ((myPackage.amount * (myPackage.capitalPorcent / 100)) * myPackage.currentWeek).toFixed(0)
var myTarget = (myPackage.amount * (myPackage.profitPorcent.reduce((a,b) => (a+b))/ 100))
var myLastWeek = (myPackage.amount * (myPackage.profitPorcent[myPackage.currentWeek - 2] / 100)).toFixed(0)
var myThisWeek = (myPackage.amount * (myPackage.profitPorcent[myPackage.currentWeek - 1] / 100)).toFixed(0)
var myLastMonth = 0

if (myPackage.currentWeek === 1){myLastWeek = 0}
if (myPackage.currentWeek >= 4){
    for (let i = 0; i < myPackage.currentWeek; i++) {
        myLastMonth = myLastMonth + (myPackage.amount * (myPackage.profitPorcent[i] / 100))
    }
    if (myTarget >= 1000) { myLastMonth = `${(myLastMonth / 1000).toFixed(2)}k`}
}

var weekDiv = <><div className="itemResult negative">
                    <KeyboardArrowDownOutlinedIcon fontSize="small"/>
                    <div className="resultAmount">${myLastWeek}</div>
                </div></>

if (myLastWeek < myThisWeek) {
    weekDiv = <><div className="itemResult positive">
                    <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                    <div className="resultAmount">${myLastWeek}</div>
                </div></>
}

const featured = () => {
  return (
    <div className="featured">
        <div className="featuredTop">
            <h1 className="title">Total Revenue</h1>
            <MoreVertOutlinedIcon fontSize="small" />
        </div>
        <div className="featuredBottom">
            <div className="featuredChart">
                <CircularProgressbar value={myPackageProcess} text={`${myPackageProcess}%`} strokeWidth={10}/>
            </div>
            <div className="featuredCapitalProfit">
                <span className="title">Profit :</span>
                <span className="amount">${myPackage.myWithdrawalAmount - myCapital}</span>
                <span className="title">Capital :</span>
                <span className="amount">${myCapital}</span>
            </div>
            <div className="featuredSales">
                <span className="title">Total Withdrawal</span>
                <span className="amount">${myPackage.myWithdrawalAmount}</span>
            </div>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target Profit</div>
                    <div className="itemResult positive">
                        <div className="resultAmount">${myTarget}</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    {weekDiv}
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDownOutlinedIcon fontSize="small"/>
                        <div className="resultAmount">${myLastMonth}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default featured