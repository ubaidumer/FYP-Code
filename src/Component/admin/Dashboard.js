import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems,doctor,customer } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';

import { Button, Card } from '@material-ui/core';
import Header from '../../components/Header/Header';
import * as adminService from "../../Axios-Actions/adminService";
import { keys } from '@material-ui/core/styles/createBreakpoints';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©️ '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor:'#1565c0',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

let c=0,s=0;
export default function Dashboard() {
  const classes = useStyles();
  const [open,setOpen] = React.useState(false);
  const [card,setCard] = React.useState([]);
  const [cardS,setCardS] = React.useState([]);
  const [cardo,setCardo] = React.useState([]);
  const [cardt,setCardt] = React.useState([]);
  const [numc,setC]= React.useState([]);
  const [nums,setS]= React.useState([]);
  const [d,setd]= React.useState('');
  const [cust,setCust]= React.useState(false)
  const [sp,setSp]= React.useState(false)
  const [hist,setHist]= React.useState(false)
  const [req,setReq]= React.useState(false)

React.useEffect(()=>{

  adminService.viewsp() .then((result)=>{
    setS(result.data)
    });
    adminService.viewcp() .then((result)=>{
      setC(result.data)
      });

},[])
const logout=()=>{
  localStorage.clear();
  window.location.href="/adminsignin";
}

  const ViewCus=()=>{
adminService.viewc() .then((result)=>{
  setCard(result.data);
  });
  setCust(!sp);
  setSp(false);
  setReq(false);
  setHist(false);
  }
  const ViewSer=()=>{
    adminService.views() .then((result)=>{
      setCardS(result.data);
    
      });
      setSp(true);
      setReq(false);
      setCust(false);
      setHist(false)
      }
      const Viewo=()=>{
        adminService.viewo() .then((result)=>{
          setCardo(result.data);
          });
          setHist(true);
          setReq(false);
          setCust(false);
          setSp(false);
          }
          const Viewtask=()=>{
            adminService.viewtask() .then((result)=>{
              setCardt(result.data);
              });
              setReq(true)
              setHist(false);
              setCust(false);
              setSp(false)
              }
      const delS=(email)=>{
        adminService.del(email);
          }
          const delC=(email)=>{
            adminService.delcc(email);
              }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
  
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="white" noWrap className={classes.title}>
         <center> Admin Panel  </center>
          </Typography>
          <Button style={{    backgroundColor:'#1565c0',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#0288d1'}} onClick={()=>{logout()}}><Typography component="h1"  className={classes.title} variant="h6" style={{color:"white"}}> <center>logout</center></Typography></Button>
          
        </Toolbar>
      </AppBar>
      <Drawer 
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton style={{backgroundColor:'##1565c0',color:'white',paddingTop:'20px',paddingBottom:'20px'}} onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
     
        <Divider />
        <Button style={{backgroundColor:'#1565c0',color:'white',paddingTop:'20px',paddingBottom:'20px'}} onClick={()=>{ViewCus()}} > 
        <br/>
        <br/>
         View Customers
        </Button>
        <Divider />
        <br/>
        <br/>
        <Button style={{backgroundColor:'#1565c0',color:'white',paddingTop:'20px',paddingBottom:'20px'}} onClick={()=>{ViewSer()}}> 
         View Service Providers
         <br/>
        <br/>
        </Button>
        
        <Divider />
        <Button style={{backgroundColor:'#1565c0',color:'white',paddingTop:'20px',paddingBottom:'20px'}} onClick={()=>{Viewo()}} > 
        <br/>
        <br/>
         View History
        </Button>
        
        <Divider />
        <Button style={{backgroundColor:'#1565c0',color:'white',paddingTop:'20px',paddingBottom:'20px'}}onClick={()=>{Viewtask()}} > 
        <br/>
        <br/>
         View Customer Requests
        </Button>
        
        <Divider />

  
      
      
      
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item md={6}>
            
            <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{backgroundColor:'#3f51b5',color:'white',paddingTop:'20px',paddingBottom:'20px'}}>
                         Customers
                     </Typography>
                     <Divider/>
                     <Typography variant='h2' style={{paddingTop:'15px'}}>
                        {numc.length}
                     </Typography>
                 </Paper> 
                 </center>
            </Grid>
        
            <Grid item md={6}>
            <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{backgroundColor:'#3f51b5',color:'white',paddingTop:'20px',paddingBottom:'20px'}}>
                         Service Providers
                     </Typography>
                     <Divider/>
                     <Typography variant='h2' style={{paddingTop:'15px'}}>
                     {nums.length}
                     </Typography>
                 </Paper> 
                 </center>
            </Grid>


            
            <Grid item xs={12} md={12} lg={12}>
                              
                          
                              
                              {cust==true ? 
                              <TableContainer component={Paper} >
                             <Table className={classes.table} aria-label="customized table">
                               <TableHead>
                                 <TableRow>
                                   <StyledTableCell align="left">Customer First Name</StyledTableCell>
                                   <StyledTableCell align="left">Customer Last Name</StyledTableCell>
                                   <StyledTableCell align="left">Customer Email</StyledTableCell>
                                   <StyledTableCell align="left">Customer Contact no</StyledTableCell>
                                   <StyledTableCell align="left">Delete Customer</StyledTableCell>

                       
                                 </TableRow>
                               </TableHead>
                               {card.map(c=>(
                               <TableBody>
                                 
                                   <StyledTableRow >
                                   
                                     <StyledTableCell align="left">{c.firstname}</StyledTableCell>
                                     <StyledTableCell align="left">{c.lastname}</StyledTableCell>
                                     <StyledTableCell align="left">{c.email}</StyledTableCell>
                                     <StyledTableCell align="left">{c.contactno}</StyledTableCell>
                                     <StyledTableCell align="left"  onClick={()=>{delC(c.email)}}><Button>Delete</Button></StyledTableCell>
                       
                                   </StyledTableRow>
                            
                               </TableBody>
                               
              ))}                       
                             </Table>
                           </TableContainer>
                           :
                           <div></div>}
              
                         </Grid>
            <Grid item xs={12} md={12} lg={12}>
                              
                   
                             {sp==true ? 
                              <TableContainer component={Paper} >
                             <Table className={classes.table} aria-label="customized table">
                               <TableHead>
                                 <TableRow>
                                   <StyledTableCell align="left">ServiceProvider First Name</StyledTableCell>
                                   <StyledTableCell align="left">ServiceProvider Last Name</StyledTableCell>
                                   <StyledTableCell align="left">ServiceProvider ServiceType</StyledTableCell>
                                   <StyledTableCell align="left">ServiceProvider Email</StyledTableCell>
                                   <StyledTableCell align="left">ServiceProvider Contact no</StyledTableCell>
                                   <StyledTableCell align="left">Delete ServiceProvider</StyledTableCell>
                       
                                 </TableRow>
                               </TableHead>
                               {cardS.map(c=>(
                               <TableBody>
                                 
                                   <StyledTableRow >
                                   
                                   <StyledTableCell align="left">{c.firstname}</StyledTableCell>
                                     <StyledTableCell align="left">{c.lastname}</StyledTableCell>
                                     <StyledTableCell align="left">{c.servicetype}</StyledTableCell>
                                     <StyledTableCell align="left">{c.email}</StyledTableCell>
                                     <StyledTableCell align="left">{c.contactno}</StyledTableCell>
                                     <StyledTableCell align="left"><Button onClick={()=>{delS(c.email)}}>Delete</Button></StyledTableCell>
                                   </StyledTableRow>
                            
                               </TableBody>
                               
              ))}                       
                             </Table>
                           </TableContainer>
                           :
                           <div>
                             </div>}
                  
                       
                    

            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                              
                   
                              
                              {hist==true ? 
                              <TableContainer component={Paper} >
                             <Table className={classes.table} aria-label="customized table">
                               <TableHead>
                                 <TableRow>
                                 <StyledTableCell align="left">Title</StyledTableCell>
                                   <StyledTableCell align="left">Customer Email</StyledTableCell>
                                   <StyledTableCell align="left">ServiceProvider Email</StyledTableCell>
                                   <StyledTableCell align="left">Service Type</StyledTableCell>
                                   <StyledTableCell align="left">Total Bill</StyledTableCell>
                                   <StyledTableCell align="left">Start Time / End Time </StyledTableCell>
                                   <StyledTableCell align="left">Total Months</StyledTableCell>
                                   <StyledTableCell align="left">Start Date / End Date</StyledTableCell>
                                   <StyledTableCell align="left">Location</StyledTableCell>
                       
                                 </TableRow>
                               </TableHead>
                               {cardo.map(c=>(
                               <TableBody>
                                 
                                   <StyledTableRow >
                                   <StyledTableCell align="left">{c.title}</StyledTableCell> 
                                   <StyledTableCell align="left">{c.customeremail}</StyledTableCell>
                                     <StyledTableCell align="left">{c.serviceprovideremail}</StyledTableCell>
                                     <StyledTableCell align="left">{c.servicetype}</StyledTableCell>
                                     <StyledTableCell align="left">{(c.month*c.permonth)+(c.pertask)+(c.perhour*(parseInt(c.endtime)-parseInt(c.starttime))*(c.month*30))}</StyledTableCell>
                                     <StyledTableCell align="left">{c.starttime} / {c.endtime}</StyledTableCell>
                                     <StyledTableCell align="left">{c.month}</StyledTableCell>
                                     <StyledTableCell align="left">{c.accepttaskdate} / {c.endtaskdate}</StyledTableCell>
                                     <StyledTableCell align="left">{c.location}</StyledTableCell>
                                    </StyledTableRow>
                            
                               </TableBody>
                               
              ))}                       
                             </Table>
                           </TableContainer>
                           : <div></div>}
                  
                       
                    

            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                              
                   
                          
                               {req==true? 
                              <TableContainer component={Paper} >
                             <Table className={classes.table} aria-label="customized table">
                               <TableHead>
                                 <TableRow>
                                 <StyledTableCell align="left">Title</StyledTableCell>
                                   <StyledTableCell align="left">Customer Email</StyledTableCell>
                                   <StyledTableCell align="left">ServiceType</StyledTableCell>
                                   <StyledTableCell align="left">Location</StyledTableCell>
                                   <StyledTableCell align="left">Total Bill</StyledTableCell>
                                   <StyledTableCell align="left">Start Time / End Time</StyledTableCell>
                                   <StyledTableCell align="left">Total Months</StyledTableCell>
                       
                                 </TableRow>
                               </TableHead>
                               {cardt.map(c=>(
                               <TableBody>
                                 
                                   <StyledTableRow >
                                   
                                   <StyledTableCell align="left">{c.title}</StyledTableCell>
                                     <StyledTableCell align="left">{c.customeremail}</StyledTableCell>
                                     <StyledTableCell align="left">{c.servicetype}</StyledTableCell>
                                     <StyledTableCell align="left">{c.location}</StyledTableCell>
                                     <StyledTableCell align="left">{(c.month*c.permonth)+(c.pertask)+(c.perhour*(parseInt(c.endtime)-parseInt(c.starttime))*(c.month*30))}</StyledTableCell>
                                     <StyledTableCell align="left">{c.starttime} / {c.endtime}</StyledTableCell>
                                     <StyledTableCell align="left">{c.month}</StyledTableCell>
                                   </StyledTableRow>
                            
                               </TableBody>
                               
              ))}                       
                             </Table>
                           </TableContainer>
                           : <div>

                           </div>}
               
                       
                    
          
            </Grid>
            {/* Recent Deposits */}
        
            {/* Recent Orders */}
            
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}