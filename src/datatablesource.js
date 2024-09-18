import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

// Purchase Prices
export const purchasePrices = {
    bac_5_q_u: 700,
    bac_6_q_u: 800, // lamin price
    bf_150_q_u: 105, // lamin price
    bf_200_q_u: 120, // lamin price
    bf_210_q_u: 150, // lamin price
    bf_230_q_u: 160, // lamin price
    bf_250_q_u: 210, // lamin price
    bf_300_q_u: 210, // lamin price
    bf_330_q_u: 280, // old price
    bf_400_q_u: 210,
    big_q_u: 30, // lamin price
    bingo_premium_q_u: 240, // old price
    bingo_prm_q_u: 40, // old price
    bloom_prm_q_u: 35, // old price
    buch_q_u: 405, // old price
    cornito_4_q_u: 40.5, // lamin price
    cornito_5_q_u: 40.5, // lamin price
    cornito_g_q_u: 61, // lamin price
    cornito_prm_q_u: 45, // old price
    g8_q_u: 38, // gelato price
    gini_q_u: 37, // lamin price
    gofrito_q_u: 26, // lamin price
    gold_q_u: 40.5, // lamin price
    juliana_q_u: 69, // gelato price
    mini_prm_q_u: 22.5, // lamin price
    mini_q_u: 22.5, // lamin price
    mini_scobido_q_u: 18, // gelato price
    misso_q_u: 43, // lamin price
    mosta_q_u: 52, // lamin price
    pot_prm_q_u: 28, // lamin price
    pot_q_u: 22.5, // lamin price
    pot_v_q_u: 28, // old price
    scobido_q_u: 25, // gelato price
    selection_q_u: 260, // old price
    skiper_q_u: 54, // lamin price
    solo_q_u: 21, // gelato price
    tarte_q_u: 400, // lamin price
    trio_q_u: 22.5, // lamin price
    venezia_q_u: 22.5 // lamin price
}

//temporary data
export const userColumns = [
    { field: "_id", headerName: "ID", width: 250},
    { field: "fullName", headerName: "User Full Name", width: 220, 
    renderCell: (params)=> {
        return (
            <div className="cellWithImg">
                {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
                <AccountCircleIcon className='userIcon' />
                {params.row.fullName}
            </div>
        )
    }},
    { field: "email", headerName: "Email", width: 160 },
    { field: "country", headerName: "Country", width: 140 },
    { field: "isAdmin", headerName: "IS", width: 80 },
    { field: "status", headerName: "Status", width: 80, 
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
        )
    } }

]

export const investorColumns = [
    { field: "_id", headerName: "ID", width: 230},
    { field: "user", headerName: "Investor Full Name", width: 180, 
    renderCell: (params)=> {
        return (
            <div className="cellWithImg">
                {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
                <AccountCircleIcon className='userIcon' />
                {params.row.fullName}
            </div>
        )
    }},
    { field: "telegram", headerName: "Telegram", width: 140 },
    { field: "capitalAmount", headerName: "Capital", width: 80 },
    { field: "status", headerName: "Status", width: 80, 
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
        )
    } }

]

export const packageColumns = []

export const clientColumns = [
    { field: "id", headerName: "ID", width: 60},
    { field: "_id", headerName: "Client ID", width: 60},
    { field: "appId", headerName: "App ID", width: 60},
    { field: "clientName", headerName: "Client Name", width: 150},
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "region", headerName: "Region", width: 120},
    { field: "prices", headerName: "Prices", width: 120 },
    { field: "oldCredit", headerName: "Old Credit", width: 100},
    { field: "creditBon", headerName: "Bon Credit", width: 100},
    { field: "lastServe", headerName: "Last Serve", width: 100},
    { field: "isCredit", headerName: "Credit", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.isCredit}`}>{params.row.isCredit}</div>
        )
    }},
    { field: "isFrigo", headerName: "Frigo", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.isFrigo}`}>{params.row.isFrigo}</div>
        )
    }},
    { field: "isPromo", headerName: "Promo", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.isPromo}`}>{params.row.isPromo}</div>
        )
    }}
]

export const registerColumns = [
    { field: "id", headerName: "ID", width: 60},
    { field: "date", headerName: "Date", width: 100},
    { field: "camion", headerName: "Camion", width: 100},
    { field: "dailyCapital", headerName: "Daily Capital", width: 150},
    { field: "dailyPayment", headerName: "Daily Payment", width: 120 },
    { field: "dailyCredit", headerName: "Daily Credit", width: 120},
    { field: "dailyProfit", headerName: "Daily Profit", width: 120 },
    { field: "dailyWorkers", headerName: "Daily Workers", width: 150},
    { field: "dailyFees", headerName: "Daily Fees", width: 300}
]

export const CreditListColumns = [
    { field: "id", headerName: "ID", width: 60},
    { field: "clientName", headerName: "Client Name", width: 180},
    { field: "_id", headerName: "Client ID", width: 140},
    { field: "camion", headerName: "Camion", width: 120},
    { field: "allCapital", headerName: "All Capital", width: 120},
    { field: "allPayment", headerName: "All Payment", width: 120 },
    { field: "allCredit", headerName: "All Credit", width: 120},
    { field: "numberOrder", headerName: "N° Order", width: 100 },
    { field: "numberPayment", headerName: "N° Payment", width: 100}
]

export const orderColumns = [
    { field: "id", headerName: "ID", width: 60},
    { field: "_id", headerName: "Order ID", width: 80},
    { field: "appId", headerName: "App ID", width: 60},
    { field: "clientName", headerName: "Client Name", width: 150},
    { field: "clientId", headerName: "Client ID", width: 120 },
    { field: "productListId", headerName: "ProductList ID", width: 120},
    { field: "totalToPay", headerName: "Total To Pay", width: 120 },
    { field: "verssi", headerName: "Verssi", width: 100},
    { field: "rest", headerName: "Rest", width: 100},
    { field: "profit", headerName: "Profit", width: 100},
    { field: "date", headerName: "Date", width: 100},
    { field: "isCredit", headerName: "Credit", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.isCredit}`}>{params.row.isCredit}</div>
        )
    }},
    { field: "isCheck", headerName: "Check", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.isFrigo}`}>{params.row.isCheck}</div>
        )
    }}
]

export const factureColumns = [
    { field: "id", headerName: "ID", width: 60},
    { field: "_id", headerName: "Order ID", width: 80},
    { field: "factureNumber", headerName: "Facture Number", width: 60},
    { field: "factureName", headerName: "Facture Name", width: 150},
    { field: "productList", headerName: "Product List", width: 120},
    { field: "factureTotal", headerName: "Facture Amante", width: 120 },
    { field: "facturePayment", headerName: "Facture Payment", width: 100},
    { field: "factureRest", headerName: "Facture Rest", width: 100},
    { field: "factureDate", headerName: "Facture Date", width: 100},
    { field: "statusPayment", headerName: "Status Payment", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.statusPayment}`}>{params.row.statusPayment}</div>
        )
    }}
]

