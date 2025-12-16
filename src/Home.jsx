 
import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
function Home(){
    return(
        <div className="home">
             
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-text">
                    <h1>Welcome to My SHoppe BAy </h1>
            <p>Shop the best products in Electronics, Fashion, Home & more.</p>
                    <Link to="/products" >
                        <button className="shop-btn">Shop Now</button>
                    </Link>
                </div>

                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" alt="Electronics gadgets" className="img"></img>
                </div>
            </section>      {/*Hero Section Closes */}
            
            {/* Features Section */}
            <section className="features">
                <div className="feature">
                    <h4>Responsive</h4>
                    <p>Customer Service</p>
                </div>
                <div className="feature">
                    <h4>Secure</h4>
                    <p>Certified marketplace</p>
                </div>
                <div className="feature">
                    <h4>Shipping</h4>
                    <p>Fast delivery worldwide</p>
                </div>
                <div className="feature">
                    <h4>Transparent</h4>
                    <p>Easy return policy</p>
                </div>
            </section>      {/* Features Section Closes*/}
        </div>      
    )
}
export default Home