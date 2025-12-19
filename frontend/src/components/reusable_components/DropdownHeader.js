import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import IngredientModal from './IngredientModal';

function DropdownHeader({ userInfo, handleLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const userName = userInfo ? (userInfo.name.length > 12 ? userInfo.name.slice(0, 12) + '...' : userInfo.name) : 'Account';

  return (
    <Dropdown
      align="end"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      show={showDropdown}
    >
      <Dropdown.Toggle variant="dark" id="dropdown-basic" className="bg-dark text-white border-0 px-3 py-2">
        {userName}
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-dark w-48 right-0">
        {userInfo ? (
          <Dropdown.Item
            className="text-white hover:bg-slate-800 hover:text-white flex items-center px-4 py-2"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Log Out
          </Dropdown.Item>
        ) : (
          <LinkContainer to="/signin">
            <Dropdown.Item className="text-white hover:bg-slate-800 hover:text-white flex items-center px-4 py-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Sign In
            </Dropdown.Item>
          </LinkContainer>
        )}
        <Dropdown.Divider className="bg-gray-600" />
        <LinkContainer to="/profile">
          <Dropdown.Item className="text-white hover:bg-slate-800 hover:text-white flex items-center px-4 py-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
          </Dropdown.Item>
        </LinkContainer>
        <LinkContainer to="/orders">
          <Dropdown.Item className="text-white hover:bg-slate-800 hover:text-white flex items-center px-4 py-2">
            <FontAwesomeIcon icon={faCartShopping} className="mr-2" /> Orders
          </Dropdown.Item>
        </LinkContainer>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownHeader;
