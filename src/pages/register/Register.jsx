import React from 'react'
import "./register.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Chart from "../../components/chart/Chart"
// import List from "../../components/table/Table"
// import Featured from '../../components/featured/featured'
import axios from 'axios'
import { registerColumns, purchasePrices } from "../../datatablesource"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { useState, useEffect, useRef } from "react"
import Goback from "../../components/goback/Goback"
import Loading from '../../components/loading/Loading'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SyncIcon from '@mui/icons-material/Sync'
import { TopPopUpMsg } from "../../components/popupmsg/js/topmsg"
import View from '../../components/view/View'

const Register = () => {
  const apiRef = useGridApiRef()
  const searchRef = useRef(null)
  const typeSearchRef = useRef(null)
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken
  const [ loadingStatus, setLoadingStatus ] = useState(true)
  const [ arrayData, setArrayData ] = useState([])
  const [ search, setSearch ] = useState([])
  const [ viewSection, setViewSection ] = useState(null)
  const [ dailyData, setDailyData ] = useState([])

  useEffect(function () {

    function searchFun(searchArray) {
      
      document.getElementById('totalPaymentShow').innerHTML = "0 DA";
      document.getElementById('totalCreditShow').innerHTML = "0 DA";
      document.getElementById('totalCapitalShow').innerHTML = "0 DA";
      document.getElementById('totalProfitShow').innerHTML = "0 DA";

      let totalPayment = 0
      let totalCredit = 0
      let totalCapital = 0
      let totalProfit = 0

      searchArray.filter((e) => {
        totalPayment += parseFloat(e.dailyPayment)
        totalCredit += parseFloat(e.dailyCredit)
        totalCapital += parseFloat(e.dailyCapital)
        totalProfit += parseFloat(e.dailyProfit)
        return e
      })

      document.getElementById('totalPaymentShow').innerHTML = totalPayment + ".00 DA";
      document.getElementById('totalCreditShow').innerHTML = totalCredit + ".00 DA";
      document.getElementById('totalCapitalShow').innerHTML = totalCapital + ".00 DA";
      document.getElementById('totalProfitShow').innerHTML = totalProfit + ".00 DA";

      setLoadingStatus(false)
    }

    const handleClick = event => {
      setLoadingStatus(true)
      var searchInputOne = document.getElementById('date-input-one')
      var searchInputTwo = document.getElementById('date-input-two')
      
      const searchDateOne = searchInputOne.value.split('-').reverse().join('-')
      const searchDateTwo = searchInputTwo.value.split('-').reverse().join('-')
      fetchData(`${searchDateOne}*${searchDateTwo}`)
    }

    const fetchData = async (date) => {
      await axios.get(`../orders/ordresJoin/all/${date}`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        let id = 0
        
        data.arr.map((receive, i) => {

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
                 
        }).then(fetchPaymentsData(id, array, date))
        
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      });
    }

    const fetchPaymentsData = async (id, arrayDataOrders, date) => {
      await axios.get(`../payments/date/${date}`, {
        headers: { token: `Bearer ${accessTokenObj}` }
      })
      .then(res => {
        const data = res.data
        let array = []
        id = id + 1
        
        data.payments.map((receive) => {
          
            array.push(
              {
                id: id+1,
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

          setArrayData(arrayDataOrders.concat(array))
          
        }).then(dailyDataFun(arrayDataOrders.concat(array)))
        
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

    function dailyDataFun (arrayData) {
      
      var dateArray = []
      var allDailyArray = []
      arrayData.map(ar => {
        let checkDate = dateArray.find(ele => (ele.date === ar.date && ele.camion === ar.camion) ? true : false)
        if (!checkDate) {dateArray.push({
          camion: ar.camion,
          date: ar.date
        })}
      })

      dateArray.map((eleDate, i) => {
        let totalPayment = 0
        let totalCredit = 0
        let totalCapital = 0
        
        var dailyData = arrayData.filter(ele => {
          if(ele.date === eleDate.date && ele.camion === eleDate.camion) {
            if (ele.verssi !== 0){ totalPayment += parseFloat(ele.verssi) }
            if (ele.rest !== 0){ totalCredit += parseFloat(ele.rest) }
            if (ele.isCredit !== "Payment") {
              totalCapital += parseFloat(ele.totalToPay)
            }
            
            return ele
          } else {
            return null;
          }
        })
        const totalProfit = profitCalcul(dailyData)

        allDailyArray.push(
          {
            id: i+1,
            date: eleDate.date,
            dailyCapital: totalCapital,
            dailyPayment: totalPayment,
            dailyCredit: totalCredit,
            dailyProfit: totalProfit,
            dailyFees: 0,
            dailyWorkers: "amir, islam",
            camion: eleDate.camion
          }
        )
      })

      // sorting allDailyArray by date in reversing date from 01-01-2024 to 2024-01-01 
      allDailyArray.sort((a,b)=> Date.parse(a.date.split('-').reverse().join('-')) - Date.parse(b.date.split('-').reverse().join('-')));

      searchFun(allDailyArray)

      setDailyData(allDailyArray)
      setSearch(allDailyArray)
      
    }

    const searchRef_ = searchRef.current
    searchRef_.addEventListener('click', handleClick)
    
    if (arrayData.length === 0) {
      fetchData('10-05-2024*15-05-2024')
    }

  }, [accessTokenObj, arrayData, search, arrayData.length, dailyData])

  
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

  const actionRegisterColumn = [
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
    <div className="register">
      <Sidebar />
      <div className="registerContainer">
        <Navbar/>
        <div className='mainContainer'>
          <Loading status={loadingStatus} page={"setProduct"} />
          <Goback title="Register" btn={<div></div>}/>
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
              <div className='searchForm'>
                <div className="search">
                  <input type="date" id="date-input-one" />
                </div>
                <div className="search">
                  <input type="date" id="date-input-two" />
                </div>
                <button type='button' className="searchBtn" ref={searchRef} id="search-button"> <SearchOutlinedIcon /> <b>Search</b></button>
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
              columns={registerColumns.concat(actionRegisterColumn)}
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

export default Register