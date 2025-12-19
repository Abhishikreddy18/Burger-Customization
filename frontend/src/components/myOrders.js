import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../actions/orderAction';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from './reusable_components/Spinner';
const MyOrders = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.userInfo);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.id && user.token) {
            dispatch(getOrders(user.id, navigate, user.token));
        }
    }, [dispatch, navigate]);

    const { loading, orders, error } = useSelector(state => state.orderdetils);
    if(!localStorage.getItem('token'))
        {
            return <div>no orders</div>
        }
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

    if (!orders || orders.length === 0) {
        return <div>No orders found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {orders.map((order) => (
                <div className="border rounded-lg shadow-lg p-4 mb-6 bg-white" key={order._id}>
                    <div className="flex justify-between items-center mb-4">
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
                            Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </div>
                        <div>Status: {order.isDelivered}</div>
                        <div>Payment Method: {order.paymentMethod}</div>
                        <div>Order Date: {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</div>
                        <div>Delivered Date: {order.isDelivered==='Delivered' ? (order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'N/A') : 'Not Delivered'}</div>
                        <div>Ordered-by: {order.shippingAddress.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
