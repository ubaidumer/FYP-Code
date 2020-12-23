import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";

import profile1 from "../../assets/img/faces/christian.jpg";
import * as serviceproviderService from "../../Axios-Actions/serviceproviderService";
import studio1 from "../../assets/img/examples/studio-1.jpg";
import studio2 from "../../assets/img/examples/studio-2.jpg";
import studio3 from "../../assets/img/examples/studio-3.jpg";
import studio4 from "../../assets/img/examples/studio-4.jpg";
import studio5 from "../../assets/img/examples/studio-5.jpg";
import work1 from "../../assets/img/examples/olu-eletu.jpg";
import work2 from "../../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../../assets/img/examples/clem-onojegaw.jpg";

import styles from "../../assets/jss/material-kit-react/views/profilePage";
import { Card, CardActionArea, CardActions, CardContent, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import { Details, PanoramaFishEye } from "@material-ui/icons";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";

import PostATask from "../customer/postATask"
import AcceptRequest from "./AcceptRequest";
import AcceptedTask from "./AcceptedTask.js";
import WorkHist from "./WorkHist.js";
import WorkInProg from "./WorkInProg.js";




const useStyles = makeStyles(styles);

export default function ServiceProfile(props) {




  const [prof,setProfile] = React.useState([]);
 
  const [sp,setSp] = React.useState([]);
  const [fName,setFName] = React.useState('');
  const [lName,setLName] = React.useState('');
  const [newpass,setNewPass] = React.useState('');
  const [newContact,setNewContact] = React.useState('');

  const [updateOpen,setUpdateOpen] = React.useState(false);

  useEffect(() => {
    serviceproviderService.getprofile()
    .then((result)=>{setProfile(result.data)});

    console.log(prof)

  },[]);
  
 
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
        rightLinks={<HeaderLinks />}
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
                    <img src={profile1} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
      <h3 className={classes.title}>{prof.serviceprovidername}</h3>
                    <h6>Service Provider</h6>
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
                      tabButton: "Post A Task",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={10}>
            
                          <PostATask/>
                          </GridItem>
                        </GridContainer>
                      )
                    },
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
                      }
                      
                    
                  ] }/>
                 
                        
                          
                          </GridItem>
                        </GridContainer>
                   
                      )
                    },
                    {
                      tabButton: "Service Providers",
                      tabIcon: PanoramaFishEye,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                        <GridContainer justify="center">
                           <GridItem md={6}>
                           <div>
                          <Typography variant="h6">Search</Typography>
                          <TextField
                          label="Search..."/>
                        </div>
                           </GridItem>


                           <GridItem md={6}>
                           <div>
                          <Typography variant="h6">Category</Typography>
                          <CustomDropdown/>
                        </div>
                           </GridItem>
                           </GridContainer>
                          <ul style={{ listStyle: 'none', display: 'inline-flex', flexWrap: 'wrap' }}>
                            {
                                sp.map(s => (
                                    <li key={s.id}>
                                        <Card style={{ maxWidth: '200px', marginLeft: '20px', marginTop: '10px' }} >
                                            <CardActionArea>
                                                <img src={studio1} style={{ width: '200px', maxHeight: '150px' }} />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="h2">
                                                        {s.firstname} {s.lastname}
                                                    </Typography>
                                                    <Typography gutterBottom variant="subtitle1" component="h2">
                                                        {s.servicetype}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>

                                                <Button size="small" color="primary" style={{ marginLeft: '20px' }}
                                                    onClick={() => this.setState({ openService: !this.state.openService }, this.getData(s._id))}>
                                                    View Details
        </Button>

                                            </CardActions>
                                        </Card>
                                    </li>

                                ))
                            }
                        </ul>




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
