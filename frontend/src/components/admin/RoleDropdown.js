import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole } from '../../actions/userAction';

function StatusDropdown({ id, initialissEmployee}) {
    const [isEmployee, setIsEmployee] = useState(initialissEmployee);
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.userInfo);
    const [showDropdown, setShowDropdown] = useState(false);
   useEffect(() => {
        if (initialissEmployee!== isEmployee) {
            dispatch(updateUserRole(id, isEmployee, user.token));
        }
    }, [isEmployee]);
    return (
        <Dropdown align="end" onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false) }show={showDropdown}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="bg-dark text-white border-0 px-3 py-2">
                {isEmployee ? 'Employee' : 'User'}
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark w-48 right-0">
                <Dropdown.Item 
                    className="text-white hover:bg-slate-800 flex items-center px-4 py-2" 
                    onClick={() => setIsEmployee(false)}>
                    <FontAwesomeIcon icon={faHandPointRight} className="mr-2" />User
                </Dropdown.Item>
                <Dropdown.Divider className="bg-gray-600" />
                <Dropdown.Item 
                    className="text-white hover:bg-slate-800 flex items-center px-4 py-2"
                    onClick={() => setIsEmployee(true)}>
                    <FontAwesomeIcon icon={faHandPointRight} className="mr-2" />Employee
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default StatusDropdown;
