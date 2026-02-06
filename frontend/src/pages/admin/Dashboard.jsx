import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, ShoppingBag, ShoppingCart } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersRes, productsRes, ordersRes] = await Promise.all([
                    api.get('/admin/allUsers'),
                    api.get('/products/products'),
                    api.get('/order/all')
                ]);
                setStats({
                    users: usersRes.data.length,
                    products: productsRes.data.length,
                    orders: ordersRes.data.length
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-full mr-4 ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={stats.users} icon={Users} color="bg-blue-500" />
                <StatCard title="Total Products" value={stats.products} icon={ShoppingBag} color="bg-green-500" />
                <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} color="bg-indigo-500" />
            </div>
        </div>
    );
};
export default AdminDashboard;
