import React ,{Component, useEffect, useState} from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import * as historyService from "../../Axios-Actions/historyService";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});




const OrderHistory=()=> {

    const [task,setTask]=React.useState([])

    useEffect(() => {
           historyService.getAllOrders()
           .then((result) => {setTask( result.data )});
    }, []
    )
    const classes = useStyles();
    
      return (
        <Grid container>

<Grid item md={1}></Grid>
        <Grid item md={10} xs={12}>
         <Typography variant="h6">History</Typography> 
         <br/>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{backgroundColor:'#3264a8'}}>Title</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3264a8'}} align="left">Start Time -- End Time</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3264a8'}} align="left">Month</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3264a8'}} align="left">Service Type</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3264a8'}} align="left">Location</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3264a8'}} align="left">Bill</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3264a8'}} align="left">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {task.length<1 ?<div><Typography>No records found</Typography></div>:<div></div>}
          {task.map(t => (
            <StyledTableRow key={t._id}>
              <StyledTableCell component="th" scope="row">
              {t.title}
              </StyledTableCell>
              <StyledTableCell align="left">{t.starttime} -- {t.endtime} </StyledTableCell>
              <StyledTableCell align="left">{t.month}</StyledTableCell>
              <StyledTableCell align="left">{t.servicetype}</StyledTableCell>
              <StyledTableCell align="left">{t.location}</StyledTableCell>
              <StyledTableCell align="left">{(t.month*t.permonth)+(t.pertask)+(t.perhour*(parseInt(t.endtime)-parseInt(t.starttime))*(t.month*30))}</StyledTableCell>
              <StyledTableCell align="left">     {t.serviceprovideremail}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           

        </Grid>
        


    </Grid>
      );
    }



 
export default OrderHistory ;