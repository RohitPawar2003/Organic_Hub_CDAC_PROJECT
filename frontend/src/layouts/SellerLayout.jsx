import { LayoutDashboard, ShoppingCart, PackagePlus, Store, CircleDollarSign } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const navigation = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'My Products', href: '/seller/products', icon: Store },
    { name: 'Add Product', href: '/seller/add-product', icon: PackagePlus },
    { name: 'Earnings', href: '/seller/earnings', icon: CircleDollarSign },
];

const SellerLayout = () => {
    return <DashboardLayout title="Seller Portal" navigation={navigation} />;
};

export default SellerLayout;
