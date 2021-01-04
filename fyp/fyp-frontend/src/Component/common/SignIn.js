
import React, { Component } from 'react';

// @material-ui/core components
import { Backdrop, Badge, Container,Fade, Modal} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
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
import Joi from "joi-browser";
import * as authService from'../../Axios-Actions/authService';
import { Radio } from '@material-ui/core';
import useGeoLocation from "./useGeoLocation";
import { Divider } from "@material-ui/core";
import { Apps, Face, Phone, PhonelinkLockOutlined, VpnKey } from "@material-ui/icons";


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
      backgroundImage: 'url(https://source.unsplash.com/random)',
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
  let la,ln;
  let radiovalue;
class SignIn extends Component{

    constructor() {
        super();
        this.state = {
          email: "",
          password: { value: "" },
          data: {},
          invalid: false,
          loading: false,
          error: "",
          gen:false
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
      }
    
      schema = {
        email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
        password: Joi.string().required().min(8).label("Password"),
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
        }else{
          if(!la||!ln){
            alert("your most recent location is not updated.");
          }
        }

        if(radiovalue==="b"){
        authService
          .CustomerLogin(data.email, data.password)
          .then((result) => {
            localStorage.setItem("token", result.data);
            if(la||ln){
              authService.csavelocation(la,ln); 
            }
            console.log("Successfully loged in!");
            setTimeout(function () {
              window.location = "/profile";
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
              if(la||ln){
                authService.ssavelocation(la,ln); 
              }
              console.log("Successfully loged in!");
              setTimeout(function () {
                window.location = "/sprofile";
              }, 2000);
            })
            .catch((err) => {
              this.setState({ invalid: true });
              console.log(err)
            });
    
        }
      }
      rp(e){
        setTimeout(function () {
          window.location = "/resetpassword";
        }, 2000);

      }
  
    render()
    {
        const { classes } = this.props;
        return(
  <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
              type="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
            />

<span>
                <Radio
        checked={this.state.selectedOption === "a"}
        onChange={this.onChangeValue}
        value="a"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
   Sign in as a service provider.</span>
    
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
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <div><Typography> Forget Password? Click the button below. </Typography>
              <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.submit}
              onClick={this.rp}
            >
              Reset Password
            </Button>
            </div>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    
    </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SignIn);