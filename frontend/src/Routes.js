import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
// Able to access the props 

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/Dashboard';
import Profile from './user/Profile';





const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Home} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/:userid" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;