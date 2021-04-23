import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import Accordion from '../../features/accordion/accordion';
import Card from '../../features/accordion/card';

import { isIEBrowser } from '../../../utils';

function RETURNPOLICY() {
    return (
        <div className="main">
            <Helmet>
                <title>MobileHutStore - Return Policy</title>
            </Helmet>

            <h1 className="d-none">MobileHutStore - Return Policy Page</h1>

            <PageHeader title="Return Policy" subTitle="Page" />
            <Breadcrumb title="ReturnPolicy" parent1={ [ "Pages", "pages/about" ] } />

            <div className="page-content">
                <div className="container">
                    <h2 className="title text-center mb-3">Shipping Information</h2>

                    <Accordion adClass="accordion-rounded">
                        <Card title="How will my parcel be delivered?" adClass="card-box card-sm bg-light">
                            MobileHutStore always looking forward to provide hassle free delivery to its customers, parcel will be delivered at the given address provided by the customers via courier, delivery time usually 3-5 working days.
                        </Card>

                        <Card title="Do I pay for delivery?" adClass="card-box card-sm bg-light">
                            Yes customer has to pay for delivery charges,but we are also providing free shipping in some products where customer doen't need to pay delivery charges for its order.We are also providing free delivery, if customers order payment is above 2000 Rs.
                            </Card>

                        <Card title="My item has become faulty" adClass="card-box card-sm bg-light"  >
                           MobileHutStore take every step to satisfy its customers, in this case you can claim return or exchange, for further details you can contact us or email us.
                           </Card>
                    </Accordion>

                    <h2 className="title text-center mb-3">Orders and Returns</h2>

                    <Accordion adClass="accordion-rounded">
                        <Card title="How can I return an item?" adClass="card-box card-sm bg-light">
                           You can easily return your item, for return email us at mobilehutstore1@gmail.com share your order id and order details OR you can contact us at 03092226336.
                           </Card>
                           <Card title="What are the conditions of return?" adClass="card-box card-sm bg-light">
                           <li>The customer is responsible for all return shipping charges unless the item received is incorrect or damaged of course</li>
                           <li>Product can be returned within 7 days after delivery</li>
                           <li>The Product must be unused, unwashed and should not be broken.</li>
                           <li>If a product is returned to us in an inadequate condition so we reserved the right to send it back to you.
                           </li>
                           <li>The product must be return in the original packaging/box</li>
                           <li>Donot put tape or sticker on the manufacturers box</li>
                           <dl>
                           <dt>The product must include</dt>
                           <dd>- User Manual</dd>
                           <dd>- Warranty Cards</dd>
                           <dd>- Freebies and accessories</dd> 
                           </dl>
                          
                           </Card>
                    </Accordion>

                    <h2 className="title text-center mb-3">Payments</h2>

                    <Accordion adClass="accordion-rounded">
                        <Card title="Cash on delivery" adClass="card-box card-sm bg-light">
Pay for your online shopping in Pakistan and online deals with cash in a more easy way. To enjoy this payment option, simply select the “Cash on Delivery” option when you buy from mobilehutstore.
Our Customer Support Representative might ask you to submit a certain  </Card>
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

export default React.memo( RETURNPOLICY );