import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
// Able to access the props 

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/Dashboard';
import Profile from './user/Profile';
import AddCategory from './auction/AddCategory';
import ListProduct from './auction/ListProduct';
import ViewAuction from './auction/ViewAuction';
import LandPage from './core/LandPage';
import Auction from './core/Auction';





const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Home} />
                <Route path="/auctions" exact component={LandPage} />
                <Route path="/auction/:auctionId" exact component={Auction} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/:userid" exact component={Profile} />
                <PrivateRoute path="/create/category" exact component={AddCategory} />
                <PrivateRoute path="/create/auction" exact component={ListProduct} />
                <PrivateRoute path="/ViewAuction" exact component={ViewAuction} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;