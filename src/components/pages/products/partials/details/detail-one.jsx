import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { addToCart, toggleWishlist } from '../../../../../actions';

import { quantityInputs, isIEBrowser, isEdgeBrowser, findIndex } from '../../../../../utils';

function ProductDetailOne( props ) {
    const { product, isWishlist, type, addToCart, toggleWishlist } = props;
    const [ customProductDetail, setCustomProductDetail ] = useState( null );
    const [ selectedModel, setSelectedModel ] = useState('');
    const [ selectedColor, setSelectedColor ] = useState('');

    useEffect( () => {
        setCustomProductDetail(props.customProductDetail);
        setSelectedModel(props.customProductDetail.product_model[0].modelid_id);
        setSelectedColor(props.customProductDetail.product_colour[0].colour_name);
        quantityInputs();
    }, [] )

    const addToCartHandler = () => {
        customProductDetail["selected_model"] = selectedModel;
        customProductDetail["selected_colour"] = selectedColor;
        //if ( 0 !== product.stock )
            addToCart( customProductDetail, document.querySelector( "#qty" ).value );
    }
  

    return (
        <div>

            {
                customProductDetail?
                    <div>
                       
                        <div className={ "product-details" }>
                        
                            <h1 className="product-title">{ customProductDetail.product_name}</h1>

                            <div className="ratings-container">
                                <div className="ratings">

                                    <div className="ratings-val" style={ { width: customProductDetail.product_reviews  * 20 + '%'} }></div>
                                </div>
                                <Link className="ratings-text" to="#product-review-link" id="review-link">( { customProductDetail.review_count } Reviews )</Link>
                            </div>

                            { 0 === customProductDetail.stock ?
                                <div className="product-price">
                                    <span className="out-price">${ customProductDetail.price.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                                </div> :
                                
                                <div className="product-price">{ 
                                    moment(customProductDetail.saleprice_enddate).format("YYYY-MM-DD") >
                                    moment().format("YYYY-MM-DD")?
                                        <div>
                                           
                                            <span className="new-price"> Rs {customProductDetail.sale_price.toLocaleString
                                        ( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )}</span>
                                       <span className="intro-old-price">Rs {customProductDetail.product_price.toLocaleString
                                            ( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } )}</span>
                                        </div>
                                        :
                                        customProductDetail.product_price.toLocaleString
                                            ( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) 
                                    
                                    }
                                </div>
                            }

                            <div className="product-content">
                                <p> Some Content that Nabeel will put</p>
                            </div>

                            <div className="details-filter-row details-row-size">
                                <label>Color:</label>
                                <div className="details-filter-row product-nav product-nav-dots">
                                    { customProductDetail.product_colour.map( ( colour, i ) =>
                                        <button
                                            onClick={evt => setSelectedColor(evt.target.getAttribute("data-image"))}
                                            style={ { backgroundColor: colour.colour_name } }
                                            data-image={ colour.colour_name }
                                            // data-zoom-image={ vari.bigImages[ i ] }
                                            key={ customProductDetail.product_id + '-' + i }
                                        >
                                            {selectedColor === colour.colour_name?
                                                <i className="icon-check color-active"></i>
                                                :null
                                            }
                                        </button>
                                    
                                    ) }
                                </div>
                            </div> 

                            <div className="details-filter-row details-row-size">
                                <label htmlFor="qty">Qty:</label>
                                <div className="product-details-quantity">
                                    <input type="number" id="qty" className="form-control" defaultValue="1" min="1" max={ product.stock } step="1" data-decimals="0" required />
                                </div>
                            </div>

                            <div className="product-details-action">
                                { isIEBrowser() || isEdgeBrowser() ?
                                    <button className="btn-product btn-cart" onClick={ addToCartHandler } style={ { minHeight: "4rem" } }><span>add to cart</span></button>
                                    :
                                    <button className="btn-product btn-cart" onClick={ addToCartHandler }><span>add to cart</span></button>
                                }
                            </div>

                            <div className="product-details-footer">
                                <div className="col-md-6 col-xs-12">
                                    <div className="product-cat">
                                        <span>SKU:</span>
                                        <span>{customProductDetail.product_sku}</span>
                                    </div>
                                    <div className="product-cat">
                                        <span>Category: </span>
                                        <span className="mr-0 mb-1" style={ { whiteSpace: "pre" } }>
                                            { customProductDetail.product_category }
                                        </span>
                                    </div>

                                    
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <div className="product-cat">
                                        <span>Brand: </span>
                                        <span className="mr-0 mb-1" style={ { whiteSpace: "pre" } }>
                                            { customProductDetail.product_brand }
                                        </span>
                                    </div>
                                    <div className="product-cat">
                                        <span>Model:</span>

                                        <select className="select-model" onChange={evt => setSelectedModel(evt.target.value)} value={selectedModel}>
                                            { customProductDetail.product_model.map( ( model, index ) => (
                                                <option  key={ "detail_one_model" + index } value={model.modelid_id}>{model.model_name}</option>
                                            ) ) }
                                        </select>

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="social-icons social-icons-sm">
                                        <span className="social-label">Share:</span>
                                        <Link to="#" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></Link>
                                        <Link to="#" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter"></i></Link>
                                        <Link to="#" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram"></i></Link>
                                        <Link to="#" className="social-icon" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></Link>
                                    </div>
                                </div>
                            </div>

                            { props.children }
                        </div>
                    </div>
                : 
                null

            }
        </div>
        
    )
}

function mapStateToProps( state, props ) {
    return {
        product: state.data.products.filter( product => product.id === parseInt( props.id ) )[ 0 ],
        isWishlist: ( findIndex( state.wishlist.list, item => item.id === parseInt( props.id ) ) !== -1 ) ? true : false
    }
}

export default connect( mapStateToProps, { addToCart, toggleWishlist } )( ProductDetailOne );