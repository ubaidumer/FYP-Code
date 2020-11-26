import React ,{Component} from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Collapse, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import * as serviceproviderService from "../../Axios-Actions/serviceproviderService";
import VisibilityIcon from '@material-ui/icons/Visibility';
class activeTasks extends Component {
    constructor() {
        super();
        this.state = {
            task:[],
            checked: false

        };
    }
       componentDidMount(){
          serviceproviderService.getactivetasks()
           .then((result) => {
            this.setState({ task: result.data });
          })
       }
    render() {
        const { task } = this.state;
      return (
        <Grid container style={{backgroundColor:'#619eff'}}>

        <Grid item md={1}  style={{marginTop:'50px',backgroundColor:'#f5f5f5'}} ></Grid>
        <Grid item md={10} xs={12} style={{marginTop:'50px',border:'1px solid white',backgroundColor:'#d6edff',height:'700px'}} >
            <h3 style={{textAlign:'center'}}>
                Active Tasks
            </h3>
            <ul style={{listStyle:'none',marginLeft:'10px',}}>
      {
                    task.map(t=>(
                        <li key={t._id} style={{marginTop:'20px',marginBottom:'20px',display:'inline-flex',flexWrap:'wrap',marginRight:'1rem',marginLeft:'1rem'}}>

        <Card style={{maxWidth:'300px'}} >
      <CardContent>
        <Typography  color="textSecondary" gutterBottom style={{backgroundColor:'#c1c91e',color:'white'}}>
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
        control={<Button style={{color:'#c1c91e'}} checked={this.state.checked} onClick={()=> this.setState({checked:!this.state.checked})} ><VisibilityIcon/> </Button>}
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
        
        <Grid item md={1}></Grid>

    </Grid>
      );
    }
  }


 
export default activeTasks;