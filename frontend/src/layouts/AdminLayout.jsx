import { LayoutDashboard, Users, ShoppingCart, List } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Categories', href: '/admin/categories', icon: List },
    { name: 'All Orders', href: '/admin/orders', icon: ShoppingCart },
];

const AdminLayout = () => {
    return <DashboardLayout title="Admin Portal" navigation={navigation} />;
};

export default AdminLayout;
