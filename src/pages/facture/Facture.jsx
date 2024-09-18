import React from 'react'
import "./facture.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import axios from 'axios'
import { factureColumns, purchasePrices } from "../../datatablesource"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from "react"
import Goback from "../../components/goback/Goback"
import View from '../../components/view/View'
import Loading from '../../components/loading/Loading'
import ConfirmDialog from '../../components/dialog/confirmDialog/confirmDialog'
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack'
import EditDialog from '../../components/dialog/editDialog/EditDialog'
import TypeSearch from '../../components/typesearch/TypeSearch'

const Facture = ({ title , type}) => {
  const to = "/"+ title.toLowerCase() +"/new"
  const apiRef = useGridApiRef()
  const searchRef = useRef(null)
  const camionRef = useRef(null)
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
  const [ arrayData, setArrayData ] = useState([])
  const [ search, setSearch ] = useState([])
  const [ camion, setCamion ] = useState("CAMION 01")
  const [ viewSection, setViewSection ] = useState(null)
  const [ loadingStatus, setLoadingStatus ] = useState(true)
  const [ isNew, setIsNew ] = useState(true)
  const { enqueueSnackbar } = useSnackbar();
  var typeSearch = type

  const handleClickVariant = (msg ,variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  useEffect(function () {

    function searchFun(searchData) {
      
      document.getElementById('totalPaymentShow').innerHTML = "0 DA";
      document.getElementById('totalCreditShow').innerHTML = "0 DA";
      document.getElementById('totalCapitalShow').innerHTML = "0 DA";
      document.getElementById('totalProfitShow').innerHTML = "0 DA";

      let totalPayment = 0
      let totalCredit = 0
      let totalCapital = 0
      let totalProfit = 0

      searchData.filter((e) => {
        totalPayment += parseFloat(e.facturePayment)
        totalCapital += parseFloat(e.factureTotal)
        totalCredit += parseFloat(e.factureRest)
        
        return e
      })
            
      setSearch(searchData)

      document.getElementById('totalPaymentShow').innerHTML = totalPayment + ".00 DA";
      document.getElementById('totalCreditShow').innerHTML = totalCredit + ".00 DA";
      document.getElementById('totalCapitalShow').innerHTML = totalCapital + ".00 DA";
      document.getElementById('totalProfitShow').innerHTML = totalProfit + ".00 DA";
      setLoadingStatus(false)
    }
  
    const camionValue = event => {
      setCamion(event.target.value)
      var camionArray = arrayData.filter((e) => e.camion === event.target.value)

      searchFun(camionArray)
    }

    const handleClickSearch = event => {
      setLoadingStatus(true)
      var searchInput = document.getElementById('search-input')
      
      const inputValue = searchInput.value.split('-').reverse().join('-')
      fetchData(typeSearch, inputValue)
    }

    const fetchData = async (type, value) => {
      await axios.get(`/factures/`, {
          headers: { token: `Bearer ${accessTokenObj}` }
        })
      .then(res => {
        const data = res.data
        
        if (data.factures.length === 0) handleClickVariant(`No Facture with ${value}.`, 'info')

        let array = []
        data.factures.map((receive, i) => {
          array.push(
          {
            id: i+1,
            _id: receive._id,
            factureNumber: receive.factureNumber,
            factureName: receive.factureName,
            productList: {
                gini_qty: receive.gini_qty, scobido_qty: receive.scobido_qty, mosta_q_u: receive.mosta_q_u, cornito_prm_qty: receive.cornito_prm_qty,
                big_qty: receive.big_qty, mini_scobido_qty: receive.mini_scobido_qty, misso_q_u: receive.misso_q_u, bingo_prm_qty: receive.bingo_prm_qty,
                cornito_4_qty: receive.cornito_4_qty, venezia_qty: receive.venezia_qty, juliana_q_u: receive.juliana_q_u, mini_prm_qty: receive.mini_prm_qty,
                cornito_5_qty: receive.cornito_5_qty, bf_400_q_u: receive.bf_400_q_u, bac_5_q_u: receive.bac_5_q_u, pot_prm_qty: receive.pot_prm_qty,
                cornito_g_qty: receive.cornito_g_qty, bf_250_q_u: receive.bf_250_q_u, bac_6_q_u: receive.bac_6_q_u, bloom_prm_qty: receive.bloom_prm_qty,
                gofrito_qty: receive.gofrito_qty, bf_230_q_u: receive.bf_230_q_u, bf_210_q_u: receive.bf_210_q_u,
                mini_qty: receive.mini_qty, pot_v_qty: receive.pot_v_qty, bf_200_q_u: receive.bf_200_q_u, bf_300_q_u: receive.bf_300_q_u,
                trio_qty: receive.trio_qty, g8_qty: receive.g8_qty, bf_150_q_u: receive.bf_150_q_u, bf_330_q_u: receive.bf_330_q_u,
                solo_qty: receive.solo_qty, gold_qty: receive.gold_qty, buch_q_u: receive.buch_q_u, bingo_premium_q_u: receive.bingo_premium_q_u,
                pot_qty: receive.pot_qty, skiper_qty: receive.skiper_qty, tarte_q_u: receive.tarte_q_u, selection_q_u: receive.selection_q_u
              },
            factureTotal: receive.factureTotal,
            facturePayment: receive.facturePayment,
            factureRest: receive.factureRest,
            factureDate: receive.factureDate,
            statusPayment: (receive.statusPayment) ? "Credit" : "Non Credit",
          })
          
        })    
        
        setArrayData(array);
        searchFun(array);
      })
      .catch(function (error) {
        if (error.response) {
          handleClickVariant(`ERROR ${error.response.statusText} -- ${error.response.status}.`, 'error')
          console.log(error.response);
          setLoadingStatus(false)
        }
      });
    }

    const searchRef_ = searchRef.current
    searchRef_.addEventListener('click', handleClickSearch)
    
    if (loadingStatus && isNew) {
      setIsNew(false) 
      var valueSearch = ""
      fetchData(typeSearch, valueSearch)
    }
    
  }, [accessTokenObj, camion, typeSearch])
  
  function viewSelected(item) {    
    document.getElementsByClassName("midel")[0].style.display = "flex";
    console.log(item);
    
    setViewSection(<View orderDetail={item} viewType="Facture" />)
  }

  const editSelected = async (item, typeEdit) => {
    const root = (typeEdit !== "Payment") ? "orders" : "payments"
    await axios.put(`/${root}/${item._id}`, item, {
      headers: { token: `Bearer ${accessTokenObj}` }
    })
    .then(res => {
      if (res.status === 200) {
        // popup msg delete success with snackbar
        handleClickVariant(` ${item.clientName}  --  Edited successfully.`, 'success')
        const newArray = search.map((elem) => {
          if (typeEdit !== "Payment") {
            if (elem._id === res.data._id) {             
              elem.clientName = res.data.clientName
              elem.clientId = res.data.clientId
              elem.totalToPay = res.data.totalToPay
              elem.verssi = res.data.verssi
              elem.rest = res.data.rest
              elem.date = res.data.date
              elem.camion = res.data.camion
              elem.isCheck = (res.data.isCheck) ? "Check" : "Non Check"
              elem.isCredit = (res.data.isCredit) ? "Credit" : "Non Credit"
            }
          } else {
            if (elem._id === res.data._id) {             
              elem.clientName = res.data.clientName
              elem.clientId = res.data.clientId
              elem.totalToPay = res.data.oldSomme
              elem.verssi = res.data.verssi
              elem.rest = res.data.rest
              elem.date = res.data.date
              elem.camion = res.data.camion
              elem.isCheck = (res.data.isCheck) ? "Check" : "Non Check"
            }
          }
          
          return elem
        })
        setSearch(newArray)
      }
    })
    .catch(error => {
      // popup msg Error to delete with snackbar
      handleClickVariant(`Error !! ${error}.`, 'error')
      console.error(error);
    });
  }

  function deleteSelected(item) {
    const root = (item.isCredit !== "Payment") ? "orders" : "payments"
    const responceOrder = apiDeleteFun(root, item._id)
    if (responceOrder && root !== "payments") {
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
    dataSelected.map(deleteSelected)
  }

  const apiDeleteFun = async (root, id) => {
    await axios.delete(`/${root}/${id}`, {
      headers: { token: `Bearer ${accessTokenObj}` }
    })
    .then(response => {
      // popup msg delete success with snackbar
      handleClickVariant(`${root}  --  ${id}  --  deleted successfully.`, 'success')
      return true
    })
    .catch(error => {
      // popup msg Error to delete with snackbar
      handleClickVariant(`Error !! ${error}.`, 'error')
      console.error(error);
      return false
    });
  }

  const actionOrderColumn = [
    { field: "action", headerName: "Action", width: 180, 
    renderCell:(params)=>{
        return(
            <>
                <div className="action View" onClick={() => viewSelected(params.row)}>View</div> 
                <EditDialog editSelected={editSelected} paramsRow={params.row} />
                <div className="action Delete" onClick={() => deleteSelected(params.row)}>Delete</div>
            </> 
        )
    }}
  ]
  
  return (
    <div className="orders">
      <Sidebar />
      <div className="ordersContainer">
        <Navbar/>
        
        <div className='mainContainer'>
          <Loading status={loadingStatus} page={"setProduct"} />
          <Goback title="Orders" btn={<Link to={to} className="link">Add New</Link>}/>
          
          <TypeSearch type={typeSearch} camionRef="Facture" searchRef={searchRef} />

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
                <b>Total Credit : </b><b id='totalCreditShow'>0 DA</b>
              </div>
              <div className="totalContainer">
                <b>Total Profit : </b><b id='totalProfitShow'>0 DA</b>
              </div>
              <div className="actionContainer">
                {/* <div className="action View" >View</div>  */}
                <ConfirmDialog selectedAction={selectedAction} />
                {/* <div className="action Delete" onClick={selectedAction} >
                  <span className="textDelete">Delete Selected</span>
                  <span className="loadingDelete"><SyncIcon className="icnSpinnerDelete" /></span>
                </div> */}
              </div>
            </div>
            {/* <List data={arrayData} packageInfo={packageInfo} /> */}
            <DataGrid
              apiRef={apiRef}
              className="datagrid"
              rows={search}
              columns={factureColumns.concat(actionOrderColumn)}
              pageSize={12}
              rowsPerPageOptions={[12]}
              checkboxSelection
            />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Facture