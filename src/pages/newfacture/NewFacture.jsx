import React from 'react'
import "./newFacture.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// import { useState } from "react";
import axios from 'axios';
import SyncIcon from '@mui/icons-material/Sync';
import Goback from "../../components/goback/Goback";
import { useSnackbar } from 'notistack'

const NewFacture = ({ inputs, title }) => {

  // const [ file, setFile ] = useState("")
  const { enqueueSnackbar } = useSnackbar();
  const accessTokenObj = JSON.parse(localStorage.getItem('user')).accessToken  

  const handleClickVariant = (msg ,variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    let jsonData = {}
    let statusFacture = false

    if (e.target[2].value === "true") statusFacture = true
    jsonData = {
      factureNumber: e.target[0].value, gini_qty: e.target[10].value, scobido_qty: e.target[20].value, mosta_q_u: e.target[30].value, cornito_prm_qty: e.target[40].value,
      factureName: e.target[1].value, big_qty: e.target[11].value, mini_scobido_qty: e.target[21].value, misso_q_u: e.target[31].value, bingo_prm_qty: e.target[41].value,
      statusPayment: statusFacture, cornito_4_qty: e.target[12].value, venezia_qty: e.target[22].value, juliana_q_u: e.target[32].value, mini_prm_qty: e.target[42].value,
      factureTotal: e.target[3].value, cornito_5_qty: e.target[13].value, bf_400_q_u: e.target[23].value, bac_5_q_u: e.target[33].value, pot_prm_qty: e.target[43].value,
      facturePayment: e.target[4].value, cornito_g_qty: e.target[14].value, bf_250_q_u: e.target[24].value, bac_6_q_u: e.target[34].value, bloom_prm_qty: e.target[44].value,
      factureRest: e.target[5].value, gofrito_qty: e.target[15].value, bf_230_q_u: e.target[25].value, bf_210_q_u: e.target[35].value, factureDate: e.target[45].value,
      mini_qty: e.target[6].value, pot_v_qty: e.target[16].value, bf_200_q_u: e.target[26].value, bf_300_q_u: e.target[36].value,
      trio_qty: e.target[7].value, g8_qty: e.target[17].value, bf_150_q_u: e.target[27].value, bf_330_q_u: e.target[37].value,
      solo_qty: e.target[8].value, gold_qty: e.target[18].value, buch_q_u: e.target[28].value, bingo_premium_q_u: e.target[38].value,
      pot_qty: e.target[9].value, skiper_qty: e.target[19].value, tarte_q_u: e.target[29].value, selection_q_u: e.target[39].value
    }
      
    if (e.target[0].value && e.target[1].value && e.target[2].value && e.target[3].value && e.target[4].value && e.target[5].value && e.target[45].value ) {
      e.target[46].style = "pointer-events: none; opacity: 0.7;"
        e.target[46].children[0].style.display = "none"
        e.target[46].children[1].style.display = "block"
        
        await axios.post(`/factures`, jsonData, {
          headers: { token: `Bearer ${accessTokenObj}`}
        })
        .then(res => {
          const facture = res.data;
          document.getElementById("msgRequest").style.display = "none"    
          // popup msg delete success with snackbar
          handleClickVariant(` ${facture.factureName}  --  Facture Added successfully.`, 'success')   
          e.target.reset()
        
        }) 
        .catch(function (error) {
          if (error.response) {
            handleClickVariant(`ERROR ${error.response.statusText} -- ${error.response.status}.`, 'error')
            console.log(error.response);
          }
        });

        e.target[46].style = ""
        e.target[46].children[0].style.display = "block"
        e.target[46].children[1].style.display = "none"
  
    } else {
      e.target[0].value ? e.target[0].style.borderBottom = "1px solid gray" : e.target[0].style.borderBottom = "2px solid red"
      e.target[1].value ? e.target[1].style.borderBottom = "1px solid gray" : e.target[1].style.borderBottom = "2px solid red"
      e.target[2].value ? e.target[2].style.borderBottom = "1px solid gray" : e.target[2].style.borderBottom = "2px solid red"
      e.target[3].value ? e.target[3].style.borderBottom = "1px solid gray" : e.target[3].style.borderBottom = "2px solid red"
      e.target[4].value ? e.target[4].style.borderBottom = "1px solid gray" : e.target[4].style.borderBottom = "2px solid red"
      e.target[5].value ? e.target[5].style.borderBottom = "1px solid gray" : e.target[5].style.borderBottom = "2px solid red"
      e.target[45].value ? e.target[45].style.borderBottom = "1px solid gray" : e.target[45].style.borderBottom = "2px solid red"
    }

  }

  return (
    <div className="newFacture">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Goback className="topBack" title={<h1>Add New {title}</h1>} btn={<div></div>} />
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>

              {inputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} defaultValue={input.defaultValue} />
                  </div>
                )
              })}

              {/* {title === "User" && 
                // return (
                  <div className="formInput checkbox">
                    <div className="checkbox">
                      <input type="checkbox" id="checkboxAdmin" name="checkboxAdmin" value="Admin"></input>
                      <label>Is Admin</label>
                    </div> 
                  </div>
                // )
              } */}
              <div className="formInput"><span id="msgRequest"></span></div>
              

              <div className="formInput">
                <button className="sendBtn">
                  <b>Send</b> 
                  <div><SyncIcon className="icnSpinner" /></div></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewFacture