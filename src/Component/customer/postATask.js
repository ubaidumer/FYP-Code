import { Backdrop, Button, Container, Fade, Grid, InputLabel, Modal, NativeSelect, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import * as postService from'../../Axios-Actions/postService';

class PostATask extends React.Component  {
    constructor() {
      super();
      this.state = {
       
          title: '',
          Category: '',
          Area: '',
          AreaError: '',
          Service: '',
          ServiceError: '',
          titleError: '',
          streetNo: '',
          streetNoError: '',
          houseNo: '',
          houseNoError: '',
          city: '',
          cityError: '',
          perTask: '',
          perHour: '',
          perMonth: '',
          perTaskError: '',
          perHourError: '',
          perMonthError: '',
          open: false

      };
      this.handleChange= this.handleChange.bind(this);
      this.handleSubmit= this.handleSubmit.bind(this);
    }
    
    validate = () =>{
    
        let num = this.state.title;
        let titleError ;
      

        if(num.length >30){
        titleError= "Title length too long."
        }
        
        if(num.length <5){ //nice heart there nigga
            titleError= "Title length too short."
            }
            if(num.length ===0){
                titleError= "You must enter the title."
                }

                    let AreaError;
                    if(this.state.Area.length===0){
                      AreaError = 'Enter a location'
                    }
              
 
        let servicetype = document.getElementById('servicetype');
        let ServiceError;
        if(servicetype.value === ""){
           ServiceError='Please enter a service type'
       
        }
        let city = document.getElementById('city');
        let cityError;
        if(city.value === ""){
           cityError='Please enter a city'
       
        }
        
        let streetNoError;
                    if(this.state.streetNo.length===0){
                      streetNoError = 'Enter a valid street'
                    }

                    let houseNoError;
                    if(this.state.houseNo.length===0){
                      houseNoError = 'Enter a House Number'
                    }
              
                    let perTaskError;
                    
                    if(this.state.perTask.length===0 && this.state.perHour.length===0 && this.state.perMonth.length===0){
                      perTaskError = 'Please fill one input'
                    }else if((this.state.perTask.length>0 && this.state.perHour.length>0 && this.state.perMonth.length===0)
                    ||((this.state.perTask.length===0 && this.state.perHour.length>0 && this.state.perMonth.length>0))
                    ||((this.state.perTask.length>0 && this.state.perHour.length===0 && this.state.perMonth.length>0))){
                      perTaskError = 'only one input allowed'
                    }else if(this.state.perTask>0 && this.state.perHour>0 && this.state.perMonth>0){
                      perTaskError = 'only one input allowed'
                    }
              
          
        if(titleError || ServiceError || AreaError|| cityError||streetNoError||houseNoError || perTaskError ){
            this.setState({titleError, ServiceError, AreaError,cityError,streetNoError,houseNoError,perTaskError});
            return false;
        }
        return true;
    }
    handleSubmit= event =>{
        event.preventDefault();
        const isValid = this.validate();
        console.log(isValid);
        if(isValid){

          let location= "city:"+document.getElementById('city').value+" Area:"+this.state.Area+" StreetNo:"+this.state.streetNo+" HouseNo:"+this.state.houseNo;
          this.setState({open:true})
          

console.log(  this.state.title,
  document.getElementById('servicetype').value,
  location,
  this.state.perHour,
  this.state.perMonth,
  this.state.perTask,
  document.getElementById('starttime').value,
  document.getElementById('endtime').value,
  document.getElementById('month').value,
  this.state.description);



            postService
            .PostATask(

              this.state.title,
              document.getElementById('servicetype').value,
              location,
              this.state.perHour,
              this.state.perMonth,
              this.state.perTask,
              document.getElementById('starttime').value,
              document.getElementById('endtime').value,
              document.getElementById('month').value,
              this.state.description
            )
            .then((result) => {
              // localStorage.setItem("token", result.data);
            console.log("Successfull posted");
              setTimeout(function () {
                window.location = "/profile";
              }, 2000);
            })
            .catch((err) => {
              this.setState({ invalid: true });
              console.log("Server error");
            });





        }
   
    }
    handleChange = event =>{
      const isCheckbox= event.target.type==="checkbox";
      this.setState({
          [event.target.name]: isCheckbox?
          event.target.checked: event.target.value
      });
    }
    render()
    {
    return ( 
      <Container maxWidth="md">
        <Grid container >
        <Grid item md={2}></Grid>
         <Grid item md={8} xs={12}>
         
         <Paper elevation={3} >
         <form onSubmit ={this.handleSubmit} >
         
         <Typography variant='h5' style={{textAlign:'center',marginTop:'20px',paddingTop:'20px',backgroundColor:'#a62e9c',paddingBottom:'20px',color:'white'}}>
             Post a task
         </Typography>
        <div style={{marginLeft:'20px',marginRight:'20px',textAlign:'center'}}>
         <div >
         <Grid container> 
           <Grid item md={12} xs={12}>
        
             <Typography variant='h6' style={{color:'#2d4a6b',marginTop:'10px'}}>
                 Title
             </Typography> 
             <div style={{fontSize:12, color:'red'}}> 
             {this.state.titleError}     </div>
         <TextField
       
         name="title" label="Enter the title" value={this.state.title} onChange={this.handleChange}
         errorText={this.state.titleError}
          style={{borderRadius:'5px',width:'70%',marginBottom:'20px',textAlign:'center'}} type='text'/>
     </Grid>
 
     <Modal style={{justifyContent:'center',alignItems:'center',display:'flex'}}
              open={this.state.open}
              onClose={!this.state.open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500, 
              }}
          
            >
              <Fade in={this.state.open}> 
              <Paper elevation={3} style={{textAlign:'center',}}>
              <Container maxWidth="sm">
    
              <Alert severity="success">Task successfully posted</Alert> 
              <Button onClick={()=>this.setState({open:false})}>Close</Button>
            
            </Container>
            </Paper>

            </Fade> 
            </Modal>
     </Grid>
        </div>
        <Grid container>
          <Grid item md={6}>
        <div style={{textAlign:'center',marginLeft:'20px',marginTop:'20px'}}>
        
        <div style={{fontSize:12, color:'red'}}> 
             {this.state.ServiceError}     </div>
        <Typography variant='h6' style={{color:'#2d4a6b'}}>
                 Service type <span>
                   
                 
                    <NativeSelect id="servicetype"onChange={this.handleChange}
                 style={{width:'150px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="">Select</option>
                                <option value="Maid">Maid</option>
                                <option value="Electrian">Electrian</option>
                                <option value="Cook">Cook</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Driver">Driver</option>
                                <option value="Tailor">Tailor</option>
                                <option value="Shopkeeper">Shopkeeper</option>
                                
                                </NativeSelect> </span>
             </Typography>
          
        </div>
        </Grid>
   
    
        <Grid item md={6}>
        <div style={{textAlign:'center',marginLeft:'20px',marginTop:'20px'}}>
        <div style={{fontSize:12, color:'red'}}> 
             {this.state.cityError}     </div>
             
        <Typography variant='h6' style={{color:'#2d4a6b'}}>
                 Location <br/>    <NativeSelect label id="city" onChange={this.handleChange}
                 style={{width:'150px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
               
                                <option value="">Select</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Karachi">Karachi</option>
                                </NativeSelect>
                              
                                </Typography>
                                </div> 
                                </Grid>
                                <div></div>
                                </Grid>
                                <Grid container>
                                <Grid item md={4} xs={12}>         
             <div style={{fontSize:12, color:'red'}}> 
             {this.state.AreaError}     </div>
         <TextField name="Area" label="Enter Area"  value={this.state.Area}  onChange={this.handleChange}
          style={{height:'30px',borderRadius:'5px',width:'80%',marginBottom:'20px',textAlign:'center'}} type='text' />
          </Grid> 
          <Grid item md={4} xs={12}>  
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.streetNoError}     </div>
         
         <TextField name="streetNo" label="Enter Street No"   value={this.state.streetNo}  onChange={this.handleChange}
          style={{height:'30px',borderRadius:'5px',width:'80%',marginBottom:'20px',textAlign:'center'}} type='text' />
          </Grid> 
          <Grid item md={4} xs={12}>   
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.houseNoError}     </div>
         <TextField name="houseNo" label="Enter House No"  value={this.state.houseNo}  onChange={this.handleChange} 
         style={{height:'30px',borderRadius:'5px',width:'80%',marginBottom:'20px',textAlign:'center'}} type='text'/>
        
         </Grid> 
         </Grid>
      
   
        <Typography variant='h6' style={{marginTop:'20px',color:'#2d4a6b'}}>
                 Bidding
             </Typography>
             <Grid container>
         <Grid item md={4}></Grid>    
             <Grid item md={4}><div style={{fontSize:12, color:'red'}}> 
             {this.state.perTaskError}     </div></Grid> 
             <Grid item md={4}></Grid> 
             <Grid item md={4} xs={12}>  
         
         <TextField label="Per Task" name="perTask" placeholder="Per Task"  value={this.state.perTask}  onChange={this.handleChange}
          style={{height:'30px',borderRadius:'5px',width:'80%',marginBottom:'20px',textAlign:'center'}} type='text' />
          </Grid>
          <Grid item md={4} xs={12}>  
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.perHourError}     </div>
         <TextField label="Per Hour" name="perHour"  id="hehe" placeholder="Per Hour"   value={this.state.perHour}  onChange={this.handleChange}
          style={{height:'30px',borderRadius:'5px',width:'80%',marginBottom:'20px',textAlign:'center'}} type='text' />
          </Grid>
          <Grid item md={4} xs={12}>  
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.perMonthError}     </div>
         <TextField label="Per Month" name="perMonth" placeholder="Per Month"  value={this.state.perMonth}  onChange={this.handleChange}
          style={{height:'30px',borderRadius:'5px',width:'80%',marginBottom:'20px',textAlign:'center'}} type='text' />
         </Grid>
       
         </Grid>
         <div style={{marginTop:'20px'}}>
         <Typography variant='h6' style={{textAlign:'center',color:'#2d4a6b'}}>
             <div style={{marginBottom:'10px'}}>Time Duration</div>
             <Grid container>
               <Grid item md={4} xs={6}>
            <div> <span ><TextField
              
               label="Start Time"
               type="time"
               defaultValue="07:30"
       
               InputLabelProps={{
                 shrink: true,
               }}
               inputProps={{
                 step: 300, // 5 min
               }}
            id="starttime" onChange={this.handleChange}style={{width:'80%'}}/></span></div> 
            </Grid>
            <Grid item md={4} xs={6}>
            <div>  <span ><TextField
            
               label="End time"
               type="time"
               defaultValue="10:30"
             
               InputLabelProps={{
                 shrink: true,
               }}
               inputProps={{
                 step: 300, // 5 min
               }}
            
            
            id="endtime"onChange={this.handleChange}style={{width:'80%'}}/></span></div> 
            </Grid>
            <Grid item md={4} xs={12}>

            <div style={{marginTop:'5px'}}>

            <span>  
            <InputLabel htmlFor="demo-customized-select-native">Month</InputLabel> 
               <NativeSelect id="month"onChange={this.handleChange} label="Month" style={{width:'100px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                
                                </NativeSelect> </span> 
             </div>
             </Grid>
             </Grid>
         </Typography>
         </div>
         <div>
           <Typography variant='h6' style={{textAlign:'center',color:'#2d4a6b'}}>
           <div>
             <h6 style={{marginBlockStart:'1.0em',marginBlockEnd:'1.0em'}}>
                Description
            </h6>
        <textarea value={this.state.description}name="description"onChange={this.handleChange}style={{width:'60%',height:'60px'}} type='text'/>
        </div>
           </Typography>
          </div>
         </div>
         <button style={{marginTop:'20px',marginBottom:'20px',marginLeft:'30%',width:'30%',marginRight:'30%',backgroundColor:'#a62e9c',color:'white',height:'35px'
        ,borderRadius:'5px'}}>POST</button>
 
         </form>
         </Paper>
         </Grid>

  
        </Grid>
        </Container>
     );
    }
}
 
export default PostATask;
