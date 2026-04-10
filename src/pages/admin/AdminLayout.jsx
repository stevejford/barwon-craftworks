import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('admin-theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('admin-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
        { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
        { name: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
        { name: 'Customers', path: '/admin/customers', icon: 'group' },
        { name: 'Settings', path: '/admin/settings', icon: 'settings' },
    ];

    return (
        <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100 theme-dark' : 'bg-white text-slate-900 theme-light'}`}>
            {/* Sidebar */}
            <aside className={`w-64 border-r flex flex-col transition-colors duration-300 ${isDarkMode ? 'border-[#2e3332] bg-[#131615]' : 'border-slate-100 bg-slate-50'}`}>
                <div className={`p-8 border-b ${isDarkMode ? 'border-[#2e3332]' : 'border-slate-100'}`}>
                    <Link to="/" className="flex items-center gap-3">
                        <div className="size-8 bg-accent-gold rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-black text-xl">precision_manufacturing</span>
                        </div>
                        <span className={`text-xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Barwon <span className="text-accent-gold">Admin</span></span>
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active
                                        ? 'bg-accent-gold text-black font-bold'
                                        : isDarkMode
                                            ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                                            : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${active ? 'text-black' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className={`p-4 border-t ${isDarkMode ? 'border-[#2e3332]' : 'border-slate-100'}`}>
                    <button className={`w-full flex items-center gap-4 px-4 py-3 transition-colors ${isDarkMode ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500'}`}>
                        <span className="material-symbols-outlined">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className={`h-20 border-b backdrop-blur-md flex items-center justify-between px-10 flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'border-[#2e3332] bg-[#131615]/50' : 'border-slate-100 bg-white/80'}`}>
                    <h1 className="text-xl font-bold">
                        {menuItems.find(i => i.path === location.pathname)?.name || 'Admin'}
                    </h1>
                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        <div className={`flex p-1 rounded-xl transition-colors ${isDarkMode ? 'bg-[#1e2321]' : 'bg-slate-100'}`}>
                            <button
                                onClick={() => setIsDarkMode(false)}
                                className={`flex items-center justify-center px-3 py-1.5 rounded-lg transition-all ${!isDarkMode ? 'bg-white text-accent-gold shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <span className="material-symbols-outlined text-sm">light_mode</span>
                            </button>
                            <button
                                onClick={() => setIsDarkMode(true)}
                                className={`flex items-center justify-center px-3 py-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-[#131615] text-accent-gold shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <span className="material-symbols-outlined text-sm">dark_mode</span>
                            </button>
                        </div>

                        <button className={`relative transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute -top-1 -right-1 size-2 bg-accent-gold rounded-full"></span>
                        </button>

                        <div className={`flex items-center gap-3 pl-6 border-l ${isDarkMode ? 'border-[#2e3332]' : 'border-slate-100'}`}>
                            <div className="text-right">
                                <p className="text-sm font-bold">Admin User</p>
                                <p className={`text-[10px] uppercase tracking-widest font-black ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Master Artisan</p>
                            </div>
                            <div className="size-10 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold font-black">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                <main className={`flex-1 overflow-y-auto p-10 custom-scrollbar transition-colors duration-300 ${isDarkMode ? 'bg-[#0d0f0e]' : 'bg-white'}`}>
                    {children}
                </main>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: ${isDarkMode ? '#2e3332' : '#e2e8f0'};
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #d4af37;
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
