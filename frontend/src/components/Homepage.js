import React from 'react';
import Card from './Card';
import Shimmer from './reusable_components/Shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteBurger as removeBurger } from '../actions/burgerActions';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { loading, error, burgers } = useSelector(state => state.burgerList);
  const userInfo = useSelector(state => state.login?.userInfo);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const deleteBurger = (id) => {
    if (userInfo?.isAdmin) {
      dispatch(removeBurger(id,navigate));
    }
  };

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 min-h-screen">
      {burgers.map(item => (
        <div key={item._id} className="relative">
          {userInfo?.isAdmin && (
            <div className="flex justify-between items-center">
              <button className="m-2 bg-red-500 text-white px-2 py-1 mb-1 rounded" onClick={(e) => { e.preventDefault(); deleteBurger(item._id); }}>
                <FontAwesomeIcon icon={faTrash} />
                <span className="ml-1">Delete Burger</span>
              </button>
              <Link to={`/updateburgers/${item._id}`} className="no-underline text-black items-center mb-2 justify-center h-1 hover:text-blue-500">
                <span className=" m-2 bg-slate-600 text-white mb-2  px-2 py-1 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faPencil} />
                  <span className="ml-1">Edit Burger</span>
                </span>
              </Link>
            </div>
          )}
          <Link to={`/burger/${item._id}`} className="no-underline text-black hover:text-blue-500">
            <Card {...item} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
