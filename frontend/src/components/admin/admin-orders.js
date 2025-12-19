import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallOrders } from '../../actions/orderAction';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StatusDropdown from './StatusDropdown';
import Spinner from '../reusable_components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
const AdminOrders = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.userInfo);
    const navigate = useNavigate();
    const [localOrders, setLocalOrders] = useState([]);

    useEffect(() => {
        if (user && user.token) {
            dispatch(getallOrders(navigate, user.token));
        }
    }, [dispatch, navigate]);

    const { loading, orders, error } = useSelector(state => state.orderdetils);

    useEffect(() => {
        if (orders) {
            setLocalOrders(orders);
        }
    }, [orders]);

    const handleStatusChange = (id, isDelivered) => {
        setLocalOrders(prevOrders => 
            prevOrders.map(order => 
                order._id === id ? { ...order, isDelivered } : order
            )
        );
    };

    if (loading) {
        return <Spinner/>;
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
                <Link to='/signin'><div>Sign in again</div></Link>
            </div>
        );
    }

    if (!localOrders || localOrders.length === 0) {
        return <div>No orders found.</div>;
    }

    return (
        <div className="container relative mx-auto p-4">
             { (user.isAdmin||user.isEmployee) && (
      <a
    href="/datafiles/orders.xlsx"
    class="no-underline text-white px-4 py-2 w-fit absolute right-4 top-0  rounded-lg bg-blue-500 hover:bg-blue-600"
    download="ordersdata"
    aria-label="Download orders data" 
  >
   <FontAwesomeIcon icon={faArrowDown}/> Download orders data
  </a>
    )}
            {localOrders.map((order) => (
                <div className="border rounded-lg shadow-lg p-4 mb-6 mt-6 bg-white" key={order._id}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-semibold text-lg">
                            <StatusDropdown id={order._id} initialStatus={order.isDelivered} onStatusChange={handleStatusChange} />
                        </div>
                        <div className="font-semibold text-lg">Order ID: {order._id}</div>
                        <div className="font-semibold text-lg">Total Price: ₹{order.totalprice}</div>
                    </div>
                    <div className="mb-4">
                        {order.orderItems.map((item) => (
                            <div className="flex items-center mb-4" key={item._id}>
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                                <div>
                                    <div className="font-semibold">{item.name}</div>
                                    <div>Qty: {item.qty}</div>
                                    <div>Price: ₹{item.price}</div>
                                    <div>Ingredients: {item.selectedIngredients ? Object.keys(item.selectedIngredients).join(', ') : 'N/A'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div>
                            Address: {order.shippingAddress ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}` : 'N/A'}
                        </div>
                        <div>Status: {order.isDelivered }</div>
                        <div>Payment Method: {order.paymentMethod || 'N/A'}</div>
                        <div>Order Date: {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</div>
                        <div>Delivered Date: {order.isDelivered==='Delivered' ? (order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'N/A') : 'Not Delivered'}</div>
                        <div>Ordered-by: {order.shippingAddress ? order.shippingAddress.name : 'N/A'}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOrders;
