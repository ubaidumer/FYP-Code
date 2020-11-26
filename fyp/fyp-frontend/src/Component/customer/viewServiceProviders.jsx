import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import img from '../common/azeem.jpg'
import * as customerService from "../../Axios-Actions/customerService";
import ReactStars from "react-rating-stars-component";
class viewServiceProvider extends React.Component {

    constructor() {
        super();
        this.state = {
            service: [],
            servant: [],
            openService: false,
            openOrder: false
        }
        this.searchbytype = this.searchbytype.bind(this);
    };

    componentDidMount() {
        customerService.getAllService()
            .then((result) => {
                this.setState({ service: result.data });
            })

    };

    searchbytype(type) {
        customerService.getServicebbytype(type)
            .then((result) => {
                this.setState({ service: result.data });
            })

    }
    searchbyall() {
        customerService.getAllService()
            .then((result) => {
                this.setState({ service: result.data });
            })

    }
    getData(id) {

        customerService.findService(id)
            .then((result) => {
                this.setState({ servant: result.data });
                console.log(this.state.servant);
            })
    }

    render() {

        let { service } = this.state;
        let { servant } = this.state;
        return (
            <Grid container style={{ backgroundColor: '#d8e9f3' }}>

                <Grid item md={2} xs={12}>
                    <Button style={{ width: '100%' }} onClick={this.searchbyall.bind(this)}>
                        <Typography variant='h5' style={{ color: '#619eff', marginTop: '40px', textAlign: 'center' }}>
                            All Categories
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "plumber")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Plumber
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "electrician")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Electrician
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "maid")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Maid
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "driver")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px', }}>
                            Driver
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "tailor")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Tailor
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "cook")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Cook
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "plumber")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Plumber
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "electrician")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Electrician
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "maid")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Maid
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "driver")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px', }}>
                            Driver
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "tailor")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Tailor
                    </Typography>
                    </Button>
                    <Button style={{ width: '100%' }} onClick={this.searchbytype.bind(this, "cook")}>
                        <Typography variant='h5' style={{ color: '#2d4a6b', marginTop: '20px' }}>
                            Cook
                    </Typography>
                    </Button>


                </Grid>

                <Grid item md={10} xs={12}>
                    <Modal
                        open={this.state.openOrder}
                        onClose={!this.state.openOrder}
                    >
                        <Grid container>
                            <Grid item md={3}></Grid>
                            <Grid item md={6} xs={12}>
                                <Paper style={{ marginTop: '30%', height: '300px' }}>
                                    <center>
                                        <Typography variant="h5" style={{ paddingTop: '20px', marginBottom: '20px' }}>Send Order</Typography>
                                        <input type="text" placeholder="Enter Order ID"
                                            style={{ width: '60%', border: '1px solid #fc0cf0', height: '20px' }} /> <br />
                                        <div style={{ marginTop: '20px' }}>
                                            <Button variant="outlined">Send Order</Button>
                                            <Button style={{ marginLeft: '20px', backgroundColor: 'red', color: 'white' }}
                                                onClick={() => this.setState({ openOrder: !this.state.openOrder })}
                                            >Cancel</Button>
                                        </div>
                                    </center>
                                </Paper>
                            </Grid>
                            <Grid item md={3}></Grid>
                        </Grid>
                    </Modal>
                    <Modal
                        open={this.state.openService}
                        onClose={!this.state.openService}
                    >

                        <Grid container>
                            <Grid item md={2}></Grid>

                            <Grid item md={8} xs={12}>

                                <ul style={{listStyle:'none'}}>
                                    {

                                        servant.map(t => (
                                            <li key={t._id}>
                                                <Paper elevation={2} style={{ marginTop: '40px' }}>
                                                    <div style={{ display: 'inline-flex', }}>
                                                        <div style={{ marginLeft: '10px', marginBottom: '20px' }}>
                                                            <img src={img} style={{marginTop:'25px',width:'50%',height:'auto'}} />

                                                        </div>
                                                        <div style={{ marginTop: '20px', color: 'blueviolet',marginRight:'10px' }}>

                                                            <Typography variant="h5" >{t.firstname} {t.lastname}:</Typography>
                                                            <Typography variant="subtitle1">{t.servicetype}</Typography>
                                                            <Typography variant="subtitle1">{t.email}</Typography>

                                                            <Typography variant="subtitle2">________________</Typography>
                                                            <div style={{ marginTop: '30px' }}>
                                                                <Typography>Want to hire?</Typography>
                                                                <Button variant="outlined" onClick={() => this.setState({ openOrder: !this.state.openOrder, openService: !this.state.openService })}>Send Task</Button>
                                                                <Button style={{ backgroundColor: 'red', color: 'white', marginLeft: '20px',marginTop:'10px' }}
                                                                    onClick={() => this.setState({ openService: !this.state.openService })}>Close</Button>
                                                            </div>

                                                            <div style={{ marginTop: '40px', }}>
                                                                <Typography variant="subtitle1">Contact on number:</Typography>
                                                                <Typography variant="subtitle1">{t.contactno}</Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </li>
                                        ))
                                    }
                                </ul>


                            </Grid>

                            <Grid item md={2}></Grid>

                        </Grid>
                    </Modal>

                    <center>
                        <div style={{ marginTop: '30px', paddingBottom: '10px' }}><TextField style={{ width: '50%' }} /><SearchIcon style={{ color: '#619eff' }} /></div>
                    </center>
                    <div style={{ backgroundColor: '#619eff', marginTop: '20px', border: '2px solid white', borderRadius: '5px', color: 'whitesmoke' }}>
                        <Typography variant='h4'>
                            Service Providers
                            </Typography>
                    </div>
                    <div style={{ backgroundColor: 'white', paddingTop: '1px', paddingBottom: '20px' }}>



                        <ul style={{ listStyle: 'none', display: 'inline-flex', flexWrap: 'wrap' }}>
                            {
                                service.map(s => (
                                    <li key={s.id}>
                                        <Card style={{ maxWidth: '200px', marginLeft: '20px', marginTop: '10px' }} >
                                            <CardActionArea>
                                                <img src={img} style={{ width: '200px', maxHeight: '150px' }} />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="h2">
                                                        {s.firstname} {s.lastname}
                                                    </Typography>
                                                    <Typography gutterBottom variant="subtitle1" component="h2">
                                                        {s.servicetype}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>

                                                <Button size="small" color="primary" style={{ marginLeft: '38px' }}
                                                    onClick={() => this.setState({ openService: !this.state.openService }, this.getData(s._id))}>
                                                    View Details
        </Button>

                                            </CardActions>
                                        </Card>
                                    </li>

                                ))
                            }
                        </ul>
                    </div>

                </Grid>


            </Grid>
        )
    }
}
export default viewServiceProvider;