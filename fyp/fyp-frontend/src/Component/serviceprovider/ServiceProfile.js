import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import Palette from "@material-ui/icons/Palette";

import PublishIcon from '@material-ui/icons/Publish';
import MapIcon from "@material-ui/icons/Map"
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import HeaderLinksS from "../../components/Header/HeaderLinksS.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";

import profile1 from "../../assets/img/faces/christian.jpg";
import * as serviceproviderService from "../../Axios-Actions/serviceproviderService";


import styles from "../../assets/jss/material-kit-react/views/profilePage";
import { Card, CardActionArea, CardActions, CardContent, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import { Details, PanoramaFishEye } from "@material-ui/icons";

import AcceptRequest from "./AcceptRequest";
import AcceptedTask from "./AcceptedTask.js";
import WorkHist from "./WorkHist.js";
import WorkInProg from "./WorkInProg.js";
import FindLocationMap from "../../Component/common/FindLocationMap";
import PrivateAcceptRequest from "./PrivateAcceptRequest"



const useStyles = makeStyles(styles);

export default function ServiceProfile(props) {




  const [prof,setProfile] = React.useState([]);
 
  const [sp,setSp] = React.useState([]);
  const [fName,setFName] = React.useState('');
  const [lName,setLName] = React.useState('');
  const [newpass,setNewPass] = React.useState('');
  const [newContact,setNewContact] = React.useState('');
  const [preview,setPreview] = React.useState(false);

  const [updateOpen,setUpdateOpen] = React.useState(false);

  useEffect(() => {
    serviceproviderService.getprofile()
    .then((result)=>{setProfile(result.data)});

    console.log(prof)

  },[]);
  const ch=(e)=>{

    const file=e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend =()=>{
    setPreview(reader.result);
    }
  }
 const up=(e)=>{

    e.preventDefault();
    if(!preview)return;
    console.log(preview);
    try{

      serviceproviderService.saveimage(preview)     
    .then((result) => {
    console.log("Successfull uploaded serviceprovider image");
      setTimeout(function () {
        window.location = "/sprofile";
      }, 2000);
    })
    .catch((err) => {
      this.setState({ invalid: true });
      console.log("image upload error");
    });
    }catch(err){

      console.log("error in front end"+err);
    }

  }
  
  
 
/*

  newChange=(event)=>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }); 


  };
  editSave=()=>{



    if(this.state.newfname.length>10||this.state.newfname.length<3){
console.log("enter valid firstname");
    }else if(this.state.newlname.length>10||this.state.newlname.length<3){

      console.log("enter valid lastname");

    }else if(this.state.newpass.length<4){

      
      console.log("enter valid password");
    }else if(this.state.newcontact.length>255||this.state.newcontact.length<11){


      console.log("enter valid contact no");
    }else{




    customerService.editdata(this.state.newfname,this.state.newlname,this.state.newpass,this.state.newcontact)
    .then((result) => {
    console.log("Successfull edited customer data");
      setTimeout(function () {
        window.location = "/customerdashboard";
      }, 2000);
    })
    .catch((err) => {
      this.setState({ invalid: true });
      console.log("Server error");
    });
  }
  }


  handleChange = () => {
    this.setState({updateOpen:!this.state.updateOpen})
  };
*/









  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
  
      <Header
        color="transparent"
        brand="XsSupport"
        rightLinks={<HeaderLinksS />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("../../assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                  <form onSubmit={(e) => up(e)}>   <input style={{ display: 'none' }} type='file' id="file" name='image' onChange={(e) => ch(e)} accept="image/*" />
                    <label for="file">   
                  <img  style={{maxHeight:'200px',maxWidth:'200px'}}src={prof.imageURL||profile1} alt="No Content" className={imageClasses}/>
                  </label>
                  </form>

                  </div>
                  <div className={classes.name}>
                  <form onSubmit={(e) => up(e)}>

                      <Button style={{ height: '40px' }} type='submit'><PublishIcon /></Button>
                    </form>
      <h3 className={classes.title}>{prof.serviceprovidername}</h3>
                    <h3>Service Provider</h3>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
 
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                           <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                        <NavPills 
                  alignCenter
                  
                  tabs={[
                    {
                      tabButton: "Accept Request",
                      tabIcon: Details,
                      tabContent: (
                        <GridContainer justify="center">
                         
                          <GridItem xs={12} sm={12} md={11}>
                          <AcceptRequest/>
                          </GridItem>

                        
                          <br/>
                        </GridContainer>
                      )
                    },
                      {
                        tabButton: "Accepted Task",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                              <Typography variant="h6">Accepted Tasks</Typography>
                              <br/>
                              <AcceptedTask/>
                            </GridItem>
                            
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Work History ",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                            <br/>
                      
                           <WorkHist/>
                           
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Work In Progress ",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                            <br/>
                      
                          <WorkInProg/>
                           
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Private Task Requests ",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                            <br/>
                      
          <PrivateAcceptRequest/>
                           
                            </GridItem>
                          </GridContainer>
                        )
                      }
                      
                    
                  ] }/>
                 
                        
                          
                          </GridItem>
                        </GridContainer>
                   
                      )
                    }
                    , {
                      tabButton: "Find Task Location",
                      tabIcon: MapIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={15}>
            
                         <FindLocationMap/>
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
   
    </div>
  );
}
