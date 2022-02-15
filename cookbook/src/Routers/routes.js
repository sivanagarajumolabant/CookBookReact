import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route, Router, Routes } from 'react-router-dom'

import SignIn from '../Auth/Login';
import SignUp from '../Auth/Signup';
import ClippedDrawer from '../Components/header';
import Home from '../Features/Home';
import AdminAccesslist from '../Features/Modules/AdminAccesslist';
import CreateFeature from '../Features/Modules/CreateFeature';
import EditFeature from '../Features/Modules/EditFeature';
import PageNotFound from '../Features/NotFound';
import ProtectedRoute from './PrivateRoute';



const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route  path="/register" component={SignUp} />
                <ProtectedRoute  path="/dashboard" component={Home} />
                {/* <ProtectedRoute exact path="/create" component={CreateFeature} /> */}
                {/* <ProtectedRoute exact path="/edit/:id" component={EditFeature} /> */}
                {/* <Route path="*" component={PageNotFound} /> */}
                <ProtectedRoute path="/AdminAccesslist" component={AdminAccesslist} />
                

            </Switch>

        </BrowserRouter>



    )
}

export default Routing