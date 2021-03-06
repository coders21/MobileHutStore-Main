import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '../features/owl-carousel';
import ProductNine from '../features/product/product-nine';
import { productSlider2 } from '../settings';

import { getTopSellingProducts, getSaleProducts, getFeaturedProducts } from '../../services';
import { addToCart, toggleWishlist, addToCompare, showQuickViewModal } from '../../actions';

function TrendingCollection( props ) {
    const { addToCart, toggleWishlist, addToCompare, showQuickViewModal } = props;

    let data = props.data;
    //products = getFeaturedProducts( products.slice( 35, 50 ) );

    return (
        <div className="bg-light pt-5 pb-6">
            <div className="container trending-products">
                <Tabs selectedTabClassName="show" defaultIndex={ 0 }>
                    <div className="heading heading-flex mb-3">
                        <div className="heading-left">
                            <h2 className="title">Top Rated Products</h2>
                        </div>
                        <div className="heading-right">
                            <Link to={`${process.env.PUBLIC_URL}/shop?type=trending_product`} className="title-link">
                                See More 
                                <i class="icon-long-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-5col d-none d-xl-block">
                            <div className="banner banner-trendy">
                                <Link to={ `${process.env.PUBLIC_URL}/shop/sidebar/list` }>
                                    <div className="lazy-overlay bg-3"></div>

                                    <LazyLoadImage
                                        src={ `${process.env.PUBLIC_URL}/assets/images/home/banners/rated.jpg` }
                                        alt="banner"
                                        width={ 100 }
                                        height={ 370 }
                                        effect="blur"
                                        threshold={ 300 }
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-4-5col">
                            <div className="tab-content tab-content-carousel just-action-icons-sm">
                                <TabPanel>
                                    <OwlCarousel adClass="owl-full carousel-equal-height carousel-with-shadow" carouselOptions={ productSlider2 } >
                                        { data.map( ( item, index ) =>
                                            <ProductNine product={ item }
                                                key={ index }
                                                onAddToCart={ addToCart }
                                                onToggleWishlist={ toggleWishlist }
                                                onAddToCompare={ addToCompare }
                                                showQuickView={ showQuickViewModal } />
                                        ) }
                                    </OwlCarousel>
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

const mapStateToProps = ( state, props ) => {
    return {
        products: state.data.products ? state.data.products : []
    }
}

export default connect(
    mapStateToProps, { addToCart, toggleWishlist, addToCompare, showQuickViewModal }
)( TrendingCollection );
