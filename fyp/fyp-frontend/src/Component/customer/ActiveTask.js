import React ,{Component, useEffect, useState} from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import * as customerService from "../../Axios-Actions/customerService";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});




const ActiveTask=()=> {

    const [task,setTask]=React.useState([])

    useEffect(() => {
        customerService.getactivetasks()
           .then((result) => {setTask( result.data )});
    }, []
    )
    const classes = useStyles();
    
      return (
        <Grid container>
       <Grid item md={1}></Grid>
       
        <Grid item md={10} xs={12}>
         <Typography variant="h6">Active Task</Typography> 
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
              <StyledTableCell align="right">     {t.serviceprovideremail}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           

        </Grid>
        


    </Grid>
      );
    }



 
export default ActiveTask ;