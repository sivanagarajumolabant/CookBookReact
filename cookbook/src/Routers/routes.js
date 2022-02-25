import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route, Router, Routes } from 'react-router-dom'

import SignIn from '../Auth/Login';
import SignUp from '../Auth/Signup';
import ClippedDrawer from '../Components/header';
import Home from '../Features/Home';
import AdminAccesslist from '../Features/Modules/AdminAccesslist';
import Request from '../Features/Modules/AccessRequest';
import CreateFeature from '../Features/Modules/CreateFeature';
import EditFeature from '../Features/Modules/EditFeature';
import PageNotFound from '../Features/NotFound';
import ProtectedRoute from './PrivateRoute';
import MenuAppBar from '../Components/header'
import PreviewCode from '../Features/Modules/PreviewCode';
import EmailVerify from '../Auth/EmailVerificationPage';
import AccessReview from '../Features/Modules/AccessReview';
import RequestFeatureData from '../Features/Modules/RequestFeatureData';
import ForgotPasword from '../Auth/forgotpassword';
import ResendEmail from '../Auth/resendemail';
import SuperadminFunction from '../Features/Modules/superadminpage';
import ResetPasword from '../Auth/ResetPassword';



const Routing = () => {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/register" component={SignUp} />
                <Route path="/emailverification" component={EmailVerify} />
                <Route path="/forgotpassword" component={ForgotPasword} />
                <Route path="/resendemail" component={ResendEmail} />
                <Route path="/resetpassword" component={ResetPasword} />
                {/* <Route path="*" component={PageNotFound} /> */}
                <MenuAppBar>
                    <ProtectedRoute path="/dashboard" component={Home} />
                    <ProtectedRoute exact path="/create" component={CreateFeature} />
                    <ProtectedRoute exact path="/PreviewCode" component={PreviewCode} />
                    <ProtectedRoute exact path="/EditFeature" component={EditFeature} />
                    <ProtectedRoute exact path="/accessreview" component={AccessReview} />
                    <ProtectedRoute exact path="/requestdata" component={RequestFeatureData} />

                    {/* <ProtectedRoute exact path="/edit/:id" component={EditFeature} /> */}
                    {/* <Route path="*" component={PageNotFound} /> */}
                    <ProtectedRoute path="/AdminAccesslist" component={AdminAccesslist} />
                    <ProtectedRoute path="/Request" component={Request} />
                    <ProtectedRoute path="/superadmin" component={SuperadminFunction} />
                </MenuAppBar>


            </Switch>

        </BrowserRouter>



    )
}

export default Routing