import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { closeModal, addToCart } from '../../../actions';

import style from '../../home/style.scss';

const customStyles = {
    content: {
        top: '50%',
        transform: 'translateY(-50%)'
    },
    overlay: {
        backgroundColor: 'rgba(77,77,77,0.6)',
        zIndex: '10000'
    }
};


Modal.setAppElement( '#root' );

function CartModal( props ) {
    const { showModal, modal, product, addToCart } = props;
    const [selectedModel,setSelectedModel] = useState('');
    const [selectedColor,setSelectedColor] = useState('');
    
    let timer;

    
    function closeModal() {
    
        document.getElementById( "cart-modal" ).classList.remove( "ReactModal__Content--after-open" );

        timer = setTimeout( () => {
            props.closeModal( 'cart' );
            setSelectedModel('');
            setSelectedColor('');
            props.resetSelectedCartProduct('');
        
        }, 200);

        
    }

    function addToCartHandler() {

        if(!selectedColor || !selectedModel){
            toast.error('Please Select Model and Color First!');
            return;
        }

        product["selected_model"] = selectedModel;
        product["selected_colour"] = selectedColor;
        //if ( customProductDetail.stock > 0 ) {
            addToCart( product, 1 );
            closeModal();
            
        //}
    }


    useEffect( () => {
        style.use();
        if((product.product_colour).length === 1){
            setSelectedColor(product.product_colour[0].colour_name);
        }

        if((product.product_model).length === 1){
            setSelectedModel(product.product_model[0].modelid_id);
        }
    
        return () => {
            if ( timer ) clearTimeout( timer );
        }
    } )

    

    return (
        
        <Modal
            isOpen={ showModal && 'cart' === modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="Cart Modal"
            className="modal-dialog modal-dialog-centered"
            id="cart-modal" >
            <div className="modal-content">
                <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ closeModal }>
                        <span aria-hidden="true"><i className="icon-close"></i></span>
                    </button>
                    <div className="form-box">
                        <h5>
                            Please Select The Follwoing
                        </h5>
                        <div className="row">
                            {
                                product.product_model && (product.product_model).length > 0 ?
                                <div className="col-md-6">
                                    <span className="mb-1">Model</span>
                                                
                                    <select className="select-model" style={{width: "100%"}}
                                        onChange={evt => setSelectedModel(evt.target.value)} value={selectedModel}>
                                        <option  key={ "quick_model" + 0 } value={''}></option>
                                        { product.product_model.map( ( model, index ) => (
                                            <option  key={ "quick_model" + index } value={model.modelid_id}>{model.model_name}</option>
                                        ) ) }
                                    </select>
                                </div>
                                :
                                    null
                            }

                            {
                                product.product_colour && (product.product_colour).length > 0 ?
                                <div className="col-md-6">
                                    <span className="mb-1">Color</span>
                                    <div className="details-filter-row product-nav product-nav-dots">           
                                        { product.product_colour.map( ( colour, i ) =>
                                                <button
                                                    onClick={evt => setSelectedColor(evt.target.getAttribute("data-image"))}
                                                    style={ { backgroundColor: colour.colour_name } }
                                                    data-image={ colour.colour_name }
                                                    // data-zoom-image={ vari.bigImages[ i ] }
                                                    key={ product.product_id + '-' + i }
                                                >
                                                    {selectedColor === colour.colour_name?
                                                        <i className="icon-check color-active"></i>
                                                        :null
                                                    }
                                                </button>
                                            
                                        ) }
                                    </div>
                                </div>
                                :
                                    null
                            }
                        </div>
                        <div style={{marginTop:"20px", textAlign: "right"}}>
                            <button onClick={addToCartHandler} className="btn btn-outline-primary-2">
                                <span>ADD TO CART</span>
                                <i className="icon-long-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

function mapStateToProps( state ) {
    return {
        showModal: state.modal.showModal,
        modal: state.modal.modal
    }
}

export default connect( mapStateToProps, { closeModal, addToCart } )( CartModal );