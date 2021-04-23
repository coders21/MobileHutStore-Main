import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import { toast } from 'react-toastify';

import { initSettings } from '../../../utils';
import data from '../../../mock_data/data';
import { getCountByCategory } from '../../../services';
import PageHader from '../../common/page-header';

function Brands( props ) {
    const { products } = props;
    const grid = 'boxed';
    const title = { "boxed": "Brands", "fullwidth": "Product Category Fullwidth" }
    const breadcrumbs = { "boxed": "brands", "fullwidth": "Fullwidth" };
    const [brands, setBrands] = useState(null)
    let counts = [];

    if ( grid !== 'boxed' && grid !== 'fullwidth' ) {
        window.location = process.env.PUBLIC_URL + "/pages/404";
    }

    useEffect( () => {
        initSettings();
    } )

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}Products/create_brand/`)
        .then(response=>{
            setBrands(response.data);
        })
        .catch(err=>{
            toast.error(err.message);
        });
    }, [])

    function showSideBar() {
        document.querySelector( 'body' ).classList.add( 'sidebar-filter-active' );
    }

    if ( !products ) return '';

    data.shop_categories.map( ( item, index ) => {
        counts.push( getCountByCategory( products, item.name ) );

        return null;
    } );

    return (
        <>
            <Helmet>
                <title>Mobile Hut Store | Brands Boxed</title>
            </Helmet>

            <h1 className="d-none">Mobile Hut Store - Brands Boxed</h1>

            <div className="main">
                <PageHader title={ title[ grid ] } subTitlte="Shop" />

                <nav aria-label="breadcrumb" className="breadcrumb-nav breadcrumb-with-filter">
                    <div className={ grid === 'boxed' ? 'container' : 'container-fluid' }>

                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={ `${process.env.PUBLIC_URL}/` }>Home</Link></li>
                            <li className="breadcrumb-item"><Link to={ `${process.env.PUBLIC_URL}/shop/sidebar/list` }>Shop</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{ breadcrumbs[ grid ] }</li>
                        </ol>
                    </div>
                </nav>
                {
                    brands ?

                        <div className="page-content">
                            <div className="categories-page" key={ grid }>
                                
                                <div className="container">
                                    <div className="row">
                                        
                                        <div className="col-md-6">
                                            {brands[0]?
                                                <div className="banner banner-cat banner-badge">
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[0].id}` }>
                                                        <div className="lazy-overlay bg-4"></div>

                                                        <LazyLoadImage
                                                            src={ `${process.env.REACT_APP_API_URL_SIMPLE}${brands[0].brand_image}/` }
                                                            alt="banner"
                                                            width={ 320 }
                                                            height={ 280 }
                                                            effect="blur"
                                                            threshold={ 500 }
                                                        />
                                                    </Link>

                                                    <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[0].id}` }>
                                                        <h3 className="banner-title">{brands[0].brand_name}</h3>
                                                        <span className="banner-link-text">Shop Now</span>
                                                    </Link>
                                                </div>
                                                :null
                                            }
                                            {brands[1]?
                                                <div className="banner banner-cat banner-badge">
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[1].id}` }>
                                                        <div className="lazy-overlay bg-4"></div>

                                                        <LazyLoadImage
                                                            src={ `${process.env.REACT_APP_API_URL_SIMPLE}${brands[1].brand_image}/` }
                                                            alt="banner"
                                                            width={ 320 }
                                                            height={ 280 }
                                                            effect="blur"
                                                            threshold={ 500 }
                                                        />
                                                    </Link>

                                                    <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[1].id}` }>
                                                        <h3 className="banner-title">{brands[1].brand_name}</h3>
                                                        <span className="banner-link-text">Shop Now</span>
                                                    </Link>
                                                </div>
                                                :null
                                            }
                                        </div>

                                        <div className="col-md-6">
                                            <div className="row">
                                                {brands[2]?
                                                    <div className="col-sm-6">
                                                        <div className="banner banner-cat banner-badge">
                                                            <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[2].id}` }>
                                                                <div className="lazy-overlay bg-4"></div>

                                                                <LazyLoadImage
                                                                    src={ `${process.env.REACT_APP_API_URL_SIMPLE}${brands[2].brand_image}/` }
                                                                    alt="banner"
                                                                    width={ 280 }
                                                                    height={ 280 }
                                                                    effect="blur"
                                                                    threshold={ 500 }
                                                                />
                                                            </Link>

                                                            <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[2].id}` }>
                                                                <h3 className="banner-title">{brands[2].brand_name}</h3>
                                                                <span className="banner-link-text">Shop Now</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    :null
                                                }
                                                {brands[3]?
                                                    <div className="col-sm-6">
                                                        <div className="banner banner-cat banner-badge">
                                                            <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[3].id}` }>
                                                                <div className="lazy-overlay bg-4"></div>

                                                                <LazyLoadImage
                                                                    src={ `${process.env.REACT_APP_API_URL_SIMPLE}${brands[3].brand_image}/` }
                                                                    alt="banner"
                                                                    width={ 280 }
                                                                    height={ 280 }
                                                                    effect="blur"
                                                                    threshold={ 500 }
                                                                />
                                                            </Link>

                                                            <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[3].id}` }>
                                                                <h3 className="banner-title">{brands[3].brand_image}</h3>
                                                                <span className="banner-link-text">Shop Now</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                :null}
                                            </div>
                                            {brands[4]?
                                                <div className="banner banner-cat banner-badge">
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[4].id}` }>
                                                        <div className="lazy-overlay bg-4"></div>

                                                        <LazyLoadImage
                                                            src={ `${process.env.REACT_APP_API_URL_SIMPLE}${brands[4].brand_image}/` }
                                                            alt="banner"
                                                            width={ 320 }
                                                            height={ 580 }
                                                            effect="blur"
                                                            threshold={ 500 }
                                                        />
                                                    </Link>

                                                    <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[4].id}` }>
                                                        <h3 className="banner-title">{brands[4].brand_image}</h3>
                                                        <span className="banner-link-text">Shop Now</span>
                                                    </Link>
                                                </div>
                                            :null}
                                        </div>

                                        <div className="col-sm-6 col-md-3">
                                            {brands[5]?
                                                <div className="banner banner-cat banner-badge">
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[5].id}` }>
                                                        <div className="lazy-overlay bg-4"></div>

                                                        <LazyLoadImage
                                                            src={`${process.env.REACT_APP_API_URL_SIMPLE}${brands[5].brand_image}/` }
                                                            alt="banner"
                                                            width={ 280 }
                                                            height={ 280 }
                                                            effect="blur"
                                                            threshold={ 500 }
                                                        />
                                                    </Link>

                                                    <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[5].id}` }>
                                                        <h3 className="banner-title">{brands[5].brand_name}</h3>
                                                        <span className="banner-link-text">Shop Now</span>
                                                    </Link>
                                                </div>
                                            :null}
                                        </div>

                                        <div className="col-sm-6 col-md-3 order-md-last">
                                            {brands[6]?
                                                <div className="banner banner-cat banner-badge">
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[6].id}` }>
                                                        <div className="lazy-overlay bg-4"></div>

                                                        <LazyLoadImage
                                                            src={ `${process.env.REACT_APP_API_URL_SIMPLE}${brands[6].brand_image}/` }
                                                            alt="banner"
                                                            width={ 280 }
                                                            height={ 280 }
                                                            effect="blur"
                                                            threshold={ 500 }
                                                        />
                                                    </Link>

                                                    <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[6].id}` }>
                                                        <h3 className="banner-title">{brands[6].brand_name}</h3>
                                                        <span className="banner-link-text">Shop Now</span>
                                                    </Link>
                                                </div>
                                            :null}
                                        </div>

                                        <div className="col-md-6">
                                            {brands[7]?
                                                <div className="banner banner-cat banner-badge">
                                                    <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[7].id}` }>
                                                        <div className="lazy-overlay bg-4"></div>

                                                        <LazyLoadImage
                                                            src={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${brands[7].id}` }
                                                            alt="banner"
                                                            width={ 320 }
                                                            height={ 280 }
                                                            effect="blur"
                                                            threshold={ 500 }
                                                        />
                                                    </Link>

                                                    <Link className="banner-link" to={ `${process.env.PUBLIC_URL}/shop/sidebar/list` }>
                                                        <h3 className="banner-title">{brands[7].brand_name}</h3>
                                                        <span className="banner-link-text">Shop Now</span>
                                                    </Link>
                                                </div>
                                            :null}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>

                    :
                        null
                }
                
            </div>
        </>
    )
}

export const mapStateToProps = ( state ) => {
    return {
        products: state.data.products ? state.data.products : []
    }
}

export default connect( mapStateToProps )( Brands );