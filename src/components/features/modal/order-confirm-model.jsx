import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { isIEBrowser } from '../../../utils';
import { removeNewsletterMdoal } from '../../../actions';

const customStyles = {
    content: {
        top: '50%',
        transform: 'translateY(-50%)'
    },
    overlay: {
        backgroundColor: 'rgba(51,51,51,0.6)',
        zIndex: '10000'
    }
};

Modal.setAppElement( '#root' );

function NewsletterModal( props ) {
    const { newsletter, removeNewsletterMdoal } = props;
    const [ open, setOpen ] = useState( false );
    let timer, closeType;

    useEffect( () => {
        timer = setTimeout( () => {
            if ( newsletter ) {
                setOpen( true );
            }
        }, 1000 );

        return () => {
            if ( timer ) {
                clearTimeout( timer );
            }
        }
    }, [] )

    function changeCloseType() {
        if ( document.querySelector( "input[type='checkbox']" ).checked === true ) {
            closeType = "forever";
        } else {
            closeType = "once";
        }
    }

    function closeModal( e ) {
        if ( closeType === "forever" ) {
            removeNewsletterMdoal();
        }

        props.onSwitchRedirect();  

        setOpen( false );

        document.getElementById( "newsletter-popup-form" ).classList.remove( "ReactModal__Content--after-open" );
    }

    return (
        <Modal
            isOpen={ open }
            onRequestClose={ closeModal }
            style={ customStyles }
            shouldFocusAfterRender={ false }
            contentLabel="Newsletter Modal"
            className="container newsletter-popup-container"
            id="newsletter-popup-form"
        >
            <div className="row justify-content-center">
                <div className="">
                    <div className="row no-gutters bg-white newsletter-popup-content">
                        <div className=" banner-content-wrap">

                            <div className="banner-content text-center">

                                <img src={ `${process.env.PUBLIC_URL}/assets/images/popup/orderconfirm/logo.png` } alt="logo" className="logo" width="60" height="15" />
                                <h2 className="banner-title"><span>order<span style={ { fontWeight: '400' } }></span></span> is confirmed</h2>
                                <p>Thank you for your purchase from mobilehutstore. Please let us know if we can do anything else to help!</p>

                                <button  className="btn btn-outline-primary-2" onClick={ closeModal }> <span>Continue Shopping</span></button>

                            </div>

                        </div>

                        {/* <div className="col-xl-2-5col col-lg-5 ">
                           
                        </div> */}
                       
                    </div>
                   
                </div>
               
            </div>
            
        </Modal>
    );
}

function mapStateToProps( state ) {
    return {
        newsletter: state.modal.newsletterModal
    }
}

export default connect( mapStateToProps, { removeNewsletterMdoal } )( NewsletterModal );