import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { createorder } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';
const OrderReview = () => {
  const { cartItems, shippingAddress, paymentMethod } =useSelector(state=>state.cart);
  const {userInfo}=useSelector(state=>state.login)
  const{id}=userInfo
  const [orderPrice,setOrderPrice]=useState(cartItems.reduce((total, item) => total + (item.totalPrice*item.quantity), 0))
  const dispatch=useDispatch();
    const token=localStorage.getItem('token')
  const navigate=useNavigate()
  if(cartItems.length===0)
    {
      navigate("/cart")
    }
  if(!localStorage.getItem('shippingAddress')){
    navigate('/shipping')
  }
  const handlePlaceOrder = () => {

    dispatch(createorder(token,{cartItems, shippingAddress, paymentMethod,orderPrice,id},navigate))
  };

  return (
       <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Order Review</h2>
        <div className="flex justify-between mb-6">
          {/* Cart Items */}
          <div className="w-3/5">
            <h3 className="text-2xl font-semibold mb-4">Cart Items</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 mb-4 border rounded">
                <img src={'https://cdn.dribbble.com/userupload/9781333/file/original-020472ecdda18c6418862b973b0110de.jpg'} alt={item.burger.name} className="w-16 h-16 mr-4"/>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.burger.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.totalPrice}</p>
                </div>
                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-2/5">
            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
            <div className="p-4 border rounded mb-4">
              <p className="text-lg"><strong>Address:</strong> {shippingAddress.address}</p>
              <p className="text-lg"><strong>City:</strong> {shippingAddress.city}</p>
              <p className="text-lg"><strong>Postal Code:</strong> {shippingAddress.postalCode}</p>
              <p className="text-lg"><strong>Country:</strong> {shippingAddress.country}</p>
              <p className="text-lg"><strong>Phone:</strong> {shippingAddress.phone}</p>
              <p className="text-lg"><strong>Payment Method:</strong> {paymentMethod}</p>
            </div>
            <div className="p-4 border rounded mb-4">
              <p className="text-xl font-semibold">Total Price: ₹{orderPrice}</p>
            </div>
            <button 
              onClick={handlePlaceOrder}
              className="w-full py-2 text-lg bg-orange-500 rounded text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderReview;