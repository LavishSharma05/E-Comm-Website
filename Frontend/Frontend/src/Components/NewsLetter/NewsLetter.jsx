import React from 'react'
import './NewsLetter.css'

function NewsLetter() {
    return (
        <div className="NewsLetter">
            <h1>Get Exclusive Information On your email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input type='email' placeholder='Your Email id'/>
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter
