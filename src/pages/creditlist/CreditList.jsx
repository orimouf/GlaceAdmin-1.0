import React from 'react'
import "./creditlist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios'
import { CreditListColumns } from "../../datatablesource"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from "react"
import Goback from "../../components/goback/Goback"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SyncIcon from '@mui/icons-material/Sync'
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"
import View from '../../components/view/View'

const CreditList = () => {
  const apiRef = useGridApiRef()
  const searchRef = useRef(null)
  const typeSearchRef = useRef(null)
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
  const [ arrayData, setArrayData ] = useState([])
  const [ search, setSearch ] = useState([])
  // const [ typeSearch, setTypeSearche ] = useState("")
  const [ viewSection, setViewSection ] = useState(null)
  // const [ dailyData, setDailyData ] = useState([])
  const [ totalCredit, setTotalCredit ] = useState("")

  useEffect(function () {

    const fetchData = async () => {
      await axios.get(`../clients/ordresPayments`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        // let id = 0

        console.log(data);
        data.orders.map((receive, i) => {
          const initialValue = 0;
          array.push(
            {
              id: i+1,
              _id: receive._id,
              clientName: receive.clientName,
              allCapital: receive.totalCapital,
              allPayment: receive.totalPayments,
              allCredit: receive.totalCredit,
              numberOrder: receive.totalBonOrders,
              camion: receive.camion,
              numberPayment: receive.totalBonPayments
            }
          )
          // id = i
          let onlyCreditClients = array.filter( e => e.allCredit !== 0 )
          let finalCredit = onlyCreditClients.map( e => parseFloat(e.allCredit)).reduce((a, b) =>  a + b, initialValue)

          setTotalCredit(finalCredit)
          setArrayData(onlyCreditClients)   
          setSearch(onlyCreditClients)      
        })
        
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    }

    // const searchRef_ = searchRef.current
    // searchRef_.addEventListener('click', handleClick)
    
    if (arrayData.length === 0) {
      fetchData()
    }

  }, [accessTokenObj, arrayData, search, arrayData.length])

  
  function viewSelected(item) {    
    document.getElementsByClassName("midel")[0].style.display = "flex";
    setViewSection(<View orderDetail={item} />)
  }

  function editSelected(item) {
    const responce = apiDeleteFun("clients", item._id)
    if (responce) {
      document.getElementsByClassName("textLogin")[0].innerHTML = "Edit Selected"
      document.getElementsByClassName("icnSpinner")[0].style = "display: none; margin: auto;"
    }
  }

  function deleteSelected(item) {
    const responceOrder = apiDeleteFun("orders", item._id)
    if (responceOrder) {
      const responceProductList = apiDeleteFun("allproducts", item.productListId)
      if (responceProductList) {
        setArrayData([])
        document.getElementsByClassName("textDelete")[0].innerHTML = "Delete Selected"
        document.getElementsByClassName("icnSpinnerDelete")[0].style = "display: none; margin: auto;"
      }
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

  const actionCreditListColumn = [
    { field: "action", headerName: "Action", width: 180, 
    renderCell:(params)=>{
        return(
            <>
                <div className="action View" onClick={() => viewSelected(params.row)}>View</div> 
                <div className="action Edit" >Edit</div> 
                <div className="action Delete" onClick={() => deleteSelected(params.row)}>Delete</div>
            </> 
        )
    }}
  ]
  
  return (
    <div className="creditList">
      <Sidebar />
      <div className="creditListContainer">
        <Navbar/>
        <Goback title="Credit List" btn={<div></div>}/>
        <div className="top">
          <div className="left">
            <div className='typeLable'>
              <label htmlFor="type">Type Of Search : </label>
            </div>
            <div className='typeInput' ref={typeSearchRef}>
              <input type="radio" name="typeSearch" value="CAMION 01" /> CAMION 01
              <input type="radio" name="typeSearch" value="CAMION 02" /> CAMION 02
            </div>
          </div>
          <div className="right">
            <div className="days">
              <input type="number" id="days-input" placeholder="Days After" />
            </div>
            <div className="search">
              <input type="date" id="date-input" />
              <SearchOutlinedIcon ref={searchRef} id="search-button" />
            </div>
          </div>
        </div>
        <div className="midel">
          {viewSection}
        </div>
        <div className="bottom dataTable">
          <div className="gridContainer">
            <h1 className="title">Last Transactions</h1>
            <div className="totalContainer">
              <b>Total Capital : </b><b id='totalCapitalShow'>0 DA</b>
            </div>
            <div className="totalContainer">
              <b>Total Payment : </b><b id='totalPaymentShow'>0 DA</b>
            </div>
            <div className="totalContainer">
              <b>Total Credit : </b><b id='totalCreditShow'>{totalCredit}.00 DA</b>
            </div>
            <div className="totalContainer">
              <b>Total Profit : </b><b id='totalProfitShow'>0 DA</b>
            </div>
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
            columns={CreditListColumns.concat(actionCreditListColumn)}
            pageSize={12}
            rowsPerPageOptions={[12]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}

export default CreditList