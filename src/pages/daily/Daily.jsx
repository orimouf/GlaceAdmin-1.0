import React from 'react'
import "./daily.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Chart from "../../components/chart/Chart"
// import List from "../../components/table/Table"
// import Featured from '../../components/featured/featured'
import axios from 'axios'
import { dailyColumns } from "../../datatablesource"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from "react"
import Goback from "../../components/goback/Goback"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SyncIcon from '@mui/icons-material/Sync'
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"

const Daily = () => {
  const apiRef = useGridApiRef()
  const searchRef = useRef(null)
  const typeSearchRef = useRef(null)
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
  const [ arrayOrderData, setArrayOrderData ] = useState([])
  const [ arrayProductListData, setArrayProductListData ] = useState([])
  const [ arrayPaymentData, setArrayPaymentData ] = useState([])
  const [ arrayClientData, setArrayClientData ] = useState([])
  const [ arrayData, setArrayData ] = useState([])
  const [ search, setSearch ] = useState([])
  const [ arrayAllDate, setArrayAllDate ] = useState([])
  const [ typeSearch, setTypeSearche ] = useState("")

  useEffect(function () {

    var arrayOrdersDate = []

    function searchFun(string, type) {
      document.getElementById('SeasonProfit').innerHTML = 0
      var searchArray = arrayOrderData.filter((e) => {
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

      let totalVrs = 0
      searchArray.filter((e) => {
        if (e.verssi !== 0){
          totalVrs += parseInt(e.verssi)
        }
        return e
      })
      document.getElementById('SeasonProfit').innerHTML = totalVrs
      setSearch(searchArray)
    }
  
    const typeValue = event => {
      setTypeSearche(event.target.value)
    }

    const handleClick = event => {
      const searchInput = document.getElementById('search-input')
      const inputValue = searchInput.value
      searchFun(inputValue, typeSearch)
    }

    const fetchClient = async () => {
      await axios.get(`../clients/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => { 
        const clientsData = res.data
        let array = []

        clientsData.clients.map((receive, i) => {
          array.push(receive)
        })
        
        setArrayClientData(array)
        
        // shoe up search bar
        document.getElementsByClassName("icnSpinnerLodingData")[0].style = "display: none;"
        document.getElementById('typeDivId').style.display = "flex"
        document.getElementById('searchDivId').style.display = "flex"
        

      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      });
    }

    const fetchPayment = async () => {
      await axios.get(`../payments/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => { 
        const paymentsData = res.data
        let array = []
        let dateArray = []

        paymentsData.payments.map((receive, i) => {
          dateArray.push(receive.date)
          array.push(receive)
        })
        
        setArrayPaymentData(array)
        var uniqueDate = dateArray.filter(onlyUnique)
        var newDateArray = arrayOrdersDate.concat(uniqueDate)
        var newUniqueDate = newDateArray.filter(onlyUnique)

        var reverseArrayOne = newUniqueDate.map(d => d.split("-").reverse().join('-'))
        var sortByDate = reverseArrayOne.sort((a, b) => {
          var c = new Date(a).getTime();
          var d = new Date(b).getTime();
          return c-d;
        })
        var reverseArrayTow = sortByDate.map(d => d.split("-").reverse().join('-'))

        setArrayAllDate(reverseArrayTow)

        fetchClient()

      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      });
    }

    const fetchProductList = async () => {
      await axios.get(`../allproducts/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => { 
        const productListData = res.data
        let array = []

        productListData.orderedProducts.map((receive, i) => {
          array.push(receive)
        })

        setArrayProductListData(array)
        fetchPayment()

      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      });
    }

    const fetchData = async () => {
      await axios.get(`../orders/`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        let dateArray = []

        data.orders.map((receive, i) => {
          dateArray.push(receive.date)
          array.push(receive)     
        })

        setArrayOrderData(array)
        arrayOrdersDate = dateArray.filter(onlyUnique)
        setArrayAllDate(arrayOrdersDate)

        fetchProductList()
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    }

    // const searchRef_ = searchRef.current
    const typeSearchRef_ = typeSearchRef.current
    // searchRef_.addEventListener('click', handleClick)
    typeSearchRef_.addEventListener('change', typeValue)
    
    if (arrayOrderData.length === 0) {
      fetchData()
    }
    
  }, [accessTokenObj, arrayOrderData, arrayProductListData, arrayPaymentData, arrayClientData, search, typeSearch, arrayOrderData.length])


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
        setArrayOrderData([])
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

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  const handleCamion = event => {
    const searchInput = document.getElementById('search-input')
    const inputValue = searchInput.value
    var seasonProfit = 0
    var SeasonNetAffair = 0
    
    if (inputValue !== "") {
      let array = []

      arrayAllDate.map( (date, i) => {
        
        let dateToShow = ""
        let totalSellToShow = 0
        let dailyPayment = 0
        let totalDailyToShow = 0
        let dailyProfitToShow = 0
        let dailyFeeToShow = 0
        let isCheckToShow = ""

        arrayPaymentData.filter( p => {
          if (p.date === date && p.camion === `CAMION ${inputValue}`) {
            dateToShow = date
            dailyPayment += parseInt(p.verssi)
          }
        })

        arrayOrderData.filter( e => {
          if (e.date === date && e.camion === `CAMION ${inputValue}`) {

            const productList = arrayProductListData.find(pl => pl._id === e.productListId)
            const clientData = arrayClientData.find(c => c.appId === e.clientId)
            let profitOneOrder = calculationProfit(productList, clientData)

            dateToShow = date
            totalSellToShow += parseInt(e.totalToPay)
            totalDailyToShow += parseInt(e.verssi)
            dailyProfitToShow += profitOneOrder
            dailyFeeToShow = 33
            isCheckToShow = (e.isCheck) ? "Check" : "Non Check"

          }
        })

        if (dateToShow !== "") {
          SeasonNetAffair += totalSellToShow
          seasonProfit += dailyProfitToShow
          document.getElementById('SeasonProfit').innerHTML = seasonProfit
          document.getElementById('SeasonNetAffair').innerHTML = SeasonNetAffair
  
          array.push(
            {
              id: i+1,
              date: dateToShow,
              totalSell: totalSellToShow,
              totalDaily: totalDailyToShow + dailyPayment,
              dailyProfit: dailyProfitToShow,
              dailyFee: dailyFeeToShow,
              isCheck: isCheckToShow
            }
          )
        }

      })

      setArrayData(array)

    }
  }

  const calculationProfit = (productList, clientData) => {
    var totalProfit = 0
    var arrayPrices = clientData.prices.split(":")

    if (productList.mini_qty !== "0") {totalProfit += parseInt(productList.mini_qty) * parseInt(productList.mini_q_u) * (parseInt(arrayPrices[0]) - 23)}
    if (productList.trio_qty !== "0") {totalProfit += parseInt(productList.trio_qty) * parseInt(productList.trio_q_u) * (parseInt(arrayPrices[1]) - 23)}
    if (productList.pot_qty !== "0") {totalProfit += parseInt(productList.pot_qty) * parseInt(productList.pot_q_u) * (parseInt(arrayPrices[2]) - 23)}
    if (productList.solo_qty !== "0") {totalProfit += parseInt(productList.solo_qty) * parseInt(productList.solo_q_u) * (parseInt(arrayPrices[3]) - 23)}
    if (productList.gini_qty !== "0") {totalProfit += parseInt(productList.gini_qty) * parseInt(productList.gini_q_u) * (parseInt(arrayPrices[4]) - 37)}
    if (productList.pot_v_qty !== "0") {totalProfit += parseInt(productList.pot_v_qty) * parseInt(productList.pot_v_q_u) * (parseInt(arrayPrices[5]) - 27)}
    if (productList.big_qty !== "0") {totalProfit += parseInt(productList.big_qty) * parseInt(productList.big_q_u) * (parseInt(arrayPrices[6]) - 26)}
    if (productList.cornito_4_qty !== "0") {totalProfit += parseInt(productList.cornito_4_qty) * parseInt(productList.cornito_4_q_u) * (parseInt(arrayPrices[7]) - 41)}
    if (productList.cornito_5_qty !== "0") {totalProfit += parseInt(productList.cornito_5_qty) * parseInt(productList.cornito_5_q_u) * (parseInt(arrayPrices[7]) - 41)}
    if (productList.cornito_g_qty !== "0") {totalProfit += parseInt(productList.cornito_g_qty) * parseInt(productList.cornito_g_q_u) * (parseInt(arrayPrices[8]) - 61)}
    if (productList.gofrito_qty !== "0") {totalProfit += parseInt(productList.gofrito_qty) * parseInt(productList.gofrito_q_u) * (parseInt(arrayPrices[9]) - 26)}
    if (productList.g8_qty !== "0") {totalProfit += parseInt(productList.g8_qty) * parseInt(productList.g8_q_u) * (parseInt(arrayPrices[10]) - 40)}
    if (productList.gold_qty !== "0") {totalProfit += parseInt(productList.gold_qty) * parseInt(productList.gold_q_u) * (parseInt(arrayPrices[11]) - 41)}
    if (productList.skiper_qty !== "0") {totalProfit += parseInt(productList.skiper_qty) * parseInt(productList.skiper_q_u) * (parseInt(arrayPrices[12]) - 54)}
    if (productList.scobido_qty !== "0") {totalProfit += parseInt(productList.scobido_qty) * parseInt(productList.scobido_q_u) * (parseInt(arrayPrices[13]) - 27)}
    if (productList.mini_scobido_qty !== "0") {totalProfit += parseInt(productList.mini_scobido_qty) * parseInt(productList.mini_scobido_q_u) * (parseInt(arrayPrices[14]) - 23)}
    if (productList.venezia_qty !== "0") {totalProfit += parseInt(productList.venezia_qty) * parseInt(productList.venezia_q_u) * (parseInt(arrayPrices[15]) - 29)}
    if (productList.bf_400_q_u !== "0") {totalProfit += parseInt(productList.bf_400_q_u) * (parseInt(arrayPrices[16]) - 215)}
    if (productList.bf_250_q_u !== "0") {totalProfit += parseInt(productList.bf_250_q_u) * (parseInt(arrayPrices[17]) - 210)}
    if (productList.bf_230_q_u !== "0") {totalProfit += parseInt(productList.bf_230_q_u) * (parseInt(arrayPrices[18]) - 200)}
    if (productList.bf_200_q_u !== "0") {totalProfit += parseInt(productList.bf_200_q_u) * (parseInt(arrayPrices[19]) - 170)}
    if (productList.bf_150_q_u !== "0") {totalProfit += parseInt(productList.bf_150_q_u) * (parseInt(arrayPrices[20]) - 110)}
    if (productList.buch_q_u !== "0") {totalProfit += parseInt(productList.buch_q_u) * (parseInt(arrayPrices[21]) - 405)}
    if (productList.tarte_q_u !== "0") {totalProfit += parseInt(productList.tarte_q_u) * (parseInt(arrayPrices[22]) - 405)}
    if (productList.mosta_q_u !== "0") {totalProfit += parseInt(productList.mosta_q_u) * (parseInt(arrayPrices[23]) - 52)}
    if (productList.misso_q_u !== "0") {totalProfit += parseInt(productList.misso_q_u) * (parseInt(arrayPrices[24]) - 44)}
    if (productList.juliana_q_u !== "0") {totalProfit += parseInt(productList.juliana_q_u) * (parseInt(arrayPrices[25]) - 72)}
    if (productList.bac_5_q_u !== "0") {totalProfit += parseInt(productList.bac_5_q_u) * (parseInt(arrayPrices[26]) - 800)}
    if (productList.bac_6_q_u !== "0") {totalProfit += parseInt(productList.bac_6_q_u) * (parseInt(arrayPrices[27]) - 900)}
    if (productList.bf_210_q_u !== "0") {totalProfit += parseInt(productList.bf_210_q_u) * (parseInt(arrayPrices[28]) - 175)}
    if (productList.bf_300_q_u !== "0") {totalProfit += parseInt(productList.bf_300_q_u) * (parseInt(arrayPrices[29]) - 260)}
    if (productList.bf_330_q_u !== "0") {totalProfit += parseInt(productList.bf_330_q_u) * (parseInt(arrayPrices[30]) - 300)}
    if (productList.bingo_premium_q_u !== "0") {totalProfit += parseInt(productList.bingo_premium_q_u) * (parseInt(arrayPrices[31]) - 240)}
    if (productList.selection_q_u !== "0") {totalProfit += parseInt(productList.selection_q_u) * (parseInt(arrayPrices[32]) - 260)}
    if (productList.pot_prm_qty !== "0") {totalProfit += parseInt(productList.pot_prm_qty) * parseInt(productList.pot_prm_q_u) * (parseInt(arrayPrices[33]) - 28)}
    if (productList.mini_prm_qty !== "0") {totalProfit += parseInt(productList.mini_prm_qty) * parseInt(productList.mini_prm_q_u) * (parseInt(arrayPrices[34]) - 28)}
    if (productList.cornito_prm_qty !== "0") {totalProfit += parseInt(productList.cornito_prm_qty) * parseInt(productList.cornito_prm_q_u) * (parseInt(arrayPrices[35]) - 45)}
    if (productList.bingo_prm_qty !== "0") {totalProfit += parseInt(productList.bingo_prm_qty) * parseInt(productList.bingo_prm_q_u) * (parseInt(arrayPrices[36]) - 40)}
    if (productList.bloom_prm_qty !== "0") {totalProfit += parseInt(productList.bloom_prm_qty) * parseInt(productList.bloom_prm_q_u) * (parseInt(arrayPrices[37]) - 35)} 

    return totalProfit
  }

  const actionDailyColumn = [
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
    <div className="daily">
      <Sidebar />
      <div className="dailyContainer">
        <Navbar/>
        <Goback title="Daily Journal" btn={<div></div>}/>
        <div className="top">
          <div className="left">
            <div className='typeLable'>
              <label htmlFor="type">Type Of Search : </label>
            </div>
            <div id='typeDivId' className='typeInput' ref={typeSearchRef} style={{display: "none"}}>
              <input type="radio" name="typeSearch" value="appId" /> App ID
              <input type="radio" name="typeSearch" value="clientName" /> Client Name
              <input type="radio" name="typeSearch" value="clientId" /> Client ID
              <input type="radio" name="typeSearch" value="productListId" /> Product List ID 
              <input type="radio" name="typeSearch" value="date" /> Date 
              <input type="radio" name="typeSearch" value="credit" /> Credit 
              <input type="radio" name="typeSearch" value="check" /> Check 
            </div>
          </div>
          <div className="right">
            <div id='searchDivId' className="search" style={{display: "none"}}>
              <input id='search-input' type="text" placeholder='Search...' />
              <SearchOutlinedIcon onClick={handleCamion} id="search-button" />
            </div>
            <span className="loadingData"><SyncIcon className="icnSpinnerLodingData" /></span>
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
            <div className="totalContainer">
              <div className="seasonContainer"><b>Season Net affair : </b><b id='SeasonNetAffair'>0</b><i>.00 Da</i></div>
              <div className="seasonContainer"><b>Season Profit : </b><b id='SeasonProfit'>0</b><i>.00 Da</i></div>
              <div className="seasonContainer"><b>Season Fees : </b><b id='SeasonFees'>0</b><i>.00 Da</i></div>
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
          {/* <List data={arrayOrderData} packageInfo={packageInfo} /> */}
          <DataGrid
            apiRef={apiRef}
            className="datagrid"
            rows={arrayData}
            columns={dailyColumns.concat(actionDailyColumn)}
            pageSize={12}
            rowsPerPageOptions={[12]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}

export default Daily