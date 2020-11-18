import { Grid, Paper} from '@material-ui/core';
import React, {Component} from 'react';
import img from './work.jpg';
import * as authService from "../../Axios-Actions/authService";
import Joi from "joi-browser";

class serviceproviderSignup extends Component {
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
    }
  
    schema = {
      fname: Joi.string().required().label("First Name"),
      lname: Joi.string().required().label("Last Name"),
      email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
      servicetype: Joi.string().required().label("Service Type"),
      password: Joi.string().required().min(8).label("Password"),
      confirmpassword: Joi.string().required().min(8).label("ConfirmPassword"),
      contact: Joi.number().required().label("Contact no"),
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
      console.log("In submit button", this.state.data);
      e.preventDefault();
      const { data } = this.state;
      const errors = this.validate();
      this.setState({ error: errors || {} });
      if (errors) {
       console.log("validation error");
        return;
      }
      if(data.password===data.confirmpassword){
        authService
        .ServiceProviderSignUp(
          data.fname,
          data.lname,
          data.email,
          data.servicetype,
          data.password,
          data.contact
        )
        .then((result) => {
          // localStorage.setItem("token", result.data);
        console.log("Successfull signup");
          setTimeout(function () {
            window.location = "/login";
          }, 2000);
        })
        .catch((err) => {
          this.setState({ invalid: true });
          console.log("Server error");
        });
      }else{
        console.log("password and confirm password are not same.");
        return;
      }
    }
    render() {
      return (
        <div>
        <Grid container>
       <Grid item md={1}>
 
       </Grid>
       <Grid item md={7} xs={12}>
           <h2>
               Join us as a Service Provider
           </h2>
           <p>
               Welcome to join XsSupport community as a Service Provider, we hope you will make your living better with our platform
           </p>
       <img style={{marginTop:'20px',width:'90%',height:'auto'}} src={img} alt="no content"></img>
       </Grid>
       <Grid item md={3} xs={10}> 
        <Paper elevation={3} style={{marginTop:'20px',marginLeft:'10px'}}>
 
            <div style={{marginLeft:'20px',marginTop:'40px'}}>
 
            <h5 style={{paddingTop:'20px'}}> First Name</h5>
        <input style={{width:'80%'}} type='text' name='fname' onChange={this.onChange} placeholder='Enter your First Name'/>
 
        <h5 style={{paddingTop:'20px'}}>Last Name</h5>
        <input style={{width:'80%'}} type='text'name='lname' onChange={this.onChange} placeholder='Enter your Last Name'/>
                <h5>Email</h5>
        <input style={{width:'80%'}} type='text'name='email'  onChange={this.onChange}placeholder='Enter your Email'/>
 
        <h5>Service Type</h5>
        <input style={{width:'80%'}} type='text' name='servicetype' onChange={this.onChange}placeholder='Enter your Service Type'/>
 
        <h5> Password</h5>
        <input  style={{width:'80%'}} type='password' name='password' onChange={this.onChange} placeholder='Enter your Password'/>
 
        <h5>Confirm Password</h5>
        <input style={{width:'80%'}} type='password'name='confirmpassword'  onChange={this.onChange}placeholder='Enter your Password'/>
 
        <h5>Contact No</h5>
        <input style={{width:'80%'}} type='text' name='contact' onChange={this.onChange} placeholder='Enter your Contact Number'/>
     
        </div>
        <button style={{marginBottom:'30px',marginTop:'30px',marginLeft:'20px',width:'80%',backgroundColor:'#4a95f7',borderRadius:'9px',color:'white',fontSize:'20px'}}  onClick={this.onSubmit}>Register</button>
        </Paper>
       </Grid>
       <Grid item md={1}>
 
       </Grid>
        </Grid>
     </div>
      );
    }
  }


 
export default serviceproviderSignup ;