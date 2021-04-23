import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// import Custom Components
import PageHeader from '../../common/page-header';
import Breadcrumb from '../../common/breadcrumb';
import Accordion from '../../features/accordion/accordion';
import Card from '../../features/accordion/card';

import { isIEBrowser } from '../../../utils';

function TERMSANDCONDTIONS() {
    return (
        <div className="main">
            <Helmet>
                <title>MobileHutStore - Terms and Conditions!</title>
            </Helmet>

            <h1 className="d-none">MobileHutStore - Terms and Condtions!</h1>

            <PageHeader title="Terms and Condtions" subTitle="Page" />
            <Breadcrumb title="Terms&Conditions" parent1={ [ "Pages", "pages/about" ] } />

            <div className="page-content">
                <div className="container">
                
                    <h2 className="title text-center mb-3">Terms and Condtions</h2>

                    <Accordion adClass="accordion-rounded">
                        <Card title="Overview" adClass="card-box card-sm bg-light">
                        <li>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.</li>
    <li> Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.  </li>                  
    <li>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website.
</li>
                        </Card>
                        <Card title="Online Store Terms" adClass="card-box card-sm bg-light">
                        <li>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</li>
                       
                        </Card>
                        <Card title="General Condtions" adClass="card-box card-sm bg-light">
                        <li>We reserve the right to refuse service to anyone for any reason at any time.You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</li>
                        </Card>
                        <Card title="Modifcations To The Service And Price" adClass="card-box card-sm bg-light">
                        <li>Prices for our products are subject to change without notice.We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</li>
                        </Card>
                        <Card title="Product or Services"  adClass="card-box card-sm bg-light">
                        <li>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.</li>
                        </Card>
                        <Card title="Accuracy Of Billing And Account Information" adClass="card-box card-sm bg-light">
                        <li>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.For more detail, please review our Returns Policy.</li>
                        </Card>
                        <Card title="User feedback and Comments" adClass="card-box card-sm bg-light">
                        <li>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</li>
                        </Card>
                        <Card title="Personal Information" adClass="card-box card-sm bg-light">
                        <li>Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.</li>
                        </Card>
                        <Card title="Errors, Inaccuracies And Omissions" adClass="card-box card-sm bg-light">
                        <li>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</li>
                        </Card>
                        <Card title="Prohibited Uses" adClass="card-box card-sm bg-light">
                        <li>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</li>
                        </Card>
                        <Card title="Disclaimer Of Warranties; Limitation Of Liability" adClass="card-box card-sm bg-light"><li>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.In no case shall mobile hut, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</li>
                        </Card>
                        <Card title="Termination" adClass="card-box card-sm bg-light"><li>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</li>
                        </Card>
                        <Card title="Entire Agreement" adClass="card-box card-sm bg-light">The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
                        </Card>
                        <Card title="Governing Law" adClass="card-box card-sm bg-light">These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of hassan center hall road, lahore, PB, , Pakistan.
                        </Card>
                        <Card title="Changes To Terms Of Services" adClass="card-box card-sm bg-light">You can review the most current version of the Terms of Service at any time at this page.We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                        </Card>
                        <Card title="Contact Information" adClass="card-box card-sm bg-light">Questions about the Terms of Service should be sent to us at mobilehutstore1@gmail.com.
                        </Card>
                    </Accordion>
                </div>
            </div>

            <div className="cta cta-display bg-image pt-4 pb-4" style={ { backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/cta/bg-7.jpg)` } }>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-9 col-xl-7">
                            <div className={ `row no-gutters ${isIEBrowser() ? '' : 'flex-column'} flex-sm-row align-items-sm-center` } >
                                <div className="col">
                                    <h3 className="cta-title text-white">If You Have More Questions</h3>
                                    
                                </div>

                                <div className="col-auto">
                                    <Link to={ `${process.env.PUBLIC_URL}/pages/contact-2` } className="btn btn-outline-white"><span>CONTACT US</span><i className="icon-long-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo( TERMSANDCONDTIONS );