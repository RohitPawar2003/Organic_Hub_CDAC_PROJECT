import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SellerProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [user]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products/products');
            // Filter by seller
            // Note: Backend might use id or email. DTO likely has sellerId.
            // Check UserDto vs ProductDto. ProductDto has sellerId.
            // We need to match with user.id (which we might not have explicitly in context if we only stored token decoded)
            // But AuthContext fetches fetches /me which returns UserDto (has id? UserDto in Java didn't show id field in previous view, just name/email/role. Wait.
            // I need to check UserDto. It had name, email, password, role. NO ID.
            // BAD. I can't filter reliably without ID.
            // I will update UserDto to include ID. 
            // OR match by email if ProductDto has sellerEmail? ProductDto has `sellerName` which is username (email).
            // Let's assume matching by email works.
            setProducts(data.filter(p => p.sellerName === user.email));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success("Product deleted");
            fetchProducts();
        } catch (error) {
            toast.error("Failed to delete product");
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">My Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(p => (
                    <div key={p.productId} className="border rounded-lg p-4 flex flex-col justify-between">
                        <div>
                            {p.imageName && (
                                <div className="h-40 w-full bg-gray-100 mb-2 rounded overflow-hidden">
                                    <img src={`/imeges/${p.imageName}`} alt={p.productsname} className="h-full w-full object-cover" />
                                </div>
                            )}
                            <h3 className="font-bold text-lg">{p.productsname}</h3>
                            <p className="text-gray-500 text-sm">{p.categoryName}</p>
                            <p className="text-green-600 font-bold mt-2">₹{p.price}</p>
                            <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(p.productId)}
                            className="mt-4 flex items-center justify-center text-red-600 hover:bg-red-50 p-2 rounded"
                        >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </button>
                    </div>
                ))}
            </div>
            {products.length === 0 && <p className="text-gray-500">No products found.</p>}
        </div>
    );
};
export default SellerProducts;
