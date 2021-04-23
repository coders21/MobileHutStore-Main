import React from 'react';
import { connect } from 'react-redux';

// import Custom Components

import VideoBannerOne from '../../features/video-banner/video-banner-one';

import VideoModal from '../../features/modal/video-modal';

import { showModal } from '../../../actions';

import Service from '../../features/service'
function VideoBanners( props ) {
    const { showModal } = props;
 
     
    return (
        
        <>
        
            <div className="main">
                <div className="page-content">

                    <div className="container">
                        <h2 className="title mb-3 text-center">Order Guide!</h2>
                    </div>

                    <VideoBannerOne
                        content='<strong>How to order on MobileHutStore</strong>'
                        image={ `assets/images/video/bg-1.jpg` }
                    />

                    <Service />
                </div>

                <VideoModal />
            </div>
        </>
    );
      }


export default connect( null, { showModal } )( VideoBanners );