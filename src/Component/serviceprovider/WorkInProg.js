import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as workInProgressService from "../../Axios-Actions/workInProgressService"
import Cook from './cook.png';
import Maid from './maid.png';
import Plumber from './plumber.png';
import Shopkeeper from './shopkeeper.png';
import Driver from "./driver.png";
import Electrician from './electrician.png';
import Tailor from "./tailor.png";
let image;
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 20
    },
    media: {
      height: 140,
    },
  });
  let classes = useStyles;
class WorkInProg extends Component{

    constructor() {
        super();
        this.state = {
            task:[],

        };
    }
       componentDidMount(){
           workInProgressService.getAllTaskofS()
           .then((result) => {
            this.setState({ task: result.data });
          }) 
       }
       onSubmit(t){
        console.log("In submit button", this.state.data);
        workInProgressService.workInProgress(t)      
        .then((result) => {
            // localStorage.setItem("token", result.data);
          console.log("Successfull posted");
            setTimeout(function () {        //iisme tune kahin define to nahi kiya k when i click button add serviceproivder add to that field?
              window.location = "/sprofile";
            }, 2000);
          })
          .catch((err) => {
            this.setState({ invalid: true });
            console.log("Server error");
          });

       }
       getimage(i){

        if(i==="Cook"){

          image = Cook;
          return image;
        }else if(i==="Maid"){

          image = Maid;
          return image;
        }else if(i==="Plumber"){

          image = Plumber;
          return image;
        }else if(i==="Electrian"){

          image = Electrician;
          return image;
        }else if(i==="Shopkeeper"){

          image = Shopkeeper;
          return image;
        }
        else if(i==="Tailor"){

          image = Tailor;
          return image;
        }
        else if(i==="Driver"){

          image = Driver;
          return image;
        }

       }
      render() {
        const { task } = this.state;
        return (
          
       
      <Grid container>
   
      <Grid item md={12}>
   
      <ul style={{listStyle:'none'}}>
      {task.length<1 ?<div><Typography>No records found</Typography></div>:<div></div>}
                    {task.map(t=>( t.status==="in progress" ?(
                        <li key={t._id} style={{marginLeft:'20px'}}>
                  
                    
           <Grid container>
          
           <Card style={{width:'1000px',height:'auto'}}
            >
             <Container maxWidth="lg" style={{display:'inline-flex'}}>
             <Grid item md={3} xs={12}>
             <CardMedia  
              
              title="Contemplative Reptile"
             />
            <img src= {this.getimage(t.servicetype)} alt={"no content"}style={{maxHeight:'250px',maxWidth:'280px',}}/>
             </Grid>
            <Grid item md={7} xs={12}>
            <CardContent>
              <div style={{marginLeft:'10px',textAlign:'left'}}>
               <Typography gutterBottom variant="h5" component="h2">
                Title: {t.title} 
               </Typography>
               <Divider/>
               <Typography variant="h6" color="textSecondary" component="p">
                 Location: {t.location}
               </Typography>
               <Typography variant="h6" color="textSecondary" component="p">
                 Customer Email: {t.customeremail}
               </Typography>
               <Typography variant="h6" color="textSecondary" component="p">
                 Bidding Task\ Hour\ Month: {t.pertask}\ {t.perhour}\ {t.permonth} (rs)
               </Typography>
             
               <Divider/>
               <Typography variant="h6" color="textSecondary" component="p">
                 Starting Time: {t.starttime}
               </Typography>
               <Typography variant="h6" color="textSecondary" component="p">
                 Finishing Time: {t.endtime}
               </Typography>
               <Typography variant="h6" color="textSecondary" component="p">
              Accepted Date: {t.accepttaskdate}
            </Typography>
               <Typography variant="h6" color="textSecondary" component="p">
                 Month: {t.month}
               </Typography> 
               <Divider/>
               <Typography variant="h6" color="textSecondary" component="p">
                 Service Type: {t.servicetype}
               </Typography>
               </div>
             </CardContent>
             </Grid>
             <Divider/>
           <Grid item md={2}>
             <div style={{marginTop:'50%'}}>
           <CardActions>
           <Button size="large" color="primary"onClick={this.onSubmit.bind(this,t._id)} style={{fontSize:'20px'}}>
            End Task!
          </Button>
          
           </CardActions>
           <CardActions>
       
           </CardActions>
           </div>
           </Grid>
           </Container>
         </Card>
         </Grid>
     
         </li>
                       )
                       : null
                       ))}
                   </ul>
    
         </Grid>
         </Grid>

        );
      }
}



export default WorkInProg;