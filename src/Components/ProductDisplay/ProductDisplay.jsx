import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import {Link} from 'react-router-dom'

function ProductDisplay(props) {
    const {addToCart}=useContext(ShopContext)
    const {product}=props
    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className="productdisplay-imglist">
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                    <img src={product.image} alt=''/>
                </div>
                <div className='productdisplay-img'>
                    <img className='productdisplay-main-img' src={product.image} alt=''/>
                </div>
            </div>
            <div productdisplay-right>
                <h1>{product.name}</h1>
                <div className='product-display-right-star'>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_dull_icon} alt=''/>
                    <p>122</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price_old">${product.old_price}</div>
                    <div className="productdisplay-right-price_new">${product.new_price}</div>
                </div>
                <div className='productdisplay-right-description'>
                    A good t shirt mate 
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span> Women,Tshirt,Croptop</p>
                <p className='productdisplay-right-category'><span>Tags : </span> Modern,latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay
