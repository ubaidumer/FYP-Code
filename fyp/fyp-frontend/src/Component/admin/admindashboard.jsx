import React from 'react';

import Paper from '@material-ui/core/Paper';
import { Avatar, Button, Divider, Grid, Modal, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import * as adminService from "../../Axios-Actions/adminService";



export default class Admin extends React.Component {
 

constructor(){

   super();
   this.state={
     addOpen: false,
     editOpen: false,
     deleteOpen: false,
     fname:'',
     lname:'',
     email:'',
     pass:'',
     servicetype:'',
     contactno:'',
     efname:'',
     elname:'',
     eemail:'',
     epass:'',
     eservicetype:'',
     econtactno:'',
     esearchemail:'',
     dsearchemail:'',
     info:[],
     infod:[],
     
   }
   this.handleChange= this.handleChange.bind(this);
   this.add= this.add.bind(this);
   this.get= this.get.bind(this);
   this.edit= this.edit.bind(this);
};



handleChange=(event)=>{

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });   

}
add(){

adminService.addservice(this.state.fname,this.state.lname,this.state.email,this.state.servicetype,this.state.pass,this.state.contactno)
.then((result) => {
    console.log("Successfull Registered through admin ");
      setTimeout(function () {
        window.location = "/";
      }, 2000);
    })
    .catch((err) => {
      console.log("Server error");
    });

}
get=(e)=>{


    adminService.getdata(this.state.esearchemail)
    .then((result) => {
     this.setState({ info: result.data });
   });
    
};
getd=(e)=>{


    adminService.getdata(this.state.dsearchemail)
    .then((result) => {
     this.setState({ infod: result.data });
   });
    
};

