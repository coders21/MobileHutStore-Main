import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MainMenu( props ) {
    const [ path, setPath ] = useState( "" );
    const PUBLIC_URL = "/react/molla";

    useEffect( () => {
        setPath( window.location.href );
    } )

    function showAllDemos( e ) {
        let demoItems = document.querySelectorAll( '.demo-item.hidden' );

        for ( let i = 0; i < demoItems.length; i++ ) {
            demoItems[ i ].classList.toggle( 'show' );
        }

        document.querySelector( '.view-all-demos' ).classList.toggle( 'disabled-hidden' );
        e.preventDefault();
    }

    return (
        <nav className="main-nav">
            <ul className="menu">
                <li className={ `megamenu-container` } id="menu-home">
                    <Link to={`${process.env.PUBLIC_URL}/shop?type=sale`} className="sf-with-ul">Sales & Promotions</Link>
                </li>
                <li className={ path.indexOf( "shop" ) > -1 ? 'active' : '' }>
                    <Link to={`${process.env.PUBLIC_URL}/shop?type=clearance`} className="sf-with-ul">Clearance Sale</Link>
                </li>
                <li className={ path.indexOf( "product/" ) > -1 ? 'active' : '' }>
                    <Link to={`${process.env.PUBLIC_URL}/shop?type=under99`} className="sf-with-ul">Under 99</Link>
                </li>
                <li className={ path.indexOf( "pages" ) > -1 ? 'active' : '' }>
                    <Link to={`${process.env.PUBLIC_URL}/shop?type=buyer_picks`} className="sf-with-ul">Buyer Picks</Link>
                </li>
                {/* <li className={ path.indexOf( "blog/" ) > -1 ? 'active' : '' }>
                    <Link to={ `${process.env.PUBLIC_URL}/blog/classic` } className="sf-with-ul">Blog</Link>
                </li> */}
                {/* <li className={ path.indexOf( "element" ) > -1 ? 'active' : '' }>
                    <Link to={ `${process.env.PUBLIC_URL}/elements` } className="sf-with-ul">Elements</Link>
                </li> */}
                <li><Link to={ `${process.env.PUBLIC_URL}/elements/video-banners` }>How to order</Link></li>
            </ul>
        </nav>
    );
}