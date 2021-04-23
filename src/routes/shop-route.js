import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/app';
import Sidebar from '../components/pages/shop/sidebar';
import Brands from '../components/pages/shop/brands';
import MyAccount from '../components/pages/shop/dashboard';
import Wishlist from '../components/pages/shop/wishlist';
import Cart from '../components/pages/shop/cart';
import Checkout from '../components/pages/shop/checkout';


export default function ShopRoute() {
    return (
        <Switch>
            <Layout>
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/` } component={ Sidebar } />

                <Route exact path={ `${process.env.PUBLIC_URL}/shop/brands` } component={ Brands } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/sidebar/:grid` } component={ Sidebar } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/dashboard` } component={ MyAccount } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/wishlist` } component={ Wishlist } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/cart` } component={ Cart } />
                <Route exact path={ `${process.env.PUBLIC_URL}/shop/checkout` } component={ Checkout } />
            </Layout>
        </Switch>
    );
}