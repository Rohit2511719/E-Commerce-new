import React,{useEffect, useState} from "react";
import './Cart.css';

 function Cart() {
    const [cartItems,setCartItems]=useState([]);
    const [totalPrice,setTotalPrice]=useState(0);

    useEffect(()=>{
        const storedItems=JSON.parse(localStorage.getItem('cartItems')) || [];
        const updateItems=storedItems.map((item)=>({
            ...item,
            quantity:item.quantity || 1,

        }));
        setCartItems(updateItems);
        // toatl
        const initialTotal=updateItems.reduce(
            (total,item)=>total +item.productPrice*item.quantity,0
        );
        setTotalPrice(initialTotal)

    },[]);
    // Quantity Change
    const handleQuantityChange=(index,newQuantity)=>{
        const updateItems=[...cartItems];
        updateItems[index].quantity=newQuantity;
        setCartItems(updateItems);
        localStorage.setItem('cartItems',JSON.stringify(updateItems));
       // Recalculate Total
        const newTotal=updateItems.reduce(
            (total,item)=>total +item.productPrice*item.quantity,0
        );
        setTotalPrice(newTotal)
    }
    // Remove Item
const handleRemoveItem=(index)=>{
    const updateItems=cartItems.filter((_,i)=>i !==index);
    setCartItems(updateItems);
    localStorage.setItem("cartItems",JSON.stringify(updateItems));
    // Recalculate total
    const newTotal=updateItems.reduce(
        (total,item)=>total +item.productPrice*item.quantity,0
    );
    setTotalPrice(newTotal);
}

// Payment methode

const handlePayNow=()=>{
    const options={
        key:"rzp_live_HGCsLV5PjSYo8F",
        amount:totalPrice*100, //
        currency:"INR",
        name:"Rohit Kumar Rai",
        description:"Order Payment",
        image:"https://yourlogo.com",
        // order_id:"order_PUChQyLZn9Edd",
        handler:function(response){
            alert("Payment Successfull! payment Id"+ response.razorpay_payment_id)
        },
        prefill:{
            name:"Customer Name",
            email:"rai@gmail.com",
            contact:"9219036247",
        },
        notes:{
            address:"Lucknow",
        },
        theme:{
            color:"#F37254",
        },
        
    };
    const razorpay=new window.Razorpay(options);
    razorpay.open();
};

    return(
        <div className="cart-container">
            <h2 className="cart-title">Cart Details</h2>
            {cartItems.length>0?(
                <>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.productname}</td>
                                <td>{item.productPrice}</td>
                                <td>{item.productcategory}</td>
                                <td><input type="number" min="1"
                                value={item.quantity} className="quantity-input"
                                onChange={(e)=>handleQuantityChange(index,Number(e.target.value))}/></td>
                                <td>&#8377;{item.productPrice *item.quantity}</td>
                                <td><button onClick={()=>handleRemoveItem(index)} className="remove-btn">Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="cart-summery">
                    <h3>Total: <b>&#8377;</b>{totalPrice}</h3>
                    <button className="pay-now-btn" onClick={handlePayNow}>Pay Now</button>

                </div>



                </>

            ):
            (
            <p> No Items</p>
            )}

        </div>

    );
 }
 export default Cart;