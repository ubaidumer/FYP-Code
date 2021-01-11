import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import azeem from '../azeem.jpg'
import usman from '../usman.jpg'
import ubaid from '../ubaid.jpg'
import { Typography } from "@material-ui/core";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div style={{textAlign:'center'}}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img  style={{maxWidth:'150px',maxHeight:'150'}} src={azeem} alt="..." className={imageClasses} />
              </GridItem>
              <Typography className={classes.cardTitle}>
                Azeem Sultan
                <br />
                <small className={classes.smallTitle}>Founder</small>
              </Typography>
              <CardBody>
                <Typography className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </Typography>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <Instagram style={{color:'red'}}/>
                </Button>
                <Button
               
                  color="transparent"
                  className={classes.margin5}
                >
                     <Facebook style={{color:'blue'}}/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <Twitter style={{color:'skyblue'}}/>
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ubaid} style={{maxWidth:'150px',maxHeight:'150'}} alt="..." className={imageClasses} />
              </GridItem>
              <Typography className={classes.cardTitle}>
                Ubaid Lkhan
                <br />
                <small className={classes.smallTitle}>Developer</small>
              </Typography>
              <CardBody>
                <Typography className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </Typography>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <Instagram style={{color:'red'}}/>
                </Button>
                <Button
               
                  color="transparent"
                  className={classes.margin5}
                >
                     <Facebook style={{color:'blue'}}/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <Twitter style={{color:'skyblue'}}/>
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img  style={{width:'150px',height:'150px'}} src={usman} alt="..." className={imageClasses} />
              </GridItem>
              <Typography className={classes.cardTitle}>
                Usman Zafar
                <br />
                <small className={classes.smallTitle}>Database eNigger</small>
              </Typography>
              <CardBody>
                <Typography className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </Typography>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <Instagram style={{color:'red'}}/>
                </Button>
                <Button
               
                  color="transparent"
                  className={classes.margin5}
                >
                     <Facebook style={{color:'blue'}}/>
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <Twitter style={{color:'skyblue'}}/>
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
