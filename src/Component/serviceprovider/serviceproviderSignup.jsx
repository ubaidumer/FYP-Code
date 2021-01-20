
import React, {Component} from 'react';


import Joi from "joi-browser";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import * as authService from'../../Axios-Actions/authService';
import { Container, NativeSelect, Radio } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';


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
      backgroundImage: 'url(https://source.unsplash.com/t5YUoHW6zRo)',
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
  let la,ln

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
        err:true
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
       console.log("validation error");
       this.setState({err:false}) 
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
        alert("password and confirm password are not same.");
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
              <NativeSelect style={{marginTop:'10px'}}
                  variant="outlined"
                  required
                  fullWidth
                  id="servicetype"
                  label="Enter your Service Type"
                  name="servicetype"
                 
                   onChange={this.onChange}
                 
                >
                     <option value="">Service Type</option>
                     <option value="maid">maid</option>
                                <option value="plumber">plumber</option>
                                <option value="driver">driver</option>
                                <option value="cook">cook</option>
                                <option value="tailor">tailor</option>
                                <option value="electrian">electrician</option>
                </NativeSelect>
              
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
                  id="email"
                  label="Email Address"
               
                  autoComplete="email"
                  name='email' 
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
                <Link href="/login" variant="body2">
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

export default withStyles(styles, { withTheme: true })(serviceproviderSignup);
      /*
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
 
    
        <div style={{display:'inline-flex'}}>
       <h5>  Service type </h5> <select  id="servicetype"  name="servicetype" onChange={this.onChange} style={{width:'150px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="">Select</option>
                                <option value="maid">Maid</option>
                                <option value="electrician">Electrician</option>
                                <option value="cook">Cook</option>
                                <option value="plumber">Plumber</option>
                                <option value="shopkeeper">Shopkeeper</option>
                                <option value="driver">Driver</option>
                                <option value="tailor">Tailor</option>
                                
                                </select>  </div>
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


 
export default serviceproviderSignup ; */