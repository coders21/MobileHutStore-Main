import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/app';
import AboutOne from '../components/pages/others/about-1';
import ContactTwo from '../components/pages/others/contact-2';
import RETURNPolicy from '../components/pages/others/returnpolicy'
import PRIVACYPolicy from '../components/pages/others/privacypolicy'
import TC from '../components/pages/others/TermsConditions'
import ForgotPassword from '../components/pages/others/PasswordReset';
import ResetEmail from '../components/pages/others/PasswordResetEmail'
import ErrorPage from '../components/pages/others/404';

export default function OthersRoute() {
    return (
        <Switch>

            <Layout>
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/about` } component={ AboutOne } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/contact-2` } component={ ContactTwo } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/reset-email` } component={ ResetEmail } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/password/reset/confirm/:uid/:token` } component={ ForgotPassword } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/404` } component={ ErrorPage } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/returnpolicy` } component={ RETURNPolicy } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/privacypolicy` } component={ PRIVACYPolicy } />
                <Route exact path={ `${process.env.PUBLIC_URL}/pages/termsandconditions` } component={ TC } />
            </Layout>
        </Switch>
    );
}