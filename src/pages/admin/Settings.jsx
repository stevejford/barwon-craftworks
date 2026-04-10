import React from 'react';
import AdminLayout from './AdminLayout';

const AdminSettings = () => {
    return (
        <AdminLayout>
            <div className="space-y-10 max-w-4xl">
                <div>
                    <h2 className="text-3xl font-black admin-text-main">Settings</h2>
                    <p className="text-slate-400 text-sm">Configure your workshop details and preferences.</p>
                </div>

                <div className="space-y-6">
                    {/* General Settings */}
                    <div className="admin-card border rounded-2xl overflow-hidden transition-all">
                        <div className="p-6 border-b admin-border-soft">
                            <h3 className="text-lg font-bold admin-text-main">General Information</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest ml-1">Store Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Barwon Craft Works"
                                        className="w-full admin-bg-soft border admin-border-soft rounded-xl px-5 py-3 admin-text-main focus:border-accent-gold outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest ml-1">Contact Email</label>
                                    <input
                                        type="email"
                                        defaultValue="hello@barwoncraftworks.com.au"
                                        className="w-full admin-bg-soft border admin-border-soft rounded-xl px-5 py-3 admin-text-main focus:border-accent-gold outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest ml-1">Workshop Address</label>
                                <textarea
                                    rows="2"
                                    defaultValue="123 Artisan Lane, Geelong, Victoria 3220, Australia"
                                    className="w-full admin-bg-soft border admin-border-soft rounded-xl px-5 py-3 admin-text-main focus:border-accent-gold outline-none transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="admin-card border rounded-2xl overflow-hidden transition-all">
                        <div className="p-6 border-b admin-border-soft">
                            <h3 className="text-lg font-bold admin-text-main">Preferences</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-4 admin-bg-soft rounded-xl border admin-border-soft">
                                <div>
                                    <p className="text-sm font-bold admin-text-main">Email Notifications</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Receive alerts for new orders</p>
                                </div>
                                <div className="size-12 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                                    <span className="material-symbols-outlined">toggle_on</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 admin-bg-soft rounded-xl border admin-border-soft">
                                <div>
                                    <p className="text-sm font-bold admin-text-main">Public Orders</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Allow customers to place custom orders</p>
                                </div>
                                <div className="size-12 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                                    <span className="material-symbols-outlined">toggle_on</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="bg-accent-gold text-black px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-xl shadow-accent-gold/10">
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
