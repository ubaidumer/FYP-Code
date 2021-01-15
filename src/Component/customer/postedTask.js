import React ,{Component, useEffect, useState} from 'react';
import { Grid, Paper, Typography,Button,Container } from '@material-ui/core';
import { Backdrop, Badge, Divider, Fade, Modal, TextField } from '@material-ui/core';
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


const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


let currentS;

const PostedTask=()=> {

    const [task,setTask]=React.useState([])
    const [privatetask, setprivatetaskOpen] = React.useState(false);
const [title, setTitle] = React.useState('');
const [servicetype, setServicetype] = React.useState('');
const [location2, setLocation] = React.useState('');
const [pertask, setPertask] = React.useState('');
const [perhour, setPerhour] = React.useState('');
const [permonth, setPermonth] = React.useState('');
const [start, setStart] = React.useState('');
const [end, setEnd] = React.useState('');
const [month, setLMonth] = React.useState('');
const [description, setDescription] = React.useState('');

    useEffect(() => {
        customerService.getpostedtasks()
           .then((result) => {setTask( result.data )});
    }, []
    )
    const d=(id)=>{
      customerService.delpost(id)     
       .then((result) => {
        console.log("Successfully Deleted Post");
          setTimeout(function () {
            window.location = "/profile";
          }, 2000);
        })
        .catch((err) => {
          console.log(" upload error");
        });
    }
    const ha =(e,id)=>{

      currentS=id;
      setprivatetaskOpen(true);
    }
    const s =(e,id)=>{
      if(title&&location2&&description&&pertask&&perhour&&permonth&&month&&start&&end&&servicetype){

        customerService.editpost(title,servicetype,location2,perhour,permonth,pertask,start,end,month,description,id) 
         .then((result) => {
          console.log("Successfully send a edit task");
            setTimeout(function () {
              window.location = "/profile";
            }, 2000);
          })
          .catch((err) => {
           
            console.log(" upload error");
          });
      }else{
        alert("incomplete input");
      }
  
    }

    
    const classes = useStyles();
    
      return (
        <Grid container>
       <Grid item md={1}></Grid>
       
        <Grid item md={10} xs={12}>

         
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}}>Title</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}} align="right">Start Time -- End Time</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}} align="right">Month</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}}align="right">Service Type</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}} align="right">Location</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}}  align="right">Bill</StyledTableCell>
            <StyledTableCell style={{backgroundColor:'#3e3aa6'}} align="right">Manage Post</StyledTableCell>
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
              <StyledTableCell align="right"><Button onClick={(e)=>{ha(e,t._id)}}>Edit</Button><Button onClick={()=>{d(t._id)}}>Delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           

        </Grid>
        <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}

open={privatetask}
onClose={!privatetask}
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{
  timeout: 500, 
}}
>


                  <Container maxWidth="sm">
                  <Grid container>
                  <Grid item md={3}></Grid>
                  <Paper elevation={2}  >
                  <center>
                          <br/>
                      <Typography variant="h5">Edit Task</Typography>
                      <Divider/>
                      <br/>
                      </center>
                    <Grid container>
                  
                      <ul style={{listStyle:'none'}}>
                        <li>
                        <Grid item md={10}>
                          <TextField 
                        fullWidth
                        onChange={(e)=>{setTitle(e.target.value)}} label="Title"></TextField>
                        </Grid>
                        </li>
                        <br/>
                        <li><Typography variant='h6' style={{color:'#2d4a6b'}}>
               Service type <span>   <select id="servicetype" onChange={(e)=>{setServicetype(e.target.value)}}
               style={{width:'150px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                              <option value="">Select</option>
                              <option value="Maid">Maid</option>
                              <option value="Electrian">Electrian</option>
                              <option value="Cook">Cook</option>
                              <option value="Plumber">Plumber</option>
                              <option value="Shopkeeper">Shopkeeper</option>
                              
                              </select> </span>
           </Typography></li>
                        
                          <Grid item md={10}>
                          <li>
                          <TextField fullWidth onChange={(e)=>{setLocation(e.target.value)}} label="Full Address"></TextField>
                          </li>
                          </Grid>

                     <Typography variant='h6' style={{color:'#2d4a6b'}}>Bidding</Typography>
                    <Grid container>
                  
                      <Grid item md={3}>
                       <TextField onChange={(e)=>{setPertask(e.target.value)}} label="per task"></TextField> 
                      </Grid>
                      <Grid item md={1}></Grid>
                      <Grid item md={3}>
                      <TextField onChange={(e)=>{setPerhour(e.target.value)}}label="per hour"></TextField> 
                      </Grid>
                      <Grid item md={1}></Grid>
                      <Grid item md={3}>
                      <TextField onChange={(e)=>{setPermonth(e.target.value)}}label="per month"></TextField>
                      </Grid>
                    </Grid>
                       
                        <li><Typography variant='h6' style={{color:'#2d4a6b'}}>Time Duration</Typography> </li>
                        <br/>
                        <Grid container spacing={3}>
                        <Grid item md={4}>
                        <div style={{display:'inline-flex'}}>   <Typography>Starts:</Typography> <input id="starttime" onChange={(e)=>{setStart(e.target.value)}}type="time"style={{width:'100px',marginLeft:'5px'}}/> </div>
                        </Grid>
                        <Grid item md={4}>
                         <div style={{display:'inline-flex'}}> <Typography>Ends:</Typography> <input id="starttime" onChange={(e)=>{setEnd(e.target.value)}} type="time"style={{width:'100px',marginLeft:'5px'}}/> </div>
                          </Grid>
                     <Grid item md={4}>
                   <div style={{display:'inline-flex'}}> <Typography>Month</Typography>  <select onChange={(e)=>{setLMonth(e.target.value)}}id="month" style={{width:'50px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              
                              </select>
                              </div>
                              </Grid>
                              </Grid>
                              <Grid item md={10}>
                        <li><TextField fullWidth onChange={(e)=>{setDescription(e.target.value)}}label="Description"></TextField></li> </Grid>
                        <br/>
                        <li style={{marginLeft:'22%'}}><Button onClick={(e)=>{s(e,currentS)}} >Send</Button><Button onClick={()=>{setprivatetaskOpen(false)}}>Close</Button></li>
                      </ul>
                    </Grid>
                   </Paper>
                  </Grid>
                  </Container>
                  
</Modal>
        


    </Grid>
      );
    }



 
export default PostedTask ;