import React from "react";
import TextField from '@material-ui/core/TextField';
// @material-ui/core components
import { Backdrop, Badge, Container,Fade, Paper,Grid, Modal} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";

import Card from "../../components/Card/Card.js"
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter"
import * as adminService from "../../Axios-Actions/adminService";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/bg7.jpg";
import { Divider, Typography } from "@material-ui/core";
import { Apps, Face, Phone, PhonelinkLockOutlined, VpnKey } from "@material-ui/icons";


const useStyles = makeStyles(styles);

export default function ResetPassword(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email,setEmail] = React.useState('');
  const [gen,setGen] =React.useState(false);
  const [rppass,setrppass] =React.useState("");
  const [rpcode,setrpcode] =React.useState(""); 
  const rp=()=>{

    if(!email){
      alert("To reset your password you need to write an email.")
    }
    else if(email){
      adminService.sendrpcodeuser(email);
      setGen(true);
    }
  }
  const update=(e)=>{
    adminService.resetuser(email,rppass,rpcode)
    .then((result) => {
      console.log("Successfully Reset");
        setTimeout(function () {
          window.location = "/login";
        }, 2000);
      })
      .catch((err) => {
        console.log(" upload error");
      });
  }

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="XsSupport"
        rightLinks={""}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Reset Password</h2>
                 
                  </CardHeader>
                  <CardBody>
                  <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
            />

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  <div><Typography> Forget Password? Click button to get code on email. </Typography></div>
                  <Button color="primary" onClick={()=>{rp()}}>Send Code</Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
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
  <Grid item md={12} style={{backgroundColor:'#a62e9c',color:'white'}}>
    <center>
      <br/>
      <Typography variant="h5">Reset Password</Typography> 
    <Divider style={{marginTop:'5px'}}/>
    </center>
  </Grid>
   <Grid item md={1}></Grid>
   <Grid item md={5}>
    
     <TextField fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end"><VpnKey style={{color:'#a62e9c'}}/></InputAdornment>,
      }} 
     label="Enter New Password" onChange={(e)=>{setrppass(e.target.value)}
    }/>
     <br/>

   </Grid>
  
   <Grid item md={5}>

     <TextField fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end"><VpnKey style={{color:'#a62e9c'}}/></InputAdornment>,
      }} 
     label="Enter Verification Code" onChange={(e)=>{setrpcode(e.target.value)}
    }/>
     <br/>
     <Divider/>
   </Grid>
   <Grid item md={1}></Grid>
   <Grid item md={4}></Grid>
   <Grid item md={4}>
     <br/>
 
     <Button color="primary" onClick={(e)=>update(e)} >Reset Password</Button>
 <Button color="primary" onClick={()=>setGen(!gen)}>Close</Button>
 </Grid>
 <Grid item md={4}></Grid>
 </Grid>
  </Container>
  </Paper>
  </Fade>
</Modal>
    </div>
    
  );
}
