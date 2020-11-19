import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as workInProgressService from "../../Axios-Actions/workInProgressService";
import Cook from './cook.png';
import Maid from './maid.png';
import Plumber from './plumber.png';
import Shopkeeper from './shopkeeper.png';
import Electrician from './electrician.png';
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
class workInProgress extends Component{

    constructor() {
        super();
        this.state = {
            task:[],

        };
    }
       componentDidMount(){
           workInProgressService.getAllTask()
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
              window.location = "/";
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
        }else if(i==="Electrician"){

          image = Electrician;
          return image;
        }else if(i==="Shopkeeper"){

          image = Shopkeeper;
          return image;
        }

       }
      render() {
        const { task } = this.state;
        return (
            <Grid container>
            <Grid item md={1}></Grid>
            <Grid item md={10}>

                <ul style={{listStyle:'none'}}>
                    {task.map(t=>( t.status==="in progress" ?(
                        <li key={t._id} style={{marginLeft:'20px'}}>
                 

        <Card  className={classes.root} style={{maxWidth:'335px'}}
         >
        <CardActionArea>
          <CardMedia    
           className={classes.media}    
           title="Contemplative Reptile"
          />
         <img src= {this.getimage(t.servicetype)} alt={"no content"}style={{maxHeight:'400px',maxWidth:'700px'}}/>
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
            <Typography variant="h6" color="textSecondary" component="p">
              Accepted Date: {t.accepttaskdate}
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
            End Task!
          </Button>
         
        </CardActions>
      </Card>
      </li>
                    )
                    : null
                    ))};
                </ul>
      </Grid>
      </Grid>
        );
      }
}



export default workInProgress;