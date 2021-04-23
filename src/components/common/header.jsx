import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

// import Custom Components
import MainMenu from './partials/main-menu';
import CartMenu from './partials/cart-menu';
import CategoryMenu from './partials/category-menu';
import CompareMenu from './partials/compare-menu';
import LoginModal from '../features/modal/login-modal';

import { showModal } from '../../actions';

function Header( props ) {
    const { container = "container" } = props;
    const [categoriesData, setCategoriesData] = useState(null);
    const [search, setSearch] = useState(null);
    const [redirect, setRedirect] = useState(null);
    const [reloads,setReload] = useState(false)
    const [showlogin,setLogin] = useState(false)
    function openLoginModal( e ) {
        props.showModal( 'login' );
        setLogin(true)
        e.preventDefault();
    }

    const onChangeHandler = (evt) => { 
        setSearch(evt.target.value);
    }

    const onkeyUpHandler = (evt) => {
        if(evt.key === "Enter"){
            searchHandler();
        }
    }

    const searchHandler = () => {
      
        if(search){   
            setRedirect(<Redirect to={{pathname:'/shop', search: "?type=search&id=" + search}}/>);     
        }
        
        setSearch('');
    }


    useEffect( () => {

        axios.get(`${process.env.REACT_APP_API_URL}Products/create_category/`)
        .then(response=>{
            setCategoriesData(response.data);
        })
        .catch(err=>{
            toast.error(err.message);
        });
    }, [] )

    const handleredirect = () => {
        setReload(true)
    }

    if (reloads){
        setReload(false)
        setLogin(false)
        window.location.replace('/')
    }

    return (

        <>
            {redirect}
            <header className="header header-intro-clearance header-4">
                <div className="header-top">
                    <div className={ container }>
                        <div className="header-left">
                            <i className="icon-phone"></i>Call/Whatsapp: +92 309 2226336
                        </div>

                        <div className="header-right">
                            <ul className="top-menu">
                                <li>
                                    <Link to="#">Links</Link>
                                    <ul>
                                        <li><Link to={ `${process.env.PUBLIC_URL}/elements/video-banners` }>How to order</Link></li>
                                        <li><Link  to={ `${process.env.PUBLIC_URL}/pages/contact-2` } >Contact Us</Link></li>
                                        <li><Link to={ `${process.env.PUBLIC_URL}/shop/dashboard` }>Track Order</Link></li>
                                        {localStorage.getItem('email')?<li>{localStorage.getItem('email')}</li>:<li><Link to="#signin-modal" data-toggle="modal" onClick={ openLoginModal }>Sign in / Sign up</Link></li>}
                                        
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="header-middle">
                    <div className={ container }>
                        <div className="header-left">
                            <button className="mobile-menu-toggler">
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars"></i>
                            </button>

                            <Link to={ `${process.env.PUBLIC_URL}/` } className="logo">
                                <img src={ `${process.env.PUBLIC_URL}/assets/images/logo.png` } alt="Mobile Hut Store Logo" width={ 150 } height={ 25 } />
                            </Link>
                        </div>

                        <div className="header-center">
                            <div className="header-search header-search-extended header-search-visible d-none d-lg-block" style={ { marginRight: 0 } }>
                                <Link to="#" className="search-toggle" role="button"><i className="icon-search"></i></Link>
                                {/* <form action="#" method="get">
                                    <div className="header-search-wrapper search-wrapper-wide">
                                        <label htmlFor="q" className="sr-only">Search</label>
                                        <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                                        <input type="search" className="form-control" name="q" id="q" placeholder="Search product ..." required />
                                    </div>
                                </form> */}
                                <div className="header-search-wrapper search-wrapper-wide">
                                    <label htmlFor="q1" className="sr-only">Search</label>
                                    <button className="btn btn-primary" onClick={searchHandler}><i className="icon-search"></i></button>
                                    <input type="search" className="form-control" 
                                        value={search} placeholder="Search product ..." required 
                                        onChange={onChangeHandler} onKeyUp={onkeyUpHandler}/>
                                </div>
                            </div>
                        </div>

                        <div className="header-right">
                            <div className="wishlist">
                                <Link to={ `${process.env.PUBLIC_URL}/shop/dashboard` } title="Account">
                                    <div className="icon">
                                        <i className="icon-user"></i>
                                    </div>
                                    <p>Account</p>
                                </Link>
                            </div>
                            <CartMenu />
                            
                        </div>
                    </div>
                </div>

                <div className="header-bottom sticky-header">
                    <div className={ container }>
                        <div className="header-left">
                            <CategoryMenu type={ 3 } data={categoriesData} />
                        </div>

                        <div className="header-center">
                            <MainMenu />
                        </div>

                        <div className="header-right">
                            <i className="la la-lightbulb-o"></i><p>Clearance<span className="highlight">&nbsp;Up to 30% Off</span></p>
                        </div>
                    </div>
                </div>
                {showlogin?<LoginModal onSwitchRedirect={handleredirect}/>:null}
            </header>
        </>
    )
}

function mapStateToProps( state ) {
    return {
        wishlist: state.wishlist.list
    }
}

export default connect( mapStateToProps, { showModal } )( Header );