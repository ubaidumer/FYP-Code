import { Avatar, Button, Container, Grid, Paper, Typography} from '@material-ui/core';
import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReactStars from "react-rating-stars-component";
import img from './plumber.jpg';
import * as ratingService from "../../Axios-Actions/ratingService";

let rstar=0;
class Rating extends React.Component{

   constructor(){
       super();
    this.state={
        likes:0,
        rtitle:'',
        rreview:'',
        rate:[],
        servant:[],
        thumb: true
    };
    this.handleChange= this.handleChange.bind(this);

}
    componentDidMount(){

     ratingService.getserviceInfo()         
          .then((result) => {
            this.setState({ servant: result.data });
            this.getratings(result.data.serviceprovider);
        })
       }

       getratings(id){

        ratingService.getAllRating(id)
        .then((result) => {
            this.setState({ rate: result.data });
          })

       }

       postreview(sid,se,id){
      ratingService.rate(this.state.rtitle,this.state.rreview,rstar,sid,se,id)
      .then((result) => {
      console.log("Successfull Rated");
        setTimeout(function () {
          window.location = "/profile";
        }, 2000);
      })
      .catch((err) => {
        console.log("Server error");
      });
       }
       handleChange = event =>{

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });  
      }

      liking=()=>{
          this.setState({thumb:!this.state.thumb})
          if(this.state.thumb==true)
          {
           this.setState({likes:this.state.likes+1})
          }
          if(this.state.thumb==false)
          {
              this.setState({likes:this.state.likes-1})
          }
      }
    render()
    {
        let { servant } = this.state;
        let { rate } = this.state;
        function ratingChanged(newRating) {
            rstar=newRating;
        }
           
        return(
            
       
               <Container maxWidth="lg">
                     <Grid container style={{backgroundColor:'#fcfcfc'}}>
                <Grid item md={6} xs={12}> 
                <Paper style={{height:'50px',marginTop:'20px'}}>
                    <div > 
                <Typography variant="h5" style={{justifyContent:'center',textAlign:'center',paddingTop:'10px'}}>
                Reviews
                </Typography>
                </div>
                </Paper>
                <ul style={{listStyle:'none'}}>
                {
                    rate.map(t=>(
                        <li key={t._id}>
                    <div>
                        
                <div style={{display:'inline-flex',marginTop:'40px',width:'100%',backgroundColor:'#f7f7f7',flexWrap:'wrap'}}>
                   
                   <Avatar style={{marginTop:'17px',marginRight:'20px',marginLeft:'10px',height:'50px',width:'50px'}}></Avatar>
                   <div>
                   <Typography variant="h6" style={{paddingTop:'25px'}} >
                       {t.customeremail}
                       </Typography>
                    <ReactStars
    count={t.star}
    size={30}
    color={"#ffd700"}
  />
                   <Typography variant="subtitle1">
                        
                      Title: {t.reviewtitle}
                      </Typography>
                      <br/>
                      <Typography variant="subtitle1">
                        Review:{t.review}
               </Typography>
           <br/>
 
                    </div>
                </div>
                </div>
                </li>
                    ))
                }
            </ul>
                </Grid>





                <Grid item md={5} xs={12}>
                <div style={{marginTop:'20px'}}>
                    <Paper style={{marginLeft:'20px',height:'50px'}}>
                        <Typography variant="h5" style={{paddingTop:'10px',paddingLeft:'20px'}}>
                            Post A Review
                        </Typography>
                    </Paper>
                    
                    <div style={{marginLeft:'20px',marginTop:'20px',justifyContent:'center',textAlign:'center'}}>
                        <img alt="no content" class="responsive" style={{maxHeight:'350px',maxWidth:'300px',marginRight:'20%'}} src={img}/>
                        <p>ServiceProvider E-mail:{servant.serviceprovideremail}</p>
                        <p>Task Title: {servant.title}</p>

                  <center style={{marginLeft:'35%'}}>
                  <ReactStars 
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />

                  </center>
                    </div>
                    

                    <div style={{display:'inline-flex',marginLeft:'20px',marginTop:'20px'}}> 
                        <Avatar variant='square'   />
                        <div >
                        <input name="rtitle"onChange={this.handleChange} value={this.state.rtitle}id="rtitle"style={{marginLeft:'20px' ,width:'100%',marginTop:'10px'}} type="text" placeholder="review Title"/>
                        </div>
                    </div>
                    <div style={{marginLeft:'80px',marginTop:'10px'}}>
                    <textarea  name="rreview"onChange={this.handleChange} value={this.state.rreview}id="rreview" style={{width:'100%',border:'1px solid #ccccfff'}} type="text" placeholder="Write your review"/>
                    <Button variant="contained" color="primary" onClick={this.postreview.bind(this,servant.serviceprovider,servant.serviceprovideremail,servant._id)} style={{marginTop:'10px',width:'100px',fontSize:'20px',marginBottom:'10px'}}>POST</Button>
                        </div>
                </div>
                </Grid> 
                </Grid>
                </Container>
 
            
            
        )
    }
}

export default Rating;