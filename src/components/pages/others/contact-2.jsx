import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Breadcrumb from '../../common/breadcrumb';
import PageHeader from '../../common/page-header';

import GoogleMaps from './googlemaps'
import axios from 'axios';

const mapStyle = {
	width: '1024px',
	height: '492px',
    margin: '0px 0px 50px'
  };
  
function ContactTwo() {

	const [email,setEmail]= useState('')
	const [phone,setNumber]=useState('')
	const [subject,setSubject]=useState('')
	const [message,setMessage]=useState('')
	const [name,setName]=useState('')
	

	const submitContact=(e)=>{
		e.preventDefault()


		let payload={
			"contact_name":name,
			"contact_email":email,
			"contact_subject":subject,
			"contact_message":message,
			"contact_number":phone
		}

		

		axios.post(`${process.env.REACT_APP_API_URL}AuthApp/create_contact/`,payload)
		.then(res=>{
			alert('Your message is successfully submitted, we will get back to you shortly')
			setName('')
			setNumber('')
			setEmail('')
			setSubject('')
			setMessage('')
		})
		.catch(err=>{
			alert(err)
		})
	}

	return (
		<div className="main">
			<Helmet>
				<title>MobileHutStore - Contact Page</title>
			</Helmet>

			<h1 className="d-none">MobileHutStore - Contact Page</h1>

			<PageHeader title="Contact Us"  />
			<Breadcrumb title="Contact Us" parent1={ [ "pages", "pages/about" ] } adClass="border-0 mb-0" />
			
			<div className="page-content">

			{/* <div style={mapStyle}>
			
			</div> */}
			
			<div  id ="map" className="mb-5">
				<GoogleMaps/>
			</div>
				<div className="container"> 
					<div className="row">
						<div className="col-md-4">
							<div className="contact-box text-center">
								<h3>Office</h3>
								<address>Zaman Plaza Second Floor, <br />Hall Road, Lahore</address>
							</div>
						</div>

						<div className="col-md-4">
							<div className="contact-box text-center">
								<h3>Start a Conversation</h3>

								<div><Link to="mailto:#">mobilehutstore1@gmail.com</Link></div>
								<div><Link to="tel:#">+92 3092226336</Link></div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="contact-box text-center">
								<h3>Social</h3>

								<div className="social-icons social-icons-color justify-content-center">
									<a href="https://www.facebook.com/MOBILE1HUT" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
									{/* <a href="https://www.instagram.com/mobilehutstore/" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter"></i></a> */}
									<a href="https://www.instagram.com/mobilehutstore/" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
									<a href="https://www.youtube.com/channel/UCBILAY_VCfb-VBLRMAHr_Qg/videos" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>
									{/* <Link to="#" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></Link> */}
								</div>
							</div>
						</div>
					</div>

					<hr className="mt-3 mb-5 mt-md-1" />
					<div className="touch-container row justify-content-center">
						<div className="col-md-9 col-lg-7">
							<div className="text-center">
								<h2 className="title mb-1">Get In Touch</h2>
								<p className="lead text-primary">
									We collaborate with ambitious brands and people; we’d love to hear from you, get in touch with us now!
							</p></div>

							<form onSubmit={submitContact} className="contact-form mb-2">
								<div className="row">
									<div className="col-sm-4">
										<label htmlFor="cname" className="sr-only">Name</label>
										<input type="text" className="form-control" id="cname" placeholder="Name *" value={name} onChange={e => setName(e.target.value)} required />
									</div>

									<div className="col-sm-4">
										<label htmlFor="cemail" className="sr-only">Email</label>
										<input type="email" className="form-control" id="cemail" placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} required />
									</div>

									<div className="col-sm-4">
										<label htmlFor="cphone" className="sr-only">Phone</label>
										<input type="tel" className="form-control" id="cphone" placeholder="Phone" value={phone} onChange={e => setNumber(e.target.value)} />
									</div>
								</div>

								<label htmlFor="csubject" className="sr-only">Subject</label>
								<input type="text" className="form-control" id="csubject" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)}/>

								<label htmlFor="cmessage" className="sr-only">Message</label>
								<textarea className="form-control" cols="30" rows="4" id="cmessage" required placeholder="Message *"value={message} onChange={e => setMessage(e.target.value)} ></textarea>

								<div className="text-center">
									<button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
										<span>SUBMIT</span>
										<i className="icon-long-arrow-right"></i>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default React.memo( ContactTwo );