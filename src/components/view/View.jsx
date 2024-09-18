import React from 'react'
import "./view.scss"

const View = ({ orderDetail, viewType }) => {
    const arrayPurchasePrices = {
        "omar" : [21.13,0,21.13,0,0,0,0,37.8,0,0,0,36.75,0,0,0,0,0,166,168,105,94.5,0,0,42.63,40.425,49.35,0,0,0,0,0,0,0,0,0,0,0,0],
        "lamine" : [22.5,22.5,22.5,23,37,28,30,40.5,61,26,41,40.5,54,25,0,22.5,0,205,160,120,105,400,400,52,43,69,800,800,150,210,280,240,260,28,22.5,45,40,35],
        "gini" : [0,0,0,0,38,0,0,0,63,0,0,0,58,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "gelato" : [21.5,42,0,21,0,0,28,0,0,0,38,0,0,25,18,0,210,205,0,0,111,0,0,0,43,69,700,0,0,0,0,0,0,0,0,0,0,0]
    }
    const pList = (viewType !== "Facture") ? orderDetail.productsOrdered : orderDetail.productList
    const prices = (viewType !== "Facture") ? orderDetail.clientPrices.split(":") :
     (orderDetail.factureName === "gelato") ? arrayPurchasePrices.gelato : 
     (orderDetail.factureName === "omar") ? arrayPurchasePrices.omar :
     (orderDetail.factureName === "lamine") ? arrayPurchasePrices.lamine : arrayPurchasePrices.gini

    function closeView() {
        document.getElementsByClassName("midel")[0].style.display = "none";
    }

  return (
    <div className="view">
        {(viewType !== "Facture") ? (
        <>
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
        </>
        ) : (
        <>
            <div className="left">
                <p><b>Server ID:  </b>{orderDetail._id}</p>
                <p><b>Facture ID:  </b>{orderDetail.factureNumber}</p>
                <p><b>Facture Name:  </b>{orderDetail.factureName}</p>
                <p><b>Facture Date:  </b>{orderDetail.factureDate}</p>
                <p><b>Facture Status:  </b>{orderDetail.statusPayment}</p>
            </div>
            <div className="right">
                <h3>Facture</h3>
                <div> 
                    {(pList.mini_qty !== "0") ? (<p><b>MINI</b> {pList.mini_qty}*{prices[0]} <b>{parseFloat(pList.mini_qty)*parseFloat(prices[0])}</b></p>): ""}
                    {(pList.trio_qty !== "0") ? (<p><b>TRIO</b> {pList.trio_qty}*{prices[1]} <b>{parseFloat(pList.trio_qty)*parseFloat(prices[1])}</b></p>): ""}
                    {(pList.pot_qty !== "0") ? (<p><b>POT</b> {pList.pot_qty}*{prices[2]} <b>{parseFloat(pList.pot_qty)*parseFloat(prices[2])}</b></p>): ""}
                    {(pList.solo_qty !== "0") ? (<p><b>SOLO</b> {pList.solo_qty}*{prices[3]} <b>{parseFloat(pList.solo_qty)*parseFloat(prices[3])}</b></p>): ""}
                    {(pList.gini_qty !== "0") ? (<p><b>GINI</b> {pList.gini_qty}*{prices[4]} <b>{parseFloat(pList.gini_qty)*parseFloat(prices[4])}</b></p>): ""}
                    {(pList.pot_v_qty !== "0") ? (<p><b>POT V</b> {pList.pot_v_qty}*{prices[5]} <b>{parseFloat(pList.pot_v_qty)*parseFloat(prices[5])}</b></p>): ""}
                    {(pList.big_qty !== "0") ? (<p><b>BIG</b> {pList.big_qty}*{prices[6]} <b>{parseFloat(pList.big_qty)*parseFloat(prices[6])}</b></p>): ""}
                    {(pList.cornito_4_qty !== "0") ? (<p><b>CORNITO 45</b> {pList.cornito_4_qty}*{prices[7]} <b>{parseFloat(pList.cornito_4_qty)*parseFloat(prices[7])}</b></p>): ""}
                    {(pList.cornito_5_qty !== "0") ? (<p><b>CORNITO 50</b> {pList.cornito_5_qty}*{prices[7]} <b>{parseFloat(pList.cornito_5_qty)*parseFloat(prices[7])}</b></p>): ""}
                    {(pList.cornito_g_qty !== "0") ? (<p><b>CORNITO GINI</b> {pList.cornito_g_qty}*{prices[8]} <b>{parseFloat(pList.cornito_g_qty)*parseFloat(prices[8])}</b></p>): ""}
                    {(pList.gofrito_qty !== "0") ? (<p><b>GOFRITO</b> {pList.gofrito_qty}*{prices[9]} <b>{parseFloat(pList.gofrito_qty)*parseFloat(prices[9])}</b></p>): ""}
                    {(pList.g8_qty !== "0") ? (<p><b>G8</b> {pList.g8_qty}*{prices[10]} <b>{parseFloat(pList.g8_qty)*parseFloat(prices[10])}</b></p>): ""}
                    {(pList.gold_qty !== "0") ? (<p><b>GOLD</b> {pList.gold_qty}*{prices[11]} <b>{parseFloat(pList.gold_qty)*parseFloat(prices[11])}</b></p>): ""}
                    {(pList.skiper_qty !== "0") ? (<p><b>SKIPER</b> {pList.skiper_qty}*{prices[12]} <b>{parseFloat(pList.skiper_qty)*parseFloat(prices[12])}</b></p>): ""}
                    {(pList.scobido_qty !== "0") ? (<p><b>SCOBIDO</b> {pList.scobido_qty}*{prices[13]} <b>{parseFloat(pList.scobido_qty)*parseFloat(prices[13])}</b></p>): ""}
                    {(pList.mini_scobido_qty !== "0") ? (<p><b>MINI SCOBIDO</b> {pList.mini_scobido_qty}*{prices[14]} <b>{parseFloat(pList.mini_scobido_qty)*parseFloat(prices[14])}</b></p>): ""}
                    {(pList.venezia_qty !== "0") ? (<p><b>VENEZIA</b> {pList.venezia_qty}*{prices[15]} <b>{parseFloat(pList.venezia_qty)*parseFloat(prices[15])}</b></p>): ""}
                    {(pList.bf_400_q_u !== "0") ? (<p><b>BF 2L</b> {pList.bf_400_q_u}*{prices[16]} <b>{parseFloat(pList.bf_400_q_u)*parseFloat(prices[16])}</b></p>): ""}
                    {(pList.bf_250_q_u !== "0") ? (<p><b>BF 1L</b> {pList.bf_250_q_u}*{prices[17]} <b>{parseFloat(pList.bf_250_q_u)*parseFloat(prices[17])}</b></p>): ""}
                    {(pList.bf_230_q_u !== "0") ? (<p><b>BF 900mL</b> {pList.bf_230_q_u}*{prices[18]} <b>{parseFloat(pList.bf_230_q_u)*parseFloat(prices[18])}</b></p>): ""}
                    {(pList.bf_200_q_u !== "0") ? (<p><b>BF 750mL</b> {pList.bf_200_q_u}*{prices[19]} <b>{parseFloat(pList.bf_200_q_u)*parseFloat(prices[19])}</b></p>): ""}
                    {(pList.bf_150_q_u !== "0") ? (<p><b>BF 0.5L</b> {pList.bf_150_q_u}*{prices[20]} <b>{parseFloat(pList.bf_150_q_u)*parseFloat(prices[20])}</b></p>): ""}
                    {(pList.buch_q_u !== "0") ? (<p><b>BUCH</b> {pList.buch_q_u}*{prices[21]} <b>{parseFloat(pList.buch_q_u)*parseFloat(prices[21])}</b></p>): ""}
                    {(pList.tarte_q_u !== "0") ? (<p><b>TARTE</b> {pList.tarte_q_u}*{prices[22]} <b>{parseFloat(pList.tarte_q_u)*parseFloat(prices[22])}</b></p>): ""}
                    {(pList.mosta_q_u !== "0") ? (<p><b>MOSTA</b> {pList.mosta_q_u}*{prices[23]} <b>{parseFloat(pList.mosta_q_u)*parseFloat(prices[23])}</b></p>): ""}
                    {(pList.misso_q_u !== "0") ? (<p><b>MISSO</b> {pList.misso_q_u}*{prices[24]} <b>{parseFloat(pList.misso_q_u)*parseFloat(prices[24])}</b></p>): ""}
                    {(pList.juliana_q_u !== "0") ? (<p><b>JULIANA</b> {pList.juliana_q_u}*{prices[25]} <b>{parseFloat(pList.juliana_q_u)*parseFloat(prices[25])}</b></p>): ""}
                    {(pList.bac_5_q_u !== "0") ? (<p><b>BAC 5L</b> {pList.bac_5_q_u}*{prices[26]} <b>{parseFloat(pList.bac_5_q_u)*parseFloat(prices[26])}</b></p>): ""}
                    {(pList.bac_6_q_u !== "0") ? (<p><b>BAC 6L</b> {pList.bac_6_q_u}*{prices[27]} <b>{parseFloat(pList.bac_6_q_u)*parseFloat(prices[27])}</b></p>): ""}
                    {(pList.bf_210_q_u !== "0") ? (<p><b>BF PRM 0.5L</b> {pList.bf_210_q_u}*{prices[28]} <b>{parseFloat(pList.bf_210_q_u)*parseFloat(prices[28])}</b></p>): ""}
                    {(pList.bf_300_q_u !== "0") ? (<p><b>BF PRM 1L</b> {pList.bf_300_q_u}*{prices[29]} <b>{parseFloat(pList.bf_300_q_u)*parseFloat(prices[29])}</b></p>): ""}
                    {(pList.bf_330_q_u !== "0") ? (<p><b>BF PRM 1.2L</b> {pList.bf_330_q_u}*{prices[30]} <b>{parseFloat(pList.bf_330_q_u)*parseFloat(prices[30])}</b></p>): ""}
                    {(pList.bingo_premium_q_u !== "0") ? (<p><b>BINGO PREMIUM</b> {pList.bingo_premium_q_u}*{prices[31]} <b>{parseFloat(pList.bingo_premium_q_u)*parseFloat(prices[31])}</b></p>): ""}
                    {(pList.selection_q_u !== "0") ? (<p><b>SELECTION</b> {pList.selection_q_u}*{prices[32]} <b>{parseFloat(pList.selection_q_u)*parseFloat(prices[32])}</b></p>): ""}
                    {(pList.pot_prm_qty !== "0") ? (<p><b>POT PRM</b> {pList.pot_prm_qty}*{prices[33]} <b>{parseFloat(pList.pot_prm_qty)*parseFloat(prices[33])}</b></p>): ""}
                    {(pList.mini_prm_qty !== "0") ? (<p><b>MINI PRM</b> {pList.mini_prm_qty}*{prices[34]} <b>{parseFloat(pList.mini_prm_qty)*parseFloat(prices[34])}</b></p>): ""}
                    {(pList.cornito_prm_qty !== "0") ? (<p><b>CORNITO PRM</b> {pList.cornito_prm_qty}*{prices[35]} <b>{parseFloat(pList.cornito_prm_qty)*parseFloat(prices[35])}</b></p>): ""}
                    {(pList.bingo_prm_qty !== "0") ? (<p><b>BINGO</b> {pList.bingo_prm_qty}*{prices[36]} <b>{parseFloat(pList.bingo_prm_qty)*parseFloat(prices[36])}</b></p>): ""}
                    {(pList.bloom_prm_qty !== "0") ? (<p><b>BLOOM</b> {pList.bloom_prm_qty}*{prices[37]} <b>{parseFloat(pList.bloom_prm_qty)*parseFloat(prices[37])}</b></p>): ""}
                    {<p style={{borderTop:"1px solid #383737",marginTop: "20px"}}><b>TOTAL</b><b>{orderDetail.factureTotal}</b></p>}
                    {<p><b>PAYMENT</b><b>{orderDetail.facturePayment}</b></p>}
                    {<p><b>CREDIT</b><b>{orderDetail.factureRest}</b></p>}
                </div>
            </div>
        </>
            
        )}

        
        
    
        
        <div className='XContainer' onClick={() => closeView()}><button>X</button></div>
    </div>
  )
}

export default View