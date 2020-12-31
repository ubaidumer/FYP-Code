import React from "react";
import { Map, TileLayer , Marker , Popup, withLeaflet,useLeaflet } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "./search.css"
import "lrm-google";
import "./routing.css";
import useGeoLocation from "./useGeoLocation";
import { Button, Grid } from "@material-ui/core";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import usericon from "./marker/user.svg";
import serviceicon from "./marker/service.svg";
import "./reactsearch.css";
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const markerstart = new L.Icon({
    iconUrl: serviceicon,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46], 
  });
  const myIcon = L.icon({
    iconUrl: usericon,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46], 
});
export default function FindLocationMap(){
const [center,setCenter] = React.useState({lat:31.5204,lng: 74.3587});
const [doctor, setDoctor] = React.useState([]);
const [selected, setSelected] = React.useState(null);
const ZOOM_LEVEL= 9;
const mapRef= React.useRef();


  const location = useGeoLocation();

return (
    <Grid container>
      <Grid item md={10}>
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
                    <ReactLeafletSearch className="custom-style"position="topleft" markerIcon={myIcon}     showMarker={true}
    showPopup={false}/>;
                 
                    
    </Map>
    </Grid>
    </Grid>

);

} 