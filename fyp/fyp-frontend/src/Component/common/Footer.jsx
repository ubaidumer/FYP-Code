import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import img1 from './ios.png';
import img2 from './play.png'
const Footer = () => {
    return ( 
        <Grid container style={{backgroundColor:'#5391f5'}}>
         <Grid item md={4} xs={12}>
          <center>
              <Typography variant='h6' style={{marginTop:'20px',color:'white'}}>
                Contact us
              </Typography>
              <Typography variant='subtitle2' style={{marginTop:'20px',color:'white'}}>
                  Email Address: Azeemsult4n@gmail.com
              </Typography>
              <Typography variant='subtitle2' style={{marginTop:'20px',color:'white'}}>
                  Phone: +923074336839 , +923201238891
              </Typography>
              <Typography variant='subtitle2' style={{marginTop:'20px',color:'white'}}>
                  Address: Jinnah Tower, Valencia Lahore Pk
              </Typography>
          </center>
         </Grid>

         <Grid item md={4} xs={12}>
             
         <center>
              <Typography variant='h6' style={{marginTop:'20px',color:'white'}}>
                About us
              </Typography>
              <Typography variant='subtitle2' style={{marginTop:'20px',color:'white'}}>
                 XsSupport 
              </Typography>
              <Typography variant='subtitle2' style={{marginTop:'20px',color:'white'}}>
                  Lorem ipsum
              </Typography>
              <Typography variant='subtitle2' style={{marginTop:'20px',color:'white'}}>
                Lorem ipsum
              </Typography>
          </center>

             </Grid>

             <Grid item md={4} xs={12}>
               <center>
                   <Typography variant="h6" style={{marginTop:'20px',color:'white'}} >
                       Download our App
                   </Typography>
                   <div style={{marginTop:'15px'}}>
             <img style={{width:'30%'}}
              src={img1}/>
              </div>
              <div style={{marginTop:'20px'}}>
             <img style={{width:'30%'}}
             src={img2}/>
             </div>
             </center>
             </Grid>
 
        </Grid>
     );
}
 
export default Footer; 