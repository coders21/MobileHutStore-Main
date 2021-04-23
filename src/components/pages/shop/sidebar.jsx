import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import ShopSidebar from '../../features/sidebar/shop-sidebar';
import ProductList from '../../features/product/list/product-list';

function ShopList( props ) {
    let grid = props.match.params.grid;
    const titles = { "category": "Category", "under99": "Under 99", "brand": "Brand", "buyer_picks": "Buyer Picks",
        "sale": "Sale", "new_arrival": "New Arrival", "trending_product": "Trending Products", "recommended": "Recommended",
        "clearance": "Clearance", "all": "All We Have!", "search" : "Search"};
    const [productsData, setProductsData] = useState([]);
    const mounted = useRef();
    //const [type, setType] = useState();
    //const [id, setId] = useState()

    const url = decodeURIComponent(props.location.search)
    let type = "";
    let id = "";

    if(url.includes("&")){
        type = url.substring(
            url.lastIndexOf("?type=") + 6, url.lastIndexOf("&")
        );
        
        id = url.substring(
            url.lastIndexOf("&id=") + 4, url.length
        );
    }
    else{
        type = url.substring(
            url.lastIndexOf("?type=") + 6, url.length
        );
    }
    
    
    //setType(urlId);

    //setId(urlType);

    if ( type !== "category" && type !== "under99" && type !== "brand" && type !== "buyer_picks"  && 
        type !== "sale"  && type !== "new_arrival"  && type !== "trending_product"  && type !== "recommended" 
        && type !== "all" && type !== "clearance" && type !== "search" ) {
        window.location = process.env.PUBLIC_URL + "/pages/404";
    }

    const populateProductList = () => {
        const payLoad ={
            type: type,
        }
        if(id != "0"){
            payLoad["id"] = id;
        }
        axios.post(`${process.env.REACT_APP_API_URL}Products/get_product_list/`, payLoad)
        .then(response => {
            setProductsData(response.data)
        })
        .catch(err => {
            toast.error(err.message);
        });
    }

    
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            populateProductList();
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            populateProductList();
        }
    }, [id, type]);
    useEffect( () => {
        
    }, [] )


    return (
        <>
            <Helmet>
                <title>Mobile Hut Store Shop</title>
            </Helmet>

            <h1 className="d-none">Mobile Hut Store - Shop All You Can</h1>

            <div className="main">
                <PageHeader title={ titles[ type ] } subTitle="Shop" />
                {type === "brand"?
                    <Breadcrumb title={ titles[ type ] + " -> " + id } parent1={ [ "Shop", `shop?type=all` ] }  parent2={ [ "Brands", `shop/brands` ] } adClass="mb-2" />
                    :
                    <Breadcrumb title={ titles[ type ] } parent1={ [ "Shop", `shop?type=all` ] } adClass="mb-2" />
                }
                

                <div className="page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 skeleton-body skel-shop-products">
                                {productsData.product ?
                                    <ProductList column={ "4cols" } productsData={productsData.product} />
                                :null}
                            </div>

                            <div className="col-lg-3 order-lg-first skeleton-body skel-shop-sidebar">
                                <div className="skel-widget">
                                </div>

                                <div className="skel-widget">
                                </div>

                                <div className="skel-widget">
                                </div>

                                <div className="skel-widget">
                                </div>
                                {productsData.product ?
                                    <ShopSidebar adClass="sidebar sidebar-shop" productsData={productsData}/>
                                :null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo( ShopList );