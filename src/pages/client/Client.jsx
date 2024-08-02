import React from 'react'
import "./client.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Chart from "../../components/chart/Chart"
// import List from "../../components/table/Table"
// import Featured from '../../components/featured/featured'
import axios from 'axios'
import { clientColumns } from "../../datatablesource"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
// import { addMonths } from 'date-fns'
import { useState, useEffect, useRef } from "react"
// import { useParams } from 'react-router-dom'
import Goback from "../../components/goback/Goback"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SyncIcon from '@mui/icons-material/Sync'
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"

const Client = () => {
  const apiRef = useGridApiRef()
  const searchRef = useRef(null)
  const typeSearchRef = useRef(null)
  // const params = useParams()
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
  const [ arrayData, setArrayData ] = useState([])
  const [ search, setSearch ] = useState([])
  const [ typeSearch, setTypeSearche ] = useState("")
  
  // function nextDate(e, startDate) {
  //   return addMonths(new Date(startDate), e)
  // }

  useEffect(function () {

    const fetchData = async () => {
      await axios.get(`../clients/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        data.clients.map((receive, i) => (
  
          array.push(
            {
              id: i+1,
              _id: receive._id,
              appId: receive.appId,
              clientName: receive.clientName,
              phone: receive.phone,
              region: receive.region,
              prices: receive.prices,
              oldCredit: receive.oldCredit,
              isCredit: (receive.isCredit) ? "Credit" : "Non Credit",
              isFrigo: (receive.isFrigo) ? "Frigo" : "Non Frigo",
              isPromo: (receive.isPromo) ? "Promo" : "Non Promo",
              creditBon: receive.creditBon,
              lastServe: receive.lastServe,
            }
            )
              
        ))
        setArrayData(array)
        setSearch(array)
        
        // setSendProfitPorcent((data.profit.map(e => e.checkinSend ? e.porcentage:0).reduce((a,b) => (a+b))) * parseInt(clients.capitalAmount) / 100)
        // setTotalProfitPorcent((data.profit.map(e => e.porcentage).reduce((a,b) => (a+b))) * parseInt(clients.capitalAmount) / 100)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    }

    const handleClick = event => {
      const searchInput = document.getElementById('search-input')
      const inputValue = searchInput.value
      searchFun(inputValue, typeSearch)
    }
  
    function searchFun(string, type) {
      var searchArray = arrayData.filter((e) => {
        switch(type) {
          case 'appId':
            return e.appId === string;
          case 'clientName':
            return e.clientName === string;
          case 'phone':
            return e.phone === string;
          case 'region':
            return e.region === string;
          case 'credit':
            return e.isCredit === string;
          default:
            return e;
        }
        
      })
      setSearch(searchArray)
    }
  
    const typeValue = event => {
      setTypeSearche(event.target.value)
    }

    const searchRef_ = searchRef.current
    const typeSearchRef_ = typeSearchRef.current
    searchRef_.addEventListener('click', handleClick)
    typeSearchRef_.addEventListener('change', typeValue)
    
    if (arrayData.length === 0) {
      fetchData();
    }

  },[accessTokenObj, search, arrayData, typeSearch, arrayData.length])
  
  function editSelected(item) {
    const responce = apiDeleteFun("clients", item._id)
    if (responce) {
      document.getElementsByClassName("textLogin")[0].innerHTML = "Edit Selected"
      document.getElementsByClassName("icnSpinner")[0].style = "display: none; margin: auto;"
    }
  }

  function deleteSelected(item) {
    const responce = apiDeleteFun("clients", item._id)
    if (responce) {
      setArrayData([])
      document.getElementsByClassName("textDelete")[0].innerHTML = "Delete Selected"
      document.getElementsByClassName("icnSpinnerDelete")[0].style = "display: none; margin: auto;"
    }
  }

  const selectedAction = event => {

    var dataSelected = apiRef.current.getSelectedRows()

    if (event.target.outerText === "Edit Selected") {
      document.getElementsByClassName("textEdit")[0].innerHTML = ""
      document.getElementsByClassName("icnSpinnerEdit")[0].style = "display: inherit; margin: -1px;"
      dataSelected.forEach(editSelected)
    } else if(event.target.outerText === "Delete Selected") {
      document.getElementsByClassName("textDelete")[0].innerHTML = ""
      document.getElementsByClassName("icnSpinnerDelete")[0].style = "display: inherit; margin: -1px;"
      dataSelected.forEach(deleteSelected)
    }
  }

  const apiDeleteFun = async (root, id) => {
    await axios.delete(`../${root}/${id}`, {
      headers: { token: `Bearer ${accessTokenObj}` }
    })
    .then(response => {
      // popup msg in 4s
      TopPopUpMsg(4, `${root}  --  ${id}  --  deleted successfully.`)
      return true
    })
    .catch(error => {
      console.error(error);
      return false
    });
  }

  const actionClientColumn = [
    { field: "action", headerName: "Action", width: 180, 
    renderCell:(params)=>{
        return(
            <>
                <div className="action View" >View</div> 
                <div className="action Edit" >Edit</div> 
                <div className="action Delete" onClick={() => deleteSelected(params.row)}>Delete</div>
            </> 
        )
    }}
  ]


  return (
    <div className="client">
      <Sidebar />
      <div className="clientContainer">
        <Navbar/>
        <Goback title="Clients" btn={<div></div>}/>
        <div className="top">
          <div className="left">
            <div className='typeLable'>
              <label htmlFor="type">Type Of Search : </label>
            </div>
            <div className='typeInput' ref={typeSearchRef}>
              <input type="radio" name="typeSearch" value="appId" /> App ID
              <input type="radio" name="typeSearch" value="clientName" /> Client Name
              <input type="radio" name="typeSearch" value="phone" /> Phone
              <input type="radio" name="typeSearch" value="region" /> Region 
              <input type="radio" name="typeSearch" value="credit" /> Credit 
            </div>
          </div>
          <div className="right">
            <div className="search">
              <input id='search-input' type="text" placeholder='Search...' />
              <SearchOutlinedIcon ref={searchRef} id="search-button" />
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
          <div className="gridContainer">
            <h1 className="title">Last Transactions</h1>
            <div className="actionContainer">
              {/* <div className="action View" >View</div>  */}
              <div className="action Edit" onClick={selectedAction} >
                <span className="textEdit">Edit Selected</span>
                <span className="loadingEdit"><SyncIcon className="icnSpinnerEdit" /></span>
              </div> 
              <div className="action Delete" onClick={selectedAction} >
                <span className="textDelete">Delete Selected</span>
                <span className="loadingDelete"><SyncIcon className="icnSpinnerDelete" /></span>
              </div>
            </div>
          </div>
            {/* <List data={arrayData} packageInfo={packageInfo} /> */}
            <DataGrid
                apiRef={apiRef}
                className="datagrid"
                rows={search}
                columns={clientColumns.concat(actionClientColumn)}
                pageSize={12}
                rowsPerPageOptions={[12]}
                checkboxSelection
            />
        </div>
      </div>
    </div>
  )
}

export default Client