import React, { useState } from 'react';

const Accordion = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item mb-4 p-4 ">
     <button
  onClick={handleToggle}
  className="text-left flex items-center"
  style={{ width: "fit-content" }}
>
  <h2 className="text-xl font-semibold mr-2">{item.name}</h2>
  <span>{isOpen ? 'less' : 'more'}</span>
</button>
      {isOpen && (
        <div className="accordion-content mt-2">
          <p>{item.description}</p>
          <h3 className="mt-2 font-semibold text-sm">Selected Ingredients:</h3>
          <p className="text-sm">
            {Object.keys(item.selectedIngredients).map((ingredient, index) => (
              <span key={index}>
                {ingredient}: {item.selectedIngredients[ingredient]}
                {index < Object.keys(item.selectedIngredients).length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
