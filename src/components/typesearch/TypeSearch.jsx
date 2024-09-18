import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useNavigate } from "react-router-dom";
import './typesearch.scss'

const TypeSearch = ({ type, camionRef, searchRef }) => {

  const navigate = useNavigate();
  var date = false
  var clientName = false
  var clientId = false
  var inputSearch

  function handleNavigate(type) {
    if (type === "date") navigate("../search/date");
    if (type === "clientid") navigate("../search/clientid");
    if (type === "clientname") navigate("../search/clientname");
    window.location.reload();
  }

  if (type === "date") date = true
  if (type === "clientName") clientName = true
  if (type === "clientId") clientId = true

  if (type === "date") inputSearch = "date"; else inputSearch = "text";
    
  return (
    <div className="top">
      <div className="left">
        <div className='typeLable'>
          <label htmlFor="type">Type Of Search : </label>
        </div>
        {(camionRef !== "Facture") ? 
          <div className='typeInput typeCamion' ref={camionRef}>
            <input type="radio" name="camion" value="CAMION 01" defaultChecked/> CAMION 01
            <input type="radio" name="camion" value="CAMION 02" /> CAMION 02
          </div> : <div className='typeInput'></div>
        }
                   
        <div className='typeInput'>
          <input type="radio" name="typeSearch" value="clientName" defaultChecked={clientName} onClick={() => handleNavigate("clientname")} /> Client Name
          <input type="radio" name="typeSearch" value="clientId" defaultChecked={clientId} onClick={() => handleNavigate("clientid")} /> Client ID 
          <input type="radio" name="typeSearch" value="date" defaultChecked={date} onClick={() => handleNavigate("date")} /> Date
        </div>
      </div>
      <div className="right">
        <div className="search">
          <input id='search-input' type={inputSearch} placeholder='Search...' />
          <SearchOutlinedIcon ref={searchRef} id="search-button" />
        </div>
      </div>
    </div>
  )
}

export default TypeSearch