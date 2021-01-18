import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import { Backdrop, CircularProgress, Container, Divider, Fade, Grid, Input, Modal } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import img from "../../assets/img/bg2.jpg"

import Palette from "@material-ui/icons/Palette";
import PublishIcon from '@material-ui/icons/Publish';
import MapIcon from '@material-ui/icons/Map';
// core components
import Rating from "./rating"
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Header from "../../components/Header/Header"
import HeaderLinksC from "../../components/Header/HeaderLinksC"
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";

import profile1 from "../../assets/img/faces/christian.jpg";
import no from "../../assets/img/faces/no.png"
import * as customerService from "../../Axios-Actions/customerService"
import studio1 from "../../assets/img/examples/servant2.jpg";

import styles from "../../assets/jss/material-kit-react/views/profilePage";
import { Card, CardActionArea, CardActions, CardContent, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import { Apps, AttachMoney, Details, Money, PanoramaFishEye, Payment, SendOutlined } from "@material-ui/icons";

import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import * as privateTaskService from "../../Axios-Actions/privateTaskService";


import PostATask from "../customer/postATask"
import OrderHistory from "./OrderHistory.js";
import PostedTask from "./postedTask.js";
import ActiveTask from "./ActiveTask.js";
import AcceptRequestS from "./AcceptRequestS.js";
import AcceptRequestSP from "./AcceptRequestSP.js";
import Pay from "./Pay.js";
import Stripecard from "./Stripecard.js";
import NearbyServices from "../../Component/common/NearbyServices.js"
import rating from "./rating";
const useStyles = makeStyles(styles);

let currentS;
let image;
export default function ProfilePage(props) {




  const [prof, setProfile] = React.useState([]);
  const [openService,setOpenService]= React.useState(false);
  const [sp, setSp] = React.useState([]);
  const [details, setGetD] = React.useState([]);
  const [preview, setPreview] = React.useState(false);
  const [s, setS] = React.useState([]);
  const [privatetask, setprivatetaskOpen] = React.useState(false);
  const [sbn,setsbn]=React.useState('');

  const [title, setTitle] = React.useState('');
  const [servicetype, setServicetype] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [pertask, setPertask] = React.useState('');
  const [perhour, setPerhour] = React.useState('');
  const [permonth, setPermonth] = React.useState('');
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [month, setLMonth] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [loading,setLoading] = React.useState(false);
  const [progress,setProgress] = React.useState(0);






  useEffect(() => {
    customerService.getprofile()
      .then((result) => { setProfile(result.data) });

    customerService.getAllService()
      .then((result) => { setSp(result.data) });

    customerService.AllSprofiles()
      .then((result) => {
        setS(result.data)
  
      });

      

      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 20));
      
      }, 500);
  
      return () => {
       
        clearInterval(timer);
       
      };

  }, []);

  let omegalul=(_id)=>{
    setOpenService(false);
    getData(_id)
  }
  let searchbytype=(type)=>{
    customerService.getServicebbytype(type)
    .then((result)=>{
    setS(result.data);
   
    })
    console.log(setS)


}

let searchbyall=()=>{
  customerService.getAllService()
  .then((result)=>{
  setS(result.data);
  })

}
const searchname=()=>{

  customerService.searchname(sbn)
  .then((result)=>{
    setS(result.data);
    })
}
let getData=(id)=>{

  customerService.findService(id)
  .then((result)=>{
      setS(result.data);
      console.log(this.state.servant);
      })
}
 searchbytype= searchbytype.bind(s)

  const sendptask =(e,serviceprovider)=>{

    if(title&&location&&description&&pertask&&perhour&&permonth&&month&&start&&end&&servicetype){

      privateTaskService.PostATask(title,servicetype,location,perhour,permonth,pertask,start,end,month,description,serviceprovider) 
       .then((result) => {
        console.log("Successfully send a private task");
          setTimeout(function () {
            window.location = "/profile";
          }, 2000);
        })
        .catch((err) => {
          this.setState({ invalid: true });
          console.log(" upload error");
        });
    }else{
      alert("incomplete input");
    }

  }

  const viewSp = (id,img) =>{
    console.log(id);
    customerService.findService(id)
    .then((result)=>{
      console.log(result);
        setGetD(result.data);
        setOpenService(true);
        });
        currentS=id;
        image=img
  }
