import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const DashboardLayout = ({ title, navigation }) => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={clsx(
                "fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-center h-16 bg-slate-950 font-bold text-xl tracking-wider">
                    Organic Hub
                </div>
                <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    isActive ? "bg-slate-800 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white",
                                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                )}
                            >
                                <Icon className="mr-3 h-6 w-6" aria-hidden="true" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="lg:hidden absolute top-0 right-0 -mr-12 pt-2">
                    <button onClick={() => setSidebarOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Close sidebar</span>
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900 ml-4 lg:ml-0">{title}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
                            <span className="text-xs text-gray-500">{user?.role}</span>
                        </div>
                        <button onClick={logout} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100" title="Logout">
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Content Body */}
                <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
