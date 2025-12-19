import React from 'react';
import { FormControl } from 'react-bootstrap';

const Dropdown = ({ quantity, setQuantity }) => {

  return (
    <FormControl
    as="select"
    className="mr-6 w-24  h-12 "
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    
  >
    {[...Array(10).keys()].map(i => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ))}
  </FormControl>
  );
};

export default Dropdown;
