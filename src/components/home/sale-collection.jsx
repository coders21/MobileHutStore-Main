import React from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import Countdown from 'react-countdown';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OwlCarousel from '../features/owl-carousel';
import ProductNine from '../features/product/product-nine';
import { productSlider2 } from '../settings';
import { rendererOne } from '../features/count-down';
import { Link } from 'react-router-dom';
import { getProductsByCategory, getNewProducts } from '../../services';
import { addToCart, toggleWishlist, addToCompare, showQuickViewModal } from '../../actions';

import data from '../../mock_data/data.json';

function SaleCollection( props ) {
    const { addToCart, toggleWishlist, addToCompare, showQuickViewModal } = props;

    let data = props.data;
    //products = getNewProducts( products.slice( 35, 50 ) );

    return (
        <div className="container sale-arrivals">
            <Tabs selectedTabClassName="show" className="just-action-icons-sm">
            
                {data? 
                    <h2 className="title text-center">{data.salename}</h2>
                :null}
                
                <div className="heading heading-flex mb-3">
                    
                    <div className="heading-left">
                        <div className="count-down-timer">
                            {data? 
                                <div className="deal-countdown offer-countdown">
                                    <Countdown date={ Date.parse(data.enddate) } renderer={ rendererOne } />
                                </div>
                            :null}
                            
                        </div>
                        
                    </div>
                    <div className="heading-right">
                        <Link to={`${process.env.PUBLIC_URL}/shop?type=sale`} className="title-link">
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
                                    src={ `${process.env.PUBLIC_URL}/assets/images/home/banners/sale.jpg` }
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
                        data.product.map( ( item, index ) =>
                            <TabPanel key={ `${item.id}-tab-product` }>
                                <OwlCarousel adClass="owl-full carousel-equal-height carousel-with-shadow" carouselOptions={ productSlider2 } >
                                    { data.product.map( ( item, index ) =>{
                                        return(<ProductNine product={ item }
                                            key={ "new" + index }
                                            onAddToCart={ addToCart }
                                            onToggleWishlist={ toggleWishlist }
                                            onAddToCompare={ addToCompare }
                                            showQuickView={ showQuickViewModal } />)}
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
)( SaleCollection );
