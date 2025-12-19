import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RestaurantList from './components/reusable_components/Restaurant_card';
import useBody from './utils/usebody';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import PublicRoute from './protectedroutes/publicRoutes';
import PaymentScreen from './components/paymentScreen';
import OrderReview from './components/orderReview';
import MyOrders from './components/myOrders';
import AdminOrders from './components/admin/admin-orders';
import CreateBurgerForm from './components/admin/CreateBurgerForm';
import UpdateBurgerForm from './components/admin/updateBurgerForm';
import Profile from './components/Profile';
import ProtectedRoute from './protectedroutes/protectedRoute';
function App() {
  const {allResults} = useBody();
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-4 mb-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
         
          <Route path="/cart/:id?" element={<ProtectedRoute><Cart/></ProtectedRoute> } />
          <Route path="/signin" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/burger/:id" element={<RestaurantList  />} />
          <Route path="/shipping" element={<><Shipping/></>}/>
          <Route path="/payment" element={<><PaymentScreen/></>}/>
          <Route path="/ordercheck" element={<><OrderReview/></>}/>
          <Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
          <Route path="/admin-orders" element={<><AdminOrders/></>}/>
          <Route path="/addburgers" element={<><CreateBurgerForm/></>}/>
          <Route path="/updateburgers/:id" element={<><UpdateBurgerForm/></>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main> 
      <Footer />
    </div>
  );
}

export default App;
