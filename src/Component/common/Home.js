import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Carousel from 'react-material-ui-carousel'
import background from "../../assets/img/bg3.jpg"
// @material-ui/icons

// core components
import img1 from './elec.jpg'
import img2 from './tailor.jpg'
import img3 from './plumb.jpg'
import img4 from './driver.jpg'
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";

import HeaderLinks from "../../components/Header/HeaderLinksC"
import Parallax from "../../components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/landingPage.js"




// Sections for this page
import HeaderHome from "../../components/Header/HeaderHome"
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import { Container, Grid, Paper, Typography } from "@material-ui/core";

import WorkSection from "./Contact";


const dashboardRoutes = [];
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="XsSupport"
        rightLinks={<HeaderHome />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={background}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <br/>
              <Typography variant="h4" className={classes.title}>Your Story Starts With Us.</Typography>
              <Typography variant="h6" className={classes.title}>
              XsSupport is a trusted marketplace for people and businesses to outsource their tasks, whether you are looking for work or you need someone to do a specific task we are here to help you hire. Skilled people can earn extra income through our website or mobile app.

Through Supertasker you have an ease of access to different individuals whom you find fit for the job.

                </Typography>
              <br />
              <Button
                color="success"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
            <GridItem xs={false} md={1}></GridItem> 
            <GridItem  md={7} >
             
                <Paper>
                  <div style={{paddingTop:'20px',paddingLeft:'20px',paddingRight:'20px'}}>
              <Carousel>
     <div>
         <img style={{width:'620px',maxHeight:'500px'}}
         src={img1}/>
     </div>
     <div>
         <img style={{width:'620px',maxHeight:'500px'}}
         src={img2}/>
     </div>
     <div>
         <img style={{width:'620px',maxHeight:'500px'}}
         src={img3}/>
     </div>
     <div>
         <img style={{width:'620px',maxHeight:'500px'}}
         src={img4}/>
     </div>
    
        </Carousel>
        </div>
        </Paper>

            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
