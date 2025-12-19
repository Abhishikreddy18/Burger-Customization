import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removecart } from '../actions/cartAction';
const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);
    const dispatch=useDispatch();
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleProceedToCheckout = () => {
    navigate('/shipping');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4 p-4 border rounded shadow-sm">
                <div className=" flex justify-between">
                <div className="flex items-center">
                  <img src={'https://cdn.dribbble.com/userupload/9781333/file/original-020472ecdda18c6418862b973b0110de.jpg'} alt={item.burger.name} className="w-16 h-16 mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">{item.burger.name}</h2>
                    <p className="mt-2">Quantity: {item.quantity}</p>
                    <p className="mt-2">Price: ₹{item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={()=>{
                    dispatch(removecart(item.id));
                  }} className="text-red-500">
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                  </button>
                  </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 lg:pl-4 flex flex-col ">
            <div className="p-4 border rounded shadow-sm mb-4">
              <h2 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h2>
            </div>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded"
              onClick={handleProceedToCheckout}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
