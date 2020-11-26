import { Grid, Paper, Typography} from '@material-ui/core';
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
      servicetype: Joi.string().required().label("Service type"),
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
       <Typography variant="h5">
               Join us as a Service Provider
               </Typography>
           <p>
               Welcome to join XsSupport community as a Service Provider, we hope you will make your living better with our platform
           </p>
       <img style={{marginTop:'20px',width:'90%',height:'auto'}} src={img} alt="no content"></img>
       </Grid>
       <Grid item md={3} xs={10}> 
        <Paper elevation={3} style={{marginTop:'20px',marginLeft:'10px'}}>
 
            <div style={{marginLeft:'20px',marginTop:'40px'}}>
 
         <Typography variant="h6" style={{paddingTop:'20px'}}>First Name</Typography>
            <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'85%',marginBottom:'20px',textAlign:'center'}}  type='text' name='fname' onChange={this.onChange} placeholder='Enter your First Name'/>
 
       
            <Typography variant="h6" >Last Name</Typography>
        <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'85%',marginBottom:'20px',textAlign:'center'}}  type='text'name='lname' onChange={this.onChange} placeholder='Enter your Last Name'/>
        <Typography variant="h6" >Email</Typography>
                <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'85%',marginBottom:'20px',textAlign:'center'}}  type='text'name='email'  onChange={this.onChange}placeholder='Enter your Email'/>
 
    
        <div style={{display:'inline-flex'}}>
        <Typography variant="h6" >Service Type:</Typography>
        <select  id="servicetype"  name="servicetype" onChange={this.onChange} style={{width:'120px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff',paddingTop:'5px'}}>
                                <option value="">Select</option>
                                <option value="maid">Maid</option>
                                <option value="electrician">Electrician</option>
                                <option value="cook">Cook</option>
                                <option value="plumber">Plumber</option>
                                <option value="shopkeeper">Shopkeeper</option>
                                <option value="driver">Driver</option>
                                <option value="tailor">Tailor</option>
                                
                                </select>  </div>
                                <Typography variant="h6">Password</Typography>
        <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',textAlign:'center',height:'30px',borderRadius:'18px',width:'85%',marginBottom:'20px'}}  type='password' name='password' onChange={this.onChange} placeholder='Enter your Password'/>
 
       <Typography variant="h6">Confirm Password</Typography>
        <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',textAlign:'center',height:'30px',borderRadius:'18px',width:'85%',marginBottom:'20px'}}  type='password'name='confirmpassword'  onChange={this.onChange}placeholder='Enter your Password'/>
 
        <Typography variant="h6" >Contact No</Typography>
        <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',textAlign:'center',height:'30px',borderRadius:'18px',width:'85%',marginBottom:'20px'}}  type='text' name='contact' onChange={this.onChange} placeholder='Enter your Contact Number'/>
     
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