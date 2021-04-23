import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';

import { findIndex } from '../../../utils';
import { showModal } from '../../../actions';

import CartModal from '../../features/modal/cart-modal'

function ProductNine( props ) {
    const { product, isWishlist, onAddToCart, onToggleWishlist, showQuickView, type = 1 } = props;
    const [selectedCartProduct, setSelectedCartProduct] = useState('')

    const quickViewHandler = () => {
        showQuickView( product.product_id );
    }

    const addToCartHandler = (e) => {
       
        if ((product.product_model).length > 1 || (product.product_colour).length > 1) {
            localStorage.setItem("cartProduct", JSON.stringify(product));
            setSelectedCartProduct(product)
            props.showModal( 'cart' );
            e.preventDefault();
        }
        else{

            product["selected_model"] = product.product_model[0].modelid_id;
            product["selected_colour"] = product.product_colour[0].colour_name;
            if ( 0 !== product.stock ){
                onAddToCart( product, 1 );
            }
        }    
    
    }

    const resetSelectedCartProduct = () => {
        setSelectedCartProduct('');
    }


    return (
        product ?
            <div className="product product-2">
                <figure className="product-media">
                    { product.discount ? <span className="product-label label-circle label-sale">Sale</span> : '' }
                    { ( 0 === product.stock ) ? <span className="product-label label-circle label-out">Out</span> : '' }

                    <Link to={ `${process.env.PUBLIC_URL}/product/default/${product.product_id}` }>
                        <LazyLoadImage
                            alt="product"
                            src={ `${process.env.REACT_APP_API_URL}media/${product.product_images[ 0 ].image}/` }
                            threshold={ 200 }
                        />
                        {/* UNCOMMENT WHEN WILL GET IMAGES */}
                        { product.product_images[ 1 ] ?
                            <LazyLoadImage
                                alt="product"
                                src={ `${process.env.REACT_APP_API_URL}media/${product.product_images[ 1 ].image}/` }
                                threshold={ 200 }
                                wrapperClassName="product-image-hover product-image"
                            />
                            : ''
                        }
                    </Link>

                    {/* <div className="product-action-vertical">
                        <button
                            className={ `btn-product-icon btn-wishlist ${isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'}` }
                            onClick={ wishlistHandler }
                            title={ isWishlist ? "Go to wishlist" : "Add to wishlist" }
                        >
                            <span>{ isWishlist ? "go to wishlist" : "add to wishlist" }</span>
                        </button>
                    </div> */}

                    <div className="product-action product-action-dark">
                        <button className="btn-product btn-cart" onClick={ addToCartHandler }>
                            {
                                type === 1 ?
                                    <span>add to cart</span>
                                    : ""
                            }
                        </button>

                        <button className="btn-product btn-quickview" title="Quick view" onClick={ quickViewHandler }>
                            {
                                type === 1 ?
                                    <span>quick view</span>
                                    : ""
                            }
                        </button>
                    </div>
                </figure>

                <div className="product-body">
                    {product.category_name?
                    <div className="product-cat">
                        {/* { product.category_name.map( ( cat, index ) => (
                            <span key={ `cat_${index}` } className="mr-0">
                                <Link to="#">{ cat }</Link>
                                { index < product.category_name.length - 1 ? ', ' : '' }
                            </span>
                        ) ) } */}
                        <span key={ `cat_${product.category_name}` } className="mr-0">
                                <Link to="#">{ product.category_name }</Link> 
                        </span>
                    </div>
                    :null}

                    <h3 className="product-title">
                        <Link to={ `${process.env.PUBLIC_URL}/product/default/27` } >{ product.product_name.slice(0,30) + '...' }</Link>
                    </h3>

                    {
                        0 === product.stock ?
                            <div className="product-price">
                                <span className="out-price">Rs.{ product.product_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                            </div> :

                            0 < product.sale_price && moment(product.saleprice_enddate).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD") ?
                                <div className="product-price">
                                    <span className="intro-old-price">Rs.{ product.product_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                    <span className="new-price">Rs.{ product.sale_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                </div> :

                                <div className="product-price">Rs.{ product.product_price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</div>
                    }

                    <div className="ratings-container">
                        <div className="ratings">
                            <div className="ratings-val" style={ { width: product.product_reviews * 20 + '%' } }></div>
                        </div>
                        <span className="ratings-text">({ product.review_count } Reviews )</span>
                    </div>

                    {
                        product.variants ?
                            product.variants[ 0 ].model ?
                                <div className="product-nav product-nav-thumbs">
                                    { product.variants.map( ( vari, i ) =>
                                        <Link to="#" key={ `vari_${i}` } className={ 0 === i ? 'active' : '' }>
                                            <img src={ process.env.PUBLIC_URL + '/' + vari.model } alt="product desc" />
                                        </Link>
                                    ) }
                                </div>
                                :
                                <div className="product-nav product-nav-dots">
                                    { product.variants.map( ( vari, i ) =>
                                        <Link to="#" key={ `vari_${i}` } className={ 0 === i ? 'active' : '' } style={ { background: vari.color } }>
                                        </Link>
                                    ) }
                                </div>
                            : ''
                    }
                </div>
                {
                    selectedCartProduct?
                        <CartModal product={selectedCartProduct} resetSelectedCartProduct={resetSelectedCartProduct}/>
                    :
                    null
                }
                
            </div> : ''
    );
}

function mapStateToProps( state, ownprops ) {
    return {
        isWishlist: ( findIndex( state.wishlist.list, item => item.id === ownprops.product.id ) !== -1 ) ? true : false
    };
}

export default connect( mapStateToProps, { showModal } )( ProductNine );