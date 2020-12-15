import React from 'react';
import Modal from '@material-ui/core/Modal'
import { Divider, Grid, Paper,Typography } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import img from './cred.png';
import * as paymentService from "../../Axios-Actions/paymentService";

class Pay extends React.Component {
       counter=0;



       constructor(){
           super();
     this.state={
        first:'',
        last:'',
        cardNum:'',
        cardExp: '',
        cvv: '',
        firstError:'',
        lastError:'',
        cardNumError:'',
        cardExpError: '',
        cvvError: '',
        click:0,
        noClick: '',
        open: false,
        close: true,
        openc: false,
        creditForm: false,
        task:[],

      }};
      componentDidMount(){

        paymentService.getAllTask()
        .then((result)=>{
            console.log(result.data);
            this.setState({task:result.data});
        })

       }
 
      validate = () =>{
        let firstError='';
        let num = this.state.first;
        
        if(num.length >12){
          firstError= "Name length too long."
          }
          
          if(num.length <3){ //nice heart there nigga
              firstError= "Name length too short."
              }
              if(num.length ===0){
                  firstError= "You must enter the name."
                  }
                  if(num.length>2 &&  num.length  <12){
                      firstError= " "
                      }

       let lastError='';
       
       if(this.state.last.length >12){
        lastError= "Name length too long."
        }
        
        if(this.state.last.length <3){ //nice heart there nigga
            lastError= "Name length too short."
            }
            if(this.state.last.length ===0){
                lastError= "You must enter the name."
                }
                if(this.state.last.length>2 &&  this.state.last.length  <12){
                    lastError= " "
                    }

            
            var cardNum = this.state.cardNum
            var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
           
            if(visaRegEx.test(cardNum)===false){
              alert('Please provide valid number')
            }
            else
            {
              alert('thank you')
            }

            if(this.state.cardExp===0)
            {
              alert('Please enter the date')
            }
         let cvvError='';
            if(this.state.cvv===0)
            {
            cvvError='Field cannot be empty'
            }
            if(this.state.cvv!==3)
            {
              cvvError='Enter valid numbers'
            }
           
  
                      if(firstError||lastError||cvvError){
                        this.setState({firstError,lastError,cvvError})
                        return false
                      }
                      return true
      }


      handleSubmit= event =>{
        event.preventDefault();
        this.validate();
          
        }
   

