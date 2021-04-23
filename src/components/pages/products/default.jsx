import React, { useEffect, useState } from 'react';
import imagesLoaded from 'imagesloaded';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';

import MediaOne from './partials/media/media-one';
import ProductDetailOne from './partials/details/detail-one';
import DescOne from './partials/description/desc-one';
import RelatedProducts from './partials/related-products';
import StickyBar from './partials/sticky-bar';

import Breadcrumb from '../../common/breadcrumb';
import QuickView from '../../features/product/common/quickview';

import { productGallery } from '../../../utils';

function SingleProduct( props ) {
    let productId = props.match.params.id;
    const [ customProductDetail, setCustomProductDetail ] = useState( null );

    useEffect( () => {
        productGallery();

        document.querySelector( '.skel-pro-single' ).classList.remove( 'loaded' );

        let imgLoad = imagesLoaded( ".product-main-image", { background: true } );

        imgLoad.on( 'done', function ( instance, image ) {
            document.querySelector( '.skel-pro-single' ).classList.add( 'loaded' );
        } );
    }, [ productId ] )

    useEffect( () => {
        axios.get(`${process.env.REACT_APP_API_URL}Products/get_specific_product/${productId}/`)
        .then(response=>{
            response.data["product_id"] = productId;
            setCustomProductDetail(response.data);
            
        })
        .catch(err=>{
            toast.error(err.message);
            window.location = process.env.PUBLIC_URL + "pages/404";
        });
    }, [] )

    return (
        <>
            <Helmet>
                <title>Mobile Hut Store | Product Default</title>
            </Helmet>

            <h1 className="d-none">Mobile Hut Store - Product Default</h1>
            <div className="main">
                <Breadcrumb
                    title="Default"
                    // type="product"
                    adClass="breadcrumb-nav border-0 mb-0"
                    productId={ productId }
                    parent1={ [ "Products", "product" ] }
                />

                <div className="page-content">
                    <div className="container">
                        <div className="product-details-top skeleton-body">
                            <div className="row skel-pro-single">
                                <div className="col-md-6">
                                    <div className="skel-product-gallery">
                                    </div>
                                    {
                                        customProductDetail?
                                        <MediaOne id={ productId } customProduct={customProductDetail}/>
                                    :
                                            null
                                    
                                    }
                                </div>

                                <div className="col-md-6">
                                    <div className="entry-summary row">
                                        <div className="col-md-12">
                                            <div className="entry-summary1"></div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="entry-summary2"></div>
                                        </div>
                                    </div>

                                    {
                                        customProductDetail?
                                            <ProductDetailOne id={ productId } customProductDetail={customProductDetail} />
                                        :
                                            null
                                    
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            customProductDetail?
                                <DescOne id={ productId } customProductDetail={customProductDetail} />
                            :
                                null
                                    
                        }

                        {/* <h2 className="title text-center mb-4">You May Also Like</h2>

                        <RelatedProducts /> */}
                    </div>
                </div>

                {/* <StickyBar id={ productId } /> */}

                <QuickView />
            </div>
        </>
    )
}

export default SingleProduct;