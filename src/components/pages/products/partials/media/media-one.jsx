import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Magnifier } from "react-image-magnifiers";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { productGallery } from '../../../../../utils';

import { quantityInputs } from '../../../../../utils';

function MediaOne( props ) {
    const { product, adClass = "product-gallery-vertical" } = props;

    if ( !product ) {
        window.location = process.env.PUBLIC_URL + "pages/404";
    }

    const [ photoIndex, setPhotoIndex ] = useState( 0 );
    const [ isOpen, setStatus ] = useState( false );

    const bigImages = props.customProduct.lgPictures ? props.customProduct.lgPictures : props.customProduct.product_images;
    const smallImages = props.customProduct.smPictures ? props.customProduct.smPictures : props.customProduct.product_images;

    useEffect( () => {
        productGallery();
        quantityInputs();
    }, [] )

    function openLightBox() {
        let index = parseInt( document.querySelector( ".product-main-image" ).getAttribute( "index" ) );

        if ( !index ) {
            index = 0;
        }
        setStatus( true );
        setPhotoIndex( index );
    }

    function closeLightBox() {
        setStatus( false );
    }

    const setNextHandler = () => {
        setPhotoIndex( photoIndex => ( photoIndex + 1 ) % bigImages.length );
    }

    const setPrevHandler = () => {
        setPhotoIndex( photoIndex => ( photoIndex + bigImages.length - 1 ) % bigImages.length );
    }

    return (
        <>
            <div className={ `product-gallery ${adClass}` }>
                <div className="row m-0">
                    <figure className="product-main-image" index="0">
                        { props.customProduct.new ? <span className="product-label label-new">New</span> : '' }

                        { props.customProduct.top ? <span className="product-label label-top">Top</span> : '' }

                        { props.customProduct.discount ? <span className="product-label label-sale">{ props.customProduct.discount }% off</span> : '' }

                        { ( 0 === props.customProduct.stock ) ? <span className="product-label label-out">Out of Stock</span> : '' }

                        <Magnifier
                            imageSrc={process.env.REACT_APP_API_URL + 'media/' + props.customProduct.product_images[0].image + '/' }
                            imageAlt="Example"
                            largeImageSrc={ process.env.REACT_APP_API_URL + 'media/' +  bigImages[ 0 ].image + '/' } // Optional
                            dragToMove={ false }
                            mouseActivation="hover"
                            cursorStyleActive="crosshair"
                            id="product-zoom"
                        />

                        <button id="btn-product-gallery" className="btn-product-gallery" onClick={ openLightBox }>
                            <i className="icon-arrows"></i>
                        </button>
                    </figure>

                    <div id="product-zoom-gallery" className="product-image-gallery">
                        {
                            props.customProduct.product_images.map( ( item, index ) =>
                                <button className={ `product-gallery-item ${0 === index ? 'active' : ''}` } to="#" data-image={process.env.REACT_APP_API_URL +'media/' +item.image+ '/' } data-zoom-image={process.env.REACT_APP_API_URL +'media/' + bigImages[ index ].image +'/' } key={ props.customProduct.id + '-' + index }>
                                    <img src={process.env.REACT_APP_API_URL + 'media/' + smallImages[ index ].image + '/' } alt="product back" />
                                </button>
                            )
                        }
                    </div>

                </div>
            </div>

            {
                isOpen ?
                    <Lightbox
                        
                        mainSrc={ process.env.REACT_APP_API_URL + 'media/' +  bigImages[ photoIndex ].image + '/' }
                        nextSrc={ process.env.REACT_APP_API_URL + 'media/' +  bigImages[ ( photoIndex + 1 ) %  bigImages.length ].image + '/' }
                        prevSrc={ process.env.REACT_APP_API_URL + 'media/' +  bigImages[ ( photoIndex +  bigImages.length - 1 ) %  bigImages.length ].image + '/' }
                        
                        onCloseRequest={ closeLightBox }
                        onMovePrevRequest={ setNextHandler }
                        onMoveNextRequest={ setPrevHandler }
                    />
                    : ''
            }
        </>
    )
};

function mapStateToProps( state, props ) {
    return {
        product: state.data.products.filter( product => product.id === parseInt( props.id ) )[ 0 ]
    }
}

export default connect( mapStateToProps )( MediaOne );