import React from "react";
import "./Hero.css"; // Add custom CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";

function Hero() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="main-content">
        <header className="navbar">
          <h1>Welcome to the Dashboard</h1>
          <input
            type="search"
            placeholder="Search..."
            className="search-bar"
          />
        </header>

        <section className="content-section">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>&#8377;92,12,345</p>
          </div>
          <div className="card">
            <h3>Active Projects</h3>
            <p>24</p>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2024 Dashboard Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Hero;
