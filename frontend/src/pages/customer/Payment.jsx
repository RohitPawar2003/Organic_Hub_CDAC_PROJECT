import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderIds } = location.state || {}; // Expecting array of order IDs
    const [totalAmount, setTotalAmount] = useState(0);

    // If no orders, show error instead of redirecting silently for debugging
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderIds || orderIds.length === 0) {
            // navigate('/customer/dashboard');
            setError("No Order IDs found. Backend might need a restart or checkout failed.");
        }
        if (location.state?.total) setTotalAmount(location.state.total);
    }, [orderIds, navigate, location.state]);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center text-red-600 bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Payment Initialization Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/customer/cart')}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    Back to Cart
                </button>
            </div>
        )
    }

    const handlePayment = async () => {
        try {
            // Process payment for EACH order sequentially or batch.
            // Backend PaymentsController takes 1 Payment object with 1 Order.
            // So we must iterate.
            const transactionId = "TXN" + Date.now();

            for (const orderId of orderIds) {
                const paymentData = {
                    paymentMode: "UPI", // Mock
                    paymentStatus: "SUCCESS",
                    amount: totalAmount / orderIds.length, // Split evenly for now as we don't have individual amounts easily here without fetch
                    order: { orderId: orderId } // Linking by ID
                };
                await api.post('/payment/pay', paymentData);
            }

            navigate('/customer/payment/success', { state: { transactionId } });

        } catch (error) {
            console.error(error);
            toast.error("Payment failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Secure Payment</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="mb-6">
                        <p className="text-xl text-center text-gray-700">Total Amount: <span className="font-bold">₹{totalAmount}</span></p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handlePayment}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Payment;
