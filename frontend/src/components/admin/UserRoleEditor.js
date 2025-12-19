import React, { useEffect } from 'react'
import { getallUsers } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Usercard from './Usercard';
import Spinner from './../reusable_components/Spinner';
const UserRoleEditor = () => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.user) // Assuming the state has these fields
    const user = useSelector(state => state.login.userInfo);
    useEffect(() => {
        if(users&&user?.token)
            {
                dispatch(getallUsers(user?.token))
            }
            console.log(users)
    }, [dispatch]) 
    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>User Roles</h1>
            {users && users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        user.isAdmin?<></>:<Usercard key={user.id} user={user}/>
                    ))}
                </ul>
            ) : (
                <div>No users found</div>
            )}
        </div>
    )
}

export default UserRoleEditor
