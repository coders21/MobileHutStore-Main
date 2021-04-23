import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartCount, getCartTotal } from '../../../services';
import { removeFromCart } from '../../../actions';
import { safeContent } from '../../../utils';
import moment from 'moment';

function CartMenu( props ) {
    const { cartlist, removeFromCart } = props;
    let total = getCartTotal( cartlist );
    

    return (
        <div className="dropdown cart-dropdown">
            <Link to={ `${process.env.PUBLIC_URL}/shop/cart` } className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                <div className="icon">
                    <i className="icon-shopping-cart"></i>
                    <span className="cart-count">{ getCartCount( cartlist ) }</span>
                </div>

                <p>Cart</p>
            </Link>

            <div className={ `dropdown-menu dropdown-menu-right ${cartlist.length === 0 ? 'text-center' : ''}` } >
                {
                    
                    0 === cartlist.length ?
                        <p>No products in the cart.</p> :
                        <>
                            <div className="dropdown-cart-products">
                                { cartlist.map( ( item, index ) => 
                                {
                                    return(
                                        <div className="product" key={ index }>
                                            <div className="product-cart-details">
                                                <h4 className="product-title">
                                                    <Link to={ `${process.env.PUBLIC_URL}/product/default/7` } dangerouslySetInnerHTML={ safeContent( item.product_name ) }></Link>
                                                </h4>

                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">{ item.qty }</span>
                                                    x Rs.{ (moment(item.saleprice_enddate).format("YYYY-MM-DD") >
                                                            moment().format("YYYY-MM-DD"))?
                                                                item.sale_price.toLocaleString
                                                                ( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) 
                                                            : item.product_price.toLocaleString
                                                                ( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) 
                                                        }
                                                </span>
                                            </div>

                                            <figure className="product-image-container">
                                                <Link to={ `${process.env.PUBLIC_URL}/product/default/7` } className="product-image">
                                                    <img src={process.env.REACT_APP_API_URL + 'media/' + item.product_images[ 0 ].image + '/' } data-oi={ process.env.REACT_APP_API_URL + 'media/' + item.product_images[ 0 ].image + '/' } alt="product" />
                                                </Link>
                                            </figure>
                                            <button className="btn-remove" title="Remove Product" onClick={ () => removeFromCart( item.product_id ) }><i className="icon-close"></i></button>
                                        </div>
                                    )
                                } ) }
                            </div>
                            <div className="dropdown-cart-total">
                                <span>Total</span>

                                <span className="cart-total-price">Rs.{ total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</span>
                            </div>

                            <div className="dropdown-cart-action">
                                <Link to={ `${process.env.PUBLIC_URL}/shop/cart` } className="btn btn-primary">View Cart</Link>
                                <Link to={ `${process.env.PUBLIC_URL}/shop/checkout` } className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></Link>
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

function mapStateToProps( state ) {
    return {
        cartlist: state.cartlist.cart ? state.cartlist.cart : []
    }
}

export default connect( mapStateToProps, { removeFromCart } )( CartMenu );