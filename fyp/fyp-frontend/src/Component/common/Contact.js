import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import { Backdrop, Badge, Container, Divider, Fade, Grid, InputAdornment, Modal, Paper, TextField, Typography} from '@material-ui/core';
import { Apps, Face, Phone, PhonelinkLockOutlined, VpnKey } from "@material-ui/icons";

// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button";
import * as adminService from "../../Axios-Actions/adminService";
import styles from "../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js"

const useStyles = makeStyles(styles);

export default function Contact() {
  const classes = useStyles();

  const [name,setName] =React.useState('');
  const [email,setEmail] =React.useState('');
  const [message,setMessage] =React.useState('');

  const send=()=>{

    if(name&&email&&message){
      adminService.workwithus(name,email,message)  .then((result) => {
        console.log("Successfully send mail");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log(" upload error");
        });
    }else{
      alert("Fill all fields.");
    }

  }
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Contact Admin</h2>
          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
              <TextField fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end"><Face style={{color:'#a62e9c'}}/></InputAdornment>,
      }} 
     label="Enter Your Name" onChange={(e)=>{setName(e.target.value)}
    }/>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <TextField fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end"><Face style={{color:'#a62e9c'}}/></InputAdornment>,
      }} 
     label="Enter Your Email" onChange={(e)=>{setEmail(e.target.value)}
    }/>
              </GridItem>
                   <TextField fullWidth
                        inputProps={{
                            multiline: true,
                            rows: 5
                          }}
      InputProps={{
        endAdornment: <InputAdornment position="end"><Face style={{color:'#a62e9c'}}/></InputAdornment>,
      }} 
     label="Enter Your Message" onChange={(e)=>{setMessage(e.target.value)}
    }/>
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={(e)=>{send(e)}}>Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}