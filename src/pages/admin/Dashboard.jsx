import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { API_URL } from '../../config';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalCustomers: 0, activePrints: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/admin/stats`).then(r => r.json()).then(setStats).catch(console.error);
        fetch(`${API_URL}/api/admin/recent-orders`).then(r => r.json()).then(setRecentOrders).catch(console.error);
        fetch(`${API_URL}/api/admin/inventory-alerts`).then(r => r.json()).then(setAlerts).catch(console.error);
    }, []);

    const statCards = [
        { name: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`, icon: 'payments', color: 'text-green-500' },
        { name: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: 'shopping_bag', color: 'text-blue-500' },
        { name: 'Total Customers', value: stats.totalCustomers.toLocaleString(), icon: 'group', color: 'text-purple-500' },
        { name: 'Active Prints', value: stats.activePrints.toString(), icon: 'precision_manufacturing', color: 'text-accent-gold' },
    ];

    const timeAgo = (dateStr) => {
        if (!dateStr) return '';
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    return (
        <AdminLayout>
            <div className="space-y-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {statCards.map((stat) => (
                        <div key={stat.name} className="admin-card border p-6 rounded-2xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${stat.color} admin-stat-icon-bg`}>
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.name}</p>
                            <h3 className="text-3xl font-black mt-1 admin-text-main transition-colors">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Recent Orders Table */}
                    <div className="lg:col-span-2 admin-card border rounded-2xl overflow-hidden transition-all">
                        <div className="p-6 border-b admin-border-soft transition-colors flex items-center justify-between">
                            <h3 className="text-lg font-bold admin-text-main transition-colors">Recent Orders</h3>
                            <button className="text-accent-gold text-xs font-black uppercase tracking-widest hover:underline transition-all">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="admin-bg-soft text-slate-400 text-[10px] font-black uppercase tracking-widest border-b admin-border-soft transition-colors">
                                    <tr>
                                        <th className="px-6 py-4">Order ID</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Total</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y admin-border-soft transition-colors`}>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="admin-table-row-hover transition-colors group">
                                            <td className="px-6 py-4 text-sm font-bold text-accent-gold">{order.order_number}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold admin-text-main transition-colors">{order.customer_name || 'Guest'}</p>
                                                <p className="text-[10px] text-slate-400">{timeAgo(order.created_at)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                                                            order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-500' :
                                                                'bg-accent-gold/10 text-accent-gold'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold admin-text-main transition-colors">${parseFloat(order.total).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 rounded-lg hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 theme-dark:hover:text-white transition-all">
                                                    <span className="material-symbols-outlined text-sm">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Stock Alert / Task List */}
                    <div className="admin-card border rounded-2xl p-6 transition-all space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold admin-text-main transition-colors">Inventory Alerts</h3>
                            {alerts.length > 0 && <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">{alerts.length} Alert{alerts.length !== 1 ? 's' : ''}</span>}
                        </div>
                        <div className="space-y-4">
                            {alerts.length === 0 ? (
                                <p className="text-slate-400 text-sm text-center py-4">All stock levels healthy</p>
                            ) : alerts.map((item) => (
                                <div key={item.id} className={`p-4 rounded-xl border-l-4 transition-colors admin-bg-soft ${item.stock === 0 ? 'border-l-red-500' : 'border-l-yellow-500'}`}>
                                    <p className="font-bold text-sm admin-text-main">{item.name}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.stock === 0 ? 'Out of Stock' : 'Low Stock'} • {item.stock} remaining</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 rounded-xl bg-accent-gold text-black text-xs font-black uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-lg shadow-accent-gold/10">
                            Manage Inventory
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
