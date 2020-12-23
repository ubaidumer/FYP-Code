import React, { Component } from "react";
import { Route, BrowserRouter} from "react-router-dom";

import serviceproviderSignup from "./Component/common/serviceproviderSignup";
import customerSignup from "./Component/common/customerSignup";
import Login from "./Component/common/login";
import postatask from "./Component/customer/postATask";
import acceptRequest from "./Component/serviceprovider/AcceptRequest";
import workInProgress from "./Component/serviceprovider/workInProgress";
import acceptServiceProvider from "./Component/customer/acceptServiceProvider";
import orderHistory from "./Component/customer/OrderHistory";
import workHistory from "./Component/serviceprovider/workHistory";
import payment from "./Component/customer/payment";
import rating from "./Component/customer/rating";
import admindashboard from "./Component/admin/admindashboard";
import adminLogin from "./Component/common/adminlogin";
import HomeScreen from "./Component/common/HomeScreen";
import Footer from "./Component/common/Footer";

import NBSMap from "./Component/common/NearbyServices"
import FLMap from "./Component/common/FindLocationMap";
import customerDashboard from "./Component/customer/customerDashboard";
import viewServiceProvider from "./Component/customer/viewServiceProviders";
import SignIn from "./Component/common/SignIn";
import LoginPage from "./Component/admin/LoginPage";
import ProfilePage from "./Component/customer/ProfilePage";
import SProfilePage from "./Component/serviceprovider/ServiceProfile";
import PostedTask from "./Component/customer/postedTask";
import Stripecard from"./Component/customer/Stripecard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
              <Route path="/adminLogin" component={adminLogin}/>   

              <Route path="/stripecard" component={Stripecard}/>
              <Route path="/viewserviceprovider" component={viewServiceProvider}/>    
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
              <Route path="/admindashboard" component={admindashboard}/>
              <Route path="/postedtask" component={postedtask}/>
              <Route path="/activetask" component={activetask}/>
              <Route path="/acceptedtask" component={acceptedTasks}/>
              <Route path="/activeT" component={activeT}/>

              

              <Route path="/" exact={true} component={HomeScreen}/>
              </Elements>
              <Route path="/FindLocationMap" component={FLMap}/>
              <Route path="/NearbyServices" component={NBSMap}/>
            </BrowserRouter>
         
        </main>
    
      
    );
  }
}

export default App;
