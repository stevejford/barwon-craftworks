import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { API_URL } from '../../config';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/api/customers`).then(r => r.json()).then(setCustomers).catch(console.error);
    }, []);

    const timeAgo = (dateStr) => {
        if (!dateStr) return 'Never';
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    const getStatus = (c) => {
        if (parseInt(c.total_orders) === 0) return 'Inactive';
        const last = c.last_order_at ? Date.now() - new Date(c.last_order_at).getTime() : Infinity;
        if (last < 7 * 24 * 60 * 60 * 1000) return 'Active';
        if (parseInt(c.total_orders) === 1) return 'New';
        return 'Active';
    };

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black admin-text-main">Customers</h2>
                        <p className="text-slate-400 text-sm">Manage your customer relationships and view order history.</p>
                    </div>
                </div>

                <div className="admin-card border rounded-2xl overflow-hidden transition-all">
                    <div className="p-6 border-b admin-border-soft flex items-center justify-between gap-4">
                        <div className="flex-1 max-w-md relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-sm">search</span>
                            <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full admin-bg-soft border admin-border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-accent-gold outline-none transition-all admin-text-main" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="admin-bg-soft text-slate-400 text-[10px] font-black uppercase tracking-widest border-b admin-border-soft">
                                <tr>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Total Orders</th>
                                    <th className="px-6 py-4">Total Spent</th>
                                    <th className="px-6 py-4">Last Order</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y admin-border-soft">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">No customers yet</td></tr>
                                ) : filtered.map((c) => {
                                    const status = getStatus(c);
                                    return (
                                        <tr key={c.id} className="hover:bg-slate-50 theme-dark:hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold font-black text-xs">
                                                        {c.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold admin-text-main">{c.name}</p>
                                                        <p className="text-[10px] text-slate-400">{c.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold admin-text-main">{c.total_orders}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-accent-gold">${parseFloat(c.total_spent).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">{timeAgo(c.last_order_at)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                                        status === 'New' ? 'bg-blue-500/10 text-blue-500' :
                                                            'bg-slate-400/10 text-slate-400'
                                                    }`}>
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 rounded-lg hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-slate-900 theme-dark:hover:text-white transition-all">
                                                    <span className="material-symbols-outlined text-sm">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCustomers;
