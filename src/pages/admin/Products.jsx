import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { API_URL } from '../../config';

const emptyProduct = { name: '', category: 'Fountain', price: '', description: '', image_url: '', stock: 0, status: 'active' };

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showPanel, setShowPanel] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyProduct);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const fetchProducts = () => {
        fetch(`${API_URL}/api/products?status=all`).then(r => r.json()).then(setProducts).catch(console.error);
    };

    useEffect(() => { fetchProducts(); }, []);

    const openCreate = () => { setEditing(null); setForm(emptyProduct); setShowPanel(true); };
    const openEdit = (p) => { setEditing(p); setForm({ name: p.name, category: p.category, price: p.price, description: p.description || '', image_url: p.image_url || '', stock: p.stock, status: p.status }); setShowPanel(true); };
    const closePanel = () => { setShowPanel(false); setEditing(null); };

    const handleSave = async () => {
        setSaving(true);
        try {
            const url = editing ? `${API_URL}/api/products/${editing.id}` : `${API_URL}/api/products`;
            const method = editing ? 'PUT' : 'POST';
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }) });
            closePanel();
            fetchProducts();
        } catch (err) { console.error('Save error:', err); }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Archive this product?')) return;
        await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const handleImageUpload = async (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) setForm(prev => ({ ...prev, image_url: data.url }));
        } catch (err) { console.error('Upload failed:', err); }
        setUploading(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleImageUpload(file);
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black admin-text-main">Products</h2>
                        <p className="text-slate-400 text-sm">Manage your artisan collection.</p>
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
                                    <tr key={p.id} className="hover:bg-slate-50 theme-dark:hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => openEdit(p)}>
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
                                                <button onClick={(e) => { e.stopPropagation(); openEdit(p); }} className="p-2 rounded-lg hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-accent-gold transition-all">
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} className="p-2 rounded-lg hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-all">
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

            {/* Slide-over Panel — 3/4 screen */}
            {showPanel && (
                <>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] transition-opacity" onClick={closePanel} />
                    <div className="fixed inset-y-0 right-0 w-full max-w-4xl z-[301] admin-card border-l shadow-2xl flex flex-col animate-slide-in-right">
                        {/* Panel Header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b admin-border-soft flex-shrink-0">
                            <div>
                                <h3 className="text-xl font-black admin-text-main">{editing ? 'Edit Product' : 'New Product'}</h3>
                                <p className="text-slate-400 text-xs mt-0.5">{editing ? `ID: ${editing.id}` : 'Fill in the details below'}</p>
                            </div>
                            <button onClick={closePanel} className="p-2 rounded-xl hover:bg-slate-100 theme-dark:hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Panel Body — scrollable */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-5 gap-8">
                                {/* Left Column — Image */}
                                <div className="col-span-2 space-y-4">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest block">Product Image</label>

                                    {/* Image Preview / Upload Zone */}
                                    <div
                                        className={`relative aspect-[4/5] rounded-2xl border-2 border-dashed overflow-hidden cursor-pointer transition-all ${dragOver ? 'border-accent-gold bg-accent-gold/5' : 'admin-border-soft hover:border-accent-gold/50'}`}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={handleDrop}
                                    >
                                        {form.image_url ? (
                                            <>
                                                <img src={form.image_url} alt="Product" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
                                                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                                                    <div className="text-center text-white">
                                                        <span className="material-symbols-outlined text-3xl mb-2 block">cloud_upload</span>
                                                        <p className="text-xs font-black uppercase tracking-widest">Replace Image</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                                {uploading ? (
                                                    <span className="material-symbols-outlined text-accent-gold text-4xl animate-spin">autorenew</span>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-slate-400 text-4xl mb-3">cloud_upload</span>
                                                        <p className="text-sm font-bold admin-text-main mb-1">Drop image here</p>
                                                        <p className="text-xs text-slate-400">or click to browse</p>
                                                        <p className="text-[10px] text-slate-500 mt-3">PNG, JPG, WebP up to 5MB</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0])} />
                                    </div>

                                    {uploading && <p className="text-xs text-accent-gold font-bold animate-pulse">Uploading...</p>}

                                    {/* Manual URL fallback */}
                                    <div className="space-y-1">
                                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Or paste URL</label>
                                        <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-2.5 text-xs admin-text-main focus:border-accent-gold outline-none" />
                                    </div>
                                </div>

                                {/* Right Column — Details */}
                                <div className="col-span-3 space-y-5">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Product Name</label>
                                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Barwon Classic" className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-lg font-bold admin-text-main focus:border-accent-gold outline-none" />
                                    </div>

                                    {/* Category + Status */}
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
                                                {['active', 'draft', 'archived'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Price + Stock */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Price (AUD)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
                                                <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" className="w-full admin-bg-soft border admin-border-soft rounded-xl pl-8 pr-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Stock</label>
                                            <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none" />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1">
                                        <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest">Description</label>
                                        <textarea rows="6" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell the story of this piece..." className="w-full admin-bg-soft border admin-border-soft rounded-xl px-4 py-3 text-sm admin-text-main focus:border-accent-gold outline-none resize-none leading-relaxed" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel Footer — sticky */}
                        <div className="flex items-center justify-between px-8 py-5 border-t admin-border-soft flex-shrink-0">
                            <div>
                                {editing && (
                                    <button onClick={() => { handleDelete(editing.id); closePanel(); }} className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-all flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                        Archive Product
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={closePanel} className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all border admin-border-soft hover:border-slate-400">Cancel</button>
                                <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="bg-accent-gold text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-xl shadow-accent-gold/10 disabled:opacity-50 flex items-center gap-2">
                                    {saving ? (
                                        <><span className="material-symbols-outlined text-sm animate-spin">autorenew</span> Saving...</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-sm">check</span> {editing ? 'Update Product' : 'Create Product'}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default AdminProducts;
