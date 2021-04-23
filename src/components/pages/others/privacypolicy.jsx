import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import Accordion from '../../features/accordion/accordion';
import Card from '../../features/accordion/card';

import { isIEBrowser } from '../../../utils';

function PRIVACYPOLICY() {
    return (
        <div className="main">
            <Helmet>
                <title>MobileHutStore - Privacy Policy</title>
            </Helmet>

            <h1 className="d-none">MobileHutStore - Privacy Policy Page</h1>

            <PageHeader title="Privacy Policy" subTitle="Page" />
            <Breadcrumb title="PrivacyPolicy" parent1={ [ "Pages", "pages/about" ] } />

            <div className="page-content">
                <div className="container">
                
                    <h2 className="title text-center mb-3">Privacy Policy</h2>

                    <Accordion adClass="accordion-rounded">
                        <Card title="How we ensure your privacy?" adClass="card-box card-sm bg-light">
                        <li>Welcome to the MobileHutStore.com. We respect your privacy and want to protect your personal information.This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.mobilehutstore.com.</li>
    <li>                     
HOW DO WE USE YOUR PERSONAL INFORMATION?<br></br>
We may collect various pieces of information if you seek to place an order for a product with us on the Site.We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:<br></br>
- Communicate with you;<br></br>
- Authenticate the order<br></br>
- To verify and carry out financial transactions in relation to payments you make<br></br>
- Send you information we think you may find useful or which you have requested from us<br></br>
</li>
<li>We may pass your name and address on to a third party in order to make delivery of the product to you . You must only submit to us the Site information which is accurate and not misleading and you must keep it up to date and inform us of changes.</li>

<li>Your actual order details may be stored with us but for security reasons cannot be retrieved directly by us. However, you may access this information by logging into your account on the Site. Here you can view the details of your orders that have been completed, those which are open and those which are shortly to be dispatched and administer your address details.</li>

<li>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</li>
<li>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</li>

<li>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</li>
  </Card>
                    </Accordion>
                </div>
            </div>

            <div className="cta cta-display bg-image pt-4 pb-4" style={ { backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/cta/bg-7.jpg)` } }>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-9 col-xl-7">
                            <div className={ `row no-gutters ${isIEBrowser() ? '' : 'flex-column'} flex-sm-row align-items-sm-center` } >
                                <div className="col">
                                    <h3 className="cta-title text-white">If You Have More Questions</h3>
                                    
                                </div>

                                <div className="col-auto">
                                    <Link to={ `${process.env.PUBLIC_URL}/pages/contact-2` } className="btn btn-outline-white"><span>CONTACT US</span><i className="icon-long-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo( PRIVACYPOLICY );