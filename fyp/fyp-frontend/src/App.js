import React, { Component } from "react";
import { Route, BrowserRouter} from "react-router-dom";

import serviceproviderSignup from "./Component/common/serviceproviderSignup";
import customerSignup from "./Component/common/customerSignup";
import reset from "./Component/common/Resetpassword";
import Login from "./Component/common/login";
import postatask from "./Component/customer/postATask";
import acceptRequest from "./Component/serviceprovider/AcceptRequest";
import workInProgress from "./Component/serviceprovider/workInProgress";
import acceptServiceProvider from "./Component/customer/acceptServiceProvider";
import orderHistory from "./Component/customer/OrderHistory";
import workHistory from "./Component/serviceprovider/workHistory";
import payment from "./Component/customer/payment";
import rating from "./Component/customer/rating";
import w from "./Component/common/Sections/WorkSection";
import adminLogin from "./Component/common/adminlogin";
import HomeScreen from "./Component/common/HomeScreen";
import Footer from "./Component/common/Footer";

import NBSMap from "./Component/common/NearbyServices"
import FLMap from "./Component/common/FindLocationMap";
import customerDashboard from "./Component/customer/customerDashboard";

import SignIn from "./Component/common/SignIn";
import LoginPage from "./Component/admin/LoginPage";
import ProfilePage from "./Component/customer/ProfilePage";
import SProfilePage from "./Component/serviceprovider/ServiceProfile";
import PostedTask from "./Component/customer/postedTask";
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
              <Route path="/customerdashboard" component={customerDashboard}/>      
              <Route path="/serviceproviderSignup" exact={true} component={serviceproviderSignup} />
              <Route path="/customerSignup" component={customerSignup} />
              <Route path="/login" component={SignIn}/>
              <Route path="/postatask" component={postatask}/>
              <Route path="/acceptRequest" component={acceptRequest}/>
              <Route path="/workInProgress" component={workInProgress}/>
              <Route path="/acceptServiceProvider" component={acceptServiceProvider}/>
              <Route path="/payment" component={payment}/>
              <Route path="/orderHistory" component={orderHistory}/>
              <Route path="/postedTask" component={PostedTask}/>
              <Route path="/workHistory" component={workHistory}/>
              <Route path="/rating" component={rating}/>
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