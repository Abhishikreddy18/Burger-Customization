import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateOrder } from '../../actions/orderAction';

function StatusDropdown({ id, initialStatus, onStatusChange }) {
    const [isDelivered, setIsDelivered] = useState(initialStatus);
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.userInfo);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        if (initialStatus !== isDelivered) {
            dispatch(UpdateOrder(id, isDelivered, user.token));
            onStatusChange(id, isDelivered); // Ensure this is called correctly
        }
    }, [isDelivered]);

    return (
        <Dropdown align="end" onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)} show={showDropdown}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="bg-dark text-white border-0 px-3 py-2">
                {isDelivered }
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark w-48 right-0">
                <Dropdown.Item 
                    className="text-white hover:bg-slate-800 flex items-center px-4 py-2" 
                    onClick={() => setIsDelivered('Pending')}>
                    <FontAwesomeIcon icon={faHandPointRight} className="mr-2" />Pending
                </Dropdown.Item>
                <Dropdown.Divider className="bg-gray-600" />
                <Dropdown.Item 
                    className="text-white hover:bg-slate-800 flex items-center px-4 py-2" 
                    onClick={() => setIsDelivered('Processing')}>
                    <FontAwesomeIcon icon={faHandPointRight} className="mr-2" />Processing
                </Dropdown.Item>
                <Dropdown.Divider className="bg-gray-600" />
                <Dropdown.Item 
                    className="text-white hover:bg-slate-800 flex items-center px-4 py-2" 
                    onClick={() => setIsDelivered('Cancelled')}>
                    <FontAwesomeIcon icon={faHandPointRight} className="mr-2" />Cancelled
                </Dropdown.Item>
                <Dropdown.Divider className="bg-gray-600" />
                <Dropdown.Item 
                    className="text-white hover:bg-slate-800 flex items-center px-4 py-2"
                    onClick={() => setIsDelivered('Delivered')}>
                    <FontAwesomeIcon icon={faBurger} className="mr-2" />Delivered
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default StatusDropdown;
