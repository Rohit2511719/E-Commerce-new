import React, { useEffect } from "react";
import { useState } from "react";
import Hero from "./Hero";
import './Dashboard.css';
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Slider from "./Slider";
import Category from "./Category";
import Product from "./Product";
import ContactUs from "./ContactUs";
function Dashboard() {
    const location = useLocation();
    const navigate=useNavigate();
    const {name} = location.state || {};

    const [currentview, setCurrentview]= useState("Hero");
// check if the token exixts on component 
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            navigate("/");
            }
    },[navigate]);
    const handleMenuClick=(view)=>{
        setCurrentview(view);
    };
    const renderContent=()=>{
        switch(currentview){
            case "Hero":
                return <div><Hero/></div>;
            case "Logo":
                return <div><Logo/></div>;
            case "Slider":
                return <div><Slider/></div>;
            case "Category":
                return <div><Category/></div>;
            case "Product":
                return <div><Product/></div>;
            case "ContactUs":
                return <div><ContactUs/></div>;
            default :
                return <div><Hero/></div>;
        }
    }
    const handleLogOut=()=>{
        localStorage.removeItem("token");
        navigate("/login");
        
    }
    return (
        <div className="dashboard-container">
            {/* sidebar */}
            <div className="sidebar">
                <h3>Sidebar Menu</h3>
                <ul>
                    <li onClick={() => handleMenuClick("Hero")}>Dashboard</li>
                    <li onClick={() => handleMenuClick("Logo")}>Logo</li>
                    <li onClick={() => handleMenuClick("Slider")}>Slider</li>
                    <li onClick={() => handleMenuClick("Category")}>Category</li>
                    <li onClick={() => handleMenuClick("Product")}>Product</li>
                    <li onClick={() => handleMenuClick("ContactUs")}>Contact Detail</li>
                </ul>
            </div>
            {/* main dashboard Area */}
            <div className="main-content">
                {/* header */}
                <header className="header">
                    <div className="profile-section">
                        <h2 className="view-title">Dashboard</h2>
                        <div>
                        <img src="" alt="profile-picture" />
                        <span className="profile-name">{name ? name: "Guest"}</span>
                        <button onClick={handleLogOut} style={{backgroundColor:"red",borderRadius:"5px",color:"white"}}>LogOut</button>

                        </div>
                    </div>
                </header>
                <main className="content">
                {renderContent()}
                </main>
            </div>
        </div>
    )
};
export default Dashboard;