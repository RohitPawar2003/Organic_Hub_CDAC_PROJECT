import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/signin', { email, password });
            localStorage.setItem('token', data.token);

            // Fetch full user details to ensure we have role
            // But response already has role: data.role
            // We can trust data.role from login response for immediate redirect
            setUser({ email: data.email, role: data.role });

            toast.success('Login successful!');
            return data;
        } catch (error) {
            toast.error('Login failed. Check credentials.');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/auth/register', userData);
            toast.success('Registration successful! Please login.');
        } catch (error) {
            toast.error(error.response?.data || 'Registration failed');
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
