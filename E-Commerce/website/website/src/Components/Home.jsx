import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Product from "./Product";
// import Contact from "./Contact";
// import Cart from "./Cart"
function Home(){
    return(
        <div>
            <Header/>
            <Slider/>
            <Product/>
            {/* <Cart/> */}
            {/* <Contact/> */}
        </div>  
    )
};
export default Home;