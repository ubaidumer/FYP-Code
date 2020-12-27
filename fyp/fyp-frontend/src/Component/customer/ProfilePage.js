import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import { Grid, Input, Modal } from '@material-ui/core';

import img from "./plumber.jpg"

import Palette from "@material-ui/icons/Palette";
import PublishIcon from '@material-ui/icons/Publish';
import MapIcon from '@material-ui/icons/Map';
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
import studio1 from "../../assets/img/examples/servant2.jpg";

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
import Stripecard from "./Stripecard.js";
import NearbyServices from "../../Component/common/NearbyServices.js"
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {




  const [prof, setProfile] = React.useState([]);
  const [openService,setOpenService]= React.useState(false);
  const [sp, setSp] = React.useState([]);
  const [getDat, setGetD] = React.useState([]);
  const [lName, setLName] = React.useState('');
  const [newpass, setNewPass] = React.useState('');
  const [newContact, setNewContact] = React.useState('');
  const [preview, setPreview] = React.useState(false);
  const [s, setS] = React.useState([]);

  const [updateOpen, setUpdateOpen] = React.useState(false);

  useEffect(() => {
    customerService.getprofile()
      .then((result) => { setProfile(result.data) });

    customerService.getAllService()
      .then((result) => { setSp(result.data) });
    customerService.AllSprofiles()
      .then((result) => {
        setS(result.data)
        console.log(result.data)
      });

      


  }, []);

  const viewSp = (_id) =>{
    setGetD([_id])
    setOpenService(true)
  }
  const getData=(id)=>{

    customerService.findService(id)
    .then((result)=>{
        setGetD(result.data);
     
        })
}


  const ch = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    }
  }
  const up = (e) => {

    e.preventDefault();
    if (!preview) return;
    console.log(preview);
    try {

      customerService.saveimage(preview)
        .then((result) => {
          console.log("Successfull uploaded customer image");
          setTimeout(function () {
            window.location = "/profile";
          }, 2000);
        })
        .catch((err) => {
          this.setState({ invalid: true });
          console.log("image upload error");
        });
    } catch (err) {

      console.log("error in front end" + err);
    }

  }



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
                  <div >  
                    <form onSubmit={(e) => up(e)}>   <input style={{ display: 'none' }} type='file' id="file" name='image' onChange={(e) => ch(e)} accept="image/*" />
                    <label for="file">   
                      <img style={{ maxHeight: '200px', maxWidth: '200px' }} src={prof.imageURL || profile1} alt="No Content" className={imageClasses} />
                    </label>
                  </form>

                  </div>
                  <div className={classes.name}>
                    <form onSubmit={(e) => up(e)}>

                      <Button style={{ height: '40px' }} type='submit'><PublishIcon /></Button>
                    </form>
                    <h3 className={classes.title}>{prof.customername}</h3>
                    <h3>Customer</h3>
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

                            <PostATask />
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
                                        <OrderHistory />
                                      </GridItem>


                                      <br />
                                    </GridContainer>
                                  )
                                },
                                {
                                  tabButton: "Posted Tasks",
                                  tabIcon: Details,
                                  tabContent: (
                                    <GridContainer justify="center">
                                      <GridItem xs={12} sm={12} md={11}>
                                        <Typography variant="h6">Posted Tasks</Typography>
                                        <br />
                                        <PostedTask />
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
                                        <br />
                                        <ActiveTask />

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
                                        <br />
                                        <AcceptRequestS />

                                      </GridItem>
                                    </GridContainer>
                                  )
                                }


                              ]} />



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
                                    label="Search..." />
                                </div>
                              </GridItem>


                              <GridItem md={6}>
                                <div>
                                  <Typography variant="h6">Category</Typography>
                                  <CustomDropdown />
                                </div>
                              </GridItem>
                            </GridContainer>
                            <ul style={{ listStyle: 'none', display: 'inline-flex', flexWrap: 'wrap' }}>
                              {
                                s.map(st => (
                                  <li key={st.id}>
                                    <Card style={{ maxWidth: '300px', marginLeft: '20px', marginTop: '10px' }} >
                                      <CardActionArea >
                                        <CardContent >
                                          <img src={st.imageURL || studio1} style={{ maxHeight: "150px", maxWidth: "200px" }}></img>
                                          <Typography gutterBottom variant="h6" component="h2">
                                            {st.serviceprovidername}
                                          </Typography>
                                          <Typography gutterBottom variant="h6" component="h2">
                                            Task Completed:{st.ordercompleted}
                                          </Typography>
                                          <Typography gutterBottom variant="h6" component="h2">
                                            Joined Us On:{st.joindate}
                                          </Typography>
                                        </CardContent>
                                      </CardActionArea>
                                      <CardActions>

                                        <Button size="small" color="primary" style={{ marginLeft: "50px" }}
                                      onClick={() => viewSp(st._id)}
                                    >
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
                            <br />

                            <NavPills
                              alignCenter

                              tabs={[
                                {
                                  tabButton: "Cash on Spot",
                                  tabIcon: Details,
                                  tabContent: (
                                    <GridContainer justify="center">

                                      <GridItem xs={12} sm={12} md={11}>
                                        <Pay />
                                      </GridItem>


                                      <br />
                                    </GridContainer>
                                  )
                                },
                                {
                                  tabButton: "Pay By Credit Cards",
                                  tabIcon: Details,
                                  tabContent: (
                                    <GridContainer justify="center">
                                      <GridItem xs={12} sm={12} md={11}>
                                        <Stripecard />


                                      </GridItem>

                                    </GridContainer>
                                  )
                                }


                              ]} />

                          </GridItem>
                        </GridContainer>
                      )
                    }, {
                      tabButton: "Services Nearby",
                      tabIcon: MapIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={15}>

                            <NearbyServices />
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
      <Modal 
                       open={openService}
                       onClose={!openService} 
                       >

                    <Grid container>
                        <Grid item md={2}></Grid>

                        <Grid item md={8}> 

                        <ul>
                {
                    getDat.map(t=>(
                        <li key={t._id}>

                            <Paper elevation={2} style={{marginTop:'40px'}}>
                              <div style={{display:'inline-flex',}}>
                              <div style={{marginLeft:'30px',marginBottom:'20px'}}>
                                  <img src={img} style={{marginTop:'30px',maxHeight:'500px',maxWidth:'400px'}}/>
                                 
                              </div>
                              <div style={{marginTop:'40px',paddingLeft:'40%',color:'blueviolet'}}>
                          

       <Typography variant="h5" >{t.firstname} {t.lastname}:</Typography>
                    <Typography variant="subtitle1">{t.servicetype}</Typography>
                    <Typography variant="subtitle1">{t.email}</Typography> 


        <Typography variant="h5" >Azeem Sultan:</Typography>
                              <Typography variant="subtitle1">Plumber</Typography>
                              <Typography variant="subtitle1">Description </Typography> 
                     
   
             <Typography variant="subtitle2">____________________________</Typography>
                              <div style={{marginTop:'30px'}}>
                               <Typography>Want to hire?</Typography>
                               <Button variant="outlined" onClick={()=>this.setState({openService:!this.state.openService})}>Send Task</Button>
 
                              </div>

                              <div style={{marginTop:'40px',}}>

                              <Typography  variant="subtitle1">Contact on number:</Typography>
                    <Typography  variant="subtitle1">{t.contactno}</Typography>

                             <Typography  variant="subtitle1">Task Completion %: 90 </Typography>
                             <Typography  variant="subtitle1">Task Cancellation %:5 </Typography>
                             <Typography  variant="subtitle1">Response Time : 1 Hour </Typography>

                              </div>
                              </div>
                              </div>
                            </Paper>

                            </li>
                    ))
                }
            </ul>

                          
                        </Grid> 

                        <Grid item md={2}></Grid>

                    </Grid>
                  </Modal>
    </div>
  );
}
