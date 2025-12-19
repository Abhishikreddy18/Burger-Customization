import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentmethod } from '../actions/cartAction';
import { useDispatch,useSelector } from 'react-redux';
const PaymentScreen = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [method,setmethod]=useState()
  const {cartItems}=useSelector(state=>state.cart)
  if(cartItems.length===0)
    {
      navigate("/cart")
    }
  if(!localStorage.getItem('shippingAddress')){
    navigate('/shipping')
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(paymentmethod(method))
    navigate('/ordercheck')
  }
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Payment Method</h2>
        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center mb-6">
            <input 
              type="radio" 
              id="paypal" 
              name="paymentMethod" 
              value="PayPal" 
              onChange={(e)=>setmethod(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="paypal" className="ml-2 block text-sm font-medium text-gray-700">
              PayPal
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 text-lg bg-indigo-600 rounded text-white mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
}

export default PaymentScreen;
