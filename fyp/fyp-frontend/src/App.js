import React, { Component } from "react";
import { Route, BrowserRouter} from "react-router-dom";

import serviceproviderSignup from "./Component/common/serviceproviderSignup";
import customerSignup from "./Component/common/customerSignup";
import Login from "./Component/common/login";
import postatask from "./Component/customer/postATask";
import acceptRequest from "./Component/serviceprovider/acceptRequest";
import workInProgress from "./Component/serviceprovider/workInProgress";
import acceptServiceProvider from "./Component/customer/acceptServiceProvider";
import orderHistory from "./Component/customer/orderHistory";
import workHistory from "./Component/serviceprovider/workHistory";
import payment from "./Component/customer/payment";
import rating from "./Component/customer/rating";
import admindashboard from "./Component/admin/admindashboard";
import adminLogin from "./Component/common/adminlogin";

class App extends Component {
  renderComp() {}

  render() {
    return (
      
        <main className="Container">
        
            <BrowserRouter>
              <Route path="/adminLogin" component={adminLogin}/>         
              <Route path="/serviceproviderSignup" exact={true} component={serviceproviderSignup} />
              <Route path="/customerSignup" component={customerSignup} />
              <Route path="/login" component={Login}/>
              <Route path="/postatask" component={postatask}/>
              <Route path="/acceptRequest" component={acceptRequest}/>
              <Route path="/workInProgress" component={workInProgress}/>
              <Route path="/acceptServiceProvider" component={acceptServiceProvider}/>
              <Route path="/payment" component={payment}/>
              <Route path="/orderHistory" component={orderHistory}/>
              <Route path="/workHistory" component={workHistory}/>
              <Route path="/rating" component={rating}/>
              <Route path="/admindashboard" component={admindashboard}/>
              
            </BrowserRouter>
          
        </main>
      
    );
  }
}

export default App;
