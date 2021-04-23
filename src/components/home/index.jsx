import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-toastify';

// import Custom Components
import OwlCarousel from '../features/owl-carousel';
import QuickView from '../features/product/common/quickview';
import Service from '../features/service';
import NewsletterModal from '../features/modal/newsletter-modal';
import OrderconfirmModel from '../features/modal/order-confirm-model'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DealProduct from './deal-product';
import IntroSlide from './intro-slide';
import Banner from './banner';
import BannerSection from './banner-section';
import NewCollection from './new-collection';
import SaleCollection from './sale-collection';
import TrendingCollection from './trendy-collection';
import ProductCollection from './product-collection';

import { introSlider } from '../settings'

// import Utils
import { isIEBrowser } from '../../utils';
import data from '../../mock_data/data.json';
import style from './style.scss';

export default function HomePage() {

    const [homeData, setHomeData] = useState(null);
    
    useEffect( () => {
        //document.getElementById( "menu-home" ).classList.add( "active" );
        style.use();

        axios.get(`${process.env.REACT_APP_API_URL}HomePage/get_home_data/`)
        .then(response=>{
            setHomeData(response.data);
           
        })
        .catch(err=>{
            toast.error(err.message);
        });

        return ( () => {
            //document.getElementById( "menu-home" ).classList.remove( "active" );
            style.unuse();
        } )
    }, [] )

    

    

    return (
        <>
            <Helmet>
                <title>Mobile Hut Store</title>
            </Helmet>

            <h1 className="d-none">Mobile Hut Store - Mobile Acessories Store</h1>

            <div className="main home-page">
                <div className="intro-slider-container mb-5">
                    {homeData? 
                        <OwlCarousel adClass="intro-slider owl-theme owl-nav-inside owl-light" carouselOptions={ introSlider } >
                            {
                                homeData.carousel.map( ( item, index ) =>
                                    <IntroSlide data={ item } key={ index } />
                                )
                            }
                        </OwlCarousel>
                    :null}

                    <span className="slider-loader"></span>
                </div>

                <div className="mb-3"></div>
                
                {homeData?
                        homeData.sale?
                            <SaleCollection data={homeData.sale}/>
                        :
                            null
                    
                :null}

                <div className="mb-3"></div>
                
                {homeData? 
                    <BannerSection data={ homeData.three_banner } />
                :null}
                

                <div className="mb-3"></div>

                <div className="mb-6"></div>

                <div className="container">
                    <h2 className="title text-center mb-4">Explore Popular Brands</h2>
                    <div className="heading heading-flex mb-3">
                        <div className="heading-right">
                            <Link to={`${process.env.PUBLIC_URL}/shop/brands`} className="title-link">
                                See More 
                                <i class="icon-long-arrow-right"></i>
                            </Link>
                        </div>
                    </div>

                    {homeData? 
                    <div className="cat-blocks-container">
                        <div className="row">
                            {
                                homeData.brands.map( ( item, index ) =>
                                    <Banner data={ item } key={ index } />
                                )
                            }
                        </div>
                    </div>
                    :null}
                </div>
                <div className="mb-4"></div>
                
                {homeData?
                    <NewCollection data={ homeData.new_arrival_product }/>
                :null}
                

                {/* <div className="mb-6"></div>
                {homeData?
                    <div className="container">
                        <div className="cta cta-border mb-5" style={ { backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/home/bg-1.jpg)` } }>
                            <img src={ `${process.env.REACT_APP_API_URL}media/${homeData.one_banner[0].image}/` } alt="camera" className="cta-img" />
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="cta-content" style={ { display: !isIEBrowser() ? 'flex' : 'auto' } }>
                                        <div className="cta-text text-right text-white">
                                            <p>{homeData.one_banner[0].text}</p>
                                        </div>
                                        <Link to={homeData.one_banner[0].link } className="btn btn-primary btn-round"><span>Shop Now - ${homeData.one_banner[0].price}</span><i className="icon-long-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :null} */}

                {/* <div className="container">
                    <div className="heading text-center mb-3">
                        <h2 className="title">Deals & Outlet</h2>
                        <p className="title-desc">Today’s deal and more</p>
                    </div>

                    <div className="row">
                        { data.dealContents.map( ( item, index ) =>
                            <div className="col-lg-6 deal-col" key={ index }>
                                <DealProduct data={ item } />
                            </div>
                        ) }
                    </div>

                    <div className="more-container text-center mt-1 mb-5">
                        <Link to={ `${process.env.PUBLIC_URL}/shop/sidebar/list` } className="btn btn-outline-dark-2 btn-round btn-more">
                            <span>Shop more Outlet deals</span><i className="icon-long-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="container">
                    <hr className="mb-0" />

                    <Brand />
                </div> */}

                { 
                    homeData?
                        <TrendingCollection data={ homeData.trending_products}/>
                    :null
                }

            <div className="mb-6"></div>
               {homeData?<div className="container">
							<div className="col-12">
								<div className="banner banner-big">
									<Link to="#">
										<div className="lazy-overlay bg-3"></div>

										<LazyLoadImage
											alt="banner"
											height={ 470 }
											width={ 300 }
											src={ `${process.env.REACT_APP_API_URL}media/${homeData.one_banner[0].image}/` } 
											threshold={ 200 }
											effect="black-and-white"
										/>
									</Link>

									<div className="banner-content">
										<h3 className="banner-title text-white">Gaming</h3>
                                        <p>Find best gaming accessories</p>
										
										<Link to="#" className="btn btn-primary btn-rounded"><span>Click Here</span><i className="icon-long-arrow-right"></i></Link>
									</div>
								</div>
							</div>
				</div>:null}

                <div className="mb-5"></div>

                { 
                    homeData?
                        <ProductCollection data={ homeData.recommended_product}/>
                    :null
                }

                <div className="mb-4"></div>

                <div className="container">
                    <hr className="mb-0" />
                </div>

                <Service />

                <QuickView />

                <div className="cta bg-image bg-dark pt-4 pb-5 mb-0" style={ { backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/home/bg-5.jpg)` } }>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-10 col-md-8 col-lg-6">
                                <div className="cta-heading text-center">
                                    <h3 className="cta-title text-white">Find us on Social Media!</h3>
                                    </div>

                                <div className="social-icons justify-content-center">
                                    <a href="https://www.facebook.com/MOBILE1HUT" className="social-icon" target="_blank" title="Facebook"><i className="icon-facebook-f"></i></a>
                                    {/* <a href="https://www.instagram.com/mobilehutstore/" className="social-icon" target="_blank" title="Twitter"><i className="icon-twitter"></i></a> */}
                                    <a href="https://www.instagram.com/mobilehutstore/" className="social-icon" target="_blank" title="Instagram"><i className="icon-instagram"></i></a>
                                    <a href="https://www.youtube.com/channel/UCBILAY_VCfb-VBLRMAHr_Qg/videos" className="social-icon" target="_blank" title="Youtube"><i className="icon-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          
        </>
    )
}