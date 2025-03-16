import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ShopContext=createContext(null)

const getDefaultCart=()=>{
    let cart={}
    for(let index=0;index<300+1;index++){
        cart[index]=0
    }
    return cart
}

const ShopContextProvider=(props)=>{
    const [all_product,setall_Product]=useState([])
    const [cartItems,setCartItems]=useState(getDefaultCart())
    

    useEffect(()=>{
        const product=fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>{setall_Product(data)})

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            }).then((resp)=>resp.json())
            .then((data)=>setCartItems(data))
        }
    },[])

    const addToCart=(itemId)=>{
        setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart=(ItemId)=>{
        setCartItems(prev=>({...prev,[ItemId]:prev[ItemId]-1}))

        if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/removefromcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"itemId":ItemId})
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))

        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=> product.id===Number(item))
                totalAmount+=itemInfo.new_price*cartItems[item]
            }
            
        }
        return totalAmount
    }

    const getTotalCartItems=()=>{
        let count=0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                count+=cartItems[item]
            }
        }
        return count
    }

    const contextValue={all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider