import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import moment from 'moment';

import { rendererOne } from '../count-down';

import { findIndex } from '../../../utils';

function ProductSix( props ) {
    const { product, type = "product", isWishlist, onAddToCart, showQuickView, onToggleWishlist, onAddToCompare } = props;

    const addToCartHandler = () => {
        if ( 0 !== product.stock )
            onAddToCart( product, 1 );
    }

    const quickViewHandler = () => {
        showQuickView( product.product_id );
    }

    function toTop() {
        window.scroll( {
            top: 0
        } )
    }

    return (
        product ?
            <div className={ `product product-5 text-center ${0 === product.stock ? 'product-disabled' : ''}` }>
                <figure className="product-media">
                { product.discount ? <span className="product-label label-circle label-sale">Sale</span> : '' }
                    { ( 0 === product.stock ) ? <span className="product-label label-circle label-out">Out</span> : '' }

                    <Link to={ `${process.env.PUBLIC_URL}/product/default/${product.product_id}` } onClick={ toTop }>
                        <img
                            alt="product"
                            src={ `${process.env.REACT_APP_API_URL}media/${product.product_images[ 0 ].image}/` }
                        />

                        { product.product_images[ 1 ] ?
                            <span className="product-image-hover product-image">
                                <img
                                    alt="product"
                                    src={ `${process.env.REACT_APP_API_URL}media/${product.product_images[ 1 ].image}/` }
                                />
                            </span>
                            : ''
                        }
                    </Link>

                    { type !== "sidebar" && 0 < product.discount ? <div className="product-countdown countdown-primary"><Countdown date={ `2021-02-01T01:02:03` } renderer={ rendererOne } /></div> : '' }

                    <div className="product-action-vertical">
                        {/* <button
                            className={ `btn-product-icon btn-wishlist ${isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'}` }
                            onClick={ wishlistHandler }
                            title={ isWishlist ? "Go to wishlist" : "Add to wishlist" }
                        >
                            <span>{ isWishlist ? "go to wishlist" : "add to wishlist" }</span>
                        </button> */}

                        <button className="btn-product-icon btn-quickview" title="Quick view" onClick={ quickViewHandler }>
                            <span>Quick view</span>
                        </button>
                        {/* 
                        <button className="btn-product-icon btn-compare" title="Compare" onClick={ addToCompareHandler }>
                            <span>Compare</span>
                        </button> */}
                    </div>

                    <div className="product-action">
                        <button className="btn-product btn-cart" onClick={ addToCartHandler }>
                            <span>add to cart</span>
                        </button>
                    </div>
                </figure>

                <div className="product-body product-action-inner">
                    <h3 className="product-title">
                        <Link to={ `${process.env.PUBLIC_URL}/product/default/7` } >{ product.product_name.slice(0,20) + '...' }</Link>
                    </h3>

                    {
                        0 === product.stock ?
                            <div className="product-price">
                                <span className="out-price">Rs.{ product.product_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                            </div> :
                                
                            0 <  product.sale_price && moment(product.saleprice_enddate).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD") ?
                                <div className="product-price">
                                    <span className="intro-old-price">Rs.{ product.product_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                    <span className="new-price">Rs.{ product.sale_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                    <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style={ { width: product.product_reviews  * 20 + '%'} }></div>
                                    </div>
                                <div className="ratings-text" to="#product-review-link" id="review-link">( { product.review_count }  )</div>
                            </div>
                                </div> :
                                <div className="product-price">
                                    <span>Rs.{ product.product_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                    <div className="ratings-container">
                                    <div className="ratings">
                                        <div className="ratings-val" style={ { width: product.product_reviews  * 20 + '%'} }></div>
                                        </div>
                                    <Link className="ratings-text" to="#product-review-link" id="review-link">( { product.review_count }  )</Link>
                                    </div>
                                </div>
                    }
                </div>
            </div> : ''
    );
}

export const mapStateToProps = ( state, ownprops ) => {
    return {
        isWishlist: ( findIndex( state.wishlist.list, item => item.id === ownprops.product.id ) !== -1 ) ? true : false
    };
}

export default connect( mapStateToProps )( ProductSix );