import { Avatar, Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NearMeIcon from '@material-ui/icons/NearMe';
import HistoryIcon from '@material-ui/icons/History';
import img from '../common/azeem.jpg'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



class serviceProviderDashboard extends React.Component{
    render(){ 
        return(
            <Grid container>
              
                <Grid item md={10}>
                <Grid container>
                <Grid item md={4} xs={12}>
                    <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'30px'}}>
                         Completed Orders
                     </Typography>
                     <Divider/>
                     <Typography variant='h2' style={{paddingTop:'15px'}}>
                        0
                     </Typography>
                 </Paper> 
                 </center>
                </Grid>

                <Grid item md={4} xs={12}>
                    <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'30px'}}>
                         Credit earned
                     </Typography>
                     <Divider/>
                     <Typography variant='h2' style={{paddingTop:'15px'}}>
                        0
                     </Typography>
                 </Paper> 
                 </center>
                </Grid>
                    
                <Grid item md={4} xs={12} >
                    <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'30px'}}>
                         Joined date
                     </Typography>
                     <Divider/>
                     <Typography variant='h4' style={{paddingTop:'30px'}}>
                        00-00-00
                     </Typography>
                     
                 </Paper> 
                 </center>
                 
                </Grid>
               
              </Grid>
              <Divider style={{marginTop:'10px'}}/>
              <Grid container>
              <Grid item md={6} xs={12} style={{backgroundColor:'#d7dbe0',marginTop:'10px',height:'700px'}}>
              <center style={{paddingTop:'20px'}}>
                  <Typography variant='h5' style={{marginBottom:'20px'}}>
                      Work in Progress
                  </Typography>
              <Card style={{maxWidth:'200px',marginLeft:'20px',}}>
      <CardActionArea>
        <img src={img} style={{maxWidth:'200px',maxHeight:'200px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Task
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Details
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          
        <Button size="small" color="primary" style={{marginLeft:'55px'}}>
          View
        </Button>
      
      </CardActions>
    </Card>

    </center>
              </Grid>
              <Grid item md={6} xs={12} style={{backgroundColor:'#d7dbe0',marginTop:'10px',height:'700px'}}>
              <center style={{paddingTop:'20px'}}>
                  <Typography variant='h5' style={{marginBottom:'20px'}}>
                      Completed Work
                  </Typography>
              <Card style={{maxWidth:'200px',marginLeft:'20px',}}>
      <CardActionArea>
        <img src={img} style={{maxWidth:'200px',maxHeight:'200px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Task
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Details
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          
        <Button size="small" color="primary" style={{marginLeft:'55px'}}>
          View
        </Button>
      
      </CardActions>
    </Card>

    </center>
              </Grid>
              </Grid>
            </Grid>
            <Grid item md={2} xs={12} style={{backgroundColor:'#619eff',}}>
                    <center>
                        <Avatar style={{width:'150px',height:'150px',marginTop:'30px'}}>
                            <img style={{width:'150px',height:'150px'}} src={img}/>
                        </Avatar>
                        <Typography variant='h6' style={{color:'white',marginTop:'15px'}}>
                            Azeem Sultan
                        </Typography>
                        <div>
                            <Typography variant='subtitle2' style={{marginTop:'10px',color:'#bd502f'}}>
                                Service Provider
                            </Typography>
                        </div>
                        <Button style={{border:'1px solid #bd502f',borderRadius:'18px',color:'white',fontSize:'12px',fontWeight:'bold',marginTop:'10px'}}>Update Profile</Button>
                    </center>
                    <div >
                     
                    <a href="/acceptrequest" style={{textDecoration:'none'}}>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'#bd502f',justifyContent:'start'}}
                            >
                                    <div><FilterNoneIcon style={{fontSize:'50px'}}/></div>
                             
                            <div>
                            <h5 style={{marginLeft:'5px'}} >
                         
                             View Requests
                            </h5>
                            </div>
                            </Button> </a>
                            <a  href="/workinprogress" style={{textDecoration:'none'}}>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'#bd502f',justifyContent:'start'}}
                            >
                                    <div><AssignmentIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                             Work in Progress
                            </h5>
                            </div>
                            </Button>
                            </a>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'#bd502f',justifyContent:'start'}}
                            >
                                    <div><NearMeIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                            Your Location
                            </h5>
                            </div>
                            </Button>
                            <a href="/workhistory" style={{textDecoration:'none'}}>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'#bd502f',justifyContent:'start'}}
                            >
                                    <div><HistoryIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                            View Work History
                            </h5>
                            </div>
                            </Button> </a>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'#bd502f',justifyContent:'start'}}
                            >
                                    <div><HistoryIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                            Honu lulu
                            </h5>
                            </div>
                            </Button>
                    
                    </div>
                </Grid>
            </Grid>
        )
        }
}

export default serviceProviderDashboard;