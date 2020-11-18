import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import * as postService from'../../Axios-Actions/postService';
class postATask extends React.Component  {
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
                window.location = "/";
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
        <Grid container>
         <Grid item md={3}>

         </Grid>
         <Grid item sm={6} xs={12}>
           
         <Paper elevation={3} >
         <form onSubmit ={this.handleSubmit} >
         <Typography variant='h3' style={{textAlign:'center',marginTop:'20px',paddingTop:'20px',backgroundColor:'#52a8a7',paddingBottom:'20px'}}>
             Post a task
         </Typography>
        <div style={{marginLeft:'20px',marginRight:'20px',textAlign:'center'}}>
         <div >
             <Typography variant='h4'>
                 Title
             </Typography>
             <div style={{fontSize:12, color:'red'}}> 
             {this.state.titleError}     </div>
         <input name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} style={{width:'60%'}} type='text'/>
    
        </div>
        <div style={{textAlign:'center',marginLeft:'20px',marginTop:'20px'}}>
        <div style={{fontSize:12, color:'red'}}> 
             {this.state.ServiceError}     </div>
        <Typography variant='h4'>
                 Service type <span>   <select id="servicetype"onChange={this.handleChange}style={{width:'150px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="">Select</option>
                                <option value="Maid">Maid</option>
                                <option value="Electrian">Electrian</option>
                                <option value="Cook">Cook</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Shopkeeper">Shopkeeper</option>
                                
                                </select> </span>
             </Typography>
          
        </div>
        <div>
        <div style={{fontSize:12, color:'red'}}> 
             {this.state.cityError}     </div>
        <Typography variant='h4'>
                 Location  <span>   <select id="city" onChange={this.handleChange}style={{width:'150px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
                                <option value="">Select</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Karachi">Karachi</option>
                                </select>
                                </span>
                                </Typography>
             <div style={{fontSize:12, color:'red'}}> 
             {this.state.LocationError}     </div>
         <input name="Area" placeholder="Area"  value={this.state.Area}  onChange={this.handleChange} style={{width:'30%',marginLeft:'10px',marginTop:'10px'}} type='text' />
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.streetNoError}     </div>
         <input name="streetNo" placeholder="Street No"   value={this.state.streetNo}  onChange={this.handleChange} style={{width:'30%',marginLeft:'10px',marginTop:'10px'}} type='text' />
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.houseNoError}     </div>
         <input name="houseNo" placeholder="House No"  value={this.state.houseNo}  onChange={this.handleChange} style={{width:'30%',marginLeft:'10px',marginTop:'10px'}} type='text'/>
        
        </div>
        <div>
        <Typography variant='h4'>
                 Bidding
             </Typography>
        
             <div style={{fontSize:12, color:'red'}}> 
             {this.state.perTaskError}     </div>
         <input name="perTask" placeholder="Per Task"  value={this.state.perTask}  onChange={this.handleChange} style={{width:'20%',marginLeft:'10px',marginTop:'10px'}} type='text' />
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.perHourError}     </div>
         <input name="perHour"  id="hehe" placeholder="Per Hour"   value={this.state.perHour}  onChange={this.handleChange} style={{width:'20%',marginLeft:'10px',marginTop:'10px'}} type='text' />
         <div style={{fontSize:12, color:'red'}}> 
             {this.state.perMonthError}     </div>
         <input name="perMonth" placeholder="Per Month"  value={this.state.perMonth}  onChange={this.handleChange} style={{width:'20%',marginLeft:'10px',marginTop:'10px'}} type='text' />

         </div>
         <div style={{marginTop:'20px'}}>
         <Typography variant='h4' style={{textAlign:'center'}}>
             <div style={{marginBottom:'10px'}}>Time Duration</div>
            <div> <span ><label style={{paddingLeft:'50px'}}>Start Time </label ><input id="starttime" type="time"onChange={this.handleChange}style={{width:'20%'}}/></span></div> 
            <div>  <span ><label style={{marginLeft:'40px',paddingLeft:'20px'}}>End Time </label><input type="time" id="endtime"onChange={this.handleChange}style={{width:'20%'}}/></span></div> 
            <div>
            <label style={{marginLeft:'40px',paddingLeft:'20px'}}>Month </label> <span>   <select id="month"onChange={this.handleChange} style={{width:'150px',marginBottom:'20px',height:'30px',marginLeft:'20px',border:'0px solid #fff'}}>
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
                                
                                </select> </span>
             </div>
         </Typography>
         </div>
         <div>
           <Typography variant='h4' style={{textAlign:'center'}}>
           <div>
             <h6 style={{marginBlockStart:'1.0em',marginBlockEnd:'1.0em'}}>
                Description
            </h6>
        <textarea value={this.state.description}name="description"onChange={this.handleChange}style={{width:'60%',height:'100px'}} type='text'/>
        </div>
           </Typography>
          </div>
         </div>
         <button style={{marginTop:'20px',marginBottom:'20px',marginLeft:'30%',width:'40%',marginRight:'30%',}}>Post</button>
         </form>
         </Paper>
         </Grid>

         <Grid item md={3}>

</Grid>
        </Grid>
     );
    }
}
 
export default postATask;
