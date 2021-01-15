import React from "react";
import { Map, TileLayer , Marker , Popup, withLeaflet,useLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "./search.css"
import "lrm-google";
import "./routing.css";
import useGeoLocation from "./useGeoLocation";
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Backdrop, Badge, Divider, Fade, Modal, TextField } from '@material-ui/core';
import * as customerService from "../../Axios-Actions/customerService";
import PostATask from "../customer/postATask"
import * as privateTaskService from "../../Axios-Actions/privateTaskService";

import usericon from "./marker/user.svg";
import serviceicon from "./marker/service.svg";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const markerstart = new L.Icon({
    iconUrl: usericon,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46], 
  });
  const markerend = new L.Icon({
    iconUrl: serviceicon,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46], 
  });
  let currentS;
export default function NearbyServices(){
const [center,setCenter] = React.useState({lat:31.5204,lng: 74.3587});
const [worker, setWorker] = React.useState([]);
const [selected, setSelected] = React.useState(null);
const [view,setView] = React.useState(false);
const ZOOM_LEVEL= 12;
const mapRef= React.useRef();
const { map } = useLeaflet();


const [privatetask, setprivatetaskOpen] = React.useState(false);
const [title, setTitle] = React.useState('');
const [servicetype, setServicetype] = React.useState('');
const [location2, setLocation] = React.useState('');
const [pertask, setPertask] = React.useState('');
const [perhour, setPerhour] = React.useState('');
const [permonth, setPermonth] = React.useState('');
const [start, setStart] = React.useState('');
const [end, setEnd] = React.useState('');
const [month, setLMonth] = React.useState('');
const [description, setDescription] = React.useState('');
  const location = useGeoLocation();

  React.useEffect(() => {
    customerService.AllSprofiles()
    .then((result)=>{setWorker(result.data)})
    
  },[]);
  const ha=(e,serviceprovider)=>{

    currentS=serviceprovider;
    setprivatetaskOpen(true);
  }
  const sendptask =(e,serviceprovider)=>{

    if(title&&location2&&description&&pertask&&perhour&&permonth&&month&&start&&end&&servicetype){

      privateTaskService.PostATask(title,servicetype,location2,perhour,permonth,pertask,start,end,month,description,serviceprovider) 
       .then((result) => {
        console.log("Successfully send a private task");
          setTimeout(function () {
            window.location = "/profile";
          }, 2000);
        })
        .catch((err) => {
         
          console.log(" upload error");
        });
    }else{
      alert("incomplete input");
    }

  }

return (
    <Grid container>
      <Grid item md={10}>
      <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}}

  open={privatetask}
  onClose={!privatetask}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500, 
  }}
>

  
                    <Container maxWidth="sm">
                    <Grid container>
                    <Grid item md={3}></Grid>
                    <Paper elevation={2} style={{marginTop:'40px'}} >
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
                          <li style={{marginLeft:'25%'}}><Button variant="contained" color="primary" style={{marginRight:'20px'}} onClick={(e)=>sendptask(e,currentS)}>Send</Button><Button variant="contained" color="secondary" onClick={()=>{setprivatetaskOpen(false)}}>Close</Button></li>
                        </ul>
                      </Grid>
                     </Paper>
                    </Grid>
                    </Container>
                    
</Modal>

    <Map
    style={{height:"40vw",width:"100vw"}}
    center={center}
    zoom={ZOOM_LEVEL}
    ref={mapRef}
    >
        <TileLayer
        url={"https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=ZCG7N28011wlM8ubEEWf"}
        attribution={'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}

        
        />
                {location.loaded && !location.error && (
                <Marker
                  icon={markerstart}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ><Popup>
                  <p>Your Current Location</p>
                  <p>Latitude:{location.coordinates.lat}</p>
                  <p>Longitude:{location.coordinates.lng}</p>
                  </Popup>
                
                  </Marker>
              )}
                 
                 {worker.map(w=>(

                                     <Marker
                                     key={w._id}
                                     icon={markerend}
                                     position={[
                                       w.Latitude,
                                       w.Longitude,
                                     ]}
                                   ><Popup>
                                     <p>Name:{w.serviceprovidername}</p>
                                     <Divider/>
                                     <p>Latitude:{w.Latitude}</p>
                                     <p>Longitude:{w.Longitude}</p>
                                     <Divider/>
                                     <br/>
                                     <Button onClick={(e)=>ha(e,w.serviceprovider)} variant="outlined">Send Task</Button>
                                     </Popup>
                                   
                                     </Marker>
                                     
                 ))}
                  
    </Map>
    </Grid>
    </Grid>

);

} 