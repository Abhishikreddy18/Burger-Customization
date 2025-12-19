import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserRoleEditor from './admin/UserRoleEditor';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
  const user = useSelector(state => state.login.userInfo);
  const navigate=useNavigate()
  if(!localStorage.getItem('token'))
    {
        navigate('/signin')
        return <Link to="/signin">sign in to access</Link>
    }

  let role;
  if (user.isAdmin) {
    role = 'Admin';
  } else if (user.isEmployee) {
    role = 'Employee';
  } else {
    role = 'User';
  }
const username=user.name.length>40?user.name.slice(0,30)+'...':user.name;
  return (
    <>
    
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Name: {username}</h1>
      <p className="text-lg text-gray-600 mb-2">Id: {user.id}</p>
      <p className="text-lg text-gray-600 mb-2">Email: {user.email}</p>
      <p className="text-lg text-gray-600">Role: {role}</p>
    </div>
    { user.isAdmin && (
      <a
        href="/datafiles/usersfromregister.xlsx"
        className="no-underline text-white px-4 py-2 w-fit absolute right-0 mr-3 rounded-lg bg-blue-400"
        download="usersdata"
        aria-label="Download users data"
      >
        <FontAwesomeIcon icon={faArrowDown} /> Download
      </a>
    )
    }
    {
        user.isAdmin&&<UserRoleEditor/>
    }
    
    </>
  );
};

export default Profile;
