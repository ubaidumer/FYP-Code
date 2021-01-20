import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid } from '@material-ui/core';
import Driver from "./driver.png"
import Tailor from "./tailor.png"
import Cook from './cook.png';
import Maid from './maid.png';
import Plumber from './plumber.png';
import Shopkeeper from './shopkeeper.png';
import Electrician from './electrician.png';
import { makeStyles } from '@material-ui/core/styles';
import * as privateTaskService from "../../Axios-Actions/privateTaskService";


let image;
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 20
    },
    media: {
      height: 500,
    },
  });
  let classes = useStyles;
class PrivateAcceptRequest extends Component{

    constructor() {
        super();
        this.state = {
            task:[],

        };
    }

       componentDidMount(){
           privateTaskService.getAllTask()
           .then((result) => {
            this.setState({ task: result.data });
          })
       }
       onSubmit(t){
        console.log("In submit button", this.state.data);
        privateTaskService.acceptRequest(t)      
        .then((result) => {
            // localStorage.setItem("token", result.data);
          console.log("Successfull posted");
            setTimeout(function () {        
                   window.location = "/sprofile";
            }, 2000);
          })
          .catch((err) => {
            this.setState({ invalid: true });
            console.log("Server error");
          });
       }
       onSubmitr(t){
    
        privateTaskService.rejectRequest(t)      
        .then((result) => {
            // localStorage.setItem("token", result.data);
          console.log("Successfull posted");
            setTimeout(function () {        
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
            <Grid item md={1} xs={0}></Grid>
            <Grid item md={10} xs={12} >

                <ul style={{listStyle:'none'}}>
                {task.length<1 ?<div><Typography>No records found</Typography></div>:<div></div>}
                    {task.map(t=>( ((t.status==="pending")&&(!t.serviceprovideremail))?(
                        <li key={t._id} style={{display:'inline-flex',marginRight:'40px',marginTop:'40px'}}>
                 

        <Card   style={{maxWidth:'335px',}}
         >
        <CardActionArea>
          <CardMedia    
        
          />
         <img src= {this.getimage(t.servicetype)} alt={"no content"}style={{maxHeight:'350px',maxWidth:'280px',}}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             Title: {t.title}
            </Typography>
            <Divider/>
            <Typography variant="h6" color="textSecondary" component="p">
              Location: {t.location}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Customer: {t.customeremail}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Bidding per Task: {t.pertask}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Bidding per Hour: {t.perhour}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Bidding per Month: {t.permonth}
            </Typography>
            <Divider/>
            <Typography variant="h6" color="textSecondary" component="p">
              Start Time: {t.starttime}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              End Time: {t.endtime}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Month: {t.month}
            </Typography>
            <Divider/>
            <Typography variant="h6" color="textSecondary" component="p">
              Service Type: {t.servicetype}
            </Typography>
          </CardContent>
          <Divider/>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary"onClick={this.onSubmit.bind(this,t._id)} style={{fontSize:'20px'}}>
            Accept now!
          </Button>
          <Button size="large" color="primary"onClick={this.onSubmitr.bind(this,t._id)} style={{fontSize:'20px'}}>
            Reject now!
          </Button>
         
        </CardActions>
      </Card>
      </li>
                    )
                    : null
                    ))}
                </ul>
      </Grid>
       <Grid item md={1} xs={0}></Grid>
      </Grid>
        );
      }
}

export default PrivateAcceptRequest;