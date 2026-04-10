import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { API_URL } from '../../config';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [search, setSearch] = useState('');
    const [managing, setManaging] = useState(null);

    const fetchOrders = (status) => {
        const q = status && status !== 'all' ? `?status=${status}` : '';
        fetch(`${API_URL}/api/orders${q}`).then(r => r.json()).then(setOrders).catch(console.error);
    };

    useEffect(() => { fetchOrders(activeTab); }, [activeTab]);

    const updateStatus = async (id, newStatus) => {
        await fetch(`${API_URL}/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        setManaging(null);
        fetchOrders(activeTab);
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-AU', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

    const statusColor = (s) => {
        if (s === 'completed') return 'bg-green-500/10 text-green-500';
        if (s === 'processing') return 'bg-blue-500/10 text-blue-500';
        if (s === 'shipped') return 'bg-purple-500/10 text-purple-500';
        if (s === 'cancelled') return 'bg-red-500/10 text-red-500';
        return 'bg-accent-gold/10 text-accent-gold';
    };

    const filtered = orders.filter(o =>
        (o.order_number || '').toLowerCase().includes(search.toLowerCase()) ||
        (o.customer_name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-black admin-text-main">Orders</h2>
                    <p className="text-slate-400 text-sm">Monitor sales and update fulfillment status.</p>
                </div>

                <div className="admin-card border rounded-2xl overflow-hidden transition-all">
                    <div className="p-6 border-b admin-border-soft flex flex-col md:flex-row gap-4 justify-between">
                        <div className="flex gap-2">
                            {['all', 'pending', 'processing', 'shipped', 'completed'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-accent-gold text-black' : 'text-slate-400 hover:text-slate-900 theme-dark:hover:text-white hover:bg-slate-100 theme-dark:hover:bg-white/5'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-sm">search</span>
                            <input type="text" placeholder="Search Orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="admin-bg-soft border admin-border-soft rounded-xl pl-10 pr-4 py-2 text-sm focus:border-accent-gold outline-none transition-all admin-text-main" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="admin-bg-soft text-slate-400 text-[10px] font-black uppercase tracking-widest border-b admin-border-soft">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y admin-border-soft">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">No orders found</td></tr>
                                ) : filtered.map((o) => (
                                    <tr key={o.id} className="hover:bg-slate-50 theme-dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-accent-gold text-sm">{o.order_number}</td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold admin-text-main">{o.customer_name || 'Guest'}</p>
                                            <p className="text-[10px] text-slate-400">{o.customer_email || ''}</p>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">{formatDate(o.created_at)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColor(o.status)}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold admin-text-main">${parseFloat(o.total).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button onClick={() => setManaging(managing === o.id ? null : o.id)} className="admin-bg-soft hover:bg-accent-gold hover:text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all admin-text-main">
                                                Manage
                                            </button>
                                            {managing === o.id && (
                                                <div className="absolute right-6 top-full mt-1 z-50 admin-card border rounded-xl shadow-2xl overflow-hidden min-w-[160px]">
                                                    {['pending', 'processing', 'shipped', 'completed', 'cancelled'].filter(s => s !== o.status).map(s => (
                                                        <button key={s} onClick={() => updateStatus(o.id, s)} className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-accent-gold hover:text-black transition-all admin-text-main">
                                                            Mark {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
