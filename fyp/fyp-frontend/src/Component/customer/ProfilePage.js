import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";

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
import * as customerService from "../../Axios-Actions/customerService"
import studio1 from "../../assets/img/examples/studio-1.jpg";

import styles from "../../assets/jss/material-kit-react/views/profilePage";
import { Card, CardActionArea, CardActions, CardContent, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import { Details, Money, PanoramaFishEye, Payment } from "@material-ui/icons";

import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";

import PostATask from "../customer/postATask"
import OrderHistory from "./OrderHistory.js";
import PostedTask from "./postedTask.js";
import ActiveTask from "./ActiveTask.js";
import AcceptRequestS from "./AcceptRequestS.js";
import Pay from "./Pay.js";


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {




  const [prof,setProfile] = React.useState([]);
 
  const [sp,setSp] = React.useState([]);
  const [fName,setFName] = React.useState('');
  const [lName,setLName] = React.useState('');
  const [newpass,setNewPass] = React.useState('');
  const [newContact,setNewContact] = React.useState('');

  const [updateOpen,setUpdateOpen] = React.useState(false);

  useEffect(() => {
    customerService.getprofile()
    .then((result)=>{setProfile(result.data)});

    customerService.getAllService()
    .then((result)=>{setSp(result.data)});



  },[]);
  
 

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
      <Parallax small filter image={require("../../assets/img/bg4.jpg")} />
   
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
      <h3 className={classes.title}>{prof.customername}</h3>
                    <h6>Customer</h6>
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
                      tabButton: "Order History",
                      tabIcon: Details,
                      tabContent: (
                        <GridContainer justify="center">
                         
                          <GridItem xs={12} sm={12} md={11}>
                          <OrderHistory/>
                          </GridItem>

                        
                          <br/>
                        </GridContainer>
                      )
                    },
                      {
                        tabButton: "Posted Tasks",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                              <Typography variant="h6">POSTED TASKS</Typography>
                              <br/>
                              <PostedTask/>
                            </GridItem>
                            
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Active Tasks ",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                            <br/>
                            <ActiveTask/>
                           
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Accept Service ",
                        tabIcon: Details,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={11}>
                            <br/>
                            <AcceptRequestS/>
                           
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
                    },
                    {
                      tabButton: "Payment ",
                      tabIcon: Money,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={11}>
                          <br/>
                          
                         <Pay/>
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
