import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';

const Home = () => {
    const { isDarkMode } = useTheme();
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(r => r.json())
            .then(data => setFeaturedProducts(data.slice(0, 3).map(p => ({
                id: p.id, name: p.name, price: parseFloat(p.price), img: p.image_url
            }))))
            .catch(console.error);
    }, []);

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title="Handcrafted Australian Timber Pens — Barwon Craftworks"
                description="Exquisite handcrafted fountain pens and rollerball pens made from rare Australian timbers like Tasmanian Blackwood, Huon Pine and Jarrah. Bespoke commissions by a local artisan woodturner in Geelong, Victoria."
                keywords="handcrafted fountain pen Australia, custom wooden pen Geelong, Australian timber pen, handmade rollerball pen, bespoke writing instrument, artisan pen maker Victoria, luxury pen gift Australia, Tasmanian Blackwood pen, Huon Pine pen, wooden pen Australia buy online"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    'name': 'Barwon Craftworks',
                    'url': 'https://barwoncraftworks.com.au',
                    'description': 'Handcrafted Australian timber writing instruments by a local artisan in Geelong, Victoria.',
                    'potentialAction': {
                        '@type': 'SearchAction',
                        'target': 'https://barwoncraftworks.com.au/pens?category={search_term_string}',
                        'query-input': 'required name=search_term_string'
                    }
                }}
            />
            <Header />

            <main className="flex-grow">
                {/* Full-Bleed Cinematic Hero */}
                <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-110"
                        style={{
                            backgroundImage: isDarkMode
                                ? "linear-gradient(to bottom, rgba(13, 16, 15, 0.4), rgba(13, 16, 15, 0.95)), url('https://images.unsplash.com/photo-1630022176154-7ba5374f42b7?q=80&w=2574&auto=format&fit=crop')"
                                : "linear-gradient(to bottom, rgba(253, 250, 243, 0.2), rgba(253, 250, 243, 0.8)), url('https://images.unsplash.com/photo-1630022176154-7ba5374f42b7?q=80&w=2574&auto=format&fit=crop')"
                        }}
                    ></div>
                    <div className="relative z-10 text-center max-w-5xl px-6">
                        <span className="text-accent-gold text-xs font-black uppercase tracking-[0.6em] mb-10 block drop-shadow-lg opacity-80">Heritage Pencraft • Geelong, Victoria</span>
                        <h1 className={`text-6xl md:text-9xl font-serif font-black mb-10 transition-colors leading-[0.9] drop-shadow-2xl ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            Precision <br /><span className="text-accent-gold italic text-7xl md:text-[10rem]">Meets</span> Artistry
                        </h1>
                        <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-10 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-[#203c35]/80'}`}>
                            Exquisite handcrafted writing instruments made from rare Australian timbers and precision-engineered materials. Each fountain pen, rollerball and accessory is hand-turned in our Geelong workshop for those who value heritage and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <button
                                onClick={() => window.location.href = '/pens'}
                                className="bg-accent-gold text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] glow-effect"
                            >
                                Enter the Atelier
                            </button>
                            <button
                                onClick={() => window.location.href = '/about'}
                                className={`px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${isDarkMode ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-[#203c35]/20 text-[#203c35] hover:bg-[#203c35] hover:text-[#fdfaf3]'}`}
                            >
                                Our Workshop
                            </button>
                        </div>
                    </div>
                </section>

                <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                    {/* Featured Collections */}
                    <section className="py-40">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                            <div className="space-y-4">
                                <span className="text-accent-gold text-xs font-black uppercase tracking-[0.3em] block underline decoration-accent-gold/30 underline-offset-8">Curated Shop</span>
                                <h3 className={`text-5xl md:text-7xl font-serif font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>The Artisan Collection</h3>
                            </div>
                            <button
                                onClick={() => window.location.href = '/pens'}
                                className={`flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] transition-colors py-4 px-8 rounded-full border border-accent-gold/20 ${isDarkMode ? 'text-slate-400 hover:text-accent-gold' : 'text-[#203c35]/60 hover:text-accent-gold'}`}
                            >
                                View the Full Collection <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {featuredProducts.map((p, i) => (
                            <div key={p.id} className={`group cursor-pointer ${i === 1 ? 'translate-y-12' : ''}`} onClick={() => window.location.href = `/pens/${p.id}`}>
                                <div className={`relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 transition-colors shadow-2xl p-1 border ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                                    <img
                                        src={p.img}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 rounded-[2.8rem]"
                                        alt={`${p.name} — Handcrafted Australian timber pen by Barwon Craftworks`}
                                    />
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm ${isDarkMode ? 'bg-[#0d0f0e]/60' : 'bg-[#203c35]/40'}`}>
                                        <button onClick={(e) => { e.stopPropagation(); window.location.href = `/pens/${p.id}`; }} className="bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
                                            Adopt This Memory
                                        </button>
                                    </div>
                                </div>
                                <h4 className={`text-2xl font-serif font-bold mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{p.name}</h4>
                                <p className="text-accent-gold text-sm font-black uppercase tracking-widest">${p.price.toFixed(2)}</p>
                            </div>
                            ))}
                        </div>
                    </section>

                    {/* Craftsmanship Section */}
                    <section className={`py-40 px-10 rounded-[3rem] transition-colors shadow-2xl border p-1 mb-40 ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
                            <div className="space-y-10">
                                <span className="text-accent-gold text-xs font-black uppercase tracking-[0.3em] block">Our Process</span>
                                <h2 className={`text-5xl md:text-7xl font-serif font-bold transition-colors leading-tight ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>Where Tradition <br /><span className="text-accent-gold italic">Meets</span> Precision</h2>
                                <p className={`text-xl transition-colors leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                    Each handcrafted pen begins as a block of ethically sourced Australian timber — Tasmanian Blackwood, ancient Huon Pine, or reclaimed Victorian Jarrah — and is transformed through meticulous woodturning and hand-finishing. Every curve, every grain, every polish is a deliberate act of craftsmanship in the pursuit of the perfect writing instrument.
                                </p>
                                <div className="grid grid-cols-2 gap-12 pt-8">
                                    <div className="space-y-2">
                                        <h4 className="text-accent-gold font-serif text-5xl font-black">100%</h4>
                                        <p className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>Australian Made</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-accent-gold font-serif text-5xl font-black">24h</h4>
                                        <p className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>Artisan Polishing</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-accent-gold/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2670&auto=format&fit=crop"
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                                        alt="Artisan woodturning lathe crafting timber pen in Geelong workshop"
                                    />
                                </div>
                                <div className={`absolute -bottom-12 -right-12 w-80 aspect-square rounded-[3rem] p-12 flex flex-col justify-end shadow-2xl hidden xl:flex border-2 ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                                    <span className="material-symbols-outlined text-accent-gold text-6xl mb-6">precision_manufacturing</span>
                                    <h4 className={`font-serif text-3xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>Industrial <br />Precision</h4>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Meet the Maker Story Segment */}
                    <section className="pb-40 text-center">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <span className="text-accent-gold text-xs font-black uppercase tracking-[0.5em] block text-center opacity-70 italic">A Legacy Rebuilt</span>
                            <h2 className={`text-5xl md:text-8xl font-serif font-black transition-colors leading-[0.9] ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Built from the <span className="text-accent-gold italic text-6xl md:text-9xl">Heart</span>
                            </h2>
                            <p className={`text-2xl font-light italic leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                                "After two decades as a tradesman, a life-changing event defined my path anew. Two years ago, I moved my workshop from the open air to the sanctuary of my chair. Today, every piece I create is a testament to the fact that artistry has no limits."
                            </p>
                            <button
                                onClick={() => window.location.href = '/about'}
                                className="inline-flex items-center gap-6 bg-accent-gold/5 px-10 py-5 rounded-2xl text-accent-gold font-black text-xs uppercase tracking-[0.3em] hover:bg-accent-gold hover:text-black transition-all shadow-xl"
                            >
                                Read the Full Narrative <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />

            <style>{`
                .glow-effect:hover {
                    box-shadow: 0 0 50px rgba(212, 175, 55, 0.5);
                }
            `}</style>
        </div>
    );
};

export default Home;
