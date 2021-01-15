import React, { Component } from "react";
import { Route, BrowserRouter} from "react-router-dom";


import reset from "./Component/common/Resetpassword";

import w from "./Component/common/Sections/WorkSection";


import NBSMap from "./Component/common/NearbyServices"
import FLMap from "./Component/common/FindLocationMap";


import SignIn from "./Component/common/SignIn";
import LoginPage from "./Component/admin/LoginPage";
import ProfilePage from "./Component/customer/ProfilePage";
import SProfilePage from "./Component/serviceprovider/ServiceProfile";

import Stripecard from"./Component/customer/Stripecard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Home from "./Component/common/Home";
import Dashboard from "./Component/admin/Dashboard";
const stripePromise = loadStripe("pk_test_51I1Ax7HfaNOMnRYn508ySaI0Fj8tz765xbYQjCAIyRMfsVnv6GvgsdZDzIvaJtgVkqnhSKopZmpUFot8j3tsvW5x00TvBKng7u");




class App extends Component {
  renderComp() {}

  render() {
    return (
      
        <main className="Container">
   
            <BrowserRouter>
            <Elements stripe={stripePromise}>
               <Route path="/adminSignin" component={LoginPage} />
               <Route path="/profile" component={ProfilePage}/>   
               <Route path="/sprofile" component={SProfilePage}/>     
              <Route path="/stripecard" component={Stripecard}/>
             <Route path="/home" component={Home}/>
               
  
              <Route path="/login" component={SignIn}/>
              
              <Route path="/resetpassword" component={reset}/>
              <Route path="/workwithus" component={w}/>
      
              <Route path="/" exact={true} component={Home}/>
              </Elements>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/FindLocationMap" component={FLMap}/>
              <Route path="/NearbyServices" component={NBSMap}/>
            </BrowserRouter>
         
        </main>
    
      
    );
  }
}

export default App;