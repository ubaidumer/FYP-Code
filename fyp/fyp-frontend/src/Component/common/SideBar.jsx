import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import createSpacing from '@material-ui/core/styles/createSpacing';


const closeMenu=() =>{
    document.querySelector(".sidebar").classList.remove("open");   
}

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#ff23df"
    
  },
 btnStyle:{
 color: "#00000" , 
marginLeft: "80%"
 },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transform: "translateX(-30)",
  
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
    
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  drawerContainer: {
    overflow: 'auto',
   
  },
  typo:{
     fontSize: 30,
    marginTop: 20,
    marginBottom:10
  },
  div:{
      marginTop: 20
  },
  iconcl:{
      fontSize: 40
  },


}));

export default function SideBar() {
  const classes = useStyles();

  return (

      
    <div className={classes.root}>
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
     
          <List >
          <CloseIcon className={classes.btnStyle}  onClick={closeMenu}/>
          <div className={classes.typo}>
           <InboxIcon className={classes.iconcl} />  <a  href="/Profile/profile">Profile</a>  <Divider className={classes.div}/>
           <InboxIcon className={classes.iconcl} /> <a   href="/">Services</a>  <Divider  className={classes.div} />
            <MailIcon className={classes.iconcl} />  <a   href="/Nearby/nearby">Nearby</a>  <Divider   className={classes.div}/>
           <MailIcon className={classes.iconcl} />  <a   href="/posttask/post">Post Task</a>  <Divider   className={classes.div}/>
       </div>
          </List>
     
        
        </div>
      </Drawer>


   
    </div>
  );
}






