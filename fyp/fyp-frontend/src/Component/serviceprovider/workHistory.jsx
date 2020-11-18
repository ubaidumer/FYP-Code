import React ,{Component} from 'react';
import { Grid, Paper } from '@material-ui/core';
import * as historyService from "../../Axios-Actions/historyService";

class workHistory extends Component {
    constructor() {
        super();
        this.state = {
            task:[],

        };
    }
       componentDidMount(){
           historyService.getAllWorks()
           .then((result) => {
            this.setState({ task: result.data });
            
          })
       }
    render() {
        const { task } = this.state;
      return (
        <Grid container>

        <Grid item md={2}></Grid>
        <Grid item md={8} xs={12}>
            <h3 style={{textAlign:'center'}}>
                Work History
            </h3>
            <ul>
                {
                    task.map(t=>(
                        <li key={t._id}>
            <Paper elevation={3}>
        <table style={{borderCollapse: "separate", borderSpacing:'30px'}}>
              <thead>
              <tr >
                  <th >
                      Title
                  </th>
                  <th>
                      Starting Time
                  </th>
                  <th>
                      End time
                  </th>
                  <th>
                      Month
                  </th>
                  <th>
                      Service type
                  </th>
                  <th>
                      Location
                  </th>
                  <th>
                      Total Bill
                  </th>
                  <th>
                      Customer Email
                  </th>
                  </tr>
              </thead>
              <tbody style={{textAlign:'center'}}>
                 <tr >          
                  <td>
                        {t.title}
                      </td>
                  <td>
                {t.starttime}
                  </td>
                  <td>
             {t.endtime}
                  </td>
                  <td>
            {t.month}
                  </td>
                  <td>
            {t.servicetype}
                  </td>
                  <td>
            {t.location}
                  </td>
                  <td>
            {(t.month*t.permonth)+(t.pertask)+(t.perhour*(parseInt(t.endtime)-parseInt(t.starttime))*(t.month*30))}
                  </td>
                  <td>
            {t.customeremail}
                  </td>
               
                  </tr>
            
              </tbody>
         
              </table>  
              </Paper>
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


 
export default workHistory ;