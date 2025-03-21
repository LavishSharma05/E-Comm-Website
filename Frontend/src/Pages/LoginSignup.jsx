import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'

function LoginSignup() {
    const [state,setstate]=useState('Login')
    const [formData,setformData]=useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const login=async()=>{
        console.log("Login function executed",formData)

        let responseData;

        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        }).then((resp)=>resp.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token)
            window.location.replace('/')
        }
        else{
            alert(responseData.errors)
        }
    }

    const signup=async()=>{
        console.log("signup function executed",formData)

        let responseData;

        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        }).then((resp)=>resp.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token)
            window.location.replace('/')
        }
        else{
            alert(responseData.errors)
        }
    }

    return (
        <div className="loginsignup">
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className='loginsignup-fields'>
                    {state==="Sign Up"? <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name'/> :<></>}
                    <input name='email' value={formData.email} onChange={changeHandler}  type='email' placeholder='Your Email'/>
                    <input name='password' value={formData.password} onChange={changeHandler}  type='password' placeholder='Your Password'/>
                </div>
                <button onClick={()=>{state==='Login'? login() : signup()}}>Continue</button>
                {state==="Sign Up"? <p className="loginsignup-login">Already have an account? <span onClick={()=>{setstate("Login")}}>Log In</span></p>
                 :<p className="loginsignup-login">Create an account? <span onClick={()=>{setstate("Sign Up")}}>Click here</span></p>}

                <div className="loginsignup-agree">
                    <input type='checkbox' name='' id=''/>
                    <p>By continuing, i agree to use the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
