import React from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OwlCarousel from '../features/owl-carousel';
import ProductNine from '../features/product/product-nine';
import { productSlider2 } from '../settings';
import { Link } from 'react-router-dom';
import { getProductsByCategory, getNewProducts } from '../../services';
import { addToCart, toggleWishlist, addToCompare, showQuickViewModal } from '../../actions';

import data from '../../mock_data/data.json';

function NewCollection( props ) {
    const { addToCart, toggleWishlist, addToCompare, showQuickViewModal } = props;

    let data = props.data;
    //products = getNewProducts( products.slice( 35, 50 ) );

    return (
        <div className="container new-arrivals">
            <Tabs selectedTabClassName="show" className="just-action-icons-sm">
                <div className="heading heading-flex mb-3">
                    <div className="heading-left">
                        <h2 className="title">New Arrivals</h2>
                    </div>
                    <div className="heading-right">
                        <Link to={`${process.env.PUBLIC_URL}/shop?type=new_arrival`} className="title-link">
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
                                        src={ `${process.env.PUBLIC_URL}/assets/images/home/banners/banner-4.jpg` }
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
                {
                    data.map( ( item, index ) =>
                        <TabPanel key={ `${item.id}-tab-product` }>
                            <OwlCarousel adClass="owl-full carousel-equal-height carousel-with-shadow" carouselOptions={ productSlider2 } >
                                { data.map( ( item, index ) =>
                                    <ProductNine product={ item }
                                        key={ "new" + index }
                                        onAddToCart={ addToCart }
                                        onToggleWishlist={ toggleWishlist }
                                        onAddToCompare={ addToCompare }
                                        showQuickView={ showQuickViewModal } />
                                ) }
                            </OwlCarousel>
                        </TabPanel>
                    )
                }
                </div>
                </div>
            </Tabs>
        </div>
    )
}

function mapStateToProps( state, props ) {
    return {
        products: state.data.products ? state.data.products : []
    }
}

export default connect(
    mapStateToProps, { addToCart, toggleWishlist, addToCompare, showQuickViewModal }
)( NewCollection );
