import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Title from './Title';
import * as adminService from "../../Axios-Actions/adminService";
import { Button, Grid, Modal, Paper, TextField } from '@material-ui/core';

// Generate Order Data


function preventDefault(event) {
  event.preventDefault();
}




export default function Orders() {
 
    const [add,setAdd] = React.useState(false);
    const [edit,setEdit] = React.useState(false);
    const [del,setDelete]= React.useState(false);


    const [card,setcard]=React.useState([]);

    const [af,setAf] =React.useState('');
    const [al,setAl] =React.useState('');
    const [ae,setAe] =React.useState('');
    const [ap,setAp] =React.useState('');
    const [as,setAs] =React.useState('');
    const [ac,setAc] =React.useState('');

    const [ef,setef] =React.useState('');
    const [el,setel] =React.useState('');
    const [ee,setee] =React.useState('');
    const [ep,setep] =React.useState('');
    const [es,setes] =React.useState('');
    const [ec,setec] =React.useState('');
    const [esearach,setesearch] = React.useState('');

    const [de,setde] =React.useState('');
    const [ds,setds] =React.useState('');
const Add=()=>{

  adminService.addservice(af,al,ae,as,ap,ac) .then((result) => {
    console.log("Successfull"+af+al+ae+as+ap+ac);

      setTimeout(function () {
        window.location = "/dashboard";
      }, 2000);
    })
    .catch((err) => {
      console.log(" upload error");
    });

  setAdd(false);


}
const Edit=()=>{

  adminService.edit(ef,el,ee,es,ep,ec,esearach) .then((result) => {
    console.log("Successfull");
      setTimeout(function () {
        window.location = "/dashboard";
      }, 2000);
    })
    .catch((err) => {
      console.log(" upload error");
    });

  setEdit(false);


}
const dels=()=>{

  adminService.del(ds) .then((result) => {
    console.log("Successfull");
      setTimeout(function () {
        window.location = "/dashboard";
      }, 2000);
    })
    .catch((err) => {
      console.log(" upload error");
    });

  setDelete(false);


}
const getdaaa=(email)=>{
adminService.getdata(email).then((result)=>{
  setcard(result.data);
  });
}
   const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    table: {
      minWidth: 700,
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }));
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
  
  

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Add Service Providers</Title>
      <br/>
     
      <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={edit}
        onClose={!edit}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <Grid container>
        <Grid item md={3}>

        </Grid>
        <Grid item md={6} style={{backgroundColor:'white',marginTop:'50px'}}>
         <div style={{border:'2px solid #000',textAlign:'center'}}>
           <div style={{backgroundColor:'darkseagreen',color:'white',paddingTop:'20px',paddingBottom:'20px'}}> <Typography variant="h2">
           Edit a Service Provider
             </Typography>
           </div>
           <div>
               <h3>Enter ServiceProvider Email to be edited</h3>
           <div>
           <TextField name="esearchemail"    onChange={(e)=>{setesearch(e.target.value)}} /* onChange={this.handleChange.bind(this)} value={this.state.esearchemail}*/ style={{width:'40%',marginBottom:'20px'}}
             />
           </div>
           <div /*onClick={this.get.bind(this)} */>
           <Button variant='outlined'onClick={()=>{getdaaa(esearach)}} style={{marginBottom:'30px'}}>Search</Button>
           </div>
           <h3>Enter ServiceProvider Information to be edited</h3>

           
              
           <h4>Fname :{card.firstname}</h4>
           <TextField name="efname"    onChange={(e)=>{setef(e.target.value)}}/* onChange={this.handleChange}value={this.state.efname}*/ ></TextField>
           <h4>LastName  :{card.lastname}</h4>
           <TextField name="elname"   onChange={(e)=>{setel(e.target.value)}}/* onChange={this.handleChange}value={this.state.elname}*/ ></TextField>
           <h4>Email :{card.email}</h4>
           <TextField name="eemail"    onChange={(e)=>{setee(e.target.value)}}/*onChange={this.handleChange}value={this.state.eemail}*/ ></TextField>
           <h4>Password  :{card.password}</h4>
           <TextField name="epass"   onChange={(e)=>{setep(e.target.value)}} /*onChange={this.handleChange}value={this.state.epass}*/ ></TextField>
           <h4>ServiceType  :{card.servicetype}</h4>
           <TextField name="eservicetype"    onChange={(e)=>{setes(e.target.value)}}/*onChange={this.handleChange}value={this.state.eservicetype}*/ ></TextField>
           <h4>Contactno  :{card.contactno}</h4>
           <TextField name="econtactno"    onChange={(e)=>{setec(e.target.value)}} /*onChange={this.handleChange}value={this.state.econtactno}*/ ></TextField>
          
           
           <Button variant='outlined' onClick={()=>Edit()}   >Edit</Button>
           <Button variant='outlined' style={{marginBottom:'30px',marginLeft:'20px'}} 
           onClick={()=>setEdit(!edit)}
           > Close</Button>
           </div>
         </div>
        </Grid>
        <Grid item md={3}>
          
        </Grid>
      </Grid>
      </Modal>

      <Modal  style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={del}
        onClose={!del}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <Grid container>
        <Grid item md={3}>

        </Grid>
        <Grid item md={6} style={{backgroundColor:'white',marginTop:'50px'}}>
         <div style={{border:'2px solid #000',textAlign:'center'}}>
           <div style={{backgroundColor:'red',color:'white',paddingTop:'20px',paddingBottom:'20px'}}> <Typography variant="h2">
           Delete a Service Provider
             </Typography>
           </div>
           <div>
               <h3>Enter Email of ServiceProvider to be deleted</h3>
           <div>
           <TextField name="dsearchemail"   onChange={(e)=>{setds(e.target.value)}} style={{width:'40%',marginBottom:'20px'}}
             />
           </div>
           <div >
           <Button variant='outlined' onClick={()=>{getdaaa(ds)}} style={{marginBottom:'30px'}}>Search</Button>
           </div>
           <h3>ServiceProvider Information to be Deleted</h3>

           
              
           <h4>FirstName:{card.firstname}</h4>
           <h4>LastName:{card.lastname}</h4>
           <h4>Email:{card.email}</h4>
           <h4>ServiceType:{card.servicetype}</h4>
           <h4>Contactno:{card.contactno}</h4>
          
           <Button variant='outlined'  onClick={()=>dels()}  style={{marginBottom:'30px'}}>Delete</Button>
           <Button variant='outlined' style={{marginBottom:'30px',marginLeft:'20px'}} 
           onClick={()=>setDelete(false)}
           > Close</Button>
           </div>
         </div>
        </Grid>
        <Grid item md={3}>
          
        </Grid>
      </Grid>
      </Modal>


      <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={add}
        onClose={!add}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <Grid item md={6} style={{backgroundColor:'white',marginTop:'50px'}}>
         <div style={{border:'2px solid #000',textAlign:'center'}}>
           <div style={{backgroundColor:'darkolivegreen',color:'white',paddingTop:'20px',paddingBottom:'20px'}}> <Typography variant="h5">
           Add a Service Provider
             </Typography>
           </div>
           <div>
           <div >
             
           <TextField name="fname" //onChange={this.handleChange.bind(this)} value={this.state.fname}style={{width:'40%',marginBottom:'40px'}}//
             label="Enter First Name"
             normal='normal'
             size='medium'
             onChange={(e)=>{setAf(e.target.value)}}
             />
           </div>
           <div>
           <TextField name="lname" // onChange={this.handleChange.bind(this)} value={this.state.lname}style={{width:'40%',marginBottom:'40px'}}//
             label="Enter Last Name"
             onChange={(e)=>{setAl(e.target.value)}}
             />
           </div>
           <div>
           <TextField name="email" //onChange={this.handleChange.bind(this)} value={this.state.email}style={{width:'40%',marginBottom:'40px'}}//
             label="Enter Email"
             onChange={(e)=>{setAe(e.target.value)}}
             />
           </div>
           <div>
           <TextField name="servicetype" //onChange={this.handleChange.bind(this)}value={this.state.servicetype}style={{width:'40%',marginBottom:'40px'}}//
             label="Enter Service Type "
             onChange={(e)=>{setAs(e.target.value)}}
             />
           </div>
           <div>
           <TextField name="pass" //onChange={this.handleChange.bind(this)}value={this.state.pass}style={{width:'40%',marginBottom:'40px'}}//
             label="Enter Password"
             onChange={(e)=>{setAp(e.target.value)}}
             />
           </div>
           <div>
           <TextField name="contactno" //onChange={this.handleChange.bind(this)}value={this.state.contactno}style={{width:'40%',marginBottom:'40px'}}//
             label="Enter Contact No"
             onChange={(e)=>{setAc(e.target.value)}}
             />
           </div>
           <Button variant='outlined'    onClick={()=>Add()} /*onClick={this.add.bind(this)}  style={{marginBottom:'30px'}} */>Add</Button> 
           <Button variant='outlined' style={{marginBottom:'30px',marginLeft:'20px'}} 
          onClick={()=>setAdd(false)}
           > Close</Button>
           </div>
         </div>
        </Grid>
          </Modal>

          <Grid container>
         
         <Grid item md={4} xs={12}>
           <div style={{textAlign:'center'}}>
             <Button onClick={()=>setAdd(true)}>
           <AddCircleIcon style={{marginTop:'50px',fontSize:'100px',color:'#3c71ab'}}/>
           </Button>
           <Typography variant="h6" style={{marginTop:'20px'}}>
             Add new Service Provider 
           </Typography>
           </div>
         </Grid>
         <Grid item md={4} xs={12}>
         <div style={{textAlign:'center'}}>
         <Button onClick={()=>setEdit(true)}  >
           <EditIcon  style={{marginTop:'50px',fontSize:'100px',border:'1px solid #2a8a19',borderRadius:'99px',color:'#2a8a19'}}/>
           </Button>
           <Typography variant="h6" style={{marginTop:'20px'}}>
             Edit Service Provider's Information
           </Typography>
           </div>
         </Grid>
         <Grid item md={4} xs={12}>
         <div style={{textAlign:'center'}}>
         <Button onClick={()=>setDelete(true)}>
           <DeleteOutlineIcon style={{marginTop:'50px',fontSize:'100px',color:'red',border:'1px solid red',borderRadius:'99px'}}/>
           </Button>
           <Typography variant="h6" style={{marginTop:'20px'}}>
             Delete Service Provider
           </Typography>
           </div>
         </Grid>
   
       </Grid>



      <div className={classes.seeMore}>
        <br/>
      <center>
      <Typography variant="h6">Reviews</Typography>
    </center>
    
      </div>
    </React.Fragment>
  );
}