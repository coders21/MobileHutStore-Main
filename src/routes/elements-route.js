import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/app';
import VideoBanners from '../components/pages/elements/video-banners';

export default function ElementsRoute() {
    return (
        <Switch>
            <Layout>
                
                <Route exact path={ `${process.env.PUBLIC_URL}/elements/video-banners` } component={ VideoBanners } />           
                <Route exact path={ `${process.env.PUBLIC_URL}/elements` } />
                {/* <ElementList /> */}
            </Layout>
        </Switch>
    );
}