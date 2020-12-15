import React, { Component } from 'react';
import * as authService from'../../Axios-Actions/authService';
import { Button, Grid, Paper, Radio, Typography } from '@material-ui/core';
import  { Redirect } from 'react-router-dom'
import img1 from './work.jpg';
import Joi from "joi-browser";

let radiovalue;
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: { value: "" },
      data: {},
      invalid: false,
      loading: false,
      error: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };
  validate = () => {
    const abort = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, abort);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  onChangeValue(event) {
    console.log(event.target.value);
    radiovalue = event.target.value;
    this.setState({
        selectedOption: event.target.value
      });
  }
  onChange(e) {
    const data = { ...this.state.data };
    const error = { ...this.state.error };
    const { name, value } = e.currentTarget;
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];
    data[name] = value;
    this.setState({ data, error });
  }
  onSubmit(e) {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ error: errors || {} });
    // console.log(error);
    if (errors) {
        console.log(errors);   
        console.log("validation error");
         return;
    }
    if(radiovalue==="b"){
    authService
      .CustomerLogin(data.email, data.password)
      .then((result) => {
        localStorage.setItem("token", result.data);
  
        console.log("Successfully loged in!");
        setTimeout(function () {
          window.location = "/postatask";
        }, 2000);
    
      })
      .catch((err) => {
        this.setState({ invalid: true });
        console.log(err)
      });
    }else{

        authService
        .ServiceProviderLogin(data.email, data.password)
        .then((result) => {
          localStorage.setItem("token", result.data);
    
          console.log("Successfully loged in!");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          this.setState({ invalid: true });
          console.log(err)
        });

    }
  }

  render() {
    return (
        <Grid container> 
        <Grid item md={1}>

        </Grid>
        <Grid item md={6} xs={false} style={{marginTop:'50px'}}>
      
        <Typography  variant="h1" style={{color: "#5e7bdb"}}>Welcome to XsSupport</Typography>
        <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
                A world where ease is at your hands</Typography>
                  <img src= {img1} alt={"no content"}style={{maxHeight:'400px',maxWidth:'700px'}}/>
          
         <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'20px',marginBottom:'20px'}}>
               Register to be a part of our team.</Typography>
        </Grid>
        <Grid item md={4} xs={12}  style={{marginTop:'50px'}}>
          <Paper elevation={3} style={{marginLeft:'20px'}} >
        <div className="form"  >
            <form >
            <ul className="form-container" style={{listStyle:'none',marginLeft:'30px',}}>
                <li style={{paddingTop:'20px'}}>
                <Typography  variant="h4" style={{color: "#5e7bdb",marginBottom:'20px',textAlign:'center',marginRight:'50px'}}>Sign In</Typography>
                </li>
              
                <li>
                    <label htmlFor="email">
                    <Typography  variant="h5" style={{color: "#5e7bdb"}}>Email</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} onChange={this.onChange}type="email" name="email" id="email" >

                    </input>
                </li>
                <li>
                    <label htmlFor="password" style={{marginTop:'10px'}}>
                    <Typography  variant="h5" style={{color: "#5e7bdb"}}>Password</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} onChange={this.onChange}type="password" name="password" id="password" >

                    </input>
                </li>
                <li> 
                <span>
                <Radio
        checked={this.state.selectedOption === "a"}
        onChange={this.onChangeValue}
        value="a"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
   Sign in as a service provider.</span>
      </li>
      <li>
          <span>
      <Radio
       checked={this.state.selectedOption === "b"}
        onChange={this.onChangeValue}
        value="b"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      />
Sign in as a customer.
</span>
                </li>
                <li><center>
                  
                <button style={{marginTop:'20px',backgroundColor:'#4a95f7',borderRadius:'9px',width:'40%',marginRight:'60px'}} 
                type="submit"onClick={this.onSubmit}  className="button-primary"> <Typography  variant="h5" style={{textAlign:'center',color: "white",fontWeight:'bold'}}>Sign in</Typography> </button>
               
               </center>
                </li>
                <li style={{marginTop:'20px'}}>
                    Dont have an account yet?
                  <a href="/customerSignup" > <Button>Sign up as customer</Button> </a>
                </li>
                 <Typography  variant="h5" style={{textAlign:'center',color: "white",fontWeight:'bold'}}>Create your account now!</Typography>
                Terms and conditions... 
                <p style={{marginLeft:'20px'}}> _______</p>
            </ul>
            </form>
        </div>
        </Paper>
        </Grid>
        </Grid>
    );
  }
}

export default Login;
