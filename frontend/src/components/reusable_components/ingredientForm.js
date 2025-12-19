import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './AdminDropdownHeader.css'; // Import the custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createingredient,updateingredient } from '../../actions/ingredientsAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function IngredientFormModal({ title, icon,id,nam ,pric }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(nam);
  const [price, setPrice] = useState(pric);
  const handleClose = () => setShow(false);
  const handleShow = () => { setShow(true); }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title==='EDIT')
        {
            dispatch(updateingredient({id, name, price }, navigate, handleClose))
        }
    else if (title==='CREATE INGREDIENT'&&name && price) {
      dispatch(createingredient({ name, price }, navigate, handleClose));

  }};

  return (
    <>
      <Button className='w-full py-2' onClick={handleShow}>
        <FontAwesomeIcon icon={icon} /> {title}
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>INGREDIENT FORM</Modal.Title>
        </Modal.Header>
        <Modal.Body className=' min-h-56'>
          <form  className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md space-y-4 h-96">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-700">Price</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} name="price" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div> 
            <button type="submit" onClick={handleSubmit} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{title}</button>
          </form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IngredientFormModal;
