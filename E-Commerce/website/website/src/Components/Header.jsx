
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa"; // Importing shopping cart icon
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from React Router
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Header() {
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartQuantity(cartItems.length);

    // Listen for storage updates on other tabs/windows
    const handleStorageChange = () => {
      const updatedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartQuantity(updatedCartItems.length);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [logos, setLogos] = useState([]);

  // API call to get logo
  const fetchLogos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logo/logo");
      setLogos(response.data.logos);
    } catch (error) {
      console.error("Failed to fetch logos", error);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  // Ensure logos data is available before trying to render the logo
  const logoImage = logos.length > 0 ? logos[0].logoImage : "";

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          {/* Left Side - Logo and Navigation */}
          <Nav className="me-auto">
            {logoImage && (
              <Nav.Link
                as="span"
                onClick={() => navigate("/home")}
                className="navitems"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`http://localhost:3000/uploads/${logoImage}`} // Ensure this path is correct
                  alt={logos[0]?.logoname} // Safely access logoname
                  style={{ height: "30px", borderRadius: "50%", width: "50px" }}
                />
              </Nav.Link>
            )}
            <Nav.Link as="span" onClick={() => navigate("/home")} className="navitems" style={{ cursor: "pointer" }}>
              Home
            </Nav.Link>
            <Nav.Link as="span" onClick={() => navigate("/about")} className="navitems" style={{ cursor: "pointer" }}>
              About Us
            </Nav.Link>
            <Nav.Link as="span" onClick={() => navigate("/category")} className="navitems" style={{ cursor: "pointer" }}>
              Category
            </Nav.Link>
            <Nav.Link as="span" onClick={() => navigate("/contact")} className="navitems" style={{ cursor: "pointer" }}>
              Contact Us
            </Nav.Link>
            <Nav.Link as="span" onClick={() => navigate("/product")} className="navitems" style={{ cursor: "pointer" }}>
              Product
            </Nav.Link>
            <Nav.Link as="span" onClick={() => navigate("/orders")} className="navitems" style={{ cursor: "pointer" }}>
              Orders
            </Nav.Link>
          </Nav>

          {/* Right Side - Cart Icon */}
          <Nav className="ms-auto">
            <Nav.Link
              as="span"
              onClick={() => navigate("/cart")}
              className="navitems"
              style={{ cursor: "pointer" }}
            >
              <FaShoppingCart style={{ color: "white", fontSize: "24px" }} /> {/* Cart Icon */}
              <b style={{ marginLeft: "8px" }}>Cart</b>
              {cartQuantity > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "110px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {cartQuantity}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;



