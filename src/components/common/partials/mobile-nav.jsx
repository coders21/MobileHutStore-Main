import React from 'react';
import { Link } from 'react-router-dom';

import { mobileMenu } from '../../../utils';

function MobileMainNav( props ) {
    const PUBLIC_URL = "/react/molla"
    const [ path, setPath ] = React.useState( "" );
    React.useEffect( () => {
        mobileMenu();
    } )

    return (
        <nav className="mobile-nav">
            <ul className="mobile-menu">
                <li className={ `megamenu-container` } id="menu-home">
                    <Link to={`${process.env.PUBLIC_URL}/shop?type=sale`} className="sf-with-ul">Promotions</Link>
                </li>
                <li className={ path.indexOf( "shop" ) > -1 ? 'active' : '' }>
                    <Link to={`${process.env.PUBLIC_URL}/shop?type=clearance`} className="sf-with-ul">Clearance</Link>
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
                <li><Link to={ `${process.env.PUBLIC_URL}/elements/video-banners` }>How to order</Link></li>
            </ul>
        </nav>
    );
}

export default MobileMainNav;