import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrums from '../Components/BreadCrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct'

function Product() {
    const {all_product}=useContext(ShopContext)
    const {productId}=useParams()

    const product=all_product.find((e)=>e.id===Number(productId))
    return (
        <div className=''>
            <Breadcrums product={product}/>
            <ProductDisplay product={product}/>
            <RelatedProduct />
        </div>
    )
}

export default Product
