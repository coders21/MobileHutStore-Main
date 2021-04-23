import React from 'react';
import { Link } from 'react-router-dom';

function banner( props ) {
    const {id,  brand_image, brand_name } = props.data;

    return (
        <div className="col-6 col-sm-4 col-lg-2">
            <Link to={ `${process.env.PUBLIC_URL}/shop?type=brand&id=${id}` } className="cat-block">
                <figure>
                    <span>
                        <img src={process.env.REACT_APP_API_URL+ 'media/' + brand_image + '/'  } alt="Category" />
                    </span>
                </figure>

                <h3 className="cat-block-title">{ brand_name }</h3>
            </Link>
        </div>
    )
}

export default React.memo( banner );