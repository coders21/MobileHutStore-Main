import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/app';
import Default from '../components/pages/products/default';



export default function ProductsRoute() {
    return (
        <Switch>
            <Layout>
                <Route exact path={ `${process.env.PUBLIC_URL}/product/default/:id` } component={ Default } />
            </Layout>
        </Switch>
    );
}