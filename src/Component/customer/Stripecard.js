import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {makeStyles} from '@material-ui/core/styles';
import CardInput from './CardInput';
import * as paymentService from '../../Axios-Actions/paymentService';
import { Backdrop, Container, Divider, Fade, Modal, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '10vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

 function Stripecard() {
  const classes = useStyles();
  // State
  const [email, setEmail] = useState('');
  const [task,setTask]    = useState([]); 
  const [open,setOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  React.useEffect(() => {
    paymentService.getAllTask()
    .then((result)=>{
      console.log(result.data);
       setTask(result.data);
    })
  
  },[]);

  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
     const res=await paymentService.Payment(email,(task.month*task.permonth)+(task.pertask)+(task.perhour*(parseInt(task.endtime)-parseInt(task.starttime))*(task.month*30)));
     paymentService.paymentbyCard();
     setOpen(true);

 //   const res = await axios.post('http://localhost:3000/pay', {email: email});

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!');
              setTimeout(function () {
                window.location = "/profile";
              }, 2000);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <Container maxWidth="md">
    <Card className={classes.root}>
      <CardContent className={classes.content}>

        
     <Modal style={{justifyContent:'center',alignItems:'center',display:'flex'}}
              open={open}
              onClose={!open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500, 
              }}
          
            >
              <Fade in={open}> 
              <Paper elevation={3} style={{textAlign:'center',}}>
              <Container maxWidth="sm">
    
              <Alert severity="success">Payment successful</Alert> 
              
            
            </Container>
            </Paper>

            </Fade> 
            </Modal>

 <Typography variant="subtitle1" style={{color:'#9b34eb'}}>Your Account Email:{task.customeremail}</Typography>
 <Typography variant="subtitle1" style={{color:'#9b34eb'}}>Your Service Provider Email:{task.serviceprovideremail}</Typography>
 <Typography variant="subtitle1" style={{color:'#9b34eb'}}>Your Total bill:{(task.month*task.permonth)+(task.pertask)+(task.perhour*(parseInt(task.endtime)-parseInt(task.starttime))*(task.month*30))}</Typography>
 <Divider/> 
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
            Pay
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
    </Container>
  );
}

export default Stripecard;