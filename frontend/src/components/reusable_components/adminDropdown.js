import React,{useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import IngredientModal from './IngredientModal';
import './AdminDropdownHeader.css'; // Import the custom CSS
function AdminDropdownHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAdmin, isEmployee } = useSelector((state) => state.login.userInfo);

  return (
    <Dropdown align="end"   
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
    show={showDropdown}>
      <Dropdown.Toggle variant="dark" id="dropdown-basic" className="bg-dark text-white border-0 px-3 py-2">
        AdminControls
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-custom">
        {(isAdmin || isEmployee) && (
          <LinkContainer to="/admin-orders">
            <Dropdown.Item className="dropdown-item-custom flex items-center px-4 py-2">
              <FontAwesomeIcon icon={faHandPointRight} className="mr-2" /> Orders
            </Dropdown.Item>
          </LinkContainer>
        )}
        <Dropdown.Divider className="bg-gray-600" />
        {isAdmin && (
          <LinkContainer to="/addburgers">
            <Dropdown.Item className="dropdown-item-custom flex items-center px-4 py-2">
              <FontAwesomeIcon icon={faBurger} className="mr-2" /> ADD Burgers
            </Dropdown.Item>
          </LinkContainer>
        )}
         <Dropdown.Divider className="bg-gray-600" />
        {(isAdmin || isEmployee) &&<div className="dropdown-item-custom  flex items-center p-0">
          <IngredientModal />
        </div>}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AdminDropdownHeader;
