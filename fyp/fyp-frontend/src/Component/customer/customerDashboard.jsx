import { Avatar, Button, Divider, Grid, Modal, Paper, Popover, Typography } from '@material-ui/core';
import React from 'react';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NearMeIcon from '@material-ui/icons/NearMe';
import HistoryIcon from '@material-ui/icons/History';
import img from '../common/azeem.jpg'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import * as customerService from "../../Axios-Actions/customerService";


class customerDashboard extends React.Component{
  constructor(){

    super();
    this.state={
      profile:[],

      newfname:'',
      newlname:'',
      newpass:'',
      newcontact:'',


      updateOpen: false
    };
  }
  componentDidMount(){
customerService.getprofile()
.then((result)=>{
this.setState({profile:result.data});
})

      };


      newChange=(event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        }); 


      };
      editSave=()=>{



        if(this.state.newfname.length>10||this.state.newfname.length<3){
console.log("enter valid firstname");
        }else if(this.state.newlname.length>10||this.state.newlname.length<3){

          console.log("enter valid lastname");

        }else if(this.state.newpass.length<4){

          
          console.log("enter valid password");
        }else if(this.state.newcontact.length>255||this.state.newcontact.length<11){


          console.log("enter valid contact no");
        }else{




        customerService.editdata(this.state.newfname,this.state.newlname,this.state.newpass,this.state.newcontact)
        .then((result) => {
        console.log("Successfull edited customer data");
          setTimeout(function () {
            window.location = "/customerdashboard";
          }, 2000);
        })
        .catch((err) => {
          this.setState({ invalid: true });
          console.log("Server error");
        });
      }
      }


      handleChange = () => {
        this.setState({updateOpen:!this.state.updateOpen})
      };

    render(){ 
      let { profile } = this.state;

        return(
            <Grid container>
                <Grid item md={2} xs={12} style={{backgroundColor:'#619eff',}}>
                    <center>
                        <Avatar style={{width:'150px',height:'150px',marginTop:'30px'}}>
                            <img style={{width:'150px',height:'150px'}} src={img}/>
                        </Avatar>
                        <Typography variant='h6' style={{color:'white',marginTop:'15px'}}>
                           {profile.customername}
                        </Typography>
                        <div>
                            <Typography variant='subtitle2' style={{marginTop:'10px',color:'blueviolet'}}>
                                Customer
                            </Typography> 
                        </div>
                        <Button onClick={this.handleChange}
                        style={{border:'1px solid blueviolet',borderRadius:'18px',color:'white',fontSize:'12px',fontWeight:'bold',marginTop:'10px'}}>Update Profile</Button>
                        <Modal
 
        open={this.state.updateOpen} 
        anchorEl=''
        onClose={this.state.updateOpen} 
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={3} xs={12}>
        <Paper elevation={3} style={{width:'100%',marginTop:'40%'}}>
        <Typography variant='h6' style={{paddingTop:'20px',textAlign:'center'}}>Update Info:</Typography>
          <div style={{display:'inline-flex',marginTop:'20px'}}>
            <Typography variant='h6' style={{marginLeft:'20px'}}>First Name:</Typography>

            <input name="newfname" onChange={this.newChange.bind(this)}value={this.state.newfname}style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'9px'}}/>

            <input style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'9px'}}/>

          </div>

          <div style={{display:'inline-flex',marginTop:'20px'}}>
            <Typography  style={{marginLeft:'20px'}} variant='h6'>Last Name:</Typography>

            <input name="newlname"onChange={this.newChange.bind(this)}value={this.state.newlname} style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'10px'}}/>
          </div>
          <div style={{display:'inline-flex',marginTop:'20px'}}>
            <Typography  style={{marginLeft:'20px'}} variant='h6'>Password:</Typography>
            <input type="password"name="newpass" onChange={this.newChange.bind(this)} value={this.state.newpass}style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'19px'}}/>
          </div>
          <div style={{display:'inline-flex',marginTop:'20px'}}>
            <Typography  style={{marginLeft:'20px'}} variant='h6'>Contact No:</Typography>
            <input name="newcontact" onChange={this.newChange.bind(this)}value={this.state.newcontact}style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'8px'}}/>
          </div>
          <center>
            <div style={{display:'inline-flex',marginTop:'30px',marginBottom:'20px'}}>
            <Button onClick={this.editSave} variant="outlined">Save</Button>

            <input style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'10px'}}/>
          </div>
          <div style={{display:'inline-flex',marginTop:'20px'}}>
            <Typography  style={{marginLeft:'20px'}} variant='h6'>Password:</Typography>
            <input style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'19px'}}/>
          </div>
          <div style={{display:'inline-flex',marginTop:'20px'}}>
            <Typography  style={{marginLeft:'20px'}} variant='h6'>Contact No:</Typography>
            <input style={{borderRadius:'3px',border:'1px solid #d2d4d2',width:'50%',marginLeft:'8px'}}/>
          </div>
          <center>
            <div style={{display:'inline-flex',marginTop:'30px',marginBottom:'20px'}}>
            <Button variant="outlined">Save</Button>

            <Button variant="outlined" style={{marginLeft:'10px'}}
            onClick={this.handleChange}
            >Close</Button>
            </div>
        
          </center>
        </Paper>
        </Grid>
        </Grid>
        </Modal>
                    </center>
                    <div >
                     
                    <a href="/viewserviceprovider" style={{textDecoration:'none'}}>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'blueviolet',justifyContent:'start'}}
                            >
                                    <div><SupervisorAccountIcon style={{fontSize:'50px'}}/></div>
                             
                            <div>
                            <h5 >
                         
                             View Service Providers
                            </h5>
                            </div>
                            </Button> </a>
                            <a href="/postatask" style={{textDecoration:'none'}}>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'blueviolet',justifyContent:'start'}}
                            >
                                    <div><PostAddIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                             Post a task
                            </h5>
                            </div>
                            </Button>
                            </a>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'blueviolet',justifyContent:'start'}}
                            >
                                    <div><NearMeIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                            Nearby Services
                            </h5>
                            </div>
                            </Button>
                            <a href="/orderhistory" style={{textDecoration:'none'}} >
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'blueviolet',justifyContent:'start'}}
                            >
                                    <div><HistoryIcon style={{fontSize:'50px'}}/></div>
                            <div>
                            <h5 style={{marginLeft:'5px'}}>
                         
                            View Order History
                            </h5>
                            </div>
                            </Button> </a>
                            <Button style={{width:'100%',height:'100px',marginTop:'20px',color:'blueviolet',justifyContent:'start'}}
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
                <Grid item md={10}>
                <Grid container>
                <Grid item md={4} xs={12}>
                    <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'30px'}}>
                        Task Completed
                     </Typography>
                     <Divider/>
                     <Typography variant='h2' style={{paddingTop:'15px'}}>
                        {profile.taskcompleted}
                     </Typography>
                 </Paper> 
                 </center>
                </Grid>

                <Grid item md={4} xs={12}>
                    <center>
                 <Paper elevation={3} style={{width:'200px',height:'200px',marginTop:'20px'}}>
                     <Typography variant='h5' style={{paddingTop:'30px'}}>
                         Credit spent
                     </Typography>
                     <Divider/>
                     <Typography variant='h2' style={{paddingTop:'15px'}}>
                        {profile.creditspent}
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
                        {profile.joindate}
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
                      Posted Tasks
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
          <a href="/postedtask">
        <Button size="small" color="primary" style={{marginLeft:'55px'}}>
          View
        </Button>
        </a>
      </CardActions>
    </Card>

    </center>
              </Grid>
              <Grid item md={6} xs={12} style={{backgroundColor:'#d7dbe0',marginTop:'10px',height:'700px'}}>
              <center style={{paddingTop:'20px'}}>
                  <Typography variant='h5' style={{marginBottom:'20px'}}>
                      Active Tasks
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
          <a href="/activetask">
        <Button size="small" color="primary" style={{marginLeft:'55px'}}>
          View
        </Button>
        </a>
      </CardActions>
    </Card>

    </center>
              </Grid>
              </Grid>
            </Grid>
            
            </Grid>
        )
        }
}

export default customerDashboard;