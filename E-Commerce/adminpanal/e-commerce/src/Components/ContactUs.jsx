import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import './ContactUs.css';
function ContactUs(){
    const [contact, setContact] = useState([]);
    const fetchContacts = async()=>{
        try{
            const response = await axios.get("http://localhost:3000/contact/getcontact");
            console.log(response);
            setContact(response.data.contacts);
        }
        catch(error){
            Swal.fire({
          title:"Failed to fetch Contacts",
          icon :"error"
        });
        }
    };
    useEffect(()=>{
        fetchContacts();
    },[]
    );
   
    return(
        <div className="contact-details">
            <h1>Contact Details..</h1>
            <table className="contact-table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address</td>
                        <td>Message</td>
                    </tr>
                </thead>
                <tbody>

            {contact.map((item)=>(
                 <tr key={item._id}>
                 <td data-label="Name">{item.name}</td>
                 <td data-label="Email">{item.email}</td>
                 <td data-label="Phone">{item.phone}</td>
                 <td data-label="Address">{item.address}</td>
                 <td data-label="Message">{item.message}</td>
             </tr>
            ))}  
                </tbody>
            </table>
        </div>
    )
};
export default ContactUs;