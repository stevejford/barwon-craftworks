import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';

const Contact = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'Discussing a Bespoke Writing Instrument', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error('Failed to send');
            setSent(true);
            setFormData({ name: '', email: '', subject: 'Discussing a Bespoke Writing Instrument', message: '' });
        } catch (err) {
            setError('Something went wrong. Please try again or email me directly.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title="Contact the Maker — Bespoke Pen Commissions"
                description="Contact Barwon Craftworks directly for bespoke handcrafted pen commissions, corporate gift inquiries, and wholesale orders. Located in Geelong, Victoria, Australia."
                keywords="contact pen maker Geelong, custom pen commission Australia, bespoke fountain pen order, corporate pen gifts Australia, artisan pen enquiry, handmade pen order"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    'name': 'Contact Barwon Craftworks',
                    'description': 'Contact the artisan directly for bespoke pen commissions and corporate gift inquiries.',
                    'url': 'https://barwoncraftworks.com.au/contact',
                    'mainEntity': {
                        '@type': 'LocalBusiness',
                        'name': 'Barwon Craftworks',
                        'email': 'hello@barwoncraftworks.com.au',
                        'address': { '@type': 'PostalAddress', 'addressLocality': 'Geelong', 'addressRegion': 'VIC', 'addressCountry': 'AU' }
                    }
                }}
            />
            <Header />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-10 py-10">
                {/* Cinematic Contact Hero */}
                <section className="rounded-[2rem] overflow-hidden relative min-h-[280px] flex items-center group mb-10 shadow-xl border p-1 transition-colors dark:border-[#2e3332] light:border-[#e5dec9]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{
                            backgroundImage: isDarkMode
                                ? "linear-gradient(to right, rgba(13, 16, 15, 0.95), rgba(13, 16, 15, 0.35)), url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop')"
                                : "linear-gradient(to right, rgba(253, 250, 243, 0.95), rgba(253, 250, 243, 0.35)), url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop')"
                        }}
                    ></div>
                    <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 px-10 md:px-16 py-10">
                        <div className="flex-shrink-0">
                            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-3 block underline decoration-accent-gold/40 underline-offset-8">A Private Conversation</span>
                            <h1 className={`text-4xl md:text-5xl font-serif font-black drop-shadow-xl leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Speak with the <br /><span className="italic text-accent-gold">Maker</span>
                            </h1>
                        </div>
                        <p className={`text-[18px] font-light leading-relaxed max-w-md drop-shadow-md ${isDarkMode ? 'text-white/90' : 'text-[#203c35]/80'}`}>
                            Every inquiry comes directly to me at my workbench in Geelong. Whether you're commissioning a bespoke fountain pen, exploring corporate gifts, or have questions about our timbers, I'm honored to help.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-8">
                    <div className="space-y-12">
                        <div className="space-y-10">
                            {[
                                { icon: 'pin_drop', title: 'The Geelong Workshop', detail: 'Handcrafted writing instruments from rare Australian timbers, Geelong VIC.' },
                                { icon: 'history_edu', title: 'Direct Correspondence', detail: 'hello@barwoncraftworks.com.au' },
                                { icon: 'family_restroom', title: 'Workshop Philosophy', detail: 'Family first—responses may take 24-48 hours.' }
                            ].map((item) => (
                                <div key={item.title} className="flex items-start gap-8 group">
                                    <div className="size-16 rounded-[1.5rem] bg-accent-gold/5 border border-accent-gold/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                                        <span className="material-symbols-outlined text-accent-gold text-3xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-2xl font-bold mb-1 tracking-tight">{item.title}</h4>
                                        <p className={`text-lg ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/60'}`}>{item.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`p-10 rounded-[3rem] border transition-colors relative overflow-hidden ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-7xl">format_quote</span>
                            </div>
                            <p className={`text-lg italic leading-relaxed relative z-10 ${isDarkMode ? 'text-slate-300' : 'text-[#203c35]/80'}`}>
                                "When I'm at the lathe, I'm fully present. When I'm with my family, I'm fully there too. Thank you for your patience and for supporting a craftsman's lifestyle."
                            </p>
                            <p className="text-accent-gold font-serif font-bold mt-6 text-xl tracking-tight">— The Maker, Barwon Craftworks</p>
                        </div>
                    </div>

                    <div className={`p-10 md:p-14 rounded-[3rem] transition-colors border shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <span className="material-symbols-outlined text-9xl">edit_document</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">What should I call you?</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full px-8 py-5 rounded-2xl border-2 transition-all outline-none text-lg font-serif ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332] focus:border-accent-gold text-white' : 'bg-white border-[#e5dec9] focus:border-[#203c35] text-[#203c35]'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Where can I reach you?</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        aria-label="Email address"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-8 py-5 rounded-2xl border-2 transition-all outline-none text-lg font-serif ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332] focus:border-accent-gold text-white' : 'bg-white border-[#e5dec9] focus:border-[#203c35] text-[#203c35]'}`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">How can I help you today?</label>
                                <div className="relative">
                                    <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={`w-full px-8 py-5 rounded-2xl border-2 transition-all outline-none text-base appearance-none font-serif ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332] focus:border-accent-gold text-white' : 'bg-white border-[#e5dec9] focus:border-[#203c35] text-[#203c35]'}`}>
                                        <option>Bespoke Writing Instrument</option>
                                        <option>Corporate Gifts & Wholesale</option>
                                        <option>Story or Collaboration Request</option>
                                        <option>Other Workshop Matters</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <span className="material-symbols-outlined text-accent-gold">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Share your vision with me...</label>
                                <textarea
                                    rows="6"
                                    placeholder="Tell me about the story you want to record, or the technical part you need built..."
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className={`w-full px-8 py-5 rounded-2xl border-2 transition-all outline-none text-lg font-serif resize-none ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332] focus:border-accent-gold text-white' : 'bg-white border-[#e5dec9] focus:border-[#203c35] text-[#203c35]'}`}
                                ></textarea>
                            </div>
                            {sent && (
                                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold text-center">
                                    Thank you — your message has reached the workshop. I'll be in touch soon.
                                </div>
                            )}
                            {error && (
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full bg-accent-gold text-black py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all shadow-2xl shadow-accent-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {sending ? 'Sending...' : 'Send to Workshop'}
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
