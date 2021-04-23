import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';

import _data from '../../../mock_data/data.json';

function AboutOne() {
    useEffect( () => {
        document.querySelector( ".footer-middle" ) && document.querySelector( ".footer-middle" ).classList.add( "border-0" );
    }, [] )

    return (
        <div className="main">
            <Helmet>
                <title>MobileHutStore - About Us</title>
            </Helmet>

            <h1 className="d-none">MobileHutStore - About Us</h1>

            <Breadcrumb title="About Us" parent1={ [ "Pages", "pages/about" ] } adClass="border-0 mb-0" />

            <div className="container">
                <div className="page-header page-header-big text-center" style={ { backgroundImage: `url('assets/images/about-header-bg.jpg')` } }>
                    </div>
            </div>

            <div className="page-content pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <h2 className="title">Our Vision</h2>
                            <p>To provide an easy retail shopping experience to our customers, gather our two passions: product quality and reasonable rates.</p>
                        </div>

                        <div className="col-lg-6">
                            <h2 className="title">Our Mission</h2>
                            <p>With the experience of 7 years of offline operations our aim is to become number one ecommerce platform supplying best accessories in pakistan, attract every customer who wants to purchase accessory for mobile,ipad,tablet,camera,gaming etc enriched in good quality.</p>
                        </div>
                    </div>

                    <div className="mb-5"></div>
                </div>

                {/* <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 mb-3 mb-lg-0">
                                <h2 className="title">Who We Are</h2>
                                <p className="lead text-primary mb-3">Pellentesque odio nisi, euismod pharetra a ultricies <br />in diam. Sed arcu. Cras consequat</p>
                                <p className="mb-2">Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue. </p>
                            </div>

                            <div className="col-lg-6 offset-lg-1">
                                <div className="about-images">
                                    <img src={ `${process.env.PUBLIC_URL}/assets/images/about/img-1.jpg` } alt="" className="about-img-front" />
                                    <img src={ `${process.env.PUBLIC_URL}/assets/images/about/img-2.jpg` } alt="" className="about-img-back" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default React.memo( AboutOne );