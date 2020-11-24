import { Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import img from '../common/azeem.jpg'
import * as customerService from "../../Axios-Actions/customerService";

class viewServiceProvider extends React.Component{

  constructor(){
    super();
    this.state={
      service:[]
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
            <Grid container style={{backgroundColor:'#d7dbe0'}}>
             
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
                        <center>
                          <div style={{marginTop:'30px',paddingBottom:'10px'}}><TextField style={{width:'50%'}}/><SearchIcon style={{color:'blueviolet'}}/></div>
                        </center>
                        <div style={{backgroundColor:'#c4c4c4',marginTop:'20px',border:'2px solid grey',borderRadius:'5px'}}>
                            <Typography variant='h4'>
                                Service Providers 
                            </Typography>
                        </div>
                        <div style={{backgroundColor:'white',paddingTop:'20px',paddingBottom:'20px'}}>
                            <ul style={{listStyle:'none',display:'inline-flex'}}>
                            {
                    service.map(s=>(
                                <li key={s.id}>
                        <Card style={{maxWidth:'200px',marginLeft:'20px'}}>
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
          
        <Button size="small" color="primary" style={{marginLeft:'35px'}}>
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