import React from 'react';
import { Link } from 'react-router-dom';

function CategoryMenu( props ) {
    const { type = 1 } = props;

    const categoriesData = props.data;

    let categoriesLinks =  null;
    if(categoriesData){
        categoriesLinks = categoriesData.map(( item, index )=>{
            return (<li  key={ "category" + index } className="item-lead">
                <Link to={`${process.env.PUBLIC_URL}/shop?type=category&id=${item.id}`}>{item.category_name}</Link>
            </li>);
        });
    }

    return (
        <div className="dropdown category-dropdown">
            <Link to={`${process.env.PUBLIC_URL}/shop?type=all`} className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static" title="Browse Categories">
                Browse Categories
                { type === 3 ?
                    <i className="icon-angle-down"></i>
                    : ''
                }
            </Link>

            <div className="dropdown-menu">
                <nav className="side-nav">
                    <ul className="menu-vertical sf-arrows">
                        {/* <li className="item-lead"><Link to="#">Daily offers</Link></li>
                        <li className="item-lead"><Link to="#">Gift Ideas</Link></li>
                        <li><Link to="#">Beds</Link></li>
                        <li><Link to="#">Lighting</Link></li>
                        <li><Link to="#">Sofas & Sleeper sofas</Link></li>
                        <li><Link to="#">Storage</Link></li>
                        <li><Link to="#">Armchairs & Chaises</Link></li>
                        <li><Link to="#">Decoration </Link></li>
                        <li><Link to="#">Kitchen Cabinets</Link></li>
                        <li><Link to="#">Coffee & Tables</Link></li>
                        <li><Link to="#">Outdoor Furniture </Link></li> */}
                        {categoriesLinks}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default React.memo( CategoryMenu ); 