import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logouthandler } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import DropdownHeader from './reusable_components/DropdownHeader';
import AdminDropdownHeader from './reusable_components/adminDropdown';
function Header() {
  const [userInfo, setUserInfo] = useState(null);
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin,isEmployee } = useSelector(state => state.login.userInfo);
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo');
    if (userInfoFromStorage) {
      setUserInfo(JSON.parse(userInfoFromStorage));
    } else {
      setUserInfo(null);
    }
  }, [login.success]); // Trigger effect on login success

  const handleLogout = () => {
    dispatch(logouthandler(navigate));
    setUserInfo(null);
  };
 
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            MR.BURGER/Customize
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto">
        {(isAdmin||isEmployee)&&<AdminDropdownHeader userInfo={userInfo} handleLogout={handleLogout}/>}
        
          <LinkContainer to="/cart">
            <Nav.Link>
              <FontAwesomeIcon icon={faCartShopping} /> Cart
            </Nav.Link>
          </LinkContainer>
          <DropdownHeader userInfo={userInfo} handleLogout={handleLogout}/>
        </Nav>
      </Container>
    </Navbar>
  );
}
 
export default Header;