export const dailyColumns = [
    { field: "id", headerName: "ID", width: 60},
    { field: "date", headerName: "Date", width: 100},
    { field: "totalSell", headerName: "Total Sell", width: 150},
    { field: "totalDaily", headerName: "Total Daily", width: 150},
    { field: "dailyProfit", headerName: "Daily Profit", width: 120},
    { field: "dailyFee", headerName: "Daily Fees", width: 120 },
    { field: "isCheck", headerName: "Check", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.isFrigo}`}>{params.row.isCheck}</div>
        )
    }}
]

export const weeklyProfitColumns = [
    { field: "_id", headerName: "ID", width: 220},
    { field: "weekStart", headerName: "Week Start", width: 180},
    { field: "weekEnd", headerName: "Week End", width: 180 },
    { field: "profitPorcent", headerName: "Percentage", width: 100,
    renderCell:(params)=>{
        return(
            <div className={`cellWithPercentage`}>{params.row.profitRatio} %</div>
        )
    }},
    { field: "status", headerName: "Status", width: 120, 
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
        )
    }}
]

export const withdrawalColumns = [
    { field: "id", headerName: "ID", width: 300},
    { field: "profitPorcent", headerName: "Percentage", width: 200,
    renderCell:(params)=>{
        return(
            <div className={`cellWithPercentage`}>{params.row.profitPorcent} %</div>
        )
    }},
    { field: "status", headerName: "Status", width: 180, 
    renderCell:(params)=>{
        return(
            <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
        )
    }},
    { field: "date", headerName: "Date", width: 300},
    { field: "action", headerName: "Action", width: 200, 
    renderCell:(params)=>{
        return(
            (params.row.status === "Sended") ? 
            <div className="action View" >View in Profil</div> : 
                <Link to="/pay" style={{ textDecoration: "none" }}>
                    <div className="action Send" >Withdrawal</div>
                </Link>
                
        )
    }}
]

export const packageRows = [
    {
        id: 1,
        name: "MINI",
        amount: "500",
        profitPorcent: [10,10,10,10,10,10,10,10,10,10],
        capitalPorcent: 10,
        WithdrawalEvery: "10 Days",
        totalWithdrawal: 10,
        myWithdrawal: 6,
        myWithdrawalAmount: "600",
        currentWeek: 6,
        startDate: "03/04/2022",
        finDate: "14/07/2022",
        status: "pending"//"pending""passive"
    },
    {
        id: 2,
        name: "MINI",
        amount: "1000",
        profitPorcent: [10,10,10,10,10,10,10,10,10,10],
        capitalPorcent: 10,
        WithdrawalEvery: "10 Days",
        totalWithdrawal: 10,
        myWithdrawal: 1,
        myWithdrawalAmount: "200",
        currentWeek: 18,
        startDate: "29/05/2022",
        finDate: "10/09/2022",
        status: "pending"//"pending""passive"
    },
]

// export const userRows = [
//     {
//         id: 1,
//         username: "Snow",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "active",
//         telegram: "SnowTed",
//         binanceEmail: "snow@gmail.com",
//         binanceHash: "Hssd09KS9skdsuns887sdnnusauhaJHBS",
//         capital: 300,
//     },
//     {
//         id: 2,
//         username: "jojo",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "pending",
//         email: "jojjo@gmail.com",
//         country: 45,
//     },
//     {
//         id: 3,
//         username: "nina",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "active",
//         email: "nina@gmail.com",
//         age: 20,
//     },
//     {
//         id: 4,
//         username: "maro",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "active",
//         email: "maro@gmail.com",
//         age: 35,
//     },
//     {
//         id: 5,
//         username: "mima",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "passive",
//         email: "mima@gmail.com",
//         age: 35,
//     },
//     {
//         id: 6,
//         username: "mama",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "passive",
//         email: "mama@gmail.com",
//         age: 60,
//     },
//     {
//         id: 7,
//         username: "nesrine",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "pending",
//         email: "nesrin@gmail.com",
//         age: 27,
//     },
//     {
//         id: 8,
//         username: "amir",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "active",
//         email: "amir@gmail.com",
//         age: 23,
//     },
//     {
//         id: 9,
//         username: "miro",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "active",
//         email: "miro@gmail.com",
//         age: 53,
//     },
//     {
//         id: 10,
//         username: "asSnow",
//         img: "https://images.pexels.com/photos/7536592/pexels-photo-7536592.jpeg",
//         status: "passive",
//         email: "assnow@gmail.com",
//         age: 30,
//     },
// ]