import { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/order/all');
            setOrders(data);
        } catch (error) {
            toast.error("Failed to fetch orders");
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await api.patch(`/order/${orderId}/status`, null, { params: { status: newStatus } });
            toast.success("Order status updated");
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Order Management</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {orders.map(order => (
                            <tr key={order.orderId} className="hover:bg-gray-50">
                                <td className="px-6 py-4">#{order.orderId}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{order.customer?.name}</div>
                                    <div className="text-xs text-gray-500">{order.customer?.email}</div>
                                </td>
                                <td className="px-6 py-4">{order.product?.productsname}</td>
                                <td className="px-6 py-4">{order.ordersdate}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                            order.status === 'PLACED' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.orderId, e.target.value)}
                                        className="border border-gray-300 rounded text-sm p-1 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="PLACED">Placed</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AdminOrders;
