import React ,{Component} from 'react';
import { Collapse, Fade, FormControlLabel, Grid, Paper, Switch } from '@material-ui/core';
import * as historyService from "../../Axios-Actions/historyService";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';

class orderHistory extends Component {

 
    
    constructor() {
        super();
        this.state = {
            task:[],
            checked: false
        };
    }
       componentDidMount(){
           historyService.getAllOrders()
           .then((result) => {
            this.setState({ task: result.data  });
          })
       }
        handleChange = () => {
        this.setState({checked:!this.state.checked})
      };
    
    render() {
        const { task } = this.state;
      return (
        <Grid container style={{backgroundColor:'#619eff'}}>
      
        <Grid item md={1} xs={0} style={{marginTop:'50px',backgroundColor:'#f5f5f5'}}></Grid>
        <Grid item md={10} xs={12} style={{marginTop:'50px',border:'1px solid white',backgroundColor:'#d6edff'}}>
       <center> 
       
       <input style={{marginTop:'20px',border:'1px solid #f5f5f5',borderRadius:'4px',height:'30px',textAlign:'center',width:'50%'}} placeholder="Search your Order" /> 
       <Button>
       <SearchIcon style={{fontSize:'30px'}}/>
       </Button>
  
         </center>
        <Typography variant="h4" style={{textAlign:'center',marginTop:'10px'}}>
                Your Order History
            </Typography>
        <ul style={{listStyle:'none',marginLeft:'10px',}}>
      {
                    task.map(t=>(
                        <li key={t._id} style={{marginTop:'20px',marginBottom:'20px',display:'inline-flex',flexWrap:'wrap',marginRight:'1rem',marginLeft:'1rem'}}>

        <Card style={{maxWidth:'300px'}} >
      <CardContent>
        <Typography  color="textSecondary" gutterBottom style={{backgroundColor:'#619eff',color:'white'}}>
        <li> Order:{t._id} </li>
        </Typography>
        <Typography variant="h6" component="h2">
      <li>  Title: {t.title}</li>
        </Typography>
        <Typography variant="h6" component="h2">
      <li>  Start Time:       {t.starttime}</li>
        </Typography>
        <Typography variant="h6" component="h2">
      <li>  End Time:    {t.endtime}</li>
        </Typography>
        <FormControlLabel
        control={<Button style={{color:'#619eff'}} checked={this.state.checked} onClick={this.handleChange} ><VisibilityIcon/> </Button>}
        label="View Details"
      />
      <div>
      <Collapse in={this.state.checked}>
        <Typography variant="h6" component="h2">
      <li>  Month: {t.month}</li>
        </Typography>  
        <Typography variant="h6" component="h2">
      <li>  Service Type: {t.servicetype}</li>
        </Typography>
        <Typography variant="h6" component="h2">
      <li>  Location: {t.location}</li>
        </Typography>
        <Typography variant="h6" component="h2">
      <li>  Bill:   {(t.month*t.permonth)+(t.pertask)+(t.perhour*(parseInt(t.endtime)-parseInt(t.starttime))*(t.month*30))}</li>
        </Typography>
        <Typography variant="h6" component="h2">
      <li> Service Provider Email: {t.serviceprovideremail}</li>
        </Typography>
        </Collapse>
        </div>
      </CardContent>
      <CardActions>
      
      </CardActions>
    </Card>


    </li>
                    ))
      }

      </ul>

            

        </Grid>
        
        <Grid item md={1} style={{backgroundColor:'#f5f5f5',width:'100%',marginTop:'50px'}}></Grid>

    </Grid>
      );
    }
  }


 
export default orderHistory ;