import React from 'react'
import RoleDropdown from './RoleDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const Usercard = (user) => {
    let role;
    const {token}=useSelector(state=>state.login.userInfo)
    const dispatch=useDispatch()
if(user.user.isAdmin)
        {
           return null;
        }else if(user.user.isEmployee)
        {
            role="Employee"
        }else{
            role="User"
        }

  return (
<div className="bg-white border border-gray-300 rounded-lg justify-between shadow-lg p-4 flex">
    <div>
  <div className="font-semibold">Name: {user.user.name}</div>
  <div className="ml-4">
    <h5 className="text-lg font-semibold">Id: {user.user._id}</h5>
    <p className="text-gray-700">Email: {user.user.email}</p>

    <p className="text-gray-700">Role: {role}</p>

  </div>
  </div>
  <div className='flex flex-col justify-between'>
    <RoleDropdown id={user.user._id} initialissEmployee={user.user.isEmployee}/>
    <button  onClick={(e)=>{e.preventDefault(); dispatch(deleteUser(user.user._id,token))}} className="m-2 bg-red-500 text-white px-2 py-1 mb-1 rounded hover:bg-blue-500">
        <FontAwesomeIcon icon={faTrash} />delete
    </button>
    </div>
</div>

  )
}

export default Usercard
