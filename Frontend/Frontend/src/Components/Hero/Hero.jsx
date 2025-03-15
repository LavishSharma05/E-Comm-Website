import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import hero_image from '../Assets/hero_image.png'
import arrow_image from '../Assets/arrow.png'


function Hero() {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt=''/>
                    </div>
                    <p>Collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest</div>
                    <img src={arrow_image} alt=''></img>
                </div>
            </div>
            <div className="hero-right" alt="">
                <img src={hero_image} alt=""/>
            </div>
        </div>
    )
}

export default Hero
