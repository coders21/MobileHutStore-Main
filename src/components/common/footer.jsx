import React from 'react';
import { Link } from 'react-router-dom';

function Footer( props ) {
    const { logo = "assets/images/logo.png", container = "container" } = props;

    return (
        <footer className="footer">
            <div className="footer-middle">
                <div className={ container }>
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="widget widget-about">
                                <img src={ process.env.PUBLIC_URL + '/' + logo } className="footer-logo" alt="Footer Logo" width="150" height="25" />
                                <p>Deals in every kind of tech accessories. Order us online and package will be delivered at your doorstep.</p>

                                <div className="widget-call">
                                    <i className="icon-phone"></i>
                                    Got Question? Call/whatsapp us 24/7
                                    +92 3092226336
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">Help</h4>

                                <ul className="widget-list">
                                    <li><Link to={ `${process.env.PUBLIC_URL}/elements/video-banners` }>How to order</Link></li>
                                    <li><Link to={ `${process.env.PUBLIC_URL}/pages/about` }>About us</Link></li>
                                    <li><Link to={ `${process.env.PUBLIC_URL}/pages/contact-2` }>Contact us</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">Customer Service</h4>

                                <ul className="widget-list">
                                    <li><Link to={ `${process.env.PUBLIC_URL}/pages/returnpolicy` }>Return Policy</Link></li>
                                    <li><Link to={ `${process.env.PUBLIC_URL}/pages/privacypolicy` }>Privacy Policy</Link></li>
                                    <li><Link to={ `${process.env.PUBLIC_URL}/pages/termsandconditions` } >Terms and Conditions</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="widget">
                                <h4 className="widget-title">My Account</h4>

                                <ul className="widget-list">
                                    <li><Link to="#">Sign In</Link></li>
                                    <li><Link to={ `${process.env.PUBLIC_URL}/shop/cart` }>View Cart</Link></li>
                                    <li><Link to={ `${process.env.PUBLIC_URL}/shop/dashboard` }>Track My Order</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className={ container }>
                    <p className="footer-copyright">Copyright © { ( new Date() ).getFullYear() } Mobile Hut Store. All Rights Reserved.</p>
                    <figure className="footer-payments">
                        <img src={ `${process.env.PUBLIC_URL}/assets/images/payments.png` } alt="Payment methods" width="272" height="20" />
                    </figure>
                </div>
            </div>
        </footer>
    );
}

export default React.memo( Footer );