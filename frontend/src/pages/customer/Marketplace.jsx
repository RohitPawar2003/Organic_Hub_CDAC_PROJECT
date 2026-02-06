import { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { ShoppingCart, Search } from 'lucide-react';

const CustomerMarketplace = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        let res = products;
        if (search) res = res.filter(p => p.productsname.toLowerCase().includes(search.toLowerCase()));
        if (selectedCategory) res = res.filter(p => p.categoryId === parseInt(selectedCategory));
        setFilteredProducts(res);
    }, [search, selectedCategory, products]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products/products');
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/category/all');
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        toast.success("Added to cart");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 w-full border rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                    <div key={p.productId} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {p.imageName ? (
                                <img
                                    src={`/imeges/${encodeURIComponent(p.imageName)}`}
                                    alt={p.productsname}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/400?text=Error"; // Fallback
                                        console.error("Failed to load image:", p.imageName);
                                    }}
                                />
                            ) : (
                                <span className="text-gray-400">No Image (Null)</span>
                            )}
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-red-500 mb-1">Debug: {p.imageName || "None"}</p>
                            <h3 className="font-bold text-lg text-gray-800">{p.productsname}</h3>
                            <p className="text-sm text-gray-500">{p.categoryName}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold text-green-600">₹{p.price}</span>
                                <button
                                    onClick={() => addToCart(p)}
                                    className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CustomerMarketplace;
