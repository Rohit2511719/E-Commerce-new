import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import './Signup.css';
import axios from 'axios';
import Swal from 'sweetalert2';
const Signup = () => {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  });

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormData((prevData) =>({
      ...prevData,
      [name]:value,
    }));
  };
    const handlesubmit= async(e) => {
      e.preventDefault();
      console.log("form data", FormData);

      // Api end point 
      const Api = 'http://localhost:3000/user/signup';
      try{
        // send a post request to api
        const response = await axios.post(Api, FormData);
        console.log('Signup Successfulll',response.data);
        Swal.fire({
          title:"Registered Sucessfull!",
          icon :"success"
        });
        navigate('/login');
      }
      catch(error){
        if(error.response){
          console.log('Signup Failed', error.response.data);
        }
        else if(error.request){
          console.error('No responce from server', error.request);
        }
        else{
          console.error('Error During Signup', error.message);
        }
      }    
    };
    const loginRedirect=()=>{
      navigate("/login");
    };

  return (
    <div className="main">
    <div className="img1">
        <img src="./src/assets/aaaa.jpeg" alt="Imageeeee"/>
    </div>
    <div className="signup">
        <form onSubmit={handlesubmit} className="form1">
            <h2 className="text-center">Signup Here..</h2>
            <label>Enter Your Name</label>
            <input required type="text" name="name" value={FormData.name} onChange={handleChange} />
            <label>Enter Your Email</label>
            <input required type="email" name="email" value={FormData.email} onChange={handleChange}/>
            <label>Create Password</label>
            <input required type="password" name="password" value={FormData.password} onChange={handleChange}/> <br />
            <br />
            <button type="submit" className="btnform">Submit</button><br></br>
            <button className="btnform" onClick={loginRedirect}>Login</button>
        </form>
    </div>
    </div>
  );
};

export default Signup;