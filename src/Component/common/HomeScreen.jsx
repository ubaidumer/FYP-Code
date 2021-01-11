import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import first from './first.jpg';
import second from './second.jpg'
import third from './third.jpg';
import fourth from './22.png'
import fifth from './HD.jpg';
import sixth from './aa.jpg'
import maid from './maid.jpg';
import elec from './electric.jpg';
import plumber from './plumber.jpg';
import azeem from './azeem.jpg'
import usman from './usman.jpg'
import ubaid from './ubaid.jpg'
 

let abc;

const HomeScreen = (props) => {
  
    return ( 
        <Grid container style={{backgroundColor:'#f0f0f0',paddingTop:'20px'}}>
           
 <Grid item md={12}>
 <Carousel>
     <div>
         <img style={{width:'100%',maxHeight:'600px'}}
         src={fourth}/>
     </div>
     <div>
         <img style={{width:'100%',maxHeight:'600px'}}
         src={fifth}/>
     </div>
     <div>
         <img style={{width:'100%',maxHeight:'600px'}}
         src={sixth}/>
     </div>
        </Carousel>
        </Grid>
    
        <Grid item md={12}>
            <div style={{textAlign:'center',marginBottom:'30px'}}>
             <Typography variant="h3" style={{marginTop:'20px',color:'#2d4a6b'}}>
                 Our Services
             </Typography>
             </div>
            <Grid container style={{color:'#2d4a6b'}}>
            <Grid item md={4} xs={12}>
                  <center>
                 <Avatar style={{height:'300px',width:'300px',marginLeft:'30px',marginRight:'30px',marginLeft:'10%',marginTop:'20px',textAlign:'center'}}>
                 <img  style={{width:'300px',height:'300px'}}
                      src={plumber}/>
                    
                 </Avatar>
            
                 <Typography variant="h4">
                         Plumbing
                     </Typography>

                     </center>
                 </Grid>

                <Grid item md={4} xs={12}>
          
                <center>
                 <Avatar style={{height:'300px',width:'300px',marginLeft:'30px',marginRight:'30px',marginLeft:'10%',marginTop:'20px',textAlign:'center'}}>
                 <img  style={{width:'300px',height:'300px'}}
                     src={maid}/>
                    
                 </Avatar>
            
                 <Typography variant="h4">
                         Cleaning
                     </Typography>

                     </center>
                 </Grid>

                 <Grid item md={4} xs={12}>
          
                 <center>
                 <Avatar style={{height:'300px',width:'300px',marginLeft:'30px',marginRight:'30px',marginLeft:'10%',marginTop:'20px',textAlign:'center'}}>
                     <img  style={{width:'300px',height:'300px'}}
                     src={elec}/>
                    
                 </Avatar>
            
                 <Typography variant="h4">
                         Electrical work
                     </Typography>

                     </center>
          </Grid>
      
          </Grid>
        </Grid>
        <Grid container style={{backgroundColor:'#d7dbe0',marginTop:'30px'}}>
           <Grid item md={12} xs={12}>

               <center>
                  <Typography variant="h3" style={{marginTop:'20px',color:'#2d4a6b'}}>
                       Our Team
                  </Typography>
               </center>
           </Grid>
            
            
            <Grid  item md={4} xs={12} style={{marginTop:'40px',color:'#2d4a6b'}}>
                
            <center>
              <div>
                <Avatar style={{height:'200px',width:'200px',marginLeft:'30px',marginRight:'30px',marginTop:'20px',textAlign:'center',marginBottom:'20px'}}>
                <img  style={{width:'200px',height:'200px'}}
                     src={azeem}/>
                    
                 </Avatar>
            
                 <Typography variant="h4">
                         Azeem Sultan
                     </Typography>
                     <Typography variant="subtitle1">
                        Full Stack Developer and pro guy, A lone wolf and killer of niggers also known as Lycanthrope.
                         </Typography>
           </div>
            </center>

                </Grid>

                <Grid item md={4} xs={12} style={{marginTop:'40px',paddingBottom:'40px',color:'#2d4a6b'}}>
                
                <center>
                  <div>
                    <Avatar style={{height:'200px',width:'200px',marginLeft:'30px',marginRight:'30px',marginTop:'20px',textAlign:'center',marginBottom:'20px'}}>
                    <img  style={{width:'200px',height:'200px'}}
                          src={ubaid}/>
                        
                     </Avatar>
                
                     <Typography variant="h4">
                             Ubaid Umer
                         </Typography>
                         <Typography variant="subtitle1">
                        Backend Developer and pro guy, pet of mr Lycan and my useful partner.
                         </Typography>
               </div>
                </center>
    
                    </Grid>

                    <Grid item md={4} xs={12} style={{marginTop:'40px',color:'#2d4a6b'}}>
                
                <center>
                  <div>
                    <Avatar style={{height:'200px',width:'200px',marginLeft:'30px',marginRight:'30px',marginTop:'20px',textAlign:'center',marginBottom:'20px'}}>
                    <img  style={{width:'200px',height:'200px'}}
                          src={usman}/>
                        
                     </Avatar>
                
                     <Typography variant="h4">
                            Usman Zafar
                         </Typography>
                         <Typography variant="subtitle1">
                        Lorem ipsum noob black dead useless nigga, food of dogs.
                         </Typography>
               </div>
                </center>
    
                    </Grid>


                <Grid md={2}>
                
                </Grid>
        </Grid>
        </Grid>
     );
}
 
export default HomeScreen;