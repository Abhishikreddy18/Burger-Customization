import React from 'react';

const Card = ({ name, description }) => {
  return (
    <div className="overflow-hidden shadow-lg h-200 w-400 rounded-2xl cursor-pointer transition-transform transform hover:scale-105 bg-white">
      <img
        className=" h-fit w-full object-cover m-2"
        src="https://cdn.dribbble.com/userupload/9781333/file/original-020472ecdda18c6418862b973b0110de.jpg"
        alt="Mr-Burger"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{name}</div>
        {description !== 'N/A' && <p className="text-gray-700 text-sm mb-2">{description}</p>}
      </div>
    </div>
  );
};

export default Card;
