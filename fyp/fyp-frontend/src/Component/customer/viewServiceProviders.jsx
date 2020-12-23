import { Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import img from '../common/azeem.jpg'

class viewServiceProvider extends React.Component{

    render(){
        return(
            <Grid container style={{backgroundColor:'#d7dbe0'}}>
             
                <Grid item md={2} xs={12}>
                    <Typography variant='h4' style={{color:'blueviolet',marginTop:'40px',textAlign:'center'}}>
                        All Categories
                    </Typography>
                    <Typography variant='h5'style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Plumber
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Electrician
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Maid
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Driver
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Tailor
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Swift
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Mender
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Guard
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Gardener
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Carpenter
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Tailor
                    </Typography>
                    <Typography variant='h5' style={{color:'#2d4a6b',marginTop:'20px',marginLeft:'30px'}}>
                        Swift
                    </Typography>

                   
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

                                <li>
                        <Card style={{maxWidth:'200px',marginLeft:'20px'}}>
      <CardActionArea>
        <img src={img} style={{maxWidth:'200px',maxHeight:'200px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Driver
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
    </li>
    <li>
                        <Card style={{maxWidth:'200px',marginLeft:'40px'}}>
      <CardActionArea>
        <img src={img} style={{maxWidth:'200px',maxHeight:'200px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Electrician
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
    </li>
    <li>
                        <Card style={{maxWidth:'200px',marginLeft:'40px'}}>
      <CardActionArea>
        <img src={img} style={{maxWidth:'200px',maxHeight:'200px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Plumber
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
    </li>
    </ul>
                        </div>
                        
                    </Grid>
            </Grid>
        )
    }
}
export default viewServiceProvider;