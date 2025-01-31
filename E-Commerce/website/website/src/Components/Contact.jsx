
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Contact.css";
import Header from "./Header";

function Contact() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // State to store the result message for Web3Forms
  const [result, setResult] = useState("");

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend API Endpoint
    const backendApi = "http://localhost:3000/contact/save";

    // Web3Forms API Endpoint
    const web3Api = "https://api.web3forms.com/submit";

    try {
      // Send data to your backend
      const backendResponse = await axios.post(backendApi, formData);
      console.log("Backend Save Successful:", backendResponse.data);

      // Show success alert for backend
      Swal.fire({
        title: "Thank You! 👍", 
        text: "Your contact data has been saved.",
        icon: "success",
      });

      // Send data to Web3Forms
      const formDataForWeb3 = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataForWeb3.append(key, value);
      });
      formDataForWeb3.append("access_key", "be36b4df-cfa8-4d9b-8eb5-ef88315c93e8");

      const web3Response = await fetch(web3Api, {
        method: "POST",  
        body: formDataForWeb3,  
      });

// const web3Data = await web3Response.json();

      // if (web3Data.success) {
      //   console.log("Web3Forms Submission Successful:", web3Data);
      //   Swal.fire({
      //     title: "Web3Forms Submission Successful!",
      //     text: "Your contact data has been submitted to Web3Forms.",
      //     icon: "success",
      //   });
      //   // setResult("Form Submitted Successfully to Both APIs!");
      // } else {
      //   console.error("Web3Forms Submission Failed:", web3Data);
      //   setResult("Web3Forms Error: " + web3Data.message);
      // }

      // Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      // Handle errors for backend and Web3Forms
      if (error.response) {
        console.error("Backend Error Response:", error.response.data);
        Swal.fire({
          title: "Backend Submission Failed! 😞", 
          text: error.response.data.message || "An error occurred.",
          icon: "error",
        });
        
      } else if (error.request) {
        console.error("No Response from Backend Server:", error.request);
        Swal.fire({
          title: "Backend Error! 😞",
          text: "No response from the server. Please try again later.",
          icon: "error",
        });
      } else {
        console.error("Error During Backend Submission:", error.message);
        Swal.fire({
          title: "Unexpected Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
    <Header/>
    <center>
    <div className="contact">
      <form onSubmit={handleSubmit} className="form1">
        <h2 className="text-center">
          <b style={{color:"green"}}>Contact Us</b>
        </h2>

        {/* Name input */}
        <label htmlFor="name">
          <b>Enter Your Name :</b>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email input */}
        <label htmlFor="email">
          <b>Enter Your Email :</b>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Phone input */}
        <label htmlFor="phone">
          <b> Your Mobile Number :</b>
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* Address input */}
        <label htmlFor="address">
          <b>Enter Your Address :</b>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        {/* Message input */}
        <label htmlFor="message">
          <b>Enter Your Message :</b>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button type="submit" className="btnform">
          Submit
        </button>
      </form>

      {/* Web3Forms result message */}
      {result && <span>{result}</span>}
    </div>
    </center>
    </>
  );
}

export default Contact;
