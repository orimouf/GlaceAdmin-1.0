import React from 'react'
import "./Table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = (props) => {

    return (
      <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">Capital</TableCell>
                  <TableCell className="tableCell">Months</TableCell>
                  <TableCell className="tableCell">Percentage</TableCell>
                  <TableCell className="tableCell">Profit</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                  <TableCell className="tableCell">Date</TableCell>
                  <TableCell className="tableCell">Action</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {props.data.map((row) => (
                  <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">{row.capital}</TableCell>
                  <TableCell className="tableCell">{row.months}</TableCell>
                  <TableCell className="tableCell"><span className="percentage">{row.profitPorcent} %</span></TableCell>
                  <TableCell className="tableCell">{row.profit}</TableCell>
                  <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>{row.status}</span>
                  </TableCell>
                  <TableCell className="tableCell">
                      {row.date}  <span className="days">
                          ( {(row.leftDays < 0) ? Math.abs(row.leftDays) + " Days ago": row.leftDays+" Days Left"} )
                      </span>    
                  </TableCell>
                  <TableCell className="tableCell">
                      {(row.status === "Sended") ? 
                          <div className="action Edit" >Edit</div> : <div className="action Send" >Send</div> }
                      
                  </TableCell>
                  </TableRow>
              ))}
  
                  <TableRow style={{background: "#71717126"}}>
                      <TableCell className="tableCell">#</TableCell>
                      <TableCell className="tableCell">TOTAL</TableCell>
                      <TableCell className="tableCell">YEAR</TableCell>
                      <TableCell className="tableCell">
                          <span className="green">{props.packageInfo.receiveProfitPorcent} %</span>
                      </TableCell>
                      <TableCell className="tableCell">
                          <span className="green">
                              {`$${(props.packageInfo.capital * props.packageInfo.receiveProfitPorcent / 100)} `} 
                          </span>
                      </TableCell>
                      <TableCell className="tableCell"></TableCell>
                      <TableCell className="tableCell"></TableCell>
                      <TableCell className="tableCell"></TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </TableContainer>
    )
  }

export default List