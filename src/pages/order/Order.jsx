import React from 'react'
import "./order.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Chart from "../../components/chart/Chart"
// import List from "../../components/table/Table"
// import Featured from '../../components/featured/featured'
import axios from 'axios'
import { orderColumns, purchasePrices } from "../../datatablesource"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from "react"
import Goback from "../../components/goback/Goback"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SyncIcon from '@mui/icons-material/Sync'
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"
import View from '../../components/view/View'
import Loading from '../../components/loading/Loading'
import ConfirmDialog from '../../components/dialog/confirmDialog/confirmDialog'
import { useSnackbar } from 'notistack'
import EditDialog from '../../components/dialog/editDialog/EditDialog'
import { getDate } from '../../function/dateForma'



const Order = () => {
  const apiRef = useGridApiRef()
  const searchRef = useRef(null)
  const typeSearchRef = useRef(null)
  const camionRef = useRef(null)
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
  const [ arrayData, setArrayData ] = useState([])
  const [ search, setSearch ] = useState([])
  const [ typeSearch, setTypeSearche ] = useState("date")
  const [ camion, setCamion ] = useState("CAMION 01")
  const [ viewSection, setViewSection ] = useState(null)
  const [ loadingStatus, setLoadingStatus ] = useState(true)
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (msg ,variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  useEffect(function () {

    function searchFun(string, type) {
      document.getElementById('totalPaymentShow').innerHTML = "0 DA";
      document.getElementById('totalCreditShow').innerHTML = "0 DA";
      document.getElementById('totalCapitalShow').innerHTML = "0 DA";
      document.getElementById('totalProfitShow').innerHTML = "0 DA";

      var camionArray = arrayData.filter((e) => e.camion === camion)
      
      var searchArray = camionArray.filter((e) => {
        switch(type) {
          case 'appId':
            return e.appId === string;
          case 'clientName':
            return e.clientName === string;
          case 'clientId':
            return e.clientId === string;
          case 'date':
            return e.date === string;
          case 'productListId':
            return e.productListId === string;
          case 'credit':
            return e.isCredit === string; 
          case 'check':
            return e.isCheck === string;
          default:
            return '';
        }
      })

      let totalPayment = 0
      let totalCredit = 0
      let totalCapital = 0
      searchArray.filter((e) => {
        if (e.verssi !== 0){ totalPayment += parseFloat(e.verssi) }
        if (e.rest !== 0 && e.isCredit !== "Payment"){ totalCredit += parseFloat(e.rest) }
        totalCapital += parseFloat(e.totalToPay)
        return e
      })
      
      setSearch(searchArray)
      const totalProfit = profitCalcul(searchArray)

      document.getElementById('totalPaymentShow').innerHTML = totalPayment + ".00 DA";
      document.getElementById('totalCreditShow').innerHTML = totalCredit + ".00 DA";
      document.getElementById('totalCapitalShow').innerHTML = totalCapital + ".00 DA";
      document.getElementById('totalProfitShow').innerHTML = totalProfit + ".00 DA";
      setLoadingStatus(false)
    }
  
    const typeValue = event => {
      if (event.target.value === "date") {
        document.getElementById('date-input').style.display = "block"
        document.getElementById('search-input').style.display = "none"
      } else {
        document.getElementById('date-input').style.display = "none"
        document.getElementById('search-input').style.display = "block"
      }
      setTypeSearche(event.target.value)
    }

    const camionValue = event => {
      setCamion(event.target.value)
    }

    const handleClick = event => {
      setLoadingStatus(true)
      var searchInput = document.getElementById('search-input')
      if (typeSearch === "date") {
        searchInput = document.getElementById('date-input')
      }
      
      const inputValue = searchInput.value.split('-').reverse().join('-')
      searchFun(inputValue, typeSearch)
    }

    const fetchData = async (date) => {
      await axios.get(`../orders/ordresJoin/${date}`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        let id = 0
        data.orders.map((receive, i) => {

          array.push(
            {
              id: i+1,
              _id: receive._id,
              appId: receive.appId,
              clientName: receive.clientName,
              clientId: receive.clientId,
              productListId: receive.productListId,
              totalToPay: receive.totalToPay,
              verssi: receive.verssi,
              rest: receive.rest,
              date: receive.date,
              camion: receive.camion,
              profit: 0,
              productsOrdered: receive.productsOrdered[0],
              clientPrices: receive.clientPrices,
              isCredit: (receive.isCredit) ? "Credit" : "Non Credit",
              isCheck: (receive.isCheck) ? "Check" : "Non Check"
            }
          )
          id = i
          setArrayData(array)
          setSearch(array)
          setLoadingStatus(false)
          
        }).then(fetchPaymentsData(id, array))
        
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    }

    const fetchPaymentsData = async (id, arrayDataOrders) => {
      await axios.get(`../payments/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        let i = id + 1
        
        data.payments.map((receive) => {

          array.push(
            {
              id: i,
              _id: receive._id,
              appId: receive.appId,
              clientName: receive.clientName,
              clientId: receive.clientId,
              region: receive.region,
              totalToPay: receive.oldSomme,
              verssi: receive.verssi,
              rest: receive.rest,
              date: receive.date,
              camion: receive.camion,
              profit: 0,
              productsOrdered: {},
              clientPrices: "",
              isCredit: "Payment",
              isCheck: (receive.isCheck) ? "Check" : "Non Check"
            }
          )
          i++

          setArrayData(arrayDataOrders.concat(array))
          setSearch(arrayDataOrders.concat(array))
          setLoadingStatus(false)
        })
        
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    }

    function profitCalcul(searchArray) {
      var totalProfit = 0;

      searchArray.map( order => {
        if (order.isCredit !== "Payment") {
          const arrayOfPrices = order.clientPrices.split(":");

          var profitMini = (parseFloat(arrayOfPrices[0]) - parseFloat(purchasePrices.mini_q_u)) * (parseFloat(order.productsOrdered.mini_q_u) * parseFloat(order.productsOrdered.mini_qty))
          var profitTrio = (parseFloat(arrayOfPrices[1]) - parseFloat(purchasePrices.trio_q_u)) * (parseFloat(order.productsOrdered.trio_q_u) * parseFloat(order.productsOrdered.trio_qty))
          var profitPot = (parseFloat(arrayOfPrices[2]) - parseFloat(purchasePrices.pot_q_u)) * (parseFloat(order.productsOrdered.pot_q_u) * parseFloat(order.productsOrdered.pot_qty))
          var profitSolo = (parseFloat(arrayOfPrices[3]) - parseFloat(purchasePrices.solo_q_u)) * (parseFloat(order.productsOrdered.solo_q_u) * parseFloat(order.productsOrdered.solo_qty))
          var profitGini = (parseFloat(arrayOfPrices[4]) - parseFloat(purchasePrices.gini_q_u)) * (parseFloat(order.productsOrdered.gini_q_u) * parseFloat(order.productsOrdered.gini_qty))
          var profitPotV = (parseFloat(arrayOfPrices[5]) - parseFloat(purchasePrices.pot_v_q_u)) * (parseFloat(order.productsOrdered.pot_v_q_u) * parseFloat(order.productsOrdered.pot_v_qty))
          var profitBig = (parseFloat(arrayOfPrices[6]) - parseFloat(purchasePrices.big_q_u)) * (parseFloat(order.productsOrdered.big_q_u) * parseFloat(order.productsOrdered.big_qty))
          var profitCornito4 = (parseFloat(arrayOfPrices[7]) - parseFloat(purchasePrices.cornito_4_q_u)) * (parseFloat(order.productsOrdered.cornito_4_q_u) * parseFloat(order.productsOrdered.cornito_4_qty))
          var profitCornito5 = (parseFloat(arrayOfPrices[7]) - parseFloat(purchasePrices.cornito_5_q_u)) * (parseFloat(order.productsOrdered.cornito_5_q_u) * parseFloat(order.productsOrdered.cornito_5_qty))
          var profitCornitoG = (parseFloat(arrayOfPrices[8]) - parseFloat(purchasePrices.cornito_g_q_u)) * (parseFloat(order.productsOrdered.cornito_g_q_u) * parseFloat(order.productsOrdered.cornito_g_qty))
          var profitGofrito = (parseFloat(arrayOfPrices[9]) - parseFloat(purchasePrices.gofrito_q_u)) * (parseFloat(order.productsOrdered.gofrito_q_u) * parseFloat(order.productsOrdered.gofrito_qty))
          var profitG8 = (parseFloat(arrayOfPrices[10]) - parseFloat(purchasePrices.g8_q_u)) * (parseFloat(order.productsOrdered.g8_q_u) * parseFloat(order.productsOrdered.g8_qty))
          var profitGold = (parseFloat(arrayOfPrices[11]) - parseFloat(purchasePrices.gold_q_u)) * (parseFloat(order.productsOrdered.gold_q_u) * parseFloat(order.productsOrdered.gold_qty))
          var profitSkiper = (parseFloat(arrayOfPrices[12]) - parseFloat(purchasePrices.skiper_q_u)) * (parseFloat(order.productsOrdered.skiper_q_u) * parseFloat(order.productsOrdered.skiper_qty))
          var profitScobido = (parseFloat(arrayOfPrices[13]) - parseFloat(purchasePrices.scobido_q_u)) * (parseFloat(order.productsOrdered.scobido_q_u) * parseFloat(order.productsOrdered.scobido_qty))
          var profitMiniScobido = (parseFloat(arrayOfPrices[14]) - parseFloat(purchasePrices.mini_scobido_q_u)) * (parseFloat(order.productsOrdered.mini_scobido_q_u) * parseFloat(order.productsOrdered.mini_scobido_qty))
          var profitVenezia = (parseFloat(arrayOfPrices[15]) - parseFloat(purchasePrices.venezia_q_u)) * (parseFloat(order.productsOrdered.venezia_q_u) * parseFloat(order.productsOrdered.venezia_qty))
          var profitBF400 = (parseFloat(arrayOfPrices[16]) - parseFloat(purchasePrices.bf_400_q_u)) * parseFloat(order.productsOrdered.bf_400_q_u)
          var profitBF250 = (parseFloat(arrayOfPrices[17]) - parseFloat(purchasePrices.bf_250_q_u)) * parseFloat(order.productsOrdered.bf_250_q_u)
          var profitBF230 = (parseFloat(arrayOfPrices[18]) - parseFloat(purchasePrices.bf_230_q_u)) * parseFloat(order.productsOrdered.bf_230_q_u)
          var profitBF200 = (parseFloat(arrayOfPrices[19]) - parseFloat(purchasePrices.bf_200_q_u)) * parseFloat(order.productsOrdered.bf_200_q_u)
          var profitBF150 = (parseFloat(arrayOfPrices[20]) - parseFloat(purchasePrices.bf_150_q_u)) * parseFloat(order.productsOrdered.bf_150_q_u)
          var profitBuch = (parseFloat(arrayOfPrices[21]) - parseFloat(purchasePrices.buch_q_u)) * parseFloat(order.productsOrdered.buch_q_u)
          var profitTarte = (parseFloat(arrayOfPrices[22]) - parseFloat(purchasePrices.tarte_q_u)) * parseFloat(order.productsOrdered.tarte_q_u)
          var profitMosta = (parseFloat(arrayOfPrices[23]) - parseFloat(purchasePrices.mosta_q_u)) * parseFloat(order.productsOrdered.mosta_q_u)
          var profitMisso = (parseFloat(arrayOfPrices[24]) - parseFloat(purchasePrices.misso_q_u)) * parseFloat(order.productsOrdered.misso_q_u)
          var profitJuliana = (parseFloat(arrayOfPrices[25]) - parseFloat(purchasePrices.juliana_q_u)) * parseFloat(order.productsOrdered.juliana_q_u)
          var profitBac5 = (parseFloat(arrayOfPrices[26]) - parseFloat(purchasePrices.bac_5_q_u)) * parseFloat(order.productsOrdered.bac_5_q_u)
          var profitBac6 = (parseFloat(arrayOfPrices[27]) - parseFloat(purchasePrices.bac_6_q_u)) * parseFloat(order.productsOrdered.bac_6_q_u)
          var profitBF210 = (parseFloat(arrayOfPrices[28]) - parseFloat(purchasePrices.bf_210_q_u)) * parseFloat(order.productsOrdered.bf_210_q_u)
          var profitBF300 = (parseFloat(arrayOfPrices[29]) - parseFloat(purchasePrices.bf_300_q_u)) * parseFloat(order.productsOrdered.bf_300_q_u)
          var profitBF330 = (parseFloat(arrayOfPrices[30]) - parseFloat(purchasePrices.bf_330_q_u)) * parseFloat(order.productsOrdered.bf_330_q_u)
          var profitBingoPremium = (parseFloat(arrayOfPrices[31]) - parseFloat(purchasePrices.bingo_premium_q_u)) * parseFloat(order.productsOrdered.bingo_premium_q_u)
          var profitSelection = (parseFloat(arrayOfPrices[32]) - parseFloat(purchasePrices.selection_q_u)) * parseFloat(order.productsOrdered.selection_q_u)
          var profitPotPrm = (parseFloat(arrayOfPrices[33]) - parseFloat(purchasePrices.pot_prm_q_u)) * (parseFloat(order.productsOrdered.pot_prm_q_u) * parseFloat(order.productsOrdered.pot_prm_qty))
          var profitMiniPrm = (parseFloat(arrayOfPrices[34]) - parseFloat(purchasePrices.mini_prm_q_u)) * (parseFloat(order.productsOrdered.mini_prm_q_u) * parseFloat(order.productsOrdered.mini_prm_qty))
          var profitCornitoPrm = (parseFloat(arrayOfPrices[35]) - parseFloat(purchasePrices.cornito_prm_q_u)) * (parseFloat(order.productsOrdered.cornito_prm_q_u) * parseFloat(order.productsOrdered.cornito_prm_qty))
          var profitBingoPrm = (parseFloat(arrayOfPrices[36]) - parseFloat(purchasePrices.bingo_prm_q_u)) * (parseFloat(order.productsOrdered.bingo_prm_q_u) * parseFloat(order.productsOrdered.bingo_prm_qty))
          var profitBloomPrm = (parseFloat(arrayOfPrices[37]) - parseFloat(purchasePrices.bloom_prm_q_u)) * (parseFloat(order.productsOrdered.bloom_prm_q_u) * parseFloat(order.productsOrdered.bloom_prm_qty))
        
          const orderTotalProfit = profitBac5 + profitBac6 + profitBF150 + profitBF200 + profitBF210 + profitBF230 + profitBF250 + profitBF300 + profitBF330 + profitBF400 
            + profitBig + profitBingoPremium + profitBingoPrm + profitBloomPrm + profitBuch + profitCornito4 + profitCornito5 + profitCornitoG + profitCornitoPrm
            + profitG8 + profitGini + profitGofrito + profitGold + profitJuliana + profitMiniPrm + profitMini + profitMiniScobido + profitMisso + profitMosta + profitPotPrm
            + profitPot + profitPotV + profitScobido + profitSelection + profitSkiper + profitSolo + profitTarte + profitTrio + profitVenezia;
            
          order.profit = orderTotalProfit
          totalProfit += orderTotalProfit
        }
        
      })
      return totalProfit
    }

    const searchRef_ = searchRef.current
    const typeSearchRef_ = typeSearchRef.current
    const camionRef_ = camionRef.current
    searchRef_.addEventListener('click', handleClick)
    typeSearchRef_.addEventListener('change', typeValue)
    camionRef_.addEventListener('change', camionValue)
    
    if (arrayData.length === 0) {
      const currentDate = getDate()
      fetchData(currentDate)
    }
    
  }, [accessTokenObj, arrayData, search, typeSearch, arrayData.length])

  
  function viewSelected(item) {    
    document.getElementsByClassName("midel")[0].style.display = "flex";
    setViewSection(<View orderDetail={item} />)
  }

  function editSelected(item) {
    console.log(item);
    // const responce = apiDeleteFun("clients", item._id)
    // if (responce) {
    //   document.getElementsByClassName("textLogin")[0].innerHTML = "Edit Selected"
    //   document.getElementsByClassName("icnSpinner")[0].style = "display: none; margin: auto;"
    // }
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
    console.log(dataSelected);
    dataSelected.forEach(deleteSelected) 
  }

  const apiDeleteFun = async (root, id) => {
    await axios.delete(`../${root}/${id}`, {
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
          <Goback title="Orders" btn={<div></div>}/>
          <div className="top">
            <div className="left">
              <div className='typeLable'>
                <label htmlFor="type">Type Of Search : </label>
              </div>
              <div className='typeInput typeCamion' ref={camionRef}>
                <input type="radio" name="camion" value="CAMION 01" defaultChecked/> CAMION 01
                <input type="radio" name="camion" value="CAMION 02" /> CAMION 02
              </div>
              <div className='typeInput' ref={typeSearchRef}>
                <input type="radio" name="typeSearch" value="clientName" /> Client Name
                <input type="radio" name="typeSearch" value="productListId" /> Product List ID 
                <input type="radio" name="typeSearch" value="date" defaultChecked/> Date 
                <input type="radio" name="typeSearch" value="credit" /> Credit 
                <input type="radio" name="typeSearch" value="check" /> Check 
              </div>
            </div>
            <div className="right">
              <div className="search">
                <input type="date" id="date-input" />
                <input id='search-input' type="text" placeholder='Search...' style={{display:"none"}} />
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
              columns={orderColumns.concat(actionOrderColumn)}
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

export default Order