const okhello =(e)=>{
setOpenService(false);
setprivatetaskOpen(true);
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
    setLoading(true)
    e.preventDefault();
    if (!preview) 
    {
  return
    };
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
        rightLinks={<HeaderLinksC />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={img} />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}> 
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div style={{marginRight:'12px'}} >  
                    <form onSubmit={(e) => up(e)}>   <input style={{ display: 'none' }} type='file' id="file" name='image' onChange={(e) => ch(e)} accept="image/*" />
                    <label for="file">   
                      <img style={{ maxHeight: '200px', maxWidth: '200px' }} src={prof.imageURL || no } alt="No Content" className={imageClasses} />
                    </label>
                  </form>

                  </div>
                  <div className={classes.name}>
                  { loading ? <CircularProgress variant="determinate" value={progress} />: <div></div> }
                    <form onSubmit={(e) => up(e)}>

                      <Button color="primary" style={{ height: '40px' }} type='submit'><PublishIcon /></Button>
              
                    </form>
                    <Typography style={{color:'#a62e9c'}} variant="h6">{prof.customername}</Typography>

                    <Typography className={classes.description} variant="h6">Customer</Typography>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <Grid container spacing={6}>
            <Grid item md={4} xs={12}>
            <center>
                 <Paper elevation={3} style={{width:'200px',height:'150px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'20px'}}>
                         Join Date
                     </Typography>
                     <Divider/>
                     <Typography variant='h5' style={{paddingTop:'30px'}}>
                        {prof.joindate}
                     </Typography>
                 </Paper> 
                 
                 </center>
            </Grid>
            <Grid item md={4} xs={12}>
            <center>
                 <Paper elevation={3} style={{width:'200px',height:'150px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'20px'}}>
                         Task Completed
                     </Typography>
                     <Divider/>
                     <Typography variant='h4' style={{paddingTop:'25px'}}>
                        {prof.taskcompleted}
                     </Typography>
                 </Paper> 
                 
                 </center>
            </Grid>
            <Grid item md={4} xs={12}>
            <center>
                 <Paper elevation={3} style={{width:'200px',height:'150px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'20px'}}>
                         Credit Spent
                     </Typography>
                     <Divider/>
                     <Typography variant='h4' style={{paddingTop:'25px'}}>
                        {prof.creditspent}
                     </Typography>
                 </Paper> 
                 
                 </center>
            </Grid>
            </Grid>
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
                                ,
                                {
                                  tabButton: "Accept Private Service ",
                                  tabIcon: Details,
                                  tabContent: (
                                    <GridContainer justify="center">
                                      <GridItem xs={12} sm={12} md={11}>
                                        <br />
                                             <AcceptRequestSP/>
                                      </GridItem>
                                    </GridContainer>
                                  )
                                },
                                


                              ]} />



                          </GridItem>
                        </GridContainer>

                      )
                    },
                    {
                      tabButton: "Service Providers",
                      tabIcon: PanoramaFishEye,
                      tabContent: (
                        <GridContainer justify="left">
                          <GridItem xs={12} sm={12} md={12}>
                            <GridContainer justify="center">
                              <GridItem md={6}>
                                <div>
                                  <Typography variant="h6" >Search</Typography>
                                  <TextField onChange={(e)=>{setsbn(e.target.value)}}
                                    label="Enter Name" />
                                    <Button style={{marginLeft:'10px'}} color="warning" onClick={()=>{searchname()}}>Search</Button>
                                </div>
                              </GridItem>


                              <GridItem md={6}>
                                <div>
                                  <Typography variant="h6">Category</Typography>
                                  <CustomDropdown
                                  color="rose"
          noLiPadding
          buttonText=""
          buttonProps={{
            className: classes.navLink,
            
          }}
          buttonIcon={ExpandMoreIcon}
          dropdownList={[
            <Button style={{width:'150px'}}
            onClick={()=>{searchbytype("maid")}}
            >
              Maid
            </Button>,
            
            <Button style={{width:'150px'}}
            onClick={()=>{searchbytype("plumber")}}
            >
            Plumber</Button>,
              <Button style={{width:'150px'}}
              onClick={()=>{searchbytype("driver")}}
              >
                Driver
              </Button>,
              
              <Button style={{width:'150px'}}
              onClick={()=>{searchbytype("cook")}}>
              Cook</Button>,
                <Button style={{width:'150px'}}
                onClick={()=>{searchbytype("electrician")}}
                >
                  Electrician
                </Button>,
                
                <Button 
                onClick={()=>{searchbytype("shopkeeper")}}
                style={{width:'150px'}}>

                Shop Keeper</Button>
           
          ]}
        />
                                </div>
                              </GridItem>
                            </GridContainer>
                            <div style={{display:'flex'}}>
                            <ul style={{ listStyle: 'none', display: 'inline-flex', flexWrap: 'wrap' }}>
                              {
                                s.map(st => (
                                  <li key={st.id}>
                                    <Card style={{ maxWidth: '300px', marginTop: '10px',marginRight:'30px' }} >
                                      <CardActionArea >
                                        <CardContent >
                                          <img src={st.imageURL || studio1}  style={{ maxHeight: "200px", maxWidth: "300px", borderRadius:'16px 16px 0px 0px' }}></img>
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
                                      onClick={() => viewSp(st.serviceprovider,st.imageURL||studio1)}
                                    >
                                          View Details
                                                   </Button>

                                      </CardActions>
                                    </Card>
                                  </li>

                                ))
                              }
                            </ul>

                            
                            </div>
                           


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
                    ,
                    {
                      tabButton: "Rate & Review",
                      tabIcon: Details,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={11}>
                            <br />
                            <Rating/>

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
      <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                       open={openService}
                       onClose={!openService} 
                       aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description"
                       closeAfterTransition
                       BackdropComponent={Backdrop}
                       BackdropProps={{
                         timeout: 500, 
                       }} 
                       >
                  <Fade in={openService}>
                   <Container maxWidth="sm">
                            <Paper elevation={2}>
                              <Grid container>
                                <Grid item md={8} sm={12}>
                              
                              <div style={{marginLeft:'20px',marginBottom:'20px'}}>
                                  <img src={image} style={{marginTop:'25px',height:'250px',maxWidth:'300px',borderRadius:'16px 16px 0px 0px'}}/>
                              </div>
                              </Grid>
                              <Grid item md={4} sm={12}>
                              <div style={{marginTop:'20px',paddingLeft:'10%',color:'blueviolet'}}>
                          

       <Typography variant="h5" >{details.firstname} {details.lastname}:</Typography>
                    <Typography variant="subtitle1">{details.servicetype}</Typography>
                    <Typography variant="subtitle1">{details.email}</Typography> 


                              <div style={{marginTop:'20px'}}>
                               <Typography>Want to hire?</Typography>
                               <Button onClick={(e)=>{okhello(e)}} variant="outlined">Send Task</Button>
 
                              </div>

                              <div style={{marginTop:'20px',}}>

                              <Typography  variant="subtitle1">Contact No:</Typography>
                    <Typography  variant="subtitle1">{details.contactno}</Typography>
                    <Button onClick={(e)=>{omegalul()}}variant="outlined">Close</Button>
                              </div>
                              </div>
                          
                              </Grid>
                              </Grid>
                            </Paper>


                          
                            </Container> 
                            </Fade>
                  </Modal>
                  <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                       open={privatetask}
                       onClose={!privatetask} 
                       >
                 <Container maxWidth="sm">

                    <Grid container>
                  
                    <Paper elevation={2} >
                    <center>
                            <br/>
                        <Typography variant="h5">Send a Private Task</Typography>
                        <Divider/>
                        <br/>
                        </center>
                      <Grid container>
                    
                        <ul style={{listStyle:'none'}}>
                          <li>
                          <Grid item md={10}>
                            <TextField 
                          fullWidth
                          onChange={(e)=>{setTitle(e.target.value)}} label="Title"></TextField>
                          </Grid>
                          </li>
                          <br/>
                          <li><Typography variant='h6' style={{color:'#2d4a6b'}}>
                 Service type <span>   <select id="servicetype" onChange={(e)=>{setServicetype(e.target.value)}}
                 style={{width:'150px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="">Select</option>
                                <option value="Maid">Maid</option>
                                <option value="Electrian">Electrian</option>
                                <option value="Cook">Cook</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Shopkeeper">Shopkeeper</option>
                                
                                </select> </span>
             </Typography></li>
                          
                            <Grid item md={10}>
                            <li>
                            <TextField fullWidth onChange={(e)=>{setLocation(e.target.value)}} label="Full Address"></TextField>
                            </li>
                            </Grid>

                       <Typography variant='h6' style={{color:'#2d4a6b'}}>Bidding</Typography>
                      <Grid container>
                    
                        <Grid item md={3}>
                         <TextField onChange={(e)=>{setPertask(e.target.value)}} label="per task"></TextField> 
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={3}>
                        <TextField onChange={(e)=>{setPerhour(e.target.value)}}label="per hour"></TextField> 
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={3}>
                        <TextField onChange={(e)=>{setPermonth(e.target.value)}}label="per month"></TextField>
                        </Grid>
                      </Grid>
                         
                          <li><Typography variant='h6' style={{color:'#2d4a6b'}}>Time Duration</Typography> </li>
                          <br/>
                          <Grid container spacing={3}>
                          <Grid item md={4}>
                          <div style={{display:'inline-flex'}}>   <Typography>Starts:</Typography> <input id="starttime" onChange={(e)=>{setStart(e.target.value)}}type="time"style={{width:'100px',marginLeft:'5px'}}/> </div>
                          </Grid>
                          <Grid item md={4}>
                           <div style={{display:'inline-flex'}}> <Typography>Ends:</Typography> <input id="starttime" onChange={(e)=>{setEnd(e.target.value)}} type="time"style={{width:'100px',marginLeft:'5px'}}/> </div>
                            </Grid>
                       <Grid item md={4}>
                     <div style={{display:'inline-flex'}}> <Typography>Month</Typography>  <select onChange={(e)=>{setLMonth(e.target.value)}}id="month" style={{width:'50px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                
                                </select>
                                </div>
                                </Grid>
                                </Grid>
                                <Grid item md={10}>
                          <li><TextField fullWidth onChange={(e)=>{setDescription(e.target.value)}}label="Description"></TextField></li> </Grid>
                          <br/>
                          <li style={{marginLeft:'25%'}}><Button color="primary" style={{marginRight:'19px'}} onClick={(e)=>sendptask(e,currentS)}>Send</Button><Button color="danger" onClick={()=>{setprivatetaskOpen(false)}}>Close</Button></li>
                        </ul>
                      </Grid>
                     </Paper>
                    </Grid>
                    </Container>
                  </Modal>
    </div>
  );
}
