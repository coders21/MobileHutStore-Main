import React,{useState, useEffect} from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet';
import { closeModal } from '../../../actions';
import { connect } from 'react-redux';

// import Custom Components
import Breadcrumb from '../../common/breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';
function PasswordResetEmail(props) {

    const [email,setEmail]=useState('')

    useEffect( () => {
        props.closeModal( 'login' );
    }, [] )

    const sendEmail=(e)=>{
        e.preventDefault()

        let payload={
            "email":email
        }

        axios.post(`${process.env.REACT_APP_API_URL}auth/users/reset_password/`,payload)
        .then(res=>{
            toast("Email sent to your registered email for reset password" )
        })
        .catch(err=>{
            toast("Something wrong happened! try entering your registered email")
        }) 

       

    }

    return (
        <div className="main">
            <Helmet>
                <title>MobileHutStore</title>
            </Helmet>

            <h1 className="d-none">MobileHutStore</h1>

            <Breadcrumb title="Login" parent1={ [ "pages", "pages/about" ] } adClass="border-0 mb-0" />

            <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17" style={ { backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/login-bg.jpg)` } }>
                <div className="container">
                    <div className="form-box">
                        <div className="form-tab">
                            <Tabs selectedTabClassName="show" defaultIndex={ 0 }>
                                <TabList className="nav nav-pills nav-fill">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Forgot Password</span>
                                    </Tab>

                                    
                                </TabList>

                                <div className="tab-content">
                                    <TabPanel style={ { paddingTop: "2rem" } }>
                                        <div>
                                            <form onSubmit={sendEmail}>
                                                <div className="form-group">
                                                    <label htmlFor="singin-email-2">Enter registered email *</label>
                                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="singin-email-2" name="singin-email" required />
                                                    <p>Please enter your email from which you register at our site</p>
                                                </div>

                                            
                                                <div className="form-footer">
                                                    <button type="submit" className="btn btn-outline-primary-2">
                                                        <span>Submit</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>

                                                    </div>
                                            </form>
                                            
                                        </div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps( state ) {
    return {
        showModal: state.modal.showModal,
        modal: state.modal.modal
    }
}

export default connect( mapStateToProps, { closeModal } )( PasswordResetEmail );