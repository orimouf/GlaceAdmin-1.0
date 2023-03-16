import React from 'react'
import "./setprofit.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Goback from "../../components/goback/Goback"
import { weeklyProfitColumns } from "../../datatablesource"
import { DataGrid } from '@mui/x-data-grid'
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"
import axios from 'axios'
import { useState, useEffect } from "react"
import { addMonths } from 'date-fns'
import { Months, DateForma } from "../../function/dateForma"


const Setprofit = (props) => {
    const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken 
    const [ data, setData ] = useState([])
    const [ row, setRow ] = useState([])
    const [ checked, setChecked ] = useState(false)

useEffect(function () {
    

    const fetchProfitData = async () => {
        await axios.get(`../profits/`, {
          headers: { token: `Bearer ${accessTokenObj}` }
        })
        .then(res => {
          const profitRows = res.data
          setData(profitRows)
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
    fetchProfitData()

    const fetchPackageData = async () => {
        await axios.get(`../packages/`, {
          headers: { token: `Bearer ${accessTokenObj}` }
        })
        .then(res => {
          const investors = res.data
          const date = new Date( DateForma(row.weekEnd, "DB") )
          const start = Date.parse( DateForma(row.weekStart, "DB") )
          const end = Date.parse( DateForma(row.weekEnd, "DB") )
                
          const filter = investors.filter( investor => {
            const next = Date.parse( DateForma(investor.nextProfitDate, "DB") )
                
                if (next >= start && next <= end) {
                  return investor
                }
          })
          
          if (filter.length === 0) { 
            document.getElementById("msgRequest").style.display = "block"
            document.getElementById("msgRequest").innerHTML = `No Packages in this <b> Time Period</b>`
            setRow([])
          } else {
            document.getElementById("msgRequest").style.display = "none"
            document.getElementById("msgRequest").innerHTML = ``
            filter.map( item => sendInvestorData(item.investorId, date, addMonths(new Date(item.nextProfitDate), 1)))
          }

        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
          }
        });
    }

    const sendInvestorData = async (id, date, nextProfitDate) => {
        await axios.put(`../packages/addforall/${id}`, 
            {
                "profit": {
                    id: `0${(date.getMonth()+1)}${date.getFullYear()}&${id}`,
                    year: date.getFullYear().toString(),
                    checkinSend: false, 
                    month: Months[date.getMonth()].toString(),
                    porcentage: row.profitRatio,
                },
                "nextProfitDate": nextProfitDate
            }, 
            { headers: { token: `Bearer ${accessTokenObj}`}})
          .then(async (res) => {
            if (res.status === 200) {
              await axios.put(`../profits/${row._id}`, {"status": "Approved"}, 
                { headers: { token: `Bearer ${accessTokenObj}`}})
              .then(res => {
                if (res.status === 200) {
                  data.filter( item => (item._id === row._id) && (item.status = "Approved"))
                  setRow([])
                  // const newPackage = res.data;
                  document.getElementById("msgRequest").style.display = "none"       
                  // popup msg in 4s
                  TopPopUpMsg(4, `Packages profits added successfully.`)
                }
              }).catch(function (error) {console.log(error)})
            }
          }).catch(function (error) {
            if (error.response) {
              if (error.response.data.code === 11000) {
                document.getElementById("msgRequest").style.display = "block"
                document.getElementById("msgRequest").innerHTML = `This <b>${Object.keys(error.response.data.keyValue)[0]}</b> already exist!`
              }
            }
        });
    } 
       
    if (row.length !== 0 && row.weekEnd !== undefined) fetchPackageData()
        
  },[data, row, accessTokenObj, checked])

const handleAddWeeklyProfit = async (e) => {
    e.preventDefault();
    
    if (e.target[0].value !== "" && e.target[1].value !== "" && e.target[2].value !== "") {
        const profitData = {
            weekStart: e.target[0].value,
            weekEnd: e.target[1].value,
            profitRatio: Math.abs(e.target[2].value),
            status: "Pending"
        }

      let isEmpty = false
      if (data.length !== 0) {
        data.filter(item => {
            const start = Date.parse( DateForma(item.weekStart, "DB") )
            const end = Date.parse( DateForma(item.weekEnd, "DB") )
            const checkStart = Date.parse( DateForma(profitData.weekStart, "FM") )
            const checkEnd = Date.parse( DateForma(profitData.weekEnd, "FM") )                    
             
            if (!(checkStart >= start && checkStart <= end && !checked) || !(checkEnd >= start && checkEnd <= end && !checked)) {
              setChecked(true)
              isEmpty = true
            }
            return true
        })
      } else {
        isEmpty = true
      }
      
      if (!checked && !isEmpty) {
        document.getElementById("msgRequest").style.display = "block"
        document.getElementById("msgRequest").innerHTML = `This <b>Time period</b> already exist !`
      }

        (checked || isEmpty) && await axios.post(`../profits`, profitData, {
            headers: { token: `Bearer ${accessTokenObj}`}
          })
          .then(async (res) => {
            const profitRow = res.data
            setData( data => [ ...data, profitRow] )
            document.getElementById("msgRequest").style.display = "none"       
            // popup msg in 4s
            TopPopUpMsg(4, `Investor Profits are added successfully.`)
            e.target.reset()
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.code === 11000) {
              document.getElementById("msgRequest").style.display = "block"
              document.getElementById("msgRequest").innerHTML = 
              `This <b>Time period</b> already exist !`
            }
          }
        });
    }
}

const handleAprove = async (e, row) => {
  // e.target.innerHTML = "Wait..."
  // e.target.style.pointerEvents = "none"
  setRow(row)
}

const actionProfitColumn = [
  { field: "action", headerName: "Action", width: 200, renderCell:(params)=>{
      return(
          (params.row.status !== "Approved") && <>
          <div className="action Edit" >Edit</div> 
          <div className="action Delete" >Delete</div>
          <div className="action Approve" onClick={(e) => handleAprove(e, params.row)}>Approve</div>
          </>
      )
  }}
]
  return (
    <div className='setProfit'>
      <Sidebar />
      <div className="setProfitContainer">
        <Navbar/>
        <Goback title="Add Weekly Profit Ratio" btn={<div></div>}/>
        <div className="formContainer">
            <form className="weeklyProfitForm" onSubmit={handleAddWeeklyProfit}>
                <div>
                    <label>Week Start : </label>
                    <input type="date" id="weekStart" />
                </div>
                <div>
                    <label>Week End : </label>
                    <input type="date" id="weekStart" />
                </div>
                <div>
                    <label>Profit Ratio : </label>
                    <input type="number" id="profitRatio" placeholder="Profit Ratio (%)" />
                </div>
                <button type="submit" className="action addWeeklyProfit">Add Weekly Profit</button>
            </form>
            <div className="hidenMsg"><span id="msgRequest"></span></div>
        </div>
        <div className="bottom">
            <DataGrid
                className="datagrid"
                getRowId={(row) => row._id}
                rows={data}
                columns={weeklyProfitColumns.concat(actionProfitColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
      </div>
    </div>
  )
}

export default Setprofit