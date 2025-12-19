import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './AdminDropdownHeader.css'; // Import the custom CSS
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import IngredientFormModal from './ingredientForm'; // Adjusted import to match component name
import { deleteingredients } from '../../actions/ingredientsAction';

function IngredientModal() {
  const [show, setShow] = useState(false);
  const { initialIngredients } = useSelector(state => state.ingredients);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteingredients(id));
  };

  return (
    <>
      <Button className="bg-white text-black border border-white w-full py-2 hover:bg-[#007bff]" onClick={handleShow}>
        INGREDIENTS
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-scrollable">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>CUSTOM INGREDIENTS</Modal.Title>
        </Modal.Header>
        <Modal.Body className="min-h-56">
          <IngredientFormModal title={'CREATE INGREDIENT'} icon={faPlus} />
          {initialIngredients.map((ingredient) => (
            <div key={ingredient._id} className="bg-white border border-gray-300 rounded-lg mb-2 mt-2 justify-between shadow-lg p-4 flex">
              <div className="flex flex-col mb-3">
                <div className="text-gray-700">Name: {ingredient.name}</div>
                <div className="text-gray-700">Price: {ingredient.price}₹</div>
                <div className="text-gray-700">Count: {ingredient.count}</div>
              </div>
              <div className="flex flex-col justify-between">
                <IngredientFormModal title={'EDIT'} id={ingredient._id} nam={ingredient.name} pric={ingredient.price} icon={faPencil} />
                <button className="w-full py-2 bg-white text-black border border-white" onClick={(e) => { e.preventDefault(); console.log('clicked'); handleDelete(ingredient._id); }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
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

export default IngredientModal;
