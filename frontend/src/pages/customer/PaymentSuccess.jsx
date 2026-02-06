import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { transactionId } = location.state || { transactionId: 'N/A' };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <CheckCircle className="h-24 w-24 text-green-500" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">Transaction ID: <span className="font-mono bg-gray-100 p-1 rounded">{transactionId}</span></p>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={() => navigate('/customer/orders')}
                    className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    My Orders
                </button>
                <button
                    onClick={() => navigate('/customer/dashboard')}
                    className="flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};
export default PaymentSuccess;
