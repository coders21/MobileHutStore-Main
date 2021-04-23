import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import { closeModal } from '../../../actions';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { registerPlugin } from 'axe-core';
import { toast } from 'react-toastify';

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

function LoginModal( props ) {
    const { showModal, modal } = props;
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [afterlogin,setLogin]=useState(false)
    
    
    let timer;

    
    function closeModal() {
       
        document.getElementById( "login-modal" ).classList.remove( "ReactModal__Content--after-open" );
        props.closeModal( 'login' );
        // timer = setTimeout( () => {
          
           
        // }, 200);

        props.onSwitchRedirect();
        
    }


    useEffect( () => {
        style.use();
        return () => {
            if ( timer ) clearTimeout( timer );
        }
    } )

   

    const responseGoogle = (response) => {
        create_social_user(response.profileObj.email) 
      }
    
      const responseFacebook = (response) => {
        create_social_user(response.email)
      }

      const create_social_user=(email)=>{

        let payload={
            "email":email
        }

        axios.post(`${process.env.REACT_APP_API_URL}AuthApp/create_user_social/`,payload)
        .then(res=>{
            localStorage.setItem('email',res.data.email)
            localStorage.setItem('id',res.data.id)
            closeModal()
        })
        .catch(err=>{
            toast(err)
        })

      }

      const registerUser=(e)=>{

          e.preventDefault()

          let payload={
              "email":email,
              "password":password
          }

          axios.post(`${process.env.REACT_APP_API_URL}AuthApp/create_user/`,payload)
          .then(res=>{
             toast('Register Successfully, you can login now')
          })
          .catch(err=>{
              
            if (err.response.data.email){
                alert(err.response.data.email)
            }
            
          })


      }

        const login=(e)=>{
        
            e.preventDefault()

            let payload={
                "email":email,
                "password":password
            }

       

        axios.post(`${process.env.REACT_APP_API_URL}AuthApp/jwt/`,payload)
        .then(res=>{
            localStorage.setItem('email',res.data.email)
            localStorage.setItem('id',res.data.userid)
            closeModal()
            
        })
        .catch(err=>{
            alert("invalid credentials")
        })
      }

    
        if (afterlogin){
                window.location.replace('/')
        }


    return (
        <div>
       <Modal
            isOpen={ showModal && 'login' === modal }
            onRequestClose={ closeModal }
            style={ customStyles }
            contentLabel="Login Modal"
            className="modal-dialog modal-dialog-centered"
            id="login-modal" >
            <div className="modal-content">
                <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ closeModal }>
                        <span aria-hidden="true"><i className="icon-close"></i></span>
                    </button>
                    <div className="form-box">
                        <div className="form-tab">
                            <Tabs selectedTabClassName="show" defaultIndex={ 0 }>
                                <TabList className="nav nav-pills nav-fill">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Sign In</span>
                                    </Tab>

                                    <Tab className="nav-item">
                                        <span className="nav-link">Register</span>
                                    </Tab>
                                </TabList>

                                <div className="tab-content">
                                    <TabPanel style={ { paddingTop: "2rem" } }>
                                        <div>
                                            <form onSubmit={login}>
                                                <div className="form-group">
                                                    <label htmlFor="singin-email-2">email address *</label>
                                                    <input type="text" className="form-control" id="singin-email-2" value={email} onChange={e => setEmail(e.target.value)} name="email" required />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="singin-password-2">Password *</label>
                                                    <input type="password" className="form-control" id="singin-password-2" value={password} onChange={e => setPassword(e.target.value)} name="password" required />
                                                    
                                                </div>
                                               <div className="form-footer">
                                                    <button type="submit" className="btn btn-outline-primary-2">
                                                        <span>LOG IN</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>                       
                                                 <Link to={`${process.env.PUBLIC_URL}/pages/reset-email`}  className="forgot-link">Forgot Your Password?</Link>
                                                </div>
                                            </form>
                                            
                                            <div className="form-choice">
                                                <p className="text-center">or sign in with</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                    
                                                        <GoogleLogin
                                                            clientId="240926149188-tf6b7lh0rsaklpc5af2ock0mbmr620fb.apps.googleusercontent.com"
                                                            buttonText="Login"
                                                            onSuccess={responseGoogle}
                                                            onFailure={responseGoogle}
                                                            className={"google-login"}
                                                            buttonText={"Login With Google"}
                                                            cookiePolicy={'single_host_origin'}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        {/* <Link to="#" className="btn btn-login btn-f">
                                                            <i className="icon-facebook-f"></i>
                                                            Login With Facebook
                                                    </Link> */}
                                                     <FacebookLogin
                                                        appId="474004536946474"
                                                        autoLoad={false}
                                                        cssClass={"facebook-login"}
                                                        fields="name,email,picture"
                                                        textButton={"Login With Facebook"}
                                                        icon={"fa-facebook"}
                                                        callback={responseFacebook} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                        <form onSubmit={registerUser}>
                                            <div className="form-group">
                                                <label htmlFor="register-email-2">Your email address *</label>
                                                <input type="email" className="form-control" id="register-email-2" value={email} onChange={e => setEmail(e.target.value)} name="email" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-password-2">Password *</label>
                                                <input type="password" className="form-control" id="register-password-2" value={password} onChange={e => setPassword(e.target.value)} name="password" required />
                                            </div>

                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-outline-primary-2">
                                                    <span>SIGN UP</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>

                                                <div>
                                                    <label className="custom-control-label" htmlFor="register-policy-2">By registering you agree to our <Link to={ `${process.env.PUBLIC_URL}/pages/privacypolicy`}>privacy policy</Link> , <Link to={ `${process.env.PUBLIC_URL}/pages/termsandconditions`}>terms and conditions</Link> *</label>
                                                </div>
                                            </div>
                                        </form>
                                        
                                        <div className="form-choice">
                                            <p className="text-center">or sign in with</p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    
                                                    <GoogleLogin
                                                        clientId="240926149188-tf6b7lh0rsaklpc5af2ock0mbmr620fb.apps.googleusercontent.com"
                                                        buttonText="Login"
                                                        onSuccess={responseGoogle}
                                                        onFailure={responseGoogle}
                                                        className={"google-login"}
                                                        buttonText={"Login With Google"}
                                                        cookiePolicy={'single_host_origin'}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    
                                                    <FacebookLogin
                                                        appId="474004536946474"
                                                        autoLoad={false}
                                                        cssClass={"facebook-login"}
                                                        fields="name,email,picture"
                                                        textButton={"Login With Facebook"}
                                                        icon={"fa-facebook"}
                                                        callback={responseFacebook} />
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        </div>
        
    )
}

function mapStateToProps( state ) {
    
    return {
        showModal: state.modal.showModal,
        modal: state.modal.modal
    }
}

export default connect( mapStateToProps, { closeModal } )( LoginModal );