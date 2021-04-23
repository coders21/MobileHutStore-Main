import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import imagesLoaded from 'imagesloaded';
import axios from 'axios';
import { toast } from 'react-toastify';

import ProductSix from '../product-six';
import QuickView from '../common/quickview';
import Pagination from '../../pagination';

import { addToCart, toggleWishlist, addToCompare, showQuickViewModal, filterSort } from '../../../../actions';
import { getVisibleProducts } from '../../../../services';

function ProductList( props ) {
    let { column, filterSort, products, filters, addToCart, toggleWishlist, addToCompare, showQuickViewModal } = props;

    const [ start, setStart ] = useState( 0 );
    const [ cols, setCols ] = useState( column );

    useEffect( () => {
        document.querySelector( '.skeleton-body.skel-shop-products' ).classList.remove( 'loaded' );
        document.querySelector( '.skeleton-body.skel-shop-sidebar' ).classList.remove( 'loaded' );

        let imgLoad = imagesLoaded( ".products", { background: true } );

        imgLoad.on( 'done', function ( instance, image ) {
            document.querySelector( '.skeleton-body.skel-shop-products' ).classList.add( 'loaded' );
            document.querySelector( '.skeleton-body.skel-shop-sidebar' ).classList.add( 'loaded' );
        } );

        setCols( column );
    }, [ cols, column ] )

    useEffect( () => {
        document.querySelector( '.skeleton-body.skel-shop-products' ).classList.remove( 'loaded' );

        let imgLoad = imagesLoaded( ".products", { background: true } );

        imgLoad.on( 'done', function ( instance, image ) {
            document.querySelector( '.skeleton-body.skel-shop-products' ).classList.add( 'loaded' );
        } );
    }, [ filters ] )

    function changePos( pos ) {
        setStart( pos );

        document.querySelector( '.skeleton-body.skel-shop-products' ) && document.querySelector( '.skeleton-body.skel-shop-products' ).classList.remove( 'loaded' );

        let imgLoad = imagesLoaded( ".products", { background: true } );

        imgLoad.on( 'done', function ( instance, image ) {
            document.querySelector( '.skeleton-body.skel-shop-products' ) && document.querySelector( '.skeleton-body.skel-shop-products' ).classList.add( 'loaded' );
        } );

        window.scrollTo( {
            top: 0
        } );
    }

    function changeFilter( e ) {
        filterSort( e.target.value );
        setStart( 0 );
    }

    const grid = { "2cols": "col-6", "3cols": "col-6 col-md-4 col-lg-4", "4cols": "col-6 col-md-4 col-lg-4 col-xl-3" };
    const units = { "list": 6, "2cols": 6, "3cols": 9, "4cols": 12 };
    const itemsPerPage = units[ cols ];

    

    let productsData = props.productsData;
   
    productsData = getVisibleProducts( productsData.slice( 0, 15 ), filters );


    return (
        <>
            <div className="toolbox">
                <div className="toolbox-left">
                    <div className="toolbox-info">
                        Showing  <span>{ Math.min( itemsPerPage, productsData.length - start ) } of { productsData.length }</span> Products
                    </div>
                </div>

                <div className="toolbox-right">
                    
                </div>
            </div>

            <div className="products mb-3">
                { 

                    <div className="row">
                        { productsData.slice( start, start + itemsPerPage ).map( ( item, index ) =>
                            <div className={ grid[ cols ] } key={ "product" + index }>
                                <div className="skel-pro">
                                </div>

                                <ProductSix
                                    product={ item }
                                    type="sidebar"
                                    onAddToCart={ addToCart }
                                    onToggleWishlist={ toggleWishlist }
                                    onAddToCompare={ addToCompare }
                                    showQuickView={ showQuickViewModal } />
                            </div>
                        ) }
                    </div>
                }
                <QuickView />
            </div>

            <Pagination
                aclass={ `${'list' === props.cols ? '' : 'justify-content-center'}` }
                count={ productsData.length }
                unit={ itemsPerPage }
                onChange={ changePos }
                cols={ cols }
                filters={ filters }
            />
        </>
    );
}

export const mapStateToProps = ( state ) => {
    return {
        filters: state.filters,
        products: state.data.products ? state.data.products : []
    };
}

export default connect( mapStateToProps, { addToCart, toggleWishlist, addToCompare, showQuickViewModal, filterSort } )( ProductList );