import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home'
import Menu from './core/Menu'
import Dashboard from './user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute'
const Routes = () => {
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component = {Home} />
                    <Route path = '/signin' exact component={Signin}/>
                    <Route path = '/signup' exact component={Signup}/>
                    <PrivateRoute path = '/dashboard' exact component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Routes;