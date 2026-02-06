import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Package } from 'lucide-react';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/customer/orders')
            .then(res => setOrders(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">My Order History</h2>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.orderId} className="bg-white border rounded-lg p-6 shadow-sm flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-indigo-100 rounded-full">
                                <Package className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{order.product?.productsname}</p>
                                <p className="text-sm text-gray-500">Ordered on {order.ordersdate}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">₹{order.product?.price}</p>
                            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold
                                ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                    order.status === 'PLACED' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && <p className="text-gray-500">No orders found.</p>}
            </div>
        </div>
    );
};
export default CustomerOrders;
