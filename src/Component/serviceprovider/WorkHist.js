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




const WorkHist=()=> {

    const [task,setTask]=React.useState([])

    useEffect(() => {
        historyService.getAllWorks()
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
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Start Time -- End Time</StyledTableCell>
            <StyledTableCell align="right">Month</StyledTableCell>
            <StyledTableCell align="right">Service Type</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Bill</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {task.length<1 ?<div><Typography>No records found</Typography></div>:<div></div>}
          {task.map(t => (
            <StyledTableRow key={t._id}>
              <StyledTableCell component="th" scope="row">
              {t.title}
              </StyledTableCell>
              <StyledTableCell align="right">{t.starttime} -- {t.endtime} </StyledTableCell>
              <StyledTableCell align="right">{t.month}</StyledTableCell>
              <StyledTableCell align="right">{t.servicetype}</StyledTableCell>
              <StyledTableCell align="right">{t.location}</StyledTableCell>
              <StyledTableCell align="right">{(t.month*t.permonth)+(t.pertask)+(t.perhour*(parseInt(t.endtime)-parseInt(t.starttime))*(t.month*30))}</StyledTableCell>
              <StyledTableCell align="right">     {t.customeremail}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           

        </Grid>
        


    </Grid>
      );
    }



 
export default WorkHist ;