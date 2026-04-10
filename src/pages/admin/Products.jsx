import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { API_URL } from '../../config';

const emptyProduct = { name: '', category: 'Fountain', price: '', description: '', image_url: '', stock: 0, status: 'active' };

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyProduct);
    const [saving, setSaving] = useState(false);

    const fetchProducts = () => {
        fetch(`${API_URL}/api/products?status=all`).then(r => r.json()).then(setProducts).catch(console.error);
    };

    useEffect(() => { fetchProducts(); }, []);

    const openCreate = () => { setEditing(null); setForm(emptyProduct); setShowModal(true); };
    const openEdit = (p) => { setEditing(p); setForm({ name: p.name, category: p.category, price: p.price, description: p.description || '', image_url: p.image_url || '', stock: p.stock, status: p.status }); setShowModal(true); };

    const handleSave = async () => {
        setSaving(true);
        try {
            const url = editing ? `${API_URL}/api/products/${editing.id}` : `${API_URL}/api/products`;
            const method = editing ? 'PUT' : 'POST';
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }) });
            setShowModal(false);
            fetchProducts();
        } catch (err) { console.error('Save error:', err); }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Archive this product?')) return;
        await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black admin-text-main">Products</h2>
                        <p className="text-slate-400 text-sm">Manage your artisan collection and 3D services.</p>
                    </div>
                    <button onClick={openCreate} className="bg-accent-gold text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-xl shadow-accent-gold/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Add New Product
                    </button>
                </div>

                <div className="admin-card border rounded-2xl overflow-hidden transition-all">
                    <div className="p-6 border-b admin-border-soft flex items-center justify-between gap-4">
                        <div className="flex-1 max-w-md relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-sm">search</span>
                            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full admin-bg-soft border admin-border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-accent-gold outline-none transition-all admin-text-main" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="admin-bg-soft text-slate-400 text-[10px] font-black uppercase tracking-widest border-b admin-border-soft">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y admin-border-soft">
                                {filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50 theme-dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg overflow-hidden border admin-border-soft flex-shrink-0">
                                                    {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full admin-bg-soft" />}
                                                </div>
                                                <span className="text-sm font-bold admin-text-main">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">{p.category}</td>
                                        <td className="px-6 py-4 text-sm font-bold admin-text-main">${parseFloat(p.price).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={p.stock === 0 ? 'text-red-500' : 'text-slate-400'}>{p.stock}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${p.status === 'active' ? 'bg-green-500/10 text-green-500' : p.status === 'draft' ? 'bg-slate-400/10 text-slate-400' : 'bg-red-500/10 text-red-500'}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-accent-gold transition-all">
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-all">
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300]" onClick={() => setShowModal(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto z-[301] admin-card border rounded-2xl p-8 shadow-2xl space-y-6">
                        <h3 className="text-xl font-black admin-text-main">{editing ? 'Edit Product' : 'New Product'}</h3>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Name</label>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none">
                                        {['Fountain', 'Rollerball', 'Limited Edition', 'Accessories'].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Status</label>
                                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none">
                                        {['active', 'draft', 'archived'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Price (AUD)</label>
                                    <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Stock</label>
                                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Description</label>
                                <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none resize-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Image URL</label>
                                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none" />
                                {form.image_url && (
                                    <div className="mt-2 rounded-xl overflow-hidden border admin-border-soft w-full h-40 relative">
                                        <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Cancel</button>
                            <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="bg-accent-gold text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-xl shadow-accent-gold/10 disabled:opacity-50">
                                {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default AdminProducts;
