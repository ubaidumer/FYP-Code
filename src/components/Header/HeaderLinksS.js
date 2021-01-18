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
import { Backdrop, Badge, Container, Divider, Fade, Grid, InputAdornment, Modal, NativeSelect, Paper, TextField, Typography } from '@material-ui/core';
import { Apps, Lock, People, } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// core components
import {  Face, Phone, PhonelinkLockOutlined, VpnKey,Work } from "@material-ui/icons";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import * as serviceproviderService from "../../Axios-Actions/serviceproviderService";
import CustomInput from "../CustomInput/CustomInput.js";
import { logout } from "../../Axios-Actions/authService.js";
const useStyles = makeStyles(styles);

export default function HeaderLinksS(props) {
  const classes = useStyles();
  const [gen,setGen]= useState(false);
  const [fname,setFname]= useState("");
  const [lname,setLname]= useState("");
  const [st,setSt]= useState("");
  const [contact,setContact]= useState("");
  const [pass,setPass]= useState("");
  
  const logout =()=>{
    localStorage.clear();
    window.location.href="/login"
  }
const update =(e)=>{
  console.log("hi"+fname+lname+contact)

  if(fname&&lname&&contact&&pass&&st){
    serviceproviderService.editdata(fname,lname,pass,contact,st) .then((result) => {
      console.log("Successfull updated serviceprovider");
      setTimeout(function () {
        window.location = "/sprofile";
      }, 2000);
    })
    .catch((err) => {
     
      console.log(" upload error");
    });
  }else{
    alert(fname)
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
      href="/login">  <Button onClick={()=>logout()}>
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
 <Grid container spacing={2}>
 <Grid item md={12} style={{backgroundColor:'#4BB543 ',color:'white'}}>
   <center>
      <br/>
    <Typography variant="h5">Update your Info</Typography> 
    <Divider style={{marginTop:'5px'}}/>
    </center>
   </Grid>
   <Grid item md={1}></Grid>
   <Grid item md={5}>
   <TextField fullWidth
                      label="First Name..."
                      name="fname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end"><Face style={{color:'#4BB543 '}}/></InputAdornment>,
                      }} 
                      onChange={(e)=>{setFname(e.target.value)}}
                      
                    /> 
                    
          
                       <TextField fullWidth
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><Face style={{color:'#4BB543 '}}/></InputAdornment>,
                          }} 
                      label="Last Name..."
                      name="lname"
                      onChange={(e)=>{setLname(e.target.value)}}
                
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                     
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> 
                       <NativeSelect fullWidth style={{marginTop:'10px'}}
                         InputProps={{
                          endAdornment: <InputAdornment position="end"><Work style={{color:'#4BB543 '}}/></InputAdornment>,
                        }} 
                      label="Service Type"
                      name="st"
                      onChange={(e)=>{setSt(e.target.value)}}
                     
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                    
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    > 
                       <option value="">Service Type</option>
                                <option value="maid">maid</option>
                                <option value="plumber">plumber</option>
                                <option value="driver">driver</option>
                                <option value="cook">cook</option>
                                <option value="tailor">tailor</option>
                                <option value="electrian">electrician</option>
                    </NativeSelect>
 
     <br/>
   </Grid>
   <Grid item md={1}></Grid>
   <Grid item md={5}>
   <TextField fullWidth
     InputProps={{
      endAdornment: <InputAdornment position="end"><Phone style={{color:'#4BB543 '}}/></InputAdornment>,
    }} 
                      label="Change Contact No"
                      name="contact"
                      onChange={(e)=>{setContact(e.target.value)}}
                   
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                       
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> 
                       <TextField fullWidth 
                         InputProps={{
                          endAdornment: <InputAdornment position="end"><Lock style={{color:'#4BB543 '}}/></InputAdornment>,
                        }} 
                      label="Password"
                      name="password"
                      onChange={(e)=>{setPass(e.target.value)}}
                      
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                     
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> 

     <br/>
   </Grid>
   <Grid item md={4}></Grid>
   <Grid item md={4}>
     <br/>

     <Button color="success" onClick={(e)=>update(e)} style={{marginRight:'20px'}}>Submit</Button>
 <Button color="success" onClick={()=>setGen(!gen)}>Close</Button>
 </Grid>
 <Grid item md={4}></Grid>
 </Grid>
  </Container>
  </Paper>
  </Fade>
</Modal>
    </List>
  );
}
