import { useEffect, useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/category/all');
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/addCategory', { categoryName: newCategory });
            toast.success("Category added");
            setNewCategory('');
            fetchCategories();
        } catch (error) {
            toast.error("Failed to add category");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Add Category</h2>
                <form onSubmit={handleAdd} className="flex gap-2">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Category Name"
                        className="flex-1 border p-2 rounded"
                        required
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add</button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Existing Categories</h2>
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat.categoryId} className="p-2 bg-gray-50 rounded border flex justify-between">
                            <span>{cat.categoryName}</span>
                            <span className="text-xs text-gray-400">#{cat.categoryId}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default AdminCategories;
