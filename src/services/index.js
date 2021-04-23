import { findIndex } from '../utils';
import moment from 'moment';

/**
 * Get visible products
 * 
 * @param {Array} products 
 * @param {Object} param1
 * @return {Array} filtered products 
 */
export const getVisibleProducts = ( products, { sortBy, category, size, brand, color, rating, value } ) => {
    
    return products.filter( item => {

        let catResult = false, sizeResult = true, brandResult = false, colorResult = true, valResult = false, ratingResult = true;

        if ( category && category.length > 0 ) {
            for ( let i = 0; i < category.length; i++ ) {
                
                if ( item.product_category === category[ i ] || ( category[ i ] === 'All' ) ){
                    catResult = true;
                }
                    
            }
        } else {
            catResult = true;
        }

        if ( size && size.length > 0 ) {
            for ( let i = 0; i < size.length; i++ ) {
                if ( -1 !== findIndex( item.size, sz => sz === size[ i ] ) )
                    sizeResult = true;
            }
        } else {
            sizeResult = true;
        }

        if ( brand && brand.length > 0 ) {
            for ( let i = 0; i < brand.length; i++ ) {
                if ( item.product_brand === brand[ i ] || ( brand[ i ] === 'All' ) ){
                    brandResult = true;
                }
            }
        } else {
            brandResult = true;
        }

        if ( color && color.length > 0 ) {
            for ( let i = 0; i < color.length; i++ ) {
                if ( -1 !== findIndex( item.variants, cl => cl.color === color[ i ] ) )
                    colorResult = true;
            }
        } else {
            colorResult = true;
        }

        if ( rating && rating.length > 0 ) {
            for ( let i = 0; i < rating.length; i++ ) {
                if ( item.ratings === rating[ i ] )
                    ratingResult = true;
            }
        } else {
            ratingResult = true;
        }

        //let price = item.discount ? item.salePrice : item.price;

        let price =  (item.sale_price > 0 && moment(item.saleprice_enddate).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")) ? item.sale_price : item.product_price

        if ( value ) {
            if ( value.min <= price && price <= value.max ) {
                valResult = true;
            }
        } else {
            valResult = true;
        }

        return catResult && sizeResult && brandResult && colorResult && valResult && ratingResult;
    } );
    // } ).sort( ( product1, product2 ) => {

}

/**
 * Get featured products
 * @param {Array} products 
 * @return {Array} featuredProducts
 */
export const getFeaturedProducts = ( products ) => {
    return products.filter( item => true === item.featured );
}

/**
 * Get sold products
 * @param {Array} products 
 * @return {Array} saleProducts
 */
export const getSaleProducts = ( products ) => {
    return products.filter( item => item.discount > 0 );
}

/**
 * Get new products
 * @param {Array} products 
 * @return {Array} newProducts
 */
export const getNewProducts = ( products ) => {
    return products.filter( item => item.new );
}

/**
 * Get deal products
 * @param {Array} products 
 * @return {Array} dealProducts
 */
export const getDealProducts = ( products, deal ) => {
    return products.filter( item => item.deal === deal );
}

/**
 * Get products which has top rating
 * @param {Array} products 
 * @return {Array} topRatingProducts
 */
export const getTopRatingProducts = ( products ) => {
    return products.filter( product => {
        return product.ratings > 2
    } ).sort( ( product1, product2 ) => {
        return product2.ratings < product1.ratings ? -1 : 1;
    } );
}

/**
 * Get products which has top sale
 * @param {Array} products 
 * @return {Array} topSellingProducts
 */
export const getTopSellingProducts = ( products ) => {
    return products.filter( item => true === item.top );
}

/**
 * Get products filtered by category
 * @param {Array} products 
 * @param {String} category
 * @return {Array} filteredProducts
 */
export const getProductsByCategory = ( products, category ) => {
    if ( category === "All" ) return products;

    if ( -1 !== category.indexOf( '&' ) ) {
        category = category.split( ' & ' );
    }

    return products.filter( item => {
        let result = false;

        if ( Array.isArray( category ) ) {
            for ( let i = 0; i < category.length; i++ ) {
                if ( -1 !== item.category.indexOf( category[ i ] ) ) {
                    result = true;
                }
            }
        } else {
            if ( -1 !== item.category.indexOf( category ) )
                result = true;
        }
        return result;
    } );
}

/**
 * Get number of products filtered by category
 * @param {Array} products 
 * @param {String} category
 * @return {Integer} count of suitable products
 */
export const getCountByCategory = ( products, category ) => {
    if ( category === "All" ) return products.length;
    if ( category === "Sale" ) return products.filter( item => item.discount > 0 ).length;
    return products.filter( item => item.product_category === category ).length;
}

/**
 * get total Price of products in cart.
 * @param {Array} cartItems 
 * @return {Float} totalPrice
 */
export const getCartTotal = cartItems => {
    let total = 0;
    for ( let i = 0; i < cartItems.length; i++ ) {
        total += parseInt( cartItems[ i ].qty, 10 ) * (  (moment(cartItems[ i ].saleprice_enddate).format("YYYY-MM-DD") >
        moment().format("YYYY-MM-DD")) ? cartItems[ i ].sale_price : cartItems[ i ].product_price );
    }
    return total;
}

/**
 * get number of products in cart
 * @param {Array} cartItems 
 * @return {Integer} numbers of cart items in cartlist
 */
export const getCartCount = cartItems => {
    let total = 0;
    
    for ( let i = 0; i < cartItems.length; i++ ) {
        total += parseInt( cartItems[ i ].qty, 10 );
    }

    return total;
}

/**
 * Get number of products filtered by rating
 * @param {Array} products 
 * @param {String} category
 * @return {Integer} number of products filtered by rating
 */
export const getCountByRating = ( products, rating ) => {
    return products.filter( item => item.rating === rating ).length;
}