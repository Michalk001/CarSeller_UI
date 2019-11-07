import { store } from "./store";
import { Provider } from "react-redux";

import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';


import Login from "./Component/Account/Login"
import Register from "./Component/Account/Register"
import UserAdvert from './Component/Account/UserAdvert'
import RequireAuth from './Component/RequireAuth'
import Settings from './Component/Account/Settings'
import Header from './Header'
import Footer from './Footer'
import AdminDashboard from './Component/Admin/AdminDashboard'
import AdminCar from './Component/Admin/AdminCar'
import AdminEquipment from "./Component/Admin/AdminEquipment";
import AdvertMain from "./Component/Advert/AdvertMain";
import AdvertList from "./Component/Advert/AdvertList";
import Offer from "./Component/Advert/Offer";
import Editor from './Component/Advert/Editor'
import EditorOffer from "./Component/Account/EditorOffer";

import AddOffer from './Component/Editor/AddOffer';
import UpdateOffer from "./Component/Editor/UpdateOffer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }
  setIsLogin = (isLogin) => {
    this.setState({
      isLogin
    })
  }
  render() {

    return (

      <BrowserRouter>


        <Header isLoginR={this.state.isLogin} />
        <div className="user">

          <div className="user-fix">
            <Switch>

              <Route exact path="/" component={AdvertMain} />

              <Route path="/account/login"
                render={props => <Login props={props} setIsLogin={this.setIsLogin} />} />
              <Route path="/account/Register" component={Register} />
              <Route path="/account/Setting" component={RequireAuth(Settings)} />
              <Route path="/account/page/:id" component={RequireAuth(UserAdvert)} />
              <Route path="/account/Offer/Edit/:id" component={RequireAuth(UpdateOffer)} />
              <Route path="/account/" component={RequireAuth(UserAdvert)} />

              <Route path="/advert/:id/:page" component={AdvertList} />
              <Route path="/advert/:id/" component={AdvertList} />
              <Route path="/advert/" component={AdvertMain} />

              <Route path="/offer/:id" component={Offer} />
              <Route path="/offer/" component={Offer} />
              <Route path="/AdvertAdd" component={AddOffer} />

              <Route path="/admin/Car" component={AdminCar} />
              <Route path="/admin/Equipment" component={AdminEquipment} />
              <Route path="/admin/" component={AdminDashboard} />

            </Switch>

          </div>
          <Footer />
        </div>

      </BrowserRouter>
    );
  }
}
export default App;
//<Route path="/advert/:id" component={AdvertOne} />

export const AppContainer = App;