import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactStars from "react-rating-stars-component";
import { isIEBrowser,isEdgeBrowser } from '../../../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';

function DescOne( props ) {
    const { product } = props;
    const [revform,setrevform]=useState(false)
    const [title,setTitle]=useState('')
    const [descr,setDescr]=useState('')
    const [stars,setStars]=useState('')
    const [name,setName]=useState('')

    const showReviewForm = (e)=>{
        e.preventDefault()
        setrevform(true)
    }

    const ratingChanged = (newRating) => {
       setStars(newRating)
      };
    
    const submitReview=(e)=>{

        e.preventDefault()

        let payload={
            "customername":name,
            "stars":stars,
            "title":title,
            "description":descr,
            "product":props.customProductDetail.product_id
        }

        axios.post(`${process.env.REACT_APP_API_URL}Products/site/reviews/`,payload)
        .then(res=>{
            toast("Your review is submitted successfully, it will be visible after approval")
            setrevform(false)
        })
        .catch(err=>{
            toast("Failed,try again")
        })
        
    }

    return (
        <Tabs selectedTabClassName="show" selectedTabPanelClassName="active show">
            <div className="product-details-tab">
                <TabList className="nav nav-pills justify-content-center">
                    <Tab className="nav-item">
                        <span className="nav-link"> Description</span>
                    </Tab>

                    <Tab className="nav-item">
                        <span className="nav-link">Shipping & Returns</span>
                    </Tab>

                    <Tab className="nav-item">
                        <span className="nav-link" >Reviews ({ (props.customProductDetail.ratings).length })</span>
                    </Tab>
                </TabList>

                <div className="tab-content">
                    <TabPanel className="tab-pane">
                        <div className="product-desc-content">
                            <h3>Product Information</h3>
                            <span dangerouslySetInnerHTML={{__html: props.customProductDetail.product_description }} ></span>
                        </div>
                    </TabPanel>

                    <TabPanel className="tab-pane">
                        <div className="product-desc-content">
                            <h3>Delivery & returns</h3>
                            <p>We deliver all over Pakistan. For full details of the delivery options we offer, please view our <Link to="#">Delivery information</Link><br />
                                We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our <Link to="#">Returns information</Link></p>
                        </div>
                    </TabPanel>

                    <TabPanel className="tab-pane">
                    {/* {product.ratings.map((pr,ind)=>{
                        return(
                        <div>
                            <h1>{pr.customername}</h1>
                        </div>
                        )
                    })} */}
                        <div className="reviews">
                            <h3>Reviews ({(props.customProductDetail.ratings).length})</h3>
                            { (props.customProductDetail.ratings).length > 0 ?
                                (props.customProductDetail.ratings).map((row, index)=>
                                    <div className="review" key={ 'review-desc-one-' + index }>
                                        <div className="row no-gutters" style={ isIEBrowser() ? { flexDirection: 'row' } : {} }>
                                            <div className="col-auto">
                                                <h4><Link to="#">{row.customername}</Link></h4>
                        
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={ { width: row.stars * 20 + '%' } }></div>
                                                    </div>
                                                </div>
                                                <span className="review-date">{row.date}</span>
                                            </div>
                                            <div className="col">
                                                <h4>{row.title}</h4>
                        
                                                <div className="review-content">
                                                    <p>{row.description}</p>
                                                </div>
                        
                                            </div>
                                        </div>
                                    </div>
                                )
                            :
                                null
                            }
                        </div>
                        <br/><div className="product-details-action">
                                { isIEBrowser() || isEdgeBrowser() ?
                                    <button className="btn-product btn-cart" onClick={ showReviewForm } style={ { minHeight: "4rem" } }><span>add review</span></button>
                                    :
                                    <button className="btn-product btn-cart" onClick={ showReviewForm }><span>add review</span></button>
                                }
                            </div>
                            {revform?
                             <form onSubmit={submitReview}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Name*</label>
                                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Title*</label>
                                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" required />
                                    </div>
                                </div>

                                <label>Review*</label>
                                    <textarea type="text" value={descr} onChange={e => setDescr(e.target.value)} className="form-control" required />
                               
                               <label>Score*</label>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />

                                <button type="submit" className="btn btn-outline-primary-2">
                                    <span >SAVE Review</span>
                                    <i className="icon-long-arrow-right"></i>
                                </button>
                         </form>:null}
                    </TabPanel>
                </div>
            </div>
        </Tabs>
    );
}

function mapStateToProps( state, props ) {
    return {
        product: state.data.products.filter( product => product.id === parseInt( props.id ) )[ 0 ]
    }
}

export default connect( mapStateToProps )( DescOne );