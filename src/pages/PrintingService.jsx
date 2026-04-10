import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const PrintingService = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [material, setMaterial] = useState('PLA Pro');

    const materials = [
        { name: 'PLA Pro', desc: 'Biodegradable, perfect for prototypes.', tolerance: '±0.2mm', buildVol: '350 × 350 × 400mm', layer: '0.1–0.3mm', wall: '1.2mm min', colours: 'White, Black, Grey, Red, Blue, Green, Yellow', best: 'Concept models, visual prototypes, display pieces, low-stress functional parts', icon: 'eco' },
        { name: 'PETG', desc: 'Industrial strength for functional parts.', tolerance: '±0.2mm', buildVol: '350 × 350 × 400mm', layer: '0.1–0.3mm', wall: '1.2mm min', colours: 'Clear, White, Black, Blue', best: 'Functional enclosures, chemical-resistant housings, food-safe containers, outdoor parts', icon: 'shield' },
        { name: 'Carbon Fiber', desc: 'The ultimate in lightweight resilience.', tolerance: '±0.15mm', buildVol: '250 × 250 × 250mm', layer: '0.1–0.2mm', wall: '1.0mm min', colours: 'Matte Black', best: 'Drone components, jigs & fixtures, lightweight structural parts, automotive brackets', icon: 'bolt' },
        { name: 'High-Detail Resin', desc: 'For those who need perfection.', tolerance: '±0.05mm', buildVol: '220 × 130 × 200mm', layer: '0.025–0.1mm', wall: '0.5mm min', colours: 'Grey, Clear, White, Black', best: 'Miniatures, jewellery masters, dental models, cosmetic prototypes, pen components', icon: 'diamond' }
    ];

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title="3D Printing Service Geelong — Custom PLA, PETG, Carbon Fiber & Resin Prints"
                description="Professional custom 3D printing service in Geelong, Victoria. PLA Pro, PETG, Carbon Fiber and High-Detail Resin printing. Rapid prototyping, functional parts, and precision manufacturing. Personal quality control on every print. 2-3 day turnaround."
                keywords="3D printing service Geelong, custom 3D printing Victoria, 3D printing near me Geelong, PLA printing Geelong, PETG 3D print Australia, carbon fiber 3D printing, resin printing service Victoria, rapid prototyping Geelong, custom parts 3D printed, additive manufacturing Geelong, 3D printing quote Australia"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    'name': 'Custom 3D Printing Service',
                    'description': 'Professional custom 3D printing in PLA Pro, PETG, Carbon Fiber and High-Detail Resin. Located in Geelong, Victoria.',
                    'provider': {
                        '@type': 'LocalBusiness',
                        'name': 'Barwon Craftworks',
                        'address': { '@type': 'PostalAddress', 'addressLocality': 'Geelong', 'addressRegion': 'VIC', 'addressCountry': 'AU' }
                    },
                    'areaServed': { '@type': 'State', 'name': 'Victoria' },
                    'serviceType': '3D Printing',
                    'offers': {
                        '@type': 'Offer',
                        'price': '15.00',
                        'priceCurrency': 'AUD',
                        'description': 'Workshop setup fee from $15. Material and time-based pricing.'
                    }
                }}
            />
            <Header />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-10 py-10">
                {/* Story-Led Technical Hero */}
                <section className="rounded-[2rem] overflow-hidden relative min-h-[280px] flex items-center group mb-10 shadow-xl border p-1 transition-colors dark:border-[#2e3332] light:border-[#e5dec9]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{
                            backgroundImage: isDarkMode
                                ? "linear-gradient(to right, rgba(13, 16, 15, 0.95), rgba(13, 16, 15, 0.35)), url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop')"
                                : "linear-gradient(to right, rgba(253, 250, 243, 0.95), rgba(253, 250, 243, 0.35)), url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop')"
                        }}
                    ></div>
                    <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 px-10 md:px-16 py-10">
                        <div className="flex-shrink-0">
                            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-3 block underline decoration-accent-gold/40 underline-offset-8">Beyond the Blueprint</span>
                            <h1 className={`text-4xl md:text-5xl font-serif font-black drop-shadow-xl leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Digital <span className="italic text-accent-gold">Pulse,</span><br />Human Touch.
                            </h1>
                        </div>
                        <p className={`text-[18px] font-light leading-relaxed max-w-md drop-shadow-md ${isDarkMode ? 'text-white/90' : 'text-[#203c35]/80'}`}>
                            Professional custom 3D printing in Geelong, Victoria. Tradesman's precision applied to every STL file. From rapid prototyping to functional end-use parts, every print is personally quality-checked.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
                    <div className="lg:col-span-2 space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-serif font-bold italic tracking-tight">The Precision Configurator</h2>
                            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                Select a 3D printing material that matches the intent of your project. From biodegradable PLA Pro for prototyping to industrial-strength PETG and carbon fiber composites for functional parts, each material is personally tested by me for structural integrity and aesthetic finish in our Geelong workshop.
                            </p>
                        </div>

                        {/* Material Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {materials.map((m) => (
                                <button
                                    key={m.name}
                                    onClick={() => setMaterial(m.name)}
                                    className={`p-8 rounded-3xl border-2 transition-all text-left flex flex-col gap-4 group relative overflow-hidden ${material === m.name
                                        ? 'border-accent-gold bg-accent-gold/5 shadow-xl'
                                        : isDarkMode
                                            ? 'border-[#2e3332] bg-[#131615] hover:border-accent-gold/30'
                                            : 'border-[#e5dec9] bg-white hover:border-accent-gold/30'
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <span className={`text-lg font-bold tracking-tight ${material === m.name ? 'text-accent-gold' : isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                            {m.name}
                                        </span>
                                        <span className={`material-symbols-outlined text-[22px] transition-all ${material === m.name ? 'text-accent-gold scale-125' : 'text-slate-500 opacity-20 group-hover:opacity-100'}`}>
                                            verified
                                        </span>
                                    </div>
                                    <span className={`text-sm relative z-10 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/60'}`}>{m.desc}</span>
                                    {material === m.name && <div className="absolute top-0 right-0 p-4 opacity-5"><span className="material-symbols-outlined text-6xl">token</span></div>}
                                </button>
                            ))}
                        </div>

                        {/* The Maker's Commitment to Quality */}
                        <div className={`p-10 rounded-[3rem] border-2 border-dashed transition-colors flex flex-col md:flex-row items-center gap-10 ${isDarkMode ? 'border-[#2e3332] bg-[#131615]' : 'border-[#e5dec9] bg-white'}`}>
                            <div className="size-24 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-accent-gold text-4xl">biotech</span>
                            </div>
                            <div className="space-y-4 text-center md:text-left">
                                <h4 className="text-2xl font-serif font-bold">"I review every slice myself."</h4>
                                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                    My transition to digital fabrication was driven by the same love for building that I had on the tools. I don't just 'hit print'—I optimize the geometry, adjust the infill for strength, and ensure your part performs exactly as you imagined.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className={`sticky top-32 p-10 rounded-[2.5rem] border-2 transition-colors shadow-2xl ${isDarkMode ? 'bg-[#1a1c1b] border-[#2e3332]' : 'bg-[#fdfaf3] border-[#e5dec9]'}`}>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-gold opacity-80 text-center">Your Project Vision</p>
                                    <h3 className="text-3xl font-serif font-bold text-center italic">Service Quote</h3>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-accent-gold/10">
                                    <div className="flex justify-between items-center h-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Workshop Setup</p>
                                        <p className="font-bold text-xl">$15.00</p>
                                    </div>
                                    <div className="flex justify-between items-center h-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Selected Material</p>
                                        <p className="font-bold text-accent-gold text-lg tracking-tight uppercase">{material}</p>
                                    </div>
                                    <div className="flex justify-between items-center h-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Personal QC</p>
                                        <p className="font-bold text-[#4caf50]">Included</p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-accent-gold/5 border border-accent-gold/10 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-accent-gold text-sm">schedule</span>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-accent-gold">Estimated Lead Time</p>
                                    </div>
                                    <p className={`text-sm tracking-tight ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                        Usually ready for pickup or shipping from our Geelong workshop in 2-3 business days.
                                    </p>
                                </div>

                                <button onClick={() => navigate('/3d-printing/quote')} className="w-full bg-accent-gold text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-accent-gold/30">
                                    Initiate Prototype Quote
                                </button>

                                <p className={`text-[9px] text-center uppercase font-black tracking-widest opacity-40 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]'}`}>
                                    All prints are manually finished for surface quality.
                                </p>

                                <div className={`pt-6 mt-2 border-t space-y-3 ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-gold opacity-80">Accepted Files</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['STL', 'STEP', 'OBJ', '3MF', 'IGES'].map((fmt) => (
                                            <span key={fmt} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-[#0d0f0e] text-slate-400' : 'bg-[#f5f0e1] text-[#203c35]/60'}`}>{fmt}</span>
                                        ))}
                                    </div>
                                    <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                                        Email your file to <span className="text-accent-gold">hello@barwoncraftworks.com.au</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <section id="how-it-works" className="mb-32 scroll-mt-24">
                    <div className="text-center mb-16">
                        <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">From File to Finished Part</span>
                        <h2 className={`text-4xl md:text-5xl font-serif font-black transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            How It <span className="italic text-accent-gold">Works</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '01', icon: 'upload_file', title: 'Send Your File', desc: 'Email your STL, STEP, or OBJ file to the workshop with a brief description of the application and your preferred material. No file yet? I can connect you with a local Geelong industrial designer who speaks fluent CAD.' },
                            { step: '02', icon: 'category', title: 'Material Selection', desc: 'I\'ll recommend the right material based on your part\'s purpose — whether it\'s a visual prototype in PLA Pro or a structural bracket in Carbon Fiber. I assess every project the way I used to assess blueprints on the job site: what does this part need to survive?' },
                            { step: '03', icon: 'receipt_long', title: 'Review Your Quote', desc: 'Within 24–48 hours, you\'ll receive a detailed quote covering material cost, print time, post-processing, and shipping. No hidden fees. The price you see is the price you pay — that\'s a tradesman\'s promise.' },
                            { step: '04', icon: 'local_shipping', title: 'Print, QC & Ship', desc: 'I personally slice the geometry, monitor the print, inspect every surface, and pack it from the Geelong workshop. Most orders ship within 2–3 business days. Your part arrives with the same care as a handcrafted pen.' }
                        ].map((item) => (
                            <div key={item.step} className={`p-8 rounded-[2rem] border-2 transition-colors relative overflow-hidden ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                                <span className="absolute top-4 right-6 text-[4rem] font-black font-serif text-accent-gold/10">{item.step}</span>
                                <div className="size-14 rounded-2xl bg-accent-gold/10 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-accent-gold text-2xl">{item.icon}</span>
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{item.title}</h3>
                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Material Specifications */}
                <section id="materials" className="mb-32 scroll-mt-24">
                    <div className="text-center mb-16">
                        <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Engineering-Grade Options</span>
                        <h2 className={`text-4xl md:text-5xl font-serif font-black transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            Materials & <span className="italic text-accent-gold">Specifications</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        {materials.map((m) => (
                            <div key={m.name} className={`p-8 md:p-10 rounded-[2rem] border-2 transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                                <div className="flex flex-col md:flex-row md:items-start gap-8">
                                    <div className="size-16 rounded-2xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-accent-gold text-3xl">{m.icon}</span>
                                    </div>
                                    <div className="flex-grow space-y-4">
                                        <div>
                                            <h3 className={`text-2xl font-serif font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{m.name}</h3>
                                            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>{m.best}</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {[
                                                { label: 'Tolerance', value: m.tolerance },
                                                { label: 'Build Volume', value: m.buildVol },
                                                { label: 'Layer Height', value: m.layer },
                                                { label: 'Min Wall', value: m.wall },
                                                { label: 'Colours', value: m.colours }
                                            ].map((spec) => (
                                                <div key={spec.label} className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#0d0f0e]' : 'bg-[#fdfaf3]'}`}>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-accent-gold mb-1">{spec.label}</p>
                                                    <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-[#203c35]'}`}>{spec.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Accepted File Formats */}
                <section className="mb-32">
                    <div className={`p-10 md:p-14 rounded-[2rem] border-2 transition-colors text-center ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                        <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Ready When You Are</span>
                        <h2 className={`text-3xl md:text-4xl font-serif font-black mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            Accepted File Formats
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {['STL', 'STEP / STP', 'OBJ', '3MF', 'IGES / IGS'].map((fmt) => (
                                <span key={fmt} className={`px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest border-2 ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332] text-slate-300' : 'bg-[#fdfaf3] border-[#e5dec9] text-[#203c35]'}`}>{fmt}</span>
                            ))}
                        </div>
                        <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                            Don't have a 3D file yet? That's fine — most of my clients start with a sketch on paper or an idea in their head. I work with a local Geelong industrial designer who can turn your concept into a production-ready CAD file. Email me at <span className="text-accent-gold font-bold">hello@barwoncraftworks.com.au</span> and we'll figure it out together.
                        </p>
                    </div>
                </section>

                {/* Applications */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">What People Build</span>
                        <h2 className={`text-4xl md:text-5xl font-serif font-black transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            Applications & <span className="italic text-accent-gold">Use Cases</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            { icon: 'science', title: 'Rapid Prototyping', desc: 'Test form and fit before committing to tooling' },
                            { icon: 'precision_manufacturing', title: 'Functional Parts', desc: 'End-use components built to perform under load' },
                            { icon: 'construction', title: 'Jigs & Fixtures', desc: 'Custom workshop tooling and alignment guides' },
                            { icon: 'memory', title: 'Enclosures', desc: 'Electronics housings and control boxes' },
                            { icon: 'sync_alt', title: 'Replacement Parts', desc: 'Reverse-engineer obsolete or broken components' },
                            { icon: 'domain', title: 'Architectural Models', desc: 'Scale models for presentations and planning' },
                            { icon: 'edit', title: 'Pen Components', desc: 'Custom fittings and mechanisms for our writing instruments' },
                            { icon: 'toys', title: 'Creative & Art', desc: 'Sculptures, miniatures, and artistic prototypes' }
                        ].map((app) => (
                            <div key={app.title} className={`p-6 rounded-[1.5rem] border-2 transition-colors text-center group hover:border-accent-gold/30 ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                                <div className="size-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-accent-gold text-xl">{app.icon}</span>
                                </div>
                                <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{app.title}</h3>
                                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/60'}`}>{app.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Post-Processing & Finishing */}
                <section className="mb-32">
                    <div className={`p-10 md:p-14 rounded-[2rem] border-2 border-dashed transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                        <div className="text-center mb-12">
                            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Finishing Touch</span>
                            <h2 className={`text-3xl md:text-4xl font-serif font-black transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Post-Processing & Finishing
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: 'carpenter', title: 'Support Removal & Cleanup', desc: 'Every print is hand-cleaned. I remove supports with the same precision I used to trim joinery on a building site — no rough edges, no leftover marks.' },
                                { icon: 'blur_on', title: 'Sanding & Smoothing', desc: 'FDM parts are sanded through progressive grits for a smoother surface. Resin prints are cured and polished to a near-injection-mould finish.' },
                                { icon: 'opacity', title: 'Vapor Smoothing', desc: 'Available for resin parts. Chemical vapor smoothing eliminates layer lines and produces a glossy, professional surface.' },
                                { icon: 'palette', title: 'Painting & Coating', desc: 'On request, parts can be primed and painted to your colour specification. Clear-coat UV protection available for outdoor applications.' },
                                { icon: 'build', title: 'Assembly & Inserts', desc: 'Heat-set threaded inserts, press-fit bearings, multi-part assembly, and basic mechanical integration — all handled at the bench.' },
                                { icon: 'verified', title: 'Final Inspection', desc: 'Every part is dimensionally checked with digital calipers, visually inspected under magnification, and test-fit where applicable before packing.' }
                            ].map((proc) => (
                                <div key={proc.title} className="flex items-start gap-4">
                                    <div className="size-10 rounded-xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-accent-gold text-lg">{proc.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className={`text-base font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{proc.title}</h3>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>{proc.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quality Assurance */}
                <section className="mb-32">
                    <div className={`p-10 md:p-14 rounded-[2rem] border-2 transition-colors flex flex-col md:flex-row items-center gap-10 ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                        <div className="size-28 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-accent-gold text-5xl">workspace_premium</span>
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className={`text-3xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>What "Personal QC" Actually Means</h2>
                            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                When I say every print is personally quality-checked, I mean I — the same person who spent twenty years on construction sites where a bad measurement could put someone in hospital — physically inspect every part that leaves this workshop. Digital caliper measurements against your specifications. Visual inspection under a magnifying lamp for surface defects. Test fitting against mating parts where applicable. Surface finish assessment by hand. If it's not right, it doesn't ship. I've staked my family's name on this bench, and a 3D printed part carries the same weight as a handcrafted pen. There are no shortcuts from this wheelchair.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3D Printing FAQ */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Common Questions</span>
                        <h2 className={`text-4xl md:text-5xl font-serif font-black transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            3D Printing <span className="italic text-accent-gold">FAQ</span>
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            { q: 'How much does 3D printing cost?', a: 'Pricing depends on material, print volume, and complexity. A small PLA prototype might start at $15–25. Larger functional parts in PETG or Carbon Fiber scale with material usage and print time. I provide exact quotes within 24–48 hours — no estimates, no surprises. The workshop setup fee is $15, which covers file preparation, slicing optimisation, and personal quality control.' },
                            { q: 'What file format do I need?', a: 'I accept STL, STEP, OBJ, 3MF, and IGES files. STEP files are ideal because they preserve dimensional accuracy and design intent. If you only have a sketch or an idea, I can connect you with a Geelong-based industrial designer who can create a production-ready 3D model for you.' },
                            { q: 'Can you help with design?', a: 'I\'m not a CAD designer — I\'m a maker. But I work closely with a local design partner here in Geelong who handles everything from concept sketches to engineering-grade STEP files. I can coordinate the whole process so you deal with one workshop, not two separate vendors.' },
                            { q: 'What\'s the turnaround time?', a: 'Most orders are printed, inspected, and shipped within 2–3 business days from the Geelong workshop. Complex multi-part builds or large-format prints may take up to 5 days. I\'ll confirm the timeline in your quote before we start.' },
                            { q: 'Do you ship 3D printed parts?', a: 'Yes. Domestic shipping within Australia is available on all orders, with tracking. Parts are packed with the same care I give to handcrafted pens — foam-lined boxes, protective wrapping, and a delivery confirmation. International shipping is available on request.' },
                            { q: 'Is there a minimum order?', a: 'No minimum. I\'ll print a single prototype or a batch of 200 identical parts. The per-unit cost naturally decreases with volume because the setup time is amortised across more pieces, but there\'s no threshold you need to hit to get started.' }
                        ].map((faq, i) => (
                            <div key={i} className={`p-8 rounded-[1.5rem] border-2 transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                                <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{faq.q}</h3>
                                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PrintingService;
