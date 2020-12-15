import React ,{Component} from 'react';
import { Grid, Paper } from '@material-ui/core';
import * as customerService from "../../Axios-Actions/customerService";
import { Card, CardActions, CardContent, Collapse, FormControlLabel, Switch, Typography } from '@material-ui/core';

class activeTasks extends Component {
    constructor() {
        super();
        this.state = {
            task:[],
             checked:false
        };
    }
       componentDidMount(){
           customerService.getactivetasks()
           .then((result) => {
            this.setState({ task: result.data });
          })
       }

       handleChange = () => {
        this.setState({checked:!this.state.checked})
      };
    render() {
        const { task } = this.state;
      return (
        <Grid container>

        <Grid item md={2}></Grid>
        <Grid item md={8} xs={12}>
            <h3 style={{textAlign:'center'}}>
                Active Tasks
            </h3>
            <ul style={{listStyle:'none',marginLeft:'10px',}}>
      {
                    task.map(t=>(
                        <li key={t._id} style={{marginTop:'20px',marginBottom:'20px',display:'inline-flex',flexWrap:'wrap',marginRight:'1rem',marginLeft:'1rem'}}>

        <Card style={{maxWidth:'300px'}} >
      <CardContent>
        <Typography  color="textSecondary" gutterBottom style={{backgroundColor:'#de3e3e',color:'white'}}>
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
        control={<Switch style={{color:'#de3e3e'}} checked={this.state.checked} onClick={this.handleChange} />}
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
        
        <Grid item md={2}></Grid>

    </Grid>
      );
    }
  }


 
export default activeTasks;