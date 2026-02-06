import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Store, ShoppingCart } from 'lucide-react';

const SellerDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ products: 0, orders: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all products and filter by seller
                const { data: products } = await api.get('/products/products');
                const myProducts = products.filter(p => p.sellerId === user.id || p.sellerName === user.email);

                // Fetch all orders and filter (if possible, otherwise just show N/A or all)
                // For now, let's just count products
                setStats({
                    products: myProducts.length,
                    orders: 0 // Backend limitation
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [user]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                    <div className="p-4 rounded-full mr-4 bg-green-500">
                        <Store className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">My Products</p>
                        <h3 className="text-2xl font-bold text-gray-800">{stats.products}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SellerDashboard;
