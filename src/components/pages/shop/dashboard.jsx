import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios'
// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import './order-style.css'
import { toast } from 'react-toastify';
import getStoredState from 'redux-persist/es/getStoredState';
import { connect } from 'react-redux';
import {showModal} from '../../../actions'
import LoginModal from '../../features/modal/login-modal'

function DashBoard(props) {

    const [orderData, setOrderData] = useState([]);
    const [addressData, setAddressData] = useState({});
    const [accountData, setAccountData] = useState({})
    const [address, setAddress] = useState("")
    const [city,setCity]=useState("")
    const [username,setUsername]=useState("")
    const [province,setProvince]=useState("")
    const [email,setEmail]=useState('')
    const [accid,setID]=useState('')
    const [phonenumber,setNumber]=useState('')
    const [cpassword,setCPass]=useState('')
    const [npassword,setNPass]=useState('')
    const [cppassword,setCPPass]=useState('')
    const [afterlogout,setLogout]=useState(false)
    const [reload,setReload]=useState(false)
    useEffect( () => {

     getAccountData()
     
    }, [] )
   
    const getAccountData = ()=>{

        if (localStorage.getItem('email')){
            setEmail(localStorage.getItem('email'))
            setID(localStorage.getItem('id'))

            let payload={
                "email":localStorage.getItem('email')
            }
            
            axios.post(`${process.env.REACT_APP_API_URL}AuthApp/account_detail/`,payload)
            .then(response=>{

                setOrderData(response.data.order);
                setAddressData(response.data.address);
                setAccountData(response.data.account)
                setAddress(response.data.address.address)
                setNumber(response.data.address.phonenumber)
                setCity(response.data.address.city)
                setProvince(response.data.address.province)
                setUsername(response.data.account.name)
                setEmail(response.data.account.email)
                setID(response.data.account.id)
                
            })
            .catch(err=>{
                toast.error(err.message);
            });

            return ( () => {
                //document.getElementById( "menu-home" ).classList.remove( "active" );
                
            } )
    }
    }


    function openLoginModal( e ) {
        e.preventDefault();
        props.showModal( 'login' );
        setReload(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let flag=false
    
        let payload={
            "email":email,
            "username":username,
            "phonenumber":phonenumber,
            "address":address,
            "province":province,
            "city":city
        }

        
        axios.put(`${process.env.REACT_APP_API_URL}AuthApp/manage_user/`+accid+'/',payload)
        .then(response=>{

            setAddress(response.data.address)
            setCity(response.data.city)
            setProvince(response.data.province)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setID(response.data.id)
            setNumber(response.data.phonenumber)
            alert("user data Updated!")
            if (npassword.length==0 && cpassword.length==0 && cppassword==0){
            window.location.reload()
            }
        })
        .catch(err=>{
            if (err.response.data.email){
                alert(err.response.data.email)
            }
            else if (err.response.data.username){
                alert(err.response.data.username)
            }
        })

        if (npassword.length>0 || cpassword.length>0){

            if (npassword!==cppassword){
                alert("new password mismatches with confirm password")
            }
            else if (npassword=="" || cpassword=="" || cppassword=="")
            {
                alert("Please fill all password fields!")
            }
            else{

                payload={
                    "email":email,
                    "old_password":cpassword,
                    "new_password":npassword
                }

                axios.put(`${process.env.REACT_APP_API_URL}AuthApp/change_password/`,payload)
                .then(res=>{
                    alert ("password updated!")
                    setCPPass('')
                    setCPPass('')
                    setNPass('')
                    window.location.reload()
                })
                .catch(err=>{
                    if (err.response.data.old_password){
                        alert(err.response.data.old_password)
                    }
                })
            }
        }

      
    }

    const logout = (e) =>{
        e.preventDefault()
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        setLogout(true)
    }

    if (afterlogout){
        window.location.replace('/')
    }

    if (reload){
        getAccountData()
    }


    return (
        
        <>
       
            <Helmet>
                <title>MobileHutStore | My Account</title>
            </Helmet>

            <h1 className="d-none">MobileHutstore - My Account</h1>

            <div className="main">
                <PageHeader title="My Account" subTitle="Shop" />
                <Breadcrumb title="My Account" parent1={ [ "Shop", "shop/sidebar/list" ] } adClass="mb-3" />

                <div className="page-content">
                    <div className="dashboard">
                        <div className="container">
                            <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                                <Tabs selectedTabClassName="active show">
                                    <div className="row">
                                        <aside className="col-md-4 col-lg-3">
                                            <TabList>
                                                <Tab className="nav-item">
                                                    <span className="nav-link">Dashboard</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Orders</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Addresses</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <span className="nav-link">Account Details</span>
                                                </Tab>

                                                <Tab className="nav-item">
                                                    <Link onClick={logout} to="" className="nav-link">Sign Out</Link>
                                                </Tab>
                                            </TabList>
                                        </aside>

                                        <div className="col-md-8 col-lg-9" style={ { marginTop: "1rem" } }>
                                            <div className="tab-pane">
                                                <TabPanel>
                                                    {email.length>0?<div>
                                                    <p>Hello <span className="font-weight-normal text-dark">{email}</span>
                                                    <br />
                                                        From your account dashboard you can view your recent orders, manage your shipping  and edit your password and account details.</p></div>:<p>You have to <Link to="" onClick={ openLoginModal }> Login </Link> to check your account details</p>}
                                                </TabPanel>

                                                <TabPanel>
                                                <div className="order-container">
                                                    <header class="order-card-header"> My Orders / Tracking </header>
                                                       {
                                                           orderData.map((item,index)=>{
                                                               return(
                                                               <div>
                                                            <article className="order-card">
                                                                    <div className="order-card-body">
                                                                            <h6>Order Number: {item.ordernumber}</h6>
                                                                            <div class="card-body row">
                                                                                        <div className="col"> <strong>Order date:</strong> <br></br>{item.orderdate} </div>
                                                                                        <div className="col"> <strong>Updated date:</strong> <br></br>{item.updateddate} </div>
                                                                                        <div className="col"> <strong>Status:</strong> <br></br> {item.orderstatus} </div>
                                                                                        <div className="col"> <strong>Tracking #:</strong> <br></br>{item.ordertracking} </div>
                                                                                        <div className="col"> <strong>Shipping Provider:</strong> <br></br>{item.shippingprovider} </div>
                                                                            </div>
                                                                    </div>
                                                                
                                                                <h6>Product Details</h6>
                                                                {item.product.map((pitem,index)=>{
                                                                    return(
                                                                        <div>
                                                                            <article >
                                                                                <div className="order-card-body">
                                                                                        
                                                                                        <div className="card-body row">
                                                                                                    <div className="col"> <strong>Product Name:</strong> <br></br>{pitem.name.slice(0,10) + '...'} </div>
                                                                                                    <div className="col"> <strong>Product Colour:</strong> <br></br>{pitem.colour} </div>
                                                                                                    <div className="col"> <strong>Product Model:</strong> <br></br> {pitem.model} </div>
                                                                                                    <div className="col"> <strong>Product quantity #:</strong> <br></br>{pitem.quantity} </div>
                                                                                        </div>
                                                                                </div>
                                                                            </article>
                                                                             
                                                                        </div>
                                                                    )
                                                                })}

                                                            </article>
                                                               

                                                               </div>)
                                                           })}
                                                           
                                                         
                                                </div>
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop/siebar/list` } className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></Link>
                                                </TabPanel>

                                                 <TabPanel>
                                                    <p>The following addresses will be used on the checkout page by default.</p>
                                            
                                                    {addressData?<div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="card card-dashboard">
                                                                <div className="card-body">
                                                                    <h3 className="card-title">Shipping Address</h3>

                                                                    <p>{accountData.name}<br />
                                                                        
                                                                        {addressData.address}<br />
                                                                        {addressData.city}<br />
                                                                        {addressData.province}<br />
                                                                        {addressData.phonenumber}<br />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>:null}
                                                </TabPanel>

                                                <TabPanel>
                                                    {addressData?
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <label>Username</label>
                                                                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label>Email</label>
                                                                <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                                                            </div>
                                                        </div>

                                                        <label>Phonenumber</label>
                                                        <input type="text" className="form-control" value={phonenumber} 
                                                        name="phonenumber" onChange={e => setNumber(e.target.value)} />

                                                        <label>Address</label>
                                                        <input type="text" className="form-control" value={address} 
                                                        name="address" onChange={e => setAddress(e.target.value)} />
                                                        <small className="form-text">This will be how your name will be displayed in the account section and in reviews</small>

                                                        <label>City</label>
                                                        <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} required />

                                                        <label>Province</label>
                                                        <input type="text" className="form-control" value={province} onChange={e => setProvince(e.target.value)} required />


                                                        <label>Current password (leave blank to leave unchanged)</label>
                                                        <input type="password"  value={cpassword} onChange={e => setCPass(e.target.value)} className="form-control" />

                                                        <label>New password (leave blank to leave unchanged)</label>
                                                        <input type="password"  value={npassword} onChange={e => setNPass(e.target.value)} className="form-control" />

                                                        <label>Confirm new password</label>
                                                        <input type="password"  value={cppassword} onChange={e => setCPPass(e.target.value)} className="form-control mb-2" />
                                                        
                                                        <button type="submit" className="btn btn-outline-primary-2">
                                                            <span >SAVE CHANGES</span>
                                                            <i className="icon-long-arrow-right"></i>
                                                        </button>
                                                    </form>:null}
                                                </TabPanel>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </Tabs>
                                <LoginModal/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function mapStateToProps( state ) {
    return {
        wishlist: state.wishlist.list
    }
}

export default connect( mapStateToProps, {showModal}  )( DashBoard );
