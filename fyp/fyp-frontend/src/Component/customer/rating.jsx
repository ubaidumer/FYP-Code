import { Avatar, Grid, Paper} from '@material-ui/core';
import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReactStars from "react-rating-stars-component";
import img from './plumber.jpg';
import * as ratingService from "../../Axios-Actions/ratingService";

let rstar=0;
class rating extends React.Component{

   constructor(){
       super();
    this.state={
        likes:false,
        rtitle:'',
        rreview:'',
        rate:[],
        servant:[],
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
          window.location = "/";
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

    render()
    {
        let { servant } = this.state;
        let { rate } = this.state;
        function ratingChanged(newRating) {
            rstar=newRating;
        }
           
        return(
            
            <Grid container style={{backgroundColor:'#fcfcfc'}}>
             <Grid item md={1}></Grid>

                <Grid item md={6} xs={12}> 
                <ul>
                {
                    rate.map(t=>(
                        <li key={t._id}>
                    <div>
                        
                <Paper style={{height:'50px'}}>
                    <div>
                <h2 style={{paddingTop:'10px',paddingLeft:'20px'}}>
                Reviews
                </h2>
                </div>
                </Paper>
                <div style={{display:'inline-flex',marginTop:'40px',width:'100%',backgroundColor:'#f7f7f7'}}>
                   
                   <Avatar style={{marginTop:'17px',marginRight:'20px',marginLeft:'10px'}}></Avatar>
                   <div>
                    <h4>
                       Customer:{t.customeremail}
                    </h4>
                    <ReactStars
    count={t.star}
    size={24}
    color={"#ffd700"}
  />
                    <p>
                        
                      Title: {t.reviewtitle}
                        </p><p>
                        Review:{t.review}
                    </p>

                    <button style={{backgroundColor:'#f7f7f7',border:'0px',color:'darkblue' }} 


        > <ThumbUpIcon style={{fontSize:'30px'}}/> {this.state.likes + 0 }</button>
                    </div>
                </div>
                </div>
                </li>
                    ))
                }
            </ul>
                </Grid>





                <Grid item md={4} xs={12}>
                <div style={{marginTop:'20px'}}>
                    <Paper style={{marginLeft:'20px',height:'50px'}}>
                        <h2 style={{paddingTop:'10px',paddingLeft:'20px'}}>
                            Post A Review
                        </h2>
                    </Paper>
                    
                    <div style={{marginLeft:'20px',marginTop:'20px'}}>
                        <img alt="no content"style={{maxHeight:'450px',maxWidth:'400px',marginLeft:'20px',marginRight:'20%'}} src={img}/>
                        <p>ServiceProvider E-mail:{servant.serviceprovideremail}</p>
                        <p>Task Title: {servant.title}</p>

                        <ReactStars 
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />

                    </div>
                    

                    <div style={{display:'inline-flex',marginLeft:'20px',marginTop:'20px'}}>
                        <Avatar variant='square'   />
                        <div >
                        <input name="rtitle"onChange={this.handleChange} value={this.state.rtitle}id="rtitle"style={{marginLeft:'20px' ,width:'200px'}} type="text" placeholder="review Title"/>
                        </div>
                    </div>
                    <div style={{marginLeft:'80px',marginTop:'10px'}}>
                    <textarea  name="rreview"onChange={this.handleChange} value={this.state.rreview}id="rreview" style={{width:'100%',border:'1px solid #ccccfff'}} type="text" placeholder="Write your review"/>
                    <button onClick={this.postreview.bind(this,servant.serviceprovider,servant.serviceprovideremail,servant._id)} style={{marginTop:'10px',width:'100px',border:'0px',color:'brown',fontSize:'20px',borderRadius:'9px'}}>POST</button>
                        </div>
                </div>
                </Grid>
            </Grid>
            
        )
    }
}

export default rating;