import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/Dashboard';
import AddCategory from './auction/AddCategory';
import ListProduct from './auction/ListProduct';
import ViewAuction from './auction/ViewAuction';
import LandPage from './core/LandPage';
import Auction from './core/Auction';

var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={Home} />
            <Route path="/auctions" exact component={LandPage} />
            <Route path="/auction/:auctionId" exact component={Auction} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/create/category" exact component={AddCategory} />
            <PrivateRoute path="/create/auction" exact component={ListProduct} />
            <PrivateRoute path="/ViewAuction" exact component={ViewAuction} />
        </Switch>
    </Router>,
    document.getElementById("root")
);
