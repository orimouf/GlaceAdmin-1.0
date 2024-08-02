import React from 'react'
import "./view.scss"

const View = ({ orderDetail }) => {
    const pList = orderDetail.productsOrdered
    const prices = orderDetail.clientPrices.split(":");

    function closeView() {
        document.getElementsByClassName("midel")[0].style.display = "none";
    }

  return (
    <div className="view">
        <div className="left">
            <p><b>Server ID:  </b>{orderDetail._id}</p>
            <p><b>Client ID:  </b>{orderDetail.clientId}</p>
            <p><b>Client Name:  </b>{orderDetail.clientName}</p>
            <p><b>Order Date:  </b>{orderDetail.date}</p>
            <p><b>Order Status:  </b>{orderDetail.isCredit}</p>
            <p><b>Order Check:  </b>{orderDetail.isCheck}</p>
        </div>
        <div className="right">
            <h3>Bon de livraison</h3>
            <div> 
                {(orderDetail !== "Payment" && pList.mini_qty !== "0") ? (<p><b>MINI</b> {pList.mini_qty}*{pList.mini_q_u}*{prices[0]} <b>{parseInt(pList.mini_qty)*parseInt(pList.mini_q_u)*parseInt(prices[0])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.trio_qty !== "0") ? (<p><b>TRIO</b> {pList.trio_qty}*{pList.trio_q_u}*{prices[1]} <b>{parseInt(pList.trio_qty)*parseInt(pList.trio_q_u)*parseInt(prices[1])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.pot_qty !== "0") ? (<p><b>POT</b> {pList.pot_qty}*{pList.pot_q_u}*{prices[2]} <b>{parseInt(pList.pot_qty)*parseInt(pList.pot_q_u)*parseInt(prices[2])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.solo_qty !== "0") ? (<p><b>SOLO</b> {pList.solo_qty}*{pList.solo_q_u}*{prices[3]} <b>{parseInt(pList.solo_qty)*parseInt(pList.solo_q_u)*parseInt(prices[3])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.gini_qty !== "0") ? (<p><b>GINI</b> {pList.gini_qty}*{pList.gini_q_u}*{prices[4]} <b>{parseInt(pList.gini_qty)*parseInt(pList.gini_q_u)*parseInt(prices[4])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.pot_v_qty !== "0") ? (<p><b>POT V</b> {pList.pot_v_qty}*{pList.pot_v_q_u}*{prices[5]} <b>{parseInt(pList.pot_v_qty)*parseInt(pList.pot_v_q_u)*parseInt(prices[5])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.big_qty !== "0") ? (<p><b>BIG</b> {pList.big_qty}*{pList.big_q_u}*{prices[6]} <b>{parseInt(pList.big_qty)*parseInt(pList.big_q_u)*parseInt(prices[6])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.cornito_4_qty !== "0") ? (<p><b>CORNITO 45</b> {pList.cornito_4_qty}*{pList.cornito_4_q_u}*{prices[7]} <b>{parseInt(pList.cornito_4_qty)*parseInt(pList.cornito_4_q_u)*parseInt(prices[7])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.cornito_5_qty !== "0") ? (<p><b>CORNITO 50</b> {pList.cornito_5_qty}*{pList.cornito_5_q_u}*{prices[7]} <b>{parseInt(pList.cornito_5_qty)*parseInt(pList.cornito_5_q_u)*parseInt(prices[7])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.cornito_g_qty !== "0") ? (<p><b>CORNITO GINI</b> {pList.cornito_g_qty}*{pList.cornito_g_q_u}*{prices[8]} <b>{parseInt(pList.cornito_g_qty)*parseInt(pList.cornito_g_q_u)*parseInt(prices[8])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.gofrito_qty !== "0") ? (<p><b>GOFRITO</b> {pList.gofrito_qty}*{pList.gofrito_q_u}*{prices[9]} <b>{parseInt(pList.gofrito_qty)*parseInt(pList.gofrito_q_u)*parseInt(prices[9])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.g8_qty !== "0") ? (<p><b>G8</b> {pList.g8_qty}*{pList.g8_q_u}*{prices[10]} <b>{parseInt(pList.g8_qty)*parseInt(pList.g8_q_u)*parseInt(prices[10])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.gold_qty !== "0") ? (<p><b>GOLD</b> {pList.gold_qty}*{pList.gold_q_u}*{prices[11]} <b>{parseInt(pList.gold_qty)*parseInt(pList.gold_q_u)*parseInt(prices[11])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.skiper_qty !== "0") ? (<p><b>SKIPER</b> {pList.skiper_qty}*{pList.skiper_q_u}*{prices[12]} <b>{parseInt(pList.skiper_qty)*parseInt(pList.skiper_q_u)*parseInt(prices[12])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.scobido_qty !== "0") ? (<p><b>SCOBIDO</b> {pList.scobido_qty}*{pList.scobido_q_u}*{prices[13]} <b>{parseInt(pList.scobido_qty)*parseInt(pList.scobido_q_u)*parseInt(prices[13])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.mini_scobido_qty !== "0") ? (<p><b>MINI SCOBIDO</b> {pList.mini_scobido_qty}*{pList.mini_scobido_q_u}*{prices[14]} <b>{parseInt(pList.mini_scobido_qty)*parseInt(pList.mini_scobido_q_u)*parseInt(prices[14])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.venezia_qty !== "0") ? (<p><b>VENEZIA</b> {pList.venezia_qty}*{pList.venezia_q_u}*{prices[15]} <b>{parseInt(pList.venezia_qty)*parseInt(pList.mini_q_u)*parseInt(prices[15])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_400_q_u !== "0") ? (<p><b>BF 2L</b> {pList.bf_400_q_u}*{prices[16]} <b>{parseInt(pList.bf_400_q_u)*parseInt(prices[16])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_250_q_u !== "0") ? (<p><b>BF 1L</b> {pList.bf_250_q_u}*{prices[17]} <b>{parseInt(pList.bf_250_q_u)*parseInt(prices[17])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_230_q_u !== "0") ? (<p><b>BF 900mL</b> {pList.bf_230_q_u}*{prices[18]} <b>{parseInt(pList.bf_230_q_u)*parseInt(prices[18])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_200_q_u !== "0") ? (<p><b>BF 750mL</b> {pList.bf_200_q_u}*{prices[19]} <b>{parseInt(pList.bf_200_q_u)*parseInt(prices[19])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_150_q_u !== "0") ? (<p><b>BF 0.5L</b> {pList.bf_150_q_u}*{prices[20]} <b>{parseInt(pList.bf_150_q_u)*parseInt(prices[20])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.buch_q_u !== "0") ? (<p><b>BUCH</b> {pList.buch_q_u}*{prices[21]} <b>{parseInt(pList.buch_q_u)*parseInt(prices[21])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.tarte_q_u !== "0") ? (<p><b>TARTE</b> {pList.tarte_q_u}*{prices[22]} <b>{parseInt(pList.tarte_q_u)*parseInt(prices[22])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.mosta_q_u !== "0") ? (<p><b>MOSTA</b> {pList.mosta_q_u}*{prices[23]} <b>{parseInt(pList.mosta_q_u)*parseInt(prices[23])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.misso_q_u !== "0") ? (<p><b>MISSO</b> {pList.misso_q_u}*{prices[24]} <b>{parseInt(pList.misso_q_u)*parseInt(prices[24])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.juliana_q_u !== "0") ? (<p><b>JULIANA</b> {pList.juliana_q_u}*{prices[25]} <b>{parseInt(pList.juliana_q_u)*parseInt(prices[25])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bac_5_q_u !== "0") ? (<p><b>BAC 5L</b> {pList.bac_5_q_u}*{prices[26]} <b>{parseInt(pList.bac_5_q_u)*parseInt(prices[26])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bac_6_q_u !== "0") ? (<p><b>BAC 6L</b> {pList.bac_6_q_u}*{prices[27]} <b>{parseInt(pList.bac_6_q_u)*parseInt(prices[27])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_210_q_u !== "0") ? (<p><b>BF PRM 0.5L</b> {pList.bf_210_q_u}*{prices[28]} <b>{parseInt(pList.bf_210_q_u)*parseInt(prices[28])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_300_q_u !== "0") ? (<p><b>BF PRM 1L</b> {pList.bf_300_q_u}*{prices[29]} <b>{parseInt(pList.bf_300_q_u)*parseInt(prices[29])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bf_330_q_u !== "0") ? (<p><b>BF PRM 1.2L</b> {pList.bf_330_q_u}*{prices[30]} <b>{parseInt(pList.bf_330_q_u)*parseInt(prices[30])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bingo_premium_q_u !== "0") ? (<p><b>BINGO PREMIUM</b> {pList.bingo_premium_q_u}*{prices[31]} <b>{parseInt(pList.bingo_premium_q_u)*parseInt(prices[31])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.selection_q_u !== "0") ? (<p><b>SELECTION</b> {pList.selection_q_u}*{prices[32]} <b>{parseInt(pList.selection_q_u)*parseInt(prices[32])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.pot_prm_qty !== "0") ? (<p><b>POT PRM</b> {pList.pot_prm_qty}*{pList.pot_prm_q_u}*{prices[33]} <b>{parseInt(pList.pot_prm_qty)*parseInt(pList.pot_prm_q_u)*parseInt(prices[33])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.mini_prm_qty !== "0") ? (<p><b>MINI PRM</b> {pList.mini_prm_qty}*{pList.mini_prm_q_u}*{prices[34]} <b>{parseInt(pList.mini_prm_qty)*parseInt(pList.mini_prm_q_u)*parseInt(prices[34])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.cornito_prm_qty !== "0") ? (<p><b>CORNITO PRM</b> {pList.cornito_prm_qty}*{pList.cornito_prm_q_u}*{prices[35]} <b>{parseInt(pList.cornito_prm_qty)*parseInt(pList.cornito_prm_q_u)*parseInt(prices[35])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bingo_prm_qty !== "0") ? (<p><b>BINGO</b> {pList.bingo_prm_qty}*{pList.bingo_prm_q_u}*{prices[36]} <b>{parseInt(pList.bingo_prm_qty)*parseInt(pList.bingo_prm_q_u)*parseInt(prices[36])}</b></p>): ""}
                {(orderDetail !== "Payment" && pList.bloom_prm_qty !== "0") ? (<p><b>BLOOM</b> {pList.bloom_prm_qty}*{pList.bloom_prm_q_u}*{prices[37]} <b>{parseInt(pList.bloom_prm_qty)*parseInt(pList.bloom_prm_q_u)*parseInt(prices[37])}</b></p>): ""}
                {<p style={{borderTop:"1px solid #383737",marginTop: "20px"}}><b>TOTAL</b><b>{orderDetail.totalToPay}</b></p>}
                {<p><b>PAYMENT</b><b>{orderDetail.verssi}</b></p>}
                {<p><b>CREDIT</b><b>{orderDetail.rest}</b></p>}
                {<p style={{color:"green"}}><b>PROFIT</b><b>{orderDetail.profit}</b></p>}
            </div>
        </div>
        <div className='XContainer' onClick={() => closeView()}><button>X</button></div>
    </div>
  )
}

export default View