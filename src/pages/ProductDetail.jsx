import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';

const ProductDetail = () => {
    const { isDarkMode } = useTheme();
    const { addItem } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/api/products/${id}`)
            .then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); })
            .then(p => {
                setProduct({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    price: parseFloat(p.price),
                    img: p.image_url,
                    desc: p.description,
                    longDesc: p.description,
                    stock: p.stock,
                    specs: {}
                });
                return fetch(`${API_URL}/api/products?category=${encodeURIComponent(p.category)}`);
            })
            .then(r => r.json())
            .then(data => {
                setRelated(data.filter(r => r.id !== parseInt(id)).slice(0, 2).map(r => ({
                    id: r.id, name: r.name, category: r.category,
                    price: parseFloat(r.price), img: r.image_url
                })));
            })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-pulse text-center space-y-4">
                        <span className="material-symbols-outlined text-accent-gold text-5xl animate-spin">autorenew</span>
                        <p className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>Loading...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center space-y-6">
                        <span className="material-symbols-outlined text-accent-gold text-7xl">search_off</span>
                        <h1 className="text-4xl font-serif font-bold">Pen Not Found</h1>
                        <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>This writing instrument doesn't exist in our collection.</p>
                        <Link to="/pens" className="inline-block bg-accent-gold text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all">
                            Return to Collection
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({ id: product.id, name: product.name, price: product.price, img: product.img, category: product.category });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title={`${product.name} — Handcrafted ${product.category} ${product.category === 'Accessories' ? '' : 'Pen'}`}
                description={product.longDesc.substring(0, 160)}
                keywords={`${product.name}, handcrafted ${product.category.toLowerCase()} pen, Australian timber pen, artisan writing instrument`}
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    'name': product.name,
                    'description': product.longDesc,
                    'image': product.img,
                    'brand': { '@type': 'Brand', 'name': 'Barwon Craftworks' },
                    'offers': {
                        '@type': 'Offer',
                        'price': product.price.toFixed(2),
                        'priceCurrency': 'AUD',
                        'availability': 'https://schema.org/InStock',
                        'seller': { '@type': 'Organization', 'name': 'Barwon Craftworks' }
                    }
                }}
            />
            <Header />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-10 py-10">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2">
                    <Link to="/pens" className={`text-[10px] font-black uppercase tracking-widest transition-colors hover:text-accent-gold ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                        ← Back to Collection
                    </Link>
                    <span className={`text-[10px] ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>/</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold">{product.name}</span>
                </nav>

                {/* Product Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                    {/* Image */}
                    <div className="sticky top-32">
                        <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border p-1 transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                            <img
                                src={product.img}
                                className="w-full h-full object-cover rounded-[2.8rem]"
                                alt={`${product.name} — Handcrafted Australian timber ${product.category.toLowerCase()} by Barwon Craftworks`}
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-10 py-4">
                        <div>
                            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>{product.category}</p>
                            <h1 className={`text-5xl md:text-6xl font-serif font-black leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{product.name}</h1>
                            <p className="text-4xl font-serif font-black text-accent-gold">${product.price.toFixed(2)} <span className="text-sm font-normal tracking-widest uppercase">AUD</span></p>
                            <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>Complimentary Australian Shipping</p>
                        </div>

                        <div className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/80'}`}>
                            <p>{product.longDesc}</p>
                        </div>

                        {/* Add to Cart */}
                        <div className="space-y-4">
                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${added
                                    ? 'bg-green-600 text-white shadow-green-600/30'
                                    : 'bg-accent-gold text-black hover:bg-[#203c35] hover:text-white shadow-accent-gold/30'
                                }`}
                            >
                                {added ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={() => navigate('/pen-builder')}
                                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${isDarkMode ? 'border-[#2e3332] text-slate-400 hover:border-accent-gold hover:text-accent-gold' : 'border-[#e5dec9] text-[#203c35]/60 hover:border-[#203c35] hover:text-[#203c35]'}`}
                            >
                                Or Commission a Custom Version
                            </button>
                        </div>

                        {/* Specs */}
                        {Object.keys(product.specs).length > 0 && (
                        <div className={`rounded-[2rem] border p-8 md:p-10 space-y-6 transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                            <h3 className="text-xs font-black uppercase tracking-widest text-accent-gold">Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
                                {Object.entries(product.specs).filter(([, v]) => v !== 'N/A').map(([key, value]) => (
                                    <div key={key}>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/40'}`}>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-[#203c35]'}`}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}

                        {/* Trust Signals */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { icon: 'verified_user', label: 'Lifetime Warranty' },
                                { icon: 'local_shipping', label: 'Free AU Shipping' },
                                { icon: 'eco', label: 'Ethically Sourced' }
                            ].map(item => (
                                <div key={item.label} className={`text-center p-4 rounded-2xl border transition-colors ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                                    <span className="material-symbols-outlined text-accent-gold text-2xl mb-2 block">{item.icon}</span>
                                    <p className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className="mb-20">
                        <h2 className={`text-3xl font-serif font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            More from <span className="text-accent-gold italic">{product.category}</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            {related.map(r => (
                                <Link to={`/pens/${r.id}`} key={r.id} className="group cursor-pointer">
                                    <div className={`relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl p-1 border transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                                        <img
                                            src={r.img}
                                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 rounded-[2.3rem]"
                                            alt={r.name}
                                        />
                                    </div>
                                    <div className="flex justify-between items-start px-2">
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>{r.category}</p>
                                            <h3 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{r.name}</h3>
                                        </div>
                                        <p className="text-2xl font-serif font-black text-accent-gold">${r.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
