import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';

const PensShop = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    // Normalize parameter to match internal category names
    const getInitialCategory = () => {
        if (!categoryParam) return 'All';
        const formatted = categoryParam.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const validCategories = ['Fountain', 'Rollerball', 'Limited Edition', 'Accessories'];
        return validCategories.includes(formatted) ? formatted : 'All';
    };

    const [activeCategory, setActiveCategory] = useState(getInitialCategory());
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Fountain', 'Rollerball', 'Limited Edition', 'Accessories'];

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(r => r.json())
            .then(data => {
                setProducts(data.map(p => ({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    price: parseFloat(p.price),
                    img: p.image_url,
                    desc: p.description,
                    stock: p.stock
                })));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title={activeCategory === 'All' ? 'Handcrafted Pens — Australian Timber Fountain Pens & Rollerballs' : `${activeCategory} Pens — Handcrafted Australian Timber Writing Instruments`}
                description={`Shop handcrafted ${activeCategory === 'All' ? 'fountain pens, rollerball pens and accessories' : activeCategory.toLowerCase() + ' pens'} made from rare Australian timbers including Tasmanian Blackwood, Huon Pine and Jarrah. Each writing instrument is hand-turned and finished in our Geelong, Victoria workshop. Free Australian shipping.`}
                keywords={`buy handcrafted fountain pen Australia, handmade wooden pen online, Australian timber pen shop, ${activeCategory !== 'All' ? activeCategory.toLowerCase() + ' pen handmade, ' : ''}custom pen Geelong, luxury wooden pen gift, Tasmanian Blackwood pen buy, Huon Pine pen, artisan pen collection, writing instrument Australia`}
                ogType="website"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    'name': 'Handcrafted Australian Timber Pens Collection',
                    'description': 'Artisan writing instruments handcrafted from rare Australian timbers in Geelong, Victoria.',
                    'url': 'https://barwoncraftworks.com.au/pens',
                    'numberOfItems': filteredProducts.length,
                    'itemListElement': filteredProducts.map((p, i) => ({
                        '@type': 'ListItem',
                        'position': i + 1,
                        'item': {
                            '@type': 'Product',
                            'name': p.name,
                            'description': p.desc,
                            'category': `Handcrafted ${p.category} Pen`,
                            'brand': { '@type': 'Brand', 'name': 'Barwon Craftworks' },
                            'offers': {
                                '@type': 'Offer',
                                'price': p.price.toFixed(2),
                                'priceCurrency': 'AUD',
                                'availability': 'https://schema.org/InStock',
                                'seller': { '@type': 'Organization', 'name': 'Barwon Craftworks' }
                            }
                        }
                    }))
                }}
            />
            <Header />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-10 py-10">
                {/* Shop Hero — Compact Two-Column */}
                <section className="rounded-[2rem] overflow-hidden relative min-h-[280px] flex items-center group mb-10 shadow-xl border p-1 transition-colors dark:border-[#2e3332] light:border-[#e5dec9]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{
                            backgroundImage: isDarkMode
                                ? "linear-gradient(to right, rgba(13, 16, 15, 0.95), rgba(13, 16, 15, 0.35)), url('https://images.unsplash.com/photo-1649954049118-1c213fcdeadc?q=80&w=2670&auto=format&fit=crop')"
                                : "linear-gradient(to right, rgba(253, 250, 243, 0.95), rgba(253, 250, 243, 0.35)), url('https://images.unsplash.com/photo-1649954049118-1c213fcdeadc?q=80&w=2670&auto=format&fit=crop')"
                        }}
                    ></div>
                    <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 px-6 md:px-16 py-8 md:py-10">
                        <div className="flex-shrink-0">
                            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-3 block underline decoration-accent-gold/40 underline-offset-8">Curated Collections</span>
                            <h1 className={`text-4xl md:text-5xl font-serif font-black drop-shadow-xl leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Instruments of <br /><span className="italic text-accent-gold">Legacy</span>
                            </h1>
                        </div>
                        <p className={`text-[18px] font-light leading-relaxed max-w-md drop-shadow-md ${isDarkMode ? 'text-white/90' : 'text-[#203c35]/80'}`}>
                            Every pen here began as a rough block of rare Australian timber in my Geelong workshop. Hand-turned from Tasmanian Blackwood, Huon Pine and Jarrah — each one finished to witness your most important stories. Free shipping Australia-wide.
                        </p>
                    </div>
                </section>

                {/* Category Filters */}
                <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-5 border-b transition-colors ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    if (cat === 'All') {
                                        searchParams.delete('category');
                                    } else {
                                        searchParams.set('category', cat.toLowerCase());
                                    }
                                    setSearchParams(searchParams);
                                }}
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                    ? 'bg-accent-gold text-black shadow-lg shadow-accent-gold/30'
                                    : isDarkMode
                                        ? 'bg-[#1e2321] text-slate-400 hover:text-white hover:bg-[#2e3332] border border-[#2e3332]'
                                        : 'bg-[#f5f0e1] text-[#203c35]/60 hover:text-[#203c35] hover:bg-[#e5dec9] border border-[#e5dec9]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <p className={`text-[10px] font-black uppercase tracking-widest flex-shrink-0 ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/40'}`}>
                        {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''} available
                    </p>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {[1,2,3].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className={`aspect-[4/5] rounded-[2.5rem] mb-8 ${isDarkMode ? 'bg-[#1e2321]' : 'bg-[#e5dec9]/50'}`} />
                                <div className={`h-4 rounded w-2/3 mb-2 ${isDarkMode ? 'bg-[#1e2321]' : 'bg-[#e5dec9]/50'}`} />
                                <div className={`h-3 rounded w-1/3 ${isDarkMode ? 'bg-[#1e2321]' : 'bg-[#e5dec9]/50'}`} />
                            </div>
                        ))}
                    </div>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {filteredProducts.map((p) => (
                        <div key={p.id} className="group cursor-pointer" onClick={() => navigate(`/pens/${p.id}`)}>
                            <div className={`relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 transition-colors shadow-2xl p-1 border ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                                <img
                                    src={p.img}
                                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 rounded-[2.3rem]"
                                    alt={p.name}
                                />
                                <div className={`absolute top-6 right-6 h-12 w-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${isDarkMode ? 'bg-[#0d0f0e]/40 hover:bg-accent-gold hover:text-black text-white' : 'bg-white/60 hover:bg-[#203c35] hover:text-white text-[#203c35]'}`}>
                                    <span className="material-symbols-outlined text-[20px]">history_edu</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                                        <p className="text-[#203c35] text-sm italic mb-4 leading-relaxed">
                                            "{p.desc}"
                                        </p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate(`/pens/${p.id}`); }}
                                            className="w-full bg-[#203c35] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-gold hover:text-black transition-colors shadow-xl"
                                        >
                                            Adopt This Memory
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-start px-4">
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>{p.category}</p>
                                    <h3 className={`text-3xl font-serif font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{p.name}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-serif font-black text-accent-gold">${p.price.toFixed(2)}</p>
                                    <span className={`text-[9px] font-black uppercase tracking-widest block mt-1 ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>Complimentary Global Shipping</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}

                {/* Personal Commission Teaser */}

                <div className={`mt-40 p-20 rounded-[4rem] transition-colors border-2 border-dashed flex flex-col items-center justify-center text-center relative overflow-hidden ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                    <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-9xl">brush</span>
                    </div>
                    <div className="size-24 rounded-full bg-accent-gold/10 flex items-center justify-center mb-8">
                        <span className="material-symbols-outlined text-accent-gold text-5xl">edit</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Blank Page Awaits</h3>
                    <p className={`text-xl transition-colors leading-relaxed max-w-2xl mb-12 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                        Don't see exactly what you're looking for? I take on strictly limited commissions each month to create one-off pieces for special occasions. Let’s talk about your vision.
                    </p>
                    <button
                        onClick={() => window.location.href = '/contact'}
                        className="bg-accent-gold text-black px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all shadow-2xl shadow-accent-gold/30"
                    >
                        Start a Private Commission
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PensShop;
