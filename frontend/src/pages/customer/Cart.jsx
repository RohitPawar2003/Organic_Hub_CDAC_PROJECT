import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    }, []);

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const checkout = async () => {
        if (cart.length === 0) return;
        try {
            const orderIds = [];
            for (const item of cart) {
                // Post to create ORDER first (Status: PLACED)
                const { data } = await api.post(`/order/place?productId=${item.productId}`);
                console.log("Response from placeOrder:", data);

                if (data && data.orderId) {
                    orderIds.push(data.orderId);
                } else {
                    console.error("Order ID missing in response. Backend might be returning string?", data);
                    // Fallback: If backend returns string "Order placed", we can't proceed to payment properly linked to order.
                    // But we should alert user.
                }
            }

            if (orderIds.length === 0) {
                toast.error("Orders placed but failed to retrieve IDs. Please restart backend.");
                // Clear cart anyway if orders were placed? 
                localStorage.removeItem('cart');
                setCart([]);
                return;
            }

            // clear cart locally but don't finish *process* until payment
            localStorage.removeItem('cart');
            setCart([]);

            console.log("Navigating to payment with:", { orderIds, total });
            // Redirect to Payment with orderIds and total
            navigate('/customer/payment', { state: { orderIds, total } });

        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error("Failed to place order. Check console.");
        }
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-4">
                                <div>
                                    <h3 className="font-bold">{item.productsname}</h3>
                                    <p className="text-sm text-gray-500">{item.categoryName}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="font-semibold">₹{item.price}</span>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-between items-center pt-4 border-t">
                        <span className="text-xl font-bold">Total: ₹{total}</span>
                        <button
                            onClick={checkout}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
                        >
                            Checkout ({cart.length} items)
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Cart;
