import React from 'react';
import './About.css'; 
import Header from './Header'; // Assuming Header component exists

const About = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">Welcome to our E-commerce website! We are dedicated to providing you with the best online shopping experience. 
           Explore a wide range of products, seamless navigation, and secure payment options. 
           Our mission is to make shopping easy, reliable, and enjoyable for everyone.</p>
        <div className="about-highlights">
          <h2 className="about-subtitle">Why choose us?</h2>
          <div className="highlight-cards">
            <div className="card">
              <h3>Wide Selection</h3>
              <p>Vast selection of high-quality products at competitive prices.</p>
            </div>
            <div className="card">
              <h3>Fast Shipping</h3>
              <p>Fast and reliable shipping to ensure timely delivery.</p>
            </div>
            <div className="card">
              <h3>Exceptional Support</h3>
              <p>Exceptional customer service to assist you at every step.</p>
            </div>
            <div className="card">
              <h3>User-Friendly</h3>
              <p>User-friendly interface for a hassle-free shopping experience.</p>
            </div>
          </div>
        </div>
        <p className="about-thankyou">Thank you for choosing our platform. We look forward to serving you!</p>
      </div>
    </>
  );
};

export default About;