import React, { Component } from 'react';
import * as authService from'../../Axios-Actions/authService';
import { Grid, Typography } from '@material-ui/core';
import img1 from './work.jpg';
import Joi from "joi-browser";



class customerSignup extends Component {
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
      password: Joi.string().required().min(8).label("Password"),
      confirmpassword: Joi.string().required().min(8).label("Confirm Password"),
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
       console.log(errors);   
       console.log("validation error");
        return;
      }
      if(data.password===data.confirmpassword){
        authService
        .CustomerSignUp(
          data.fname,
          data.lname,
          data.email,
          data.password,
          data.contact
        )
        .then((result) => {
          // localStorage.setItem("token", result.data);
        console.log("Successfull signup");
          setTimeout(function () {
            window.location = "/";
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
        <Grid container>
            <Grid item md={1}>
               
            </Grid>
            <Grid item md={7}>
            <Typography  variant="h1" style={{color: "#5e7bdb",marginTop:'20px'}}>Welcome to XsSupport</Typography>
            <img alt="no content" src= {img1} style={{maxHeight:'400px',maxWidth:'700px'}}/>
            <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
               Register yourself as our Customer.</Typography>
               <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
               Lorem ipsum gypsom hehe</Typography>
               <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
               XsSupport is a platform where you can become the king of acting.</Typography>
            </Grid>
            <Grid item md={4}>
        <div className="form" style={{marginTop:'20px'}}>
            <form >
            <ul className="form-container">
                <li>
                <Typography  variant="h3" style={{color: "#5e7bdb", marginTop:'30px'}}>Create your Account</Typography>
                </li>
                <li> 
                    <label >
                    <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'10px'}}>First Name</Typography>
                    </label>
                    <input style={{border:'0.1rem #ffffff',height:'30px', marginTop:'10px'}} type="name" onChange={this.onChange}name="fname" id="fname" >

                    </input>
                </li>
                <li> 
                    <label >
                    <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'10px'}}>Last Name</Typography>
                    </label>
                    <input style={{border:'0.1rem #ffffff',height:'30px', marginTop:'10px'}} type="name"onChange={this.onChange} name="lname" id="lname" >

                    </input>
                </li>
                <li>
                    <label >
                    <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'10px'}}>Email</Typography>
                    </label>
                    <input style={{border:'0.1rem #ffffff',height:'30px'}} type="email" onChange={this.onChange}name="email" id="email" >

                    </input>
                </li>
                <li>
                    <label >
                    <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'10px'}}>Password</Typography>
                    </label>
                    <input style={{border:'0.1rem #ffffff',height:'30px', marginTop:'10px'}} type="password"onChange={this.onChange} name="password" id="password" >

                    </input>
                </li>
                <li>
                    <label >
                    <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'10px'}}>Confirm Password</Typography>
                    </label>
                    <input style={{border:'0.1rem #ffffff',height:'30px', marginTop:'10px'}} type="password"onChange={this.onChange} name="confirmpassword" id="confirmpassword" >

                    </input>
                    <li> 
                    <label >
                    <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'10px'}}>Contact No</Typography>
                    </label>
                    <input style={{border:'0.1rem #ffffff',height:'30px', marginTop:'10px'}} type="name"onChange={this.onChange} name="contact" id="contact" >

                    </input>
                </li>
                </li>
                <li>
                <button style={{marginTop:'20px',backgroundColor:'#4a95f7',color:'#ffffff',fontSize:'20px',marginBottom:'10px'}} type="submit" onClick={this.onSubmit} className="button-primary">Register now</button>
                </li>
                <li>
                  <h4>Already have an Account?</h4> <h3 style={{color:'blue'}}> Sign in </h3>
                </li>
             
            </ul>
            </form>
        </div>
        </Grid>
        </Grid>
      );
    }
  }


 
export default customerSignup ;

