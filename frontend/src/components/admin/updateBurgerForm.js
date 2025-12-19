import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBurger } from '../../actions/burgerActions';

const UpdateBurgerForm = () => {
  const { id } = useParams();
  const user = useSelector(state => state.login.userInfo);
  const { burgers } = useSelector(state => state.burgerList);
  const foundburger = burgers.find(burger => burger._id === id);
  console.log(foundburger);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [burger, setBurger] = useState({
    name: '',
    restaurant: '',
    web: 'burger-king',
    description: '',
    ingredients: '',
    addresses: [{
      number: '',
      line1: '',
      country: '',
      line2: '',
      postcode: ''
    }]
  });

  useEffect(() => {
    if (foundburger) {
      setBurger({
        ...foundburger,
        ingredients: foundburger.ingredients.join(', '),
      });
    }
  }, [foundburger]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBurger(prevBurger => ({
      ...prevBurger,
      [name]: value
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = burger.addresses.map((address, i) =>
      i === index ? { ...address, [name]: value } : address
    );
    setBurger(prevBurger => ({
      ...prevBurger,
      addresses: updatedAddresses
    }));
  };

  const addAddress = () => {
    setBurger(prevBurger => ({
      ...prevBurger,
      addresses: [
        ...prevBurger.addresses,
        { number: '', line1: '', country: '', line2: '', postcode: '' }
      ]
    }));
  };

  const removeAddress = (index) => {
    const updatedAddresses = burger.addresses.filter((_, i) => i !== index);
    setBurger(prevBurger => ({
      ...prevBurger,
      addresses: updatedAddresses
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsArray = burger.ingredients.split(',').map(item => item.trim());
      const burgerData = {
        ...burger,
        ingredients: ingredientsArray,
        user: user.id
      };
      dispatch(updateBurger(burgerData, id, navigate));
    } catch (error) {
      console.error('Error updating burger:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Burger</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={burger.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant</label>
            <input type="text" name="restaurant" value={burger.restaurant} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input type="text" name="web" value={burger.web} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={burger.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" required></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
            <input type="text" name="ingredients" value={burger.ingredients} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" required />
          </div>
          {burger.addresses.map((address, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">Address {index + 1}</h3>
                {burger.addresses.length > 1 && (
                  <button type="button" onClick={() => removeAddress(index)} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number</label>
                <input type="text" name="number" value={address.number} onChange={(e) => handleAddressChange(index, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Line 1</label>
                <input type="text" name="line1" value={address.line1} onChange={(e) => handleAddressChange(index, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" name="country" value={address.country} onChange={(e) => handleAddressChange(index, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Line 2</label>
                <input type="text" name="line2" value={address.line2} onChange={(e) => handleAddressChange(index, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <input type="text" name="postcode" value={address.postcode} onChange={(e) => handleAddressChange(index, e)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black sm:text-sm" />
              </div>
            </div>
          ))}
          <button type="button" onClick={addAddress} className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Add Address
          </button>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Update Burger
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBurgerForm;
