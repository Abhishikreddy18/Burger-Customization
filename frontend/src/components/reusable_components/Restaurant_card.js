import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart } from '../../actions/cartAction';
import ProtectedRoute from '../../protectedroutes/protectedRoute';
const RestaurantList = () => {
  const { id } = useParams();
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const { burgers } = useSelector(state => state.burgerList);
  const foundBurger = burgers ? burgers.find(r => r._id === id) : null;
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [totalPrice, setTotalPrice] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const {initialIngredients}=useSelector(state=>state.ingredients)
  useEffect(() => {
    if (foundBurger) {
      const initialSelectedIngredients = {};
      foundBurger.ingredients.forEach(ingredient => {
        initialSelectedIngredients[ingredient] = 1;
      });
      setSelectedIngredients(initialSelectedIngredients);

      const initialPrice = foundBurger.ingredients.reduce((acc, ingredient) => {
        const found = initialIngredients.find(item => item.name === ingredient);
        return acc + (found ? found.price : 0);
      }, 100);
      setTotalPrice(initialPrice);
    }
  }, [foundBurger]);

  const handleIncrement = (ingredient) => {
    setSelectedIngredients(prevIngredients => {
      const newCount = (prevIngredients[ingredient] || 0) + 1;
      if (newCount > 3) return prevIngredients;
      const found = initialIngredients.find(item => item.name === ingredient);
      setTotalPrice(prevPrice => prevPrice + (found ? found.price : 0));
      return { ...prevIngredients, [ingredient]: newCount };
    });
  };

  const handleDecrement = (ingredient) => {
    setSelectedIngredients(prevIngredients => {
      if (prevIngredients[ingredient] > 0) {
        const newCount = prevIngredients[ingredient] - 1;
        const found = initialIngredients.find(item => item.name === ingredient);
        setTotalPrice(prevPrice => prevPrice - (found ? found.price : 0));
        return { ...prevIngredients, [ingredient]: newCount };
      }
      return prevIngredients;
    });
  };

  const handleAddToCart = async () => {
    if (id) {
        console.log(id)
        if(localStorage.getItem('token'))
          {
      await dispatch(addtocart(id, quantity,selectedIngredients,totalPrice));}
      navigate(`/cart/${id}?qty=${quantity}`);
    }
  };
  

  return (
    <div>
      {foundBurger ? (
        <div className="min-h-screen flex flex-col items-center">
          <div className="bg-teal-50 shadow-lg rounded-lg h-full p-14 max-w-md mt-9 mx-auto">
            <div className="relative flex justify-center">
              <img
                src="https://www.completelydelicious.com/wp-content/uploads/2014/07/IMG_7994-200x200.jpg"
                alt="Burger"
                className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-12"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">{foundBurger.name}</h2>
            </div>
            <p className="text-center text-gray-600 mt-4">
              {foundBurger.description}
            </p>
            <p className="text-center text-gray-600 mt-4">
              <a href={`https://${foundBurger.web}`} target="_blank" rel="noopener noreferrer">
                {foundBurger.web}
              </a>
            </p>
          </div>

          <div className="flex mb-5 p-6 justify-between">
            <div className="bg-white mr-24 shadow-lg rounded-lg max-w-md mt-9 mx-auto p-4 h-full mb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Ingredients</h3>
              <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                {initialIngredients.map((ingredient) => (
                  <div key={ingredient.name} className="items-center space-x-2 mb-2">
                    <div className='flex'>
                      <span className="text-gray-700">{ingredient.name} - </span>
                      <span className="text-gray-700">{ingredient.price}₹</span>
                    </div>
                    <div className='float-right'>
                      <button
                        className="bg-red-500 text-white text-center mr-1 px-1 rounded"
                        onClick={() => handleDecrement(ingredient.name)}
                      >
                        -
                      </button>
                      <span className="text-gray-700">{selectedIngredients[ingredient.name] || 0}</span>
                      <button
                        className="bg-teal-500 text-white px-1 ml-1 text-center rounded"
                        onClick={() => handleIncrement(ingredient.name)}
                        disabled={(selectedIngredients[ingredient.name] || 0) >= 3}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg max-w-md mt-9 mx-auto p-4 h-full mb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Burger</h3>
              <div className="grid grid-cols-2 gap-4 min-h-full max-h-40 overflow-y-auto">
                {Object.keys(selectedIngredients).map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <span className="text-gray-700">{ingredient}</span>
                    <span className="text-gray-700">x{selectedIngredients[ingredient]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h4 className="text-xl font-semibold text-gray-800">Total Price:</h4>
                <span className="text-xl text-gray-800">{totalPrice * quantity}₹</span>
              </div>
              <div className='flex'>
                <Dropdown quantity={quantity} setQuantity={setQuantity} />
                <button
                  id="addToCartButton"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
  
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No restaurant found</p>
      )}
    </div>
  );
};

export default RestaurantList;
