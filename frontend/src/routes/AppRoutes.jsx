import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/error/Unauthorized';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import PublicLayout from '../layouts/PublicLayout';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminCategories from '../pages/admin/Categories';
import AdminOrders from '../pages/admin/Orders';

import SellerLayout from '../layouts/SellerLayout';
import SellerDashboard from '../pages/seller/Dashboard';
import SellerProducts from '../pages/seller/ProductList';
import SellerAddProduct from '../pages/seller/AddProduct';
import SellerOrders from '../pages/seller/Orders';
import SellerEarnings from '../pages/seller/Earnings';

import CustomerLayout from '../layouts/CustomerLayout';
import CustomerMarketplace from '../pages/customer/Marketplace';
import CustomerOrders from '../pages/customer/Orders';
import Cart from '../pages/customer/Cart';
import Payment from '../pages/customer/Payment';
import PaymentSuccess from '../pages/customer/PaymentSuccess';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin */}

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route index element={<Navigate to="dashboard" />} />
                </Route>
            </Route>

            {/* Seller */}
            <Route element={<ProtectedRoute allowedRoles={['SHOPKEEPER']} />}>
                <Route path="/seller" element={<SellerLayout />}>
                    <Route path="dashboard" element={<SellerDashboard />} />
                    <Route path="products" element={<SellerProducts />} />
                    <Route path="add-product" element={<SellerAddProduct />} />
                    <Route path="orders" element={<SellerOrders />} />
                    <Route path="earnings" element={<SellerEarnings />} />
                    <Route index element={<Navigate to="dashboard" />} />
                </Route>
            </Route>

            {/* Customer */}
            <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
                <Route path="/customer" element={<CustomerLayout />}>
                    <Route path="dashboard" element={<CustomerMarketplace />} />
                    <Route path="orders" element={<CustomerOrders />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="payment/success" element={<PaymentSuccess />} />
                    <Route index element={<Navigate to="dashboard" />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;
