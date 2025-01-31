import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import './Signup.css';
import axios from 'axios';
import Swal from 'sweetalert2';
const Login = () => {
 
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
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
      const Api = 'http://localhost:3000/user/login';
      try{
        // send a post request to api
        const response = await axios.post(Api, FormData);
        // console.log("token here",response);
        

        console.log('Login Successfulll',response.data);
        const name=response.data.User.name;
        Swal.fire({
          title:"Login Sucessfull!",
          icon :"success"
        });
        const token=response.data.token;
        localStorage.setItem("token",token);
        console.log(token);
        
        navigate('/dashboard',{state:{name}});
        
      }
      catch(error){
        if(error.response){
          console.log('Login Failed', error.response.data);
        }
        else if(error.request){
          console.error('No responce from server', error.request);
        }
        else{
          console.error('Error During Login', error.message);
        }
      }
       
    };
    const signupRedirect=()=>{
      navigate("/");
    };

  return (
    <div className="main">
    <div className="img1">
        <img src="./src/assets/aaaa.jpeg" alt="Imageeeee"/>
    </div>
    <div className="signup">
        <form onSubmit={handlesubmit} className="form1">
            <h2 className="text-center">Login Here..</h2>
            <label>Enter Your Email</label>
            <input  type="email" name="email" value={FormData.email} onChange={handleChange}/>
            <label>Enter Password</label>
            <input  type="password" name="password" value={FormData.password} onChange={handleChange}/> <br />
            <br />
            <button type="submit" className="btnform">Login</button><br></br>
            <button className="btnform" onClick={signupRedirect}>Signup</button>
        </form>
    </div>
    </div>
  );
};

export default Login;