      handleChange = event =>{
        
        const isCheckbox= event.target.type==="checkbox";
        this.setState({
            [event.target.name]: isCheckbox?
            event.target.checked: event.target.value
        });
    }
    Cash(){
        paymentService
        .paymentbyCash()
        .then((result) => {
          // localStorage.setItem("token", result.data);
        console.log("Successfull emailed");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log("Server error");
        });
    }
    Card(){
        paymentService
        .paymentbyCash()
        .then((result) => {
          // localStorage.setItem("token", result.data);
        console.log("Successfull emailed");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log("Server error");
        });
    }
      render(){
    const {task}=this.state;
    return ( 


      <Grid container style={{paddingTop:'5px',paddingBottom:'40px'}}>
          <Grid item md={1}></Grid>
          <Grid item md={6} xs={12} style={{marginRight:'20px',marginLeft:'20px'}}>
          <Paper style={{marginTop:'50px', border:'1px solid #000'}} elevation={3}>
             
              <button  style={{width:'160px',fontSize:'15px',height:'50px',border:'1px solid white',color:'green'}} type="button" onClick={()=>this.setState({open:!this.state.open
              })}>Cash on Spot
                <AttachMoneyIcon style={{fontSize:'25px',marginLeft:'20px',justifyContent:'center'}}/>
              </button>
                Easy option for both customer and Service provider
              <Divider/>
            <button style={{width:'160px',fontSize:'15px',height:'50px',border:'1px solid white',color:'green'}} type="button" onClick={()=>this.setState({openc:!this.state.openc
              })} >
              Card/Debit Card
              <CreditCardIcon style={{fontSize:'25px',marginLeft:'5px',paddingTop:'5px'}}/>
            </button>
            Pay through card when you are out of cash
            <Divider/>
        
            <Modal style={{maxWidth:'400px',height:'600px',paddingLeft:'10%',paddingRight:'10%'}}
              open={this.state.open}
              onClose={!this.state.open}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              
            <Paper elevation={3} style={{textAlign:'center',}}>
              <h4 style={{backgroundColor:'burlywood',fontSize:'20px',paddingTop:'10px',paddingBottom:'10px'}}>
                Cash at Delivery
              </h4>
              <p>
                Are you sure?
              </p>
              <button onClick={()=>this.setState({open:!this.state.open},this.Cash())} style={{backgroundColor:'white',fontSize:'20px',marginBottom:'20px',border:'0px',color:'darkolivegreen',fontWeight:"bolder"}}>
                Submit
              </button>
            
            </Paper>
            
            </Modal>
   
            <Modal style={{left:'20%',right:'20%'}}
              open={this.state.openc}
              onClose={!this.state.open}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >

<Paper elevation={3} style={{textAlign:'center',}}>
              <h4 style={{backgroundColor:'burlywood',fontSize:'20px',paddingTop:'10px',paddingBottom:'10px'}}>
                Credit Card
              </h4>
              <p>
                Are you sure?
              </p>
              <button onClick={()=>this.setState({creditForm:!this.state.creditForm , openc:!this.state.openc })} style={{backgroundColor:'white',fontSize:'20px',marginBottom:'20px',border:'0px',color:'darkolivegreen',fontWeight:"bolder"}}>
                Yes
              </button>
            
            </Paper>
            </Modal>
            <Modal style={{left:'20%',right:'20%'}}
              open={this.state.creditForm}
              onClose={!this.state.creditForm}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
               <Paper elevation={3} style={{textAlign:'center',marginLeft:'40px'}}>
              <form onSubmit ={this.handleSubmit}>
              <h4 style={{backgroundColor:'burlywood',fontSize:'20px',paddingTop:'10px',paddingBottom:'10px'}}>
                Credit Card
              </h4>
              <Grid container>
                <Grid item md={6}>
              <div style={{textAlign:'start', paddingLeft:'40px'}}>
              <div style={{fontSize:12, color:'red'}}> 
             {this.state.firstError}     </div>
                <p>
                  
                First Name </p>
                <input name='first' type='text' value={this.state.first} onChange={this.handleChange}/>
                <div style={{fontSize:12, color:'red'}}> 
             {this.state.lastError}     </div>
                <p>
                Last Name 
                </p>
                <input name='last' type='text' value={this.state.last} onChange={this.handleChange}/>
              
                <p>
                Card Num
                </p>
                <input name='cardNum' type='text' value={this.state.cardNum} onChange={this.handleChange}/>
              
                <p>
                Card Exp
                </p>
                <input type='date' value={this.state.cardExp} onChange={this.handleChange}/>
                <div style={{fontSize:12, color:'red'}}> 
             {this.state.cvvError}     </div>
                <p>
                CVV 
                </p>
                <input name='cvv' type='text' value={this.state.cvv} onChange={this.handleChange}/>
                </div>
                <button type="submit">Valid Info</button>
             
                </Grid>
                <Grid item md={6}>
                  <img src={img} alt="no content" style={{maxHeight:'200px',maxWidth:"300px"}}/>
                  <Typography variant='h6'>
                    Please Match Your Account Details With Picture While Entering Data In The Fields.
                  </Typography>
                </Grid>
                </Grid>
              <div>
              <button onClick={()=>this.setState({creditForm:!this.state.creditForm},this.Card())} style={{backgroundColor:'white',fontSize:'20px',marginBottom:'20px',border:'0px',color:'darkolivegreen',fontWeight:"bolder"}}>
                Submit
              </button>
              </div>
              </form>
            </Paper>
            </Modal>
            </Paper>
            <div style={{border:'1px solid #000', marginTop:'20px'}}>
                <div style={{paddingLeft:'30px',backgroundColor:'#dbdbdb'}}><h3>Delivery Address</h3></div>
                <Divider/>
                 <div  style={{paddingLeft:'30px',backgroundColor:'white',marginBottom:'20px'}}>
                <h5>Customer: {task.customeremail} </h5>
                <h6>Task Location: {task.location}</h6>
                <h6>Task Status: {task.status}</h6>
            
        
                </div>
            </div>
          </Grid>


          <Grid item md={4} xs={12} style={{marginRight:'20px',marginLeft:'20px'}}>
          
              <div style={{border:'1px solid #000', marginTop:'50px'}}>
              <div style={{paddingLeft:'30px',backgroundColor:'#dbdbdb'}}><h3>Cart Summary</h3></div>
                <Divider/>
                <div  style={{paddingLeft:'30px',backgroundColor:'white',marginBottom:'20px'}}>
            <h5>Service provider:{task.serviceprovideremail}</h5>
                <Divider/>
            <h6>Total Bill:{(task.month*task.permonth)+(task.pertask)+(task.perhour*(parseInt(task.endtime)-parseInt(task.starttime))*(task.month*30))} Rs.</h6>
                <Divider/>
            <h6> Task Duration: {task.month} Month</h6>
            <Divider/>
            <h6> Time Duration: starting from={task.starttime} and ending at={task.endtime} </h6>

          
                </div>
              
              </div>

          </Grid>

 

          <Grid item md={1}></Grid>
          </Grid>

    )
 
      }
   
}
 
export default Pay;