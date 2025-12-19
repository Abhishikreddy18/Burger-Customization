import React, { useRef, useState } from 'react';
import { saveshippingaddress } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Shipping = () => {
    const userRef = useRef(null);
    const navigate=useNavigate()
    const {cartItems}=useSelector(state=>state.cart)
    if(cartItems.length===0)
      {
        navigate("/cart")
      }
    const {shippingAddress}=useSelector(state=>state.cart)
    const [address, setAddress] = useState(shippingAddress?.address);
    const [city, setCity] = useState(shippingAddress?.city);
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
    const [country, setCountry] = useState( shippingAddress?.country);
    const [phone, setPhone] = useState( shippingAddress?.phone);
    const [name, setName] = useState(shippingAddress?.name);
  const dispatch=useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
       dispatch( saveshippingaddress({name, address, city, postalCode, country, phone }))
       navigate('/payment')
        console.log({name, address, city, postalCode, country, phone });
    }
  
    return (
        <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-8">Shipping Address</h2>
                <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                        
                        <input
                            type="text"
                            id="address"
                            autoComplete="on"
                            ref={userRef}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        
                        <input
                            type="text"
                            id="address"
                            autoComplete="on"
                            ref={userRef}
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Address
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            id="city"
                            autoComplete="on"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="city" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            City
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="number"
                            id="postalCode"
                            autoComplete="on"
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="postalCode" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Postal Code
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            id="country"
                            autoComplete="on"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="country" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Country
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="number"
                            id="phone"
                            autoComplete="on"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 text-lg bg-indigo-600 rounded text-white mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Shipping;
