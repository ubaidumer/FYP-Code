import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import img from '../common/azeem.jpg'
import * as customerService from "../../Axios-Actions/customerService";
import ReactStars from "react-rating-stars-component";
class viewServiceProvider extends React.Component{

  constructor(){
    super();
    this.state={
      service:[],
      openService: false
    }
    this.searchbytype=this.searchbytype.bind(this);
  };

  componentDidMount(){
    customerService.getAllService()
    .then((result)=>{
    this.setState({service:result.data});
    })
    
};

searchbytype(type){
    customerService.getServicebbytype(type)
    .then((result)=>{
    this.setState({service:result.data});
    })

}
searchbyall(){
    customerService.getAllService()
    .then((result)=>{
    this.setState({service:result.data});
    })

}


    render(){
      
      let { service } = this.state;
        return(
            <Grid container style={{backgroundColor:'#d8e9f3'}}>
               
                <Grid item md={2} xs={12}>
                <Button style={{width:'100%'}} onClick={this.searchbyall.bind(this)}>
                    <Typography variant='h5' style={{color:'blueviolet',marginTop:'40px',textAlign:'center'}}>
                        All Categories
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"plumber")}>
                    <Typography variant='h5'style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Plumber
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}}  onClick={this.searchbytype.bind(this,"electrician")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Electrician
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"maid")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Maid
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"driver")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',}}>
                        Driver
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"tailor")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Tailor
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"cook")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Cook
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"plumber")}>
                    <Typography variant='h5'style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Plumber
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}}  onClick={this.searchbytype.bind(this,"electrician")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Electrician
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"maid")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Maid
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"driver")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',}}>
                        Driver
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"tailor")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Tailor
                    </Typography>
                    </Button>
                    <Button style={{width:'100%'}} onClick={this.searchbytype.bind(this,"cook")}>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px'}}>
                        Cook
                    </Typography>
                    </Button>

                   
                </Grid>

                <Grid item md={10} xs={12}>
                <Modal 
                       open={this.state.openService}
                       onClose={!this.state.openService} 
                       >
                    <Grid container>
                        <Grid item md={2}></Grid>

                        <Grid item md={8}> 
                          
                            <Paper elevation={2} style={{marginTop:'40px'}}>
                              <div style={{display:'inline-flex',}}>
                              <div style={{marginLeft:'30px',marginBottom:'20px'}}>
                                  <img src={img} style={{marginTop:'30px',maxHeight:'500px',maxWidth:'400px'}}/>
                                 
                              </div>
                              <div style={{marginTop:'40px',paddingLeft:'40%',color:'blueviolet'}}>
                          
        <Typography variant="h5" >Azeem Sultan:</Typography>
                              <Typography variant="subtitle1">Plumber</Typography>
                              <Typography variant="subtitle1">Description </Typography> 
                     
                              <ReactStars
    count={4.5}
    size={24}
    color={"#ffd700"}
  />
                              <Typography variant="subtitle2">____________________________</Typography>
                              <div style={{marginTop:'30px'}}>
                               <Typography>Want to hire?</Typography>
                               <Button variant="outlined" onClick={()=>this.setState({openService:!this.state.openService})}>Send Task</Button>
 
                              </div>

                              <div style={{marginTop:'40px',}}>
                             <Typography  variant="subtitle1">Task Completion %: 90 </Typography>
                             <Typography  variant="subtitle1">Task Cancellation %:5 </Typography>
                             <Typography  variant="subtitle1">Response Time : 1 Hour </Typography>
                              </div>
                              </div>
                              </div>
                            </Paper>
                          
                        </Grid>

                        <Grid item md={2}></Grid>

                    </Grid>
                  </Modal>
                        <center>
                          <div style={{marginTop:'30px',paddingBottom:'10px'}}><TextField style={{width:'50%'}}/><SearchIcon style={{color:'blueviolet'}}/></div>
                        </center>
                        <div style={{backgroundColor:'#619eff',marginTop:'20px',border:'2px solid white',borderRadius:'5px',color:'whitesmoke'}}>
                            <Typography variant='h4'>
                                Service Providers 
                            </Typography>
                        </div>
                        <div style={{backgroundColor:'white',paddingTop:'1px',paddingBottom:'20px'}}>

                 

                            <ul style={{listStyle:'none',display:'inline-flex',flexWrap:'wrap'}}>
                            {
                    service.map(s=>(
                                <li key={s.id}>
                        <Card style={{maxWidth:'200px',marginLeft:'20px',marginTop:'20px'}} >
      <CardActionArea>
        <img src={img} style={{maxWidth:'200px',maxHeight:'200px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {s.firstname} {s.lastname}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
           {s.servicetype}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          
        <Button size="small" color="primary" style={{marginLeft:'35px'}} onClick={()=>this.setState({openService:!this.state.openService})}>
          View Details
        </Button>
      
      </CardActions>
    </Card>
    </li>
  
                 ))
                }
    </ul>
                        </div>
                        
                    </Grid>
                  

            </Grid>
        )
    }
}
export default viewServiceProvider;