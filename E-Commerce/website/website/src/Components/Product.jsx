import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();
  const handleAddToCart=(product)=>{
    const cartItems=JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
    navigate("/cart");
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/get"); // Correct endpoint for products
      setProducts(response.data.products);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch products", "error");
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, []);

  return (
    <>
    <Header/>
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center",color:"red" }}>Product</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // Corrected grid template
          gap: "20px", // Corrected gap property
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id} // Using _id to uniquely identify each product
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={`http://localhost:3000/uploads/${product.productImage}`}
                alt={product.productname}
                style={{
                  width: "100%",
                  height: "200px",
                  objectCover: "fit",
                  overflow:"hidden",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <div style={{ padding: "8px" }}>
                <h3>{product.productname}</h3>
                <p>{product.productDescription}</p>
                <h4>&#8377;{product.productPrice}</h4>
                <button onClick={()=>handleAddToCart(product)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius:"4px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "span 4", textAlign: "center" }}>No products available</div>
        )}
      </div>
    </div>
    </>
  );
}

export default Product;
