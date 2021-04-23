import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import Accordion from '../../features/accordion/accordion';
import Card from '../../features/accordion/card';
import axios from 'axios'
import { getCartTotal } from '../../../services';
import moment from "moment"
import OrderconfirmModel from '../../features/modal/order-confirm-model'
function Checkout( props ) {
    const { cartlist, total } = props;
    const [switchval, setswitch] = useState(false)
    const shippingPrice = { "standard": 150, "express": 300 };
    const shippingObj = { "standard": "Standard", "express": "Express" };
    const [username,setUsername] = useState('')
    const [email,setEmail]= useState('')
    const [city,setCity] = useState('')
    const [province,setProvince]= useState('')
    const [address,setAddress]=useState('')
    const [phonenumber,setNumber] = useState('')
    const [id,setId]=useState('')
    const [createAcc,setAcc]=useState('')
    const [confirmOrder,setConfirm] = useState(false)

    useEffect( () => {

        let userid=localStorage.getItem('id')
        
        if (userid){
            axios.get(`${process.env.REACT_APP_API_URL}AuthApp/manage_user/`+userid+'/')
            .then(res=>{
                setUsername(res.data.username)
                setEmail(res.data.email)
                setCity(res.data.city)
                setAddress(res.data.address)
                setNumber(res.data.number)
                setId(res.data.id)
            })
        }

        let item = document.querySelector( "#checkout-discount-input" );

        var opactiyEffect = function ( e ) {
            e.currentTarget.parentNode.querySelector( "label" ).setAttribute( "style", "opacity: 0" );
        }

        var blurEffect = function ( e ) {
            let $this = e.currentTarget;
            if ( $this.length !== 0 ) {
                $this.parentNode.querySelector( "label" ).setAttribute( "style", "opacity: 0" );
            } else {
                $this.parentNode.querySelector( "label" ).setAttribute( "style", "opacity: 1" );
            }
        }

        item.addEventListener( "focus", opactiyEffect );

        item.addEventListener( "blur", blurEffect )

        return () => {
            item.removeEventListener( "focus", opactiyEffect );

            item.removeEventListener( "blur", blurEffect );
        }
    }, [] )

    const processOrder = (e) =>{

        e.preventDefault()

        let payload = null
       
        if (createAcc){

            payload={
                "email":email,
                "username":username,
                "address":address,
                "city":city,
                "province":province,
                "phonenumber":phonenumber,
                "password":"123"
            }

            axios.post(`${process.env.REACT_APP_API_URL}AuthApp/create_user/`,payload)
            .then(res=>{

               payload={
                "order_date":moment().format("YYYY-MM-DD"),
                "order_status": "pending",
                "user":res.data.id
               }

               CreateOrder(payload)
            })
            .catch(err=>{
                  
            if (err.response.data.email){
                alert(err.response.data.email)
            }

            if (err.response.data.username){
                alert(err.response.data.username)
            }
            })

        }
        else{
            if (localStorage.getItem('id')!==null){

                    payload={
                        "email":email,
                        "username":username,
                        "address":address,
                        "city":city,
                        "province":province,
                        "phonenumber":phonenumber,
                    }
                    axios.put(`${process.env.REACT_APP_API_URL}AuthApp/manage_user/`+localStorage.getItem('id')+'/',payload)
                    .then(res=>{

                            payload={
                                "order_date":moment().format("YYYY-MM-DD"),
                                "order_status": "pending",
                                "user":res.data.id
                            }

                            CreateOrder(payload)
                    })
            }
            else {
                    payload={
                        "order_date":moment().format("YYYY-MM-DD"),
                        "order_status":"pending",
                        "customeremail":email,
                        "customername":username,
                        "customeraddress":address,
                        "customercity":city,
                        "customerprovince":province,
                        "customerphonenumber":phonenumber,
                    }
                    CreateOrder(payload)
            }

           
        }
    }

    const CreateOrder=(payload)=>{
        
        axios.post(`${process.env.REACT_APP_API_URL}Orders/create_order/`,payload)
        .then(res=>{
            
            for (let i=0;i<cartlist.length;i++){
                payload={
                    "product":cartlist[i].product_id,
                    "order":res.data.id,
                    "quantity":cartlist[i].qty,
                    "colour":cartlist[i].selected_colour,
                    "modelP":cartlist[i].selected_model
                }

                axios.post(`${process.env.REACT_APP_API_URL}Orders/create_porder/`,payload)
                .then(res=>{
                
                })
                .catch(err=>{
                    
                })
            }

             setConfirm(true)

           

        })
        .catch(err=>{
            
        })
    }

    const handleredirect = () => {
        setswitch(true)
    }

    if (switchval){
        setswitch(false)
        window.location.replace('/')
    }

   
  
    return (
        <>
            <Helmet>
                <title>MobileHutStore | Checkout</title>
            </Helmet>

            <h1 className="d-none">MobileHutStore - Checkout</h1>

            <div className="main">

                <PageHeader title="Checkout" subTitle="Shop" />
                <Breadcrumb title="Checkout" parent1={ [ "Shop", "shop/sidebar/list" ] } />

                <div className="page-content">
                    <div className="checkout">
                        <div className="container">
                            <div className="checkout-discount">
                                <form action="#">
                                    <input type="text" className="form-control" required id="checkout-discount-input" />
                                    <label htmlFor="checkout-discount-input" className="text-truncate">Have a coupon? <span>Click here to enter your code</span></label>
                                </form>
                            </div>

                            <form onSubmit={processOrder}>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <h2 className="checkout-title">Billing Details</h2>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Username *</label>
                                                <input type="text" className="form-control"  value={username} onChange={e => setUsername(e.target.value)} required />
                                            </div>

                                            <div className="col-sm-6">
                                                <label>email *</label>
                                                <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                                            </div>
                                        </div>

                                        <label>PhoneNumber*</label>
                                        <input type="text" className="form-control" value={phonenumber} onChange={e => setNumber(e.target.value)} required/>

                                        <label>City *</label>
                                        <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} required />

                                        <label>Province *</label>
                                        <input type="text" className="form-control" value={province} onChange={e => setProvince(e.target.value)} required />

                                        <label>address *</label>
                                        <input type="text" className="form-control" placeholder="House number,block and Street name" value={address} onChange={e => setAddress(e.target.value)} required />
                                        
                                        {localStorage.getItem('id')==null?
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" value={createAcc} onChange={e => setAcc(e.target.checked)} id="checkout-create-acc" />
                                            <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                                        </div>:null}

                                       </div>

                                    <aside className="col-lg-3">
                                        <div className="summary">
                                            <h3 className="summary-title">Your Order</h3>

                                            <table className="table table-summary">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    { cartlist.map( ( item, index ) =>
                                                        <tr key={ index }>
                                                            <td><Link to="#">{ item.product_name }</Link></td>
                                                            <td>Rs.{ item.sum.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                        </tr>
                                                    ) }
                                                    <tr className="summary-subtotal">
                                                        <td>Subtotal:</td>
                                                        <td>Rs.{ total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Shipping:</td>
                                                        {parseInt(total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),10)+1<=2000?<td>standard</td>:<td>Free</td>}
                                                        {/* <td>{ shippingObj[ props.shipping ] }</td> */}
                                                    </tr>
                                                    <tr className="summary-total">
                                                        <td>Total:</td>
                                                        {parseInt(total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),10)+1<=2000?<td>Rs.{total+120}</td>:<td>{total.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>}
                                                        {/* <td>Rs.{ ( total + shippingPrice[ props.shipping ] ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</td> */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {/* type="checkout" when you need to use checkbox put in accordian*/}
                                            {/* <Accordion > */}
                                                {/* <Card title="Direct bank transfer" expanded={ true }>
                                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                                </Card>

                                                <Card title="Check payments">
                                                    Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                                                </Card> */}

                                                <p >
                                                   Cash on Delivery.
                                                </p>

                                                {/* <Card title='PayPal'>
                                                    <small className="float-right paypal-link">What is PayPal?</small>
                                                    Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                                </Card>

                                                <Card title='Credit Card (Stripe)'>
                                                    <img src={ `${process.env.PUBLIC_URL}/assets/images/payments-summary.png` } alt="payments cards" />
                                                    Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.
                                                </Card> */}
                                            {/* </Accordion> */}

                                            <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
                                                <span>Place Order</span>
                                               
                                            </button>
                                        </div>
                                    </aside>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {confirmOrder?<OrderconfirmModel onSwitchRedirect={handleredirect} demo="4" />:null}
        </>
    )
}

export const mapStateToProps = ( state ) => ( {
    cartlist: state.cartlist.cart,
    total: getCartTotal( state.cartlist.cart ),
    shipping: state.cartlist.shipping
} )

export default connect( mapStateToProps )( Checkout );