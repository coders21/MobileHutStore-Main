import React,{useState} from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../common/breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';

function PasswordReset() {

    const [password,setPassword]=useState('')
    


    const resetPassword = (e) =>{

        e.preventDefault()

        let uid=window.location.href.split('/').reverse()[1]
        let token=window.location.href.split('/').reverse()[0]

       
        let payload={
            "uid":uid,
            "token":token,
            "new_password":password
        }

        axios.post(`${process.env.REACT_APP_API_URL}auth/users/reset_password_confirm/`,payload)
        .then(res=>{
            toast("password reset successfully!")
            window.location.replace(`${process.env.PUBLIC_URL}`);
        })
        .catch(err=>{
            toast("Password Failed to reset,try again!")
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
                                            <form onSubmit={resetPassword}>
                                                <div className="form-group">
                                                    <label htmlFor="singin-email-2">Enter new password *</label>
                                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="singin-email-2" name="singin-email" required />
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

export default React.memo( PasswordReset );