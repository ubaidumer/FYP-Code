/*eslint-disable*/
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Backdrop, Badge, Container, Divider, Fade, Grid, Modal, Paper, TextField } from '@material-ui/core';
import { Apps } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// core components

import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import * as serviceproviderService from "../../Axios-Actions/serviceproviderService";
const useStyles = makeStyles(styles);

export default function HeaderLinksS(props) {
  const classes = useStyles();
  const [gen,setGen]= useState(false);
  const [fname,setFname]= useState("");
  const [lname,setLname]= useState("");
  const [st,setSt]= useState("");
  const [contact,setContact]= useState("");
  const [pass,setPass]= useState("");
  
const update =(e)=>{

  if(fname&&lname&&contact&&pass&&st){
    serviceproviderService.editdata(fname,lname,pass,contact,st) .then((result) => {
      console.log("Successfull updated serviceprovider");
      setTimeout(function () {
        window.location = "/sprofile";
      }, 2000);
    })
    .catch((err) => {
      this.setState({ invalid: true });
      console.log(" upload error");
    });
  }else{
    alert("you need to fill all fields!");
  }


}
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Settings"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Button style={{width:'150px'}}
            onClick={()=>setGen(true)}
            >
              General
            </Button>,
            
            <Button style={{width:'150px'}}>
            Privacy</Button>
           
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
      <a style={{textDecoration:'none'}} 
      href="/login">  <Button>
          <ExitToAppIcon className={classes.icons} /> Logout
        </Button>
        </a>    </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
      <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
  open={gen}
  onClose={!gen}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500, 
  }}
>
  <Fade in={gen}>
    <Paper> 
  <Container maxWidth="md"> 
 <Grid container>
   <Grid item md={1}></Grid>
   <Grid item md={4}>
   <TextField
     label="Change your firstName" onChange={(e)=>{setFname(e.target.value)}
    }/>
     <br/>
     <TextField
     label="Change your lastName" onChange={(e)=>{setLname(e.target.value)}
    }/>
     <br/>
     <TextField
     label="Change your service type" onChange={(e)=>{setSt(e.target.value)}
    }/>
     <br/>
   </Grid>
   <Grid item md={3}></Grid>
   <Grid item md={4}>
   <TextField
     label="Change your Contact No" onChange={(e)=>{setContact(e.target.value)}
    }/>
     <br/>
     <TextField
     label="Change your Password" onChange={(e)=>{setPass(e.target.value)}
    }/>
     <br/>
   </Grid>
   <Grid item md={3}></Grid>
   <Grid item md={6}>
     <br/>

     <Button onClick={(e)=>update(e)} style={{marginRight:'20px'}}>Submit</Button>
 <Button onClick={()=>setGen(!gen)}>Close</Button>
 </Grid>
 <Grid item md={3}></Grid>
 </Grid>
  </Container>
  </Paper>
  </Fade>
</Modal>
    </List>
  );
}
