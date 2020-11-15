import React, { Component } from 'react';
import * as authService from'../../Axios-Actions/authService';
import { Grid, Paper, Typography } from '@material-ui/core';
import img from './work.jpg';


class adminlogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password:"",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange=(event)=>{

    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });   

}
onSubmit(e){
  e.preventDefault();
authService.AdminLogin(this.state.email,this.state.password)
.then((result) => {
  console.log("Successfull login through admin ");
    setTimeout(function () {
      window.location = "/admindashboard";
    }, 2000);
  })
  .catch((err) => {
    console.log("Server error");
  });


}
  render() {
    return (  
      <Grid container>
     <Grid item md={1}>

     </Grid>
     <Grid item md={7} xs={12}>
         <h2>
           Admin Login
         </h2>
         <p>
             Welcome to join XsSupport community as a Service Provider, we hope you will make your living better with our platform
         </p>
     <img style={{marginTop:'20px',width:'90%',height:'auto'}}  alt="no content" src={img}></img>
     </Grid>
     <Grid item md={3} xs={12}> 
     <form onSubmit={this.onSubmit}>
      <Paper elevation={3} style={{marginTop:'100px'}}>

          <div style={{marginTop:'40px'}}>
     <div style={{paddingTop:'20px'}}> 
 
             <Typography variant="h4" style={{marginTop:'20px',marginBottom:'10px',textAlign:'center'}} >Email </Typography>
      <input onChange={this.handleChange} name="email"value={this.state.email}style={{width:'80%',border:'1px solid #ebebeb',height:'30px',textAlign:'center',marginLeft:'7%'}} placeholder='Enter your Email'/>

 
      <Typography variant="h4" style={{marginTop:'20px',marginBottom:'10px',textAlign:'center'}} >Password</Typography>
      <input  onChange={this.handleChange} name="password" value={this.state.password}style={{width:'80%',border:'1px solid #ebebeb',height:'30px',textAlign:'center',marginLeft:'7%'}} type='password' placeholder='Enter your Password'/>
      </div>
      </div>
      <button type="submit"style={{marginBottom:'30px',marginTop:'30px',marginLeft:'9%',width:'80%',backgroundColor:'#4a95f7',borderRadius:'9px',color:'white',fontSize:'20px',height:'40px'}}>Login</button>
      </Paper>
      </form>
     </Grid>
     <Grid item md={1}>

     </Grid>
      </Grid>
   );
  }
}

export default adminlogin;
