import React from 'react'
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, investorColumns } from "../../datatablesource"
import { Link } from "react-router-dom";
import CopyIcon from '@mui/icons-material/CopyAll';
import { useState, useEffect } from "react";
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"
import axios from 'axios';
import Goback from "../goback/Goback";

const Datatable = ({ title }) => {

  const to = "/"+ title +"/new"
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken  
  const [ userRows, setUserRows ] = useState([])

  useEffect(function () {

    const fetchData = async () => {
      
      await axios.get(`../${title.toLowerCase()}/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const persons = res.data
        persons.map((e, i) => Object.assign(e, {id: i}))
        title === "Users" && persons.map(e => e.isAdmin === true ? e.isAdmin = "ADMIN" :  e.isAdmin = "NOT ADMIN")
        persons.map(e => e.status === "0" ? e.status = "pending" : e.status === "1" ? e.status = "active" : e.status = "passive")
        setUserRows(persons);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    };
    fetchData();

  },[accessTokenObj, title])

  const handleDelete = async (id, _id, fullName, title) => {

    if (window.confirm(`you want to delete ${title} " ${fullName} " ?`)) {
      setUserRows(userRows.filter((item) => item.id !== id))

      await axios.delete(`../${title.toLowerCase()}/${_id}`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(async res => {
        console.log(res.data);
        if (title.toLowerCase() === "investors") {
          await axios.delete(`../packages/investor/${_id}`, {
            headers: { token: `Bearer ${accessTokenObj}` }
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(function (error) {console.log(error.response)})
        }
        
      })
      .catch(function (error) {console.log(error.response)})
    }
  }
  
  const handleCopyClick = (id, text, title) => {
    // textToClipboard function
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    // popup msg in 4s
    TopPopUpMsg(4, `${title} copied successfully.`)
    
  }

  const actionUserColumn = [
    { field: "action", headerName: "Action", width: 150, renderCell: (params)=>{
      return (
        <div className="cellAction">
          <Link to="/users/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={()=>handleDelete(params.row.id, params.row._id, params.row.fullName, title)} title="Delete">Delete</div>
        </div>
      )
    }} 
  ]

  const actionInvestorColumn = [
    { field: "binanceEmail", headerName: "Binance Email", width: 120,
    renderCell: (params)=> {
      return (
          <div className="cellWithImg">
              <CopyIcon className="icon copyIcon" onClick={()=>handleCopyClick(params.row.id, params.row.binanceEmail, "Email")} />                
              {params.row.binanceEmail}
          </div>
      )
    }},
    { field: "binanceHash", headerName: "Binance Hash", width: 120,
    renderCell: (params)=> {
      return (
          <div className="cellWithImg">
              <CopyIcon className="icon copyIcon" onClick={()=>handleCopyClick(params.row.id, params.row.binanceHash, "Hash")} />                
              {params.row.binanceHash}
          </div>
      )
    }},
    { field: "action", headerName: "Action", width: 150, renderCell: (params)=>{
      return (
        <div className="cellAction">
          <Link to={`/investors/${params.row._id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={()=>handleDelete(params.row.id, params.row._id, params.row.fullName, title)} title="Delete">Delete</div>
        </div>
      )
    }} 
  ]


  return (
    <div className="datatable">
      <Goback title={title} btn={<Link to={to} className="link">Add New</Link>}/>
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={title === "Users" ? userColumns.concat(actionUserColumn) : investorColumns.concat(actionInvestorColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable