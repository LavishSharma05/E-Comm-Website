import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

function ListProduct() {
    const [allproducts,setallproducts]=useState([])

    const fetchInfo=async()=>{
        const products=await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setallproducts(data)})
    }

    useEffect(()=>{
        fetchInfo()
    },[])

    const removeProduct=async (id)=>{
        await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo()
    }

    return (
        <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <>
          <div key={product.id} className="listproduct-format-main listproduct-format">
            <img className="listproduct-product-icon" src={product.image} alt={product.title} />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img 
              className="listproduct-remove-icon" 
              src={cross_icon} 
              alt="Remove" 
              onClick={() => removeProduct(product.id)} 
              style={{ cursor: "pointer" }}
            />
          </div>
          <hr/>
          </>  
        ))}
      </div>
    </div>
        
    )
}

export default ListProduct
