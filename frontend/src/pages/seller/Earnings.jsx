import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { IndianRupee } from 'lucide-react';

const SellerEarnings = () => {
    const [payments, setPayments] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        // Fetch seller specific payments
        api.get('/payment/seller')
            .then(res => {
                setPayments(res.data);
                const total = res.data.reduce((acc, curr) => acc + curr.amount, 0);
                setTotalEarnings(total);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <IndianRupee className="mr-2" /> My Earnings
            </h2>
            <div className="mb-6 p-4 bg-green-50 rounded border border-green-100">
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-700">₹{totalEarnings}</p>
            </div>

            <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Mode</th>
                            <th className="px-4 py-2">Status</th>
                            {/* <th className="px-4 py-2">Date</th> Payment entity doesn't have date? */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {payments.map(p => (
                            <tr key={p.paymentId}>
                                <td className="px-4 py-2">#{p.paymentId}</td>
                                <td className="px-4 py-2 font-medium">₹{p.amount}</td>
                                <td className="px-4 py-2">{p.paymentMode}</td>
                                <td className="px-4 py-2 text-green-600">{p.paymentStatus}</td>
                            </tr>
                        ))}
                        {payments.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-gray-500">No transactions yet</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default SellerEarnings;
