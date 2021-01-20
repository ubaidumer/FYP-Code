import React, { Component } from 'react';
import * as authService from'../../Axios-Actions/authService';
import { Grid, NativeSelect, Typography } from '@material-ui/core';
import Joi from "joi-browser";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab';


let la,ln;


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/ngWKDQhM88Q)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


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
      err:true
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
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      la =position.coords.latitude;
      ln= position.coords.longitude; 

    });   
}

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
     this.setState({err:false})
      return;
    }
    if(data.password===data.confirmpassword){
      
  
       
      authService
      .CustomerSignUp(
        data.fname,
        data.lname,
        data.email,
        data.password,
        data.contact,
        la,
        ln
      )
      .then((result) => {
        localStorage.setItem("token", result.data);
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
        const { classes } = this.props;
        return(
          <Grid container component="main"  className={classes.root} >
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item md={5}>
          <div className={classes.paper}> 
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    name='fname'
                     onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="lname"
                    name='lname'
                     onChange={this.onChange} 
                  />
                </Grid>
               
               
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                 
                    autoComplete="email"
                    name='email' 
                     onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label="Enter your Phone Number"
                    name='contact'
                     onChange={this.onChange}
                   
                  />
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
               
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    name='password'
                     onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
               
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    name='confirmpassword' 
                     onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div>
                    {this.state.err==false? (<div>
                      <Alert severity="warning">
  <AlertTitle>Warning</AlertTitle>
  <div> {JSON.stringify(this.state.error)}
   </div>
  This is a warning alert — <strong>check it out!</strong>
</Alert>
                       </div>): (<div> </div>)}
                  </div>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
        </Grid>
        )
    }
  }

  export default withStyles(styles, { withTheme: true })(customerSignup);
    /*
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
    componentDidMount(){
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        la =position.coords.latitude;
        ln= position.coords.longitude; 

      });   
  }
  
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
        
        if(!la||!ln){
          alert("In order to signup you need to give access for location.");
        }else{
         
        authService
        .CustomerSignUp(
          data.fname,
          data.lname,
          data.email,
          data.password,
          data.contact,
          la,
          ln
        )
        .then((result) => {
          localStorage.setItem("token", result.data);
        console.log("Successfull signup");
          setTimeout(function () {
            window.location = "/login";
          }, 2000);
        })
        .catch((err) => {
          this.setState({ invalid: true });
          console.log("Server error");
        });}
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
            <Grid item md={7} xs={12}>
            <Typography  variant="h1" style={{color: "#5e7bdb",marginTop:'20px'}}>Welcome to XsSupport</Typography>
            <img alt="no content" src= {img1} style={{maxHeight:'400px',maxWidth:'700px'}}/>
            <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
               Register yourself as our Customer.</Typography>
               <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
               Lorem ipsum gypsom hehe</Typography>
               <Typography  variant="h4" style={{color: "#5e7bdb",marginTop:'40px'}}>
               XsSupport is a platform where you can become the king of acting.</Typography>
            </Grid>
            <Grid item md={3}>      <Paper elevation={3}>
        <div className="form" style={{marginTop:'20px'}}>
 <form >
            <ul className="form-container" style={{listStyle:'none'}}>
                <li>
                <Typography  variant="h4" style={{color: "#5e7bdb", marginTop:'30px',paddingTop:'20px'}}>Create your Account</Typography>
                </li>
                <li> 
                    <label >
                    <Typography  variant="h5" style={{color: "#5e7bdb", marginTop:'20px'}}>First Name</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} type="name" onChange={this.onChange}name="fname" id="fname" >

                    </input>
                </li>
                <li> 
                    <label >
                    <Typography  variant="h5" style={{color: "#5e7bdb", marginTop:'10px'}}>Last Name</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} type="name"onChange={this.onChange} name="lname" id="lname" >

                    </input>
                </li>
                <li>
                    <label >
                    <Typography  variant="h5" style={{color: "#5e7bdb", marginTop:'10px'}}>Email</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} type="email" onChange={this.onChange}name="email" id="email" >

                    </input>
                </li>
                <li>
                    <label >
                    <Typography  variant="h5" style={{color: "#5e7bdb", marginTop:'10px'}}>Password</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} type="password"onChange={this.onChange} name="password" id="password" >

                    </input>
                </li>
                <li>
                    <label >
                    <Typography  variant="h5" style={{color: "#5e7bdb", marginTop:'10px'}}>Confirm Password</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} type="password"onChange={this.onChange} name="confirmpassword" id="confirmpassword" >

                    </input>
                    <li> 
                    <label >
                    <Typography  variant="h5" style={{color: "#5e7bdb", marginTop:'10px'}}>Contact No</Typography>
                    </label>
                    <input style={{marginTop:'10px',border:'0.1rem solid #d9d9d9',height:'30px',borderRadius:'18px',width:'70%',marginBottom:'20px'}} type="name"onChange={this.onChange} name="contact" id="contact" >

                    </input>
                </li>
                </li>
                <li><center>
                <button style={{marginTop:'20px',backgroundColor:'#4a95f7',color:'#ffffff',fontSize:'20px',marginBottom:'10px',borderRadius:'9px',marginRight:'60px'}} 
                type="submit" onClick={this.onSubmit} className="button-primary">Register now</button> </center>
                </li>
                <li>
                  <h4>Already have an Account?</h4><a href="/login"> <h3 style={{color:'blue',paddingBottom:'20px'}}> Sign in </h3> </a>
                </li>
             
            </ul>
            </form>
        </div>
        </Paper> 
        </Grid>
        <Grid item md={1}></Grid>
        </Grid>
      );
    }
    */
 

