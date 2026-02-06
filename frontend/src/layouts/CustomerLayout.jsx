import { LayoutDashboard, ShoppingCart, History, ShoppingBag } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const navigation = [
    { name: 'Marketplace', href: '/customer/dashboard', icon: ShoppingBag },
    { name: 'My Orders', href: '/customer/orders', icon: History },
    { name: 'Cart', href: '/customer/cart', icon: ShoppingCart },
];

const CustomerLayout = () => {
    return <DashboardLayout title="Organic Hub" navigation={navigation} />;
};

export default CustomerLayout;