edit=(e)=>{

    let f,l,em,p,s,c,email;

    f=this.state.efname;
    l=this.state.elname;
    em=this.state.eemail;
    p=this.state.epass;
    s=this.state.eservicetype;
    c=this.state.econtactno;

    email=this.state.esearchemail;

console.log(f,l,em,p,s,c,email);
    adminService.edit(f,l,em,s,p,c,email)
    .then((result) => {
        console.log("Successfull Edited through admin ");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log("Server error");
        });
}
delet=(event)=>{

let d=this.state.dsearchemail;

adminService.del(d)
.then((result) => {
    console.log("Successfull deleted through admin ");
      setTimeout(function () {
        window.location = "/";
      }, 2000);
    })
    .catch((err) => {
      console.log("Server error");
    });

}
  render()
  {
   let{ info } = this.state;
   let{ infod } = this.state;

  return (

    <Grid container>

<Modal
        open={this.state.addOpen}
        onClose={!this.state.addOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <Grid container>
        <Grid item md={3}>

        </Grid>
        <Grid item md={6} style={{backgroundColor:'white',marginTop:'50px'}}>
         <div style={{border:'2px solid #000',textAlign:'center'}}>
           <div style={{backgroundColor:'darkolivegreen',color:'white',paddingTop:'20px',paddingBottom:'20px'}}> <Typography variant="h2">
           Add a Service Provider
             </Typography>
           </div>
           <div>
           <div >
             
           <TextField name="fname"onChange={this.handleChange.bind(this)} value={this.state.fname}style={{width:'40%',marginBottom:'40px'}}
             label="Enter First Name"
             normal='normal'
             size='medium'
             />
           </div>
           <div>
           <TextField name="lname" onChange={this.handleChange.bind(this)} value={this.state.lname}style={{width:'40%',marginBottom:'40px'}}
             label="Enter Last Name"
             />
           </div>
           <div>
           <TextField name="email"onChange={this.handleChange.bind(this)} value={this.state.email}style={{width:'40%',marginBottom:'40px'}}
             label="Enter Email"
             />
           </div>
           <div>
           <TextField name="servicetype"onChange={this.handleChange.bind(this)}value={this.state.servicetype}style={{width:'40%',marginBottom:'40px'}}
             label="Enter Service Type "
             />
           </div>
           <div>
           <TextField name="pass"onChange={this.handleChange.bind(this)}value={this.state.pass}style={{width:'40%',marginBottom:'40px'}}
             label="Enter Password"
             />
           </div>
           <div>
           <TextField name="contactno"onChange={this.handleChange.bind(this)}value={this.state.contactno}style={{width:'40%',marginBottom:'40px'}}
             label="Enter Contact No"
             />
           </div>
           <Button variant='outlined' onClick={this.add.bind(this)}  style={{marginBottom:'30px'}}>Add</Button>
           <Button variant='outlined' style={{marginBottom:'30px',marginLeft:'20px'}} 
           onClick={()=>this.setState({addOpen:!this.state.addOpen})}
           > Close</Button>
           </div>
         </div>
        </Grid>
        <Grid item md={3}>
          
        </Grid>
      </Grid>
      </Modal>

      <Modal
        open={this.state.editOpen}
        onClose={!this.state.editOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <Grid container>
        <Grid item md={3}>

        </Grid>
        <Grid item md={6} style={{backgroundColor:'white',marginTop:'50px'}}>
         <div style={{border:'2px solid #000',textAlign:'center'}}>
           <div style={{backgroundColor:'darkseagreen',color:'white',paddingTop:'20px',paddingBottom:'20px'}}> <Typography variant="h2">
           Edit a Service Provider
             </Typography>
           </div>
           <div>
               <h3>Enter ServiceProvider Email to be edited</h3>
           <div>
           <TextField name="esearchemail" onChange={this.handleChange.bind(this)} value={this.state.esearchemail} style={{width:'40%',marginBottom:'20px'}}
             />
           </div>
           <div onClick={this.get.bind(this)}>
           <Button variant='outlined' style={{marginBottom:'30px'}}>Search</Button>
           </div>
           <h3>Enter ServiceProvider Information to be edited</h3>

           
               {info.map(i=>(
                   <li key={i.id}>
           <h4>FirstName:{i.firstname}</h4>
           <TextField name="efname" onChange={this.handleChange}value={this.state.efname} ></TextField>
           <h4>LastName:{i.lastname}</h4>
           <TextField name="elname" onChange={this.handleChange}value={this.state.elname} ></TextField>
           <h4>Email:{i.email}</h4>
           <TextField name="eemail" onChange={this.handleChange}value={this.state.eemail} ></TextField>
           <h4>Password</h4>
           <TextField name="epass" onChange={this.handleChange}value={this.state.epass} ></TextField>
           <h4>ServiceType:{i.servicetype}</h4>
           <TextField name="eservicetype" onChange={this.handleChange}value={this.state.eservicetype} ></TextField>
           <h4>Contactno:{i.contactno}</h4>
           <TextField name="econtactno" onChange={this.handleChange}value={this.state.econtactno} ></TextField>
           </li>
               ))}
           
           <Button variant='outlined'   onClick={this.edit}style={{marginBottom:'30px'}}>Edit</Button>
           <Button variant='outlined' style={{marginBottom:'30px',marginLeft:'20px'}} 
           onClick={()=>this.setState({editOpen:!this.state.editOpen})}
           > Close</Button>
           </div>
         </div>
        </Grid>
        <Grid item md={3}>
          
        </Grid>
      </Grid>
      </Modal>

      
      <Modal
        open={this.state.deleteOpen}
        onClose={!this.state.deleteOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <Grid container>
        <Grid item md={3}>

        </Grid>
        <Grid item md={6} style={{backgroundColor:'white',marginTop:'50px'}}>
         <div style={{border:'2px solid #000',textAlign:'center'}}>
           <div style={{backgroundColor:'red',color:'white',paddingTop:'20px',paddingBottom:'20px'}}> <Typography variant="h2">
           Delete a Service Provider
             </Typography>
           </div>
           <div>
               <h3>Enter Email of ServiceProvider to be deleted</h3>
           <div>
           <TextField name="dsearchemail" onChange={this.handleChange.bind(this)} value={this.state.dsearchemail} style={{width:'40%',marginBottom:'20px'}}
             />
           </div>
           <div onClick={this.getd.bind(this)}>
           <Button variant='outlined' style={{marginBottom:'30px'}}>Search</Button>
           </div>
           <h3>ServiceProvider Information to be Deleted</h3>

           
               {infod.map(i=>(
                   <li key={i.id}>
           <h4>FirstName:{i.firstname}</h4>
           <h4>LastName:{i.lastname}</h4>
           <h4>Email:{i.email}</h4>
           <h4>ServiceType:{i.servicetype}</h4>
           <h4>Contactno:{i.contactno}</h4>
           </li>
               ))}
           <Button variant='outlined'  onClick={this.delet.bind(this)} style={{marginBottom:'30px'}}>Delete</Button>
           <Button variant='outlined' style={{marginBottom:'30px',marginLeft:'20px'}} 
           onClick={()=>this.setState({deleteOpen:!this.state.deleteOpen})}
           > Close</Button>
           </div>
         </div>
        </Grid>
        <Grid item md={3}>
          
        </Grid>
      </Grid>
      </Modal>



      <Grid item  md={2} xs={12}>
        <div style={{height:'100%',backgroundColor:'#5e9cad'}}>

         <div style={{display:'inline-flex'}}> 
         
         <Avatar style={{width:'70px',height:'70px',marginRight:'10px',marginLeft:'30px',marginTop:'20px',}}/>

         <Typography variant='h4' style={{paddingTop:'45px',paddingLeft:'20px'}}>

           Azeem Sultan</Typography> </div>
       <Divider style={{marginTop:'20px',marginBottom:'20px',backgroundColor:'white'}} />
       <div style={{marginLeft:'5%',verticalAlign:'center'}}>
        <Typography variant='h4'> 

          Dashboard
          <DashboardIcon style={{fontSize:'40px', paddingLeft:'20%',color:'white'}} />

        </Typography>
        <Divider style={{marginTop:'40px',marginBottom:'20px',backgroundColor:'white'}} />

        <Typography variant='h4'> 

Disputes
<SportsKabaddiIcon style={{fontSize:'40px', paddingLeft:'26%',color:'white'}} />
</Typography>
<Divider style={{marginTop:'40px',marginBottom:'20px',backgroundColor:'white'}} />

<Typography variant='h4'> 

Requests
<AnnouncementIcon style={{fontSize:'40px', paddingLeft:'24%',color:'white'}} />
</Typography>
<Divider style={{marginTop:'40px',marginBottom:'20px',backgroundColor:'white'}} />


<Typography variant='h4'> 

Messages
<ChatBubbleIcon style={{fontSize:'40px', paddingLeft:'21%',color:'white'}} />
</Typography>
<Divider style={{marginTop:'40px',marginBottom:'20px',backgroundColor:'white'}} />


<Typography variant='h4'> 

Service Providers
<BuildIcon style={{fontSize:'40px', paddingLeft:'0%',color:'white'}} />
</Typography>

<Divider style={{marginTop:'40px',marginBottom:'20px',backgroundColor:'white'}} />

<Typography variant='h4'> 

Settings
<SettingsIcon style={{fontSize:'40px', paddingLeft:'45.5%',color:'white'}} />
</Typography>


<Divider style={{marginTop:'40px',marginBottom:'20px',backgroundColor:'white'}} />
        </div>
    
        </div>
      </Grid>

      <Grid item md={10} xs={12} style={{backgroundColor:'#e8eced'}}>
        <Paper elevation={3}>
         
           <div style={{marginLeft:'40px'}}>
             <TextField  
             label="Search..."
             margin="normal"
           
            
             />
            
             <Button   style={{marginTop:'20px',height:'50px'}}>
             <SearchIcon style={{fontSize:'30px',}}/>
               Search</Button>
           </div>
      
        </Paper>
        <Grid container>
         
          <Grid item md={4} xs={12}>
            <div style={{textAlign:'center'}}>
              <Button onClick={()=>this.setState({addOpen:!this.state.addOpen})}>
            <AddCircleIcon style={{marginTop:'50px',fontSize:'100px',color:'#3c71ab'}}/>
            </Button>
            <Typography variant="h4" style={{marginTop:'20px'}}>
              Add new Service Provider
            </Typography>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
          <div style={{textAlign:'center'}}>
          <Button   onClick={()=>this.setState({editOpen:!this.state.editOpen})}>
            <EditIcon  style={{marginTop:'50px',fontSize:'100px',border:'1px solid #2a8a19',borderRadius:'99px',color:'#2a8a19'}}/>
            </Button>
            <Typography variant="h4" style={{marginTop:'20px'}}>
              Edit Service Provider's Information
            </Typography>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
          <div style={{textAlign:'center'}}>
          <Button onClick={()=>this.setState({deleteOpen:!this.state.deleteOpen})}>
            <DeleteOutlineIcon style={{marginTop:'50px',fontSize:'100px',color:'red',border:'1px solid red',borderRadius:'99px'}}/>
            </Button>
            <Typography variant="h4" style={{marginTop:'20px'}}>
              Delete Service Provider
            </Typography>
            </div>
          </Grid>
    
        </Grid>
      </Grid>
    </Grid>
  );
  }
}