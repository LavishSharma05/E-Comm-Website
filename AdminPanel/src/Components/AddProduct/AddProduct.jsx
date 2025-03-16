import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

function AddProduct() {
    const [image,setimage]=useState(false)
    const [productdetail,setproductdetail]=useState({
        name:"",
        category:"",
        old_price:"",
        new_price:"",
        image:""
    })

    const imageHandler=(e)=>{
        setimage(e.target.files[0])
    }

    const changehandler=(e)=>{
        setproductdetail({...productdetail,[e.target.name]:e.target.value})
    }

    const handlesubmit= async ()=>{
        let responseData;
        let product=productdetail

        let formData=new FormData()
        formData.append('product',image)

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})

        if(responseData.success){
            product.image=responseData.image_url

            setproductdetail({
                image: ""
            });
            setimage(false);

            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success? alert("The product has been added to the database"): alert("Failed")
            })
        }
    }

    return (
        <div className='addproduct'>
            <div className="addproduct-item">
                <p>Product Title</p>
                <input value={productdetail.name} onChange={changehandler} type='text' name='name' placeholder='Type Here'/>
            </div>
            <div className='addproduct-price'>
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productdetail.old_price} onChange={changehandler} type='text' name='old_price' placeholder='Type here'/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productdetail.new_price} onChange={changehandler} type='text' name='new_price' placeholder='Type here'/>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productdetail.category} onChange={changehandler} name='category' className='add-product-selector'>
                    <option value="">Select category</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img  src={image? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt=''/>
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
            </div>
            <button  onClick={()=>{handlesubmit()}} className='addproduct-button'>Add</button>
        </div>
    )
}

export default AddProduct
