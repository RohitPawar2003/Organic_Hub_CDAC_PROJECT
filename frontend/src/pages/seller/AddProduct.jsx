import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        productsname: '',
        price: '',
        stock: '',
        categoryId: '',
        imageName: ''
    });

    useEffect(() => {
        api.get('/category/all').then(res => setCategories(res.data)).catch(console.error);
    }, []);

    const imageOptions = [
        "Farmer Equipment.png", "Financial Service.png", "First Slide mahindra red thar.webp",
        "Hospitability.png", "Investment.png", "Logistic.png", "Logo.png",
        "Pakistan Village Photography.jpg", "Real Estate.png", "Renwable Energy.png",
        "Technology.png", "bajra.jpg", "bolero old.webp", "car_bg_2.webp",
        "chana.jpg", "changed2.jpg", "chnged.jpg", "corn.jpg", "farm1.jpg",
        "farm2.jpg", "farm3.jpg", "green garm.jpg", "groundnut.jpg", "krishi2.jpg",
        "login.jpg", "neo.webp", "rice.jpg", "scorpio classic.png",
        "scorpio n.webp", "second.jpg", "slide 2.png", "slide 3.png",
        "soyabeen.jpg", "thar old.webp", "thar.png", "tur.jpg",
        "wheat.jpg", "wheat2.jpg", "wheat3.jpg", "xuv 3xo black.png",
        "xuv 400.webp", "xuv 700 black.png"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/seller/addProduct', formData);
            toast.success("Product added successfully");
            navigate('/seller/products');
        } catch (error) {
            toast.error("Failed to add product");
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input name="productsname" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image</label>
                    <select name="imageName" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded" required>
                        <option value="">Select Image</option>
                        {imageOptions.map(img => <option key={img} value={img}>{img}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input name="price" type="number" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input name="stock" type="number" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="categoryId" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded" required>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                    </select>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add Product</button>
            </form>
        </div>
    );
};
export default SellerAddProduct;
