import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const PenBuilder = () => {
    const { isDarkMode } = useTheme();
    const [config, setConfig] = useState({
        instrument: 'Fountain Pen',
        wood: 'Tasmanian Blackwood',
        trim: '24k Gold',
        nib: 'Medium',
    });

    const instruments = [
        { name: 'Fountain Pen', icon: 'edit', note: 'The purest connection between hand and page. For those who savour the ritual of ink.' },
        { name: 'Rollerball', icon: 'stylus_note', note: 'The effortless glide of modern engineering, housed in timeless timber.' },
        { name: 'Ballpoint', icon: 'draw', note: 'The workhorse of the writing world. Reliable, resolute, always ready.' }
    ];

    const nibs = [
        { name: 'Extra Fine', note: 'For the detail-oriented. Every letter is deliberate, every flourish precise.' },
        { name: 'Fine', note: 'The diplomat\'s choice. Clean lines that command respect on any document.' },
        { name: 'Medium', note: 'The natural balance. Where most writers find their voice.' },
        { name: 'Broad', note: 'A broad nib rewards the patient hand. I grind these on Japanese waterstones.' },
        { name: 'Stub', note: 'For calligraphers and romantics. The line variation tells its own story.' }
    ];

    const woods = [
        { name: 'Tasmanian Blackwood', color: 'bg-[#4a3728]', note: 'My favorite to turn—the grain flows like a river.' },
        { name: 'Ancient Oak', color: 'bg-[#5c5448]', note: 'A timber that has stood for centuries, waiting for your story.' },
        { name: 'Huon Pine', color: 'bg-[#d2b48c]', note: 'The scent of the Tasmanian wilderness in every stroke.' },
        { name: 'Jarrah', color: 'bg-[#4a2511]', note: 'Strong, resilient, and honest. Just like a proper home.' }
    ];

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title="Custom Pen Builder — Commission a Bespoke Handcrafted Writing Instrument"
                description="Design your own bespoke handcrafted pen. Choose from Australian timbers including Tasmanian Blackwood, Huon Pine, Ancient Oak and Jarrah. Select your instrument type, nib grade, and finish. Hand-turned in Geelong, Victoria."
                keywords="custom pen builder, bespoke fountain pen commission, design your own pen Australia, handcrafted pen configurator, custom wooden pen order, Tasmanian Blackwood fountain pen, commission handmade pen Geelong, personalised pen gift Australia, custom rollerball pen"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    'name': `Custom ${config.instrument} — ${config.wood} with ${config.trim}`,
                    'description': `Bespoke handcrafted ${config.instrument.toLowerCase()} made from ${config.wood} with ${config.trim.toLowerCase()} appointments. Hand-turned in Geelong, Victoria.`,
                    'brand': { '@type': 'Brand', 'name': 'Barwon Craftworks' },
                    'category': 'Handcrafted Writing Instruments',
                    'offers': {
                        '@type': 'Offer',
                        'price': '345.00',
                        'priceCurrency': 'AUD',
                        'availability': 'https://schema.org/PreOrder',
                        'seller': { '@type': 'Organization', 'name': 'Barwon Craftworks' },
                        'deliveryLeadTime': { '@type': 'QuantitativeValue', 'minValue': 7, 'maxValue': 14, 'unitCode': 'DAY' }
                    }
                }}
            />
            <Header />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-10 py-10">
                {/* Cinematic Builder Hero */}
                <section className="rounded-[2rem] overflow-hidden relative min-h-[280px] flex items-center group mb-10 shadow-xl border p-1 transition-colors dark:border-[#2e3332] light:border-[#e5dec9]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{
                            backgroundImage: isDarkMode
                                ? "linear-gradient(to right, rgba(13, 16, 15, 0.95), rgba(13, 16, 15, 0.35)), url('https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2574&auto=format&fit=crop')"
                                : "linear-gradient(to right, rgba(253, 250, 243, 0.95), rgba(253, 250, 243, 0.35)), url('https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2574&auto=format&fit=crop')"
                        }}
                    ></div>
                    <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 px-10 md:px-16 py-10">
                        <div className="flex-shrink-0">
                            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-3 block underline decoration-accent-gold/40 underline-offset-8">Commission Your Own</span>
                            <h1 className={`text-4xl md:text-5xl font-serif font-black drop-shadow-xl leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Designing <br /><span className="italic text-accent-gold">Your Heirloom</span>
                            </h1>
                        </div>
                        <p className={`text-[18px] font-light leading-relaxed max-w-md drop-shadow-md ${isDarkMode ? 'text-white/90' : 'text-[#203c35]/80'}`}>
                            Design your own bespoke writing instrument from rare Australian timbers. Choose your instrument type, timber species, metalwork finish, and nib grade. Every curve you select is a choice I will honor at the lathe.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-0 md:px-8">
                    {/* Visualizer */}
                    <div className="sticky top-32">
                        <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-colors relative border p-1 ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                            <div className="absolute inset-0 bg-accent-gold/5 pointer-events-none z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=2670&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale-[10%]"
                                alt="Custom bespoke handcrafted pen preview — Australian timber writing instrument configurator"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20">
                                <h4 className="text-white text-3xl font-serif font-bold italic tracking-tight">The {config.wood.split(' ')[0]} Edition</h4>
                                <p className="text-white/60 text-sm mt-2">{config.instrument} · {config.trim} appointments{config.instrument === 'Fountain Pen' ? ` · ${config.nib} nib` : ''}</p>
                            </div>
                        </div>

                        {/* Maker's Commitment */}
                        <div className={`mt-8 p-10 rounded-[2.5rem] border shadow-lg transition-colors flex items-start gap-8 ${isDarkMode ? 'bg-[#1a1c1b] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                            <div className="size-16 rounded-2xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-accent-gold text-3xl">psychology</span>
                            </div>
                            <div>
                                <h4 className="font-serif text-2xl font-bold mb-2">"I review every choice."</h4>
                                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                    If I see a combination that won't age well or a timber grain that isn't up to my standard, I'll contact you personally to discuss an alternative.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-16">
                        {/* Step 01: Instrument Type */}
                        <div className="space-y-4">
                            <span className="text-accent-gold text-xs font-black uppercase tracking-[0.3em] block">Step 01: The Foundation</span>
                            <h3 className="text-5xl font-serif font-bold italic">The Instrument</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {instruments.map((inst) => (
                                <button
                                    key={inst.name}
                                    onClick={() => setConfig({ ...config, instrument: inst.name })}
                                    className={`group relative flex items-center gap-8 p-8 rounded-[2.5rem] border-2 transition-all text-left ${config.instrument === inst.name
                                        ? 'border-accent-gold bg-accent-gold/5 shadow-2xl'
                                        : isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'
                                        }`}
                                >
                                    <div className={`size-20 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${config.instrument === inst.name ? 'bg-accent-gold/20' : isDarkMode ? 'bg-[#1a1c1b]' : 'bg-[#f5f0e1]'}`}>
                                        <span className={`material-symbols-outlined text-3xl ${config.instrument === inst.name ? 'text-accent-gold' : isDarkMode ? 'text-slate-500' : 'text-[#203c35]/40'}`}>{inst.icon}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-xl font-bold ${config.instrument === inst.name ? 'text-accent-gold' : ''}`}>{inst.name}</span>
                                            {config.instrument === inst.name && <span className="material-symbols-outlined text-accent-gold scale-125">verified</span>}
                                        </div>
                                        <p className={`text-base italic ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                                            "{inst.note}"
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Step 02: Timber */}
                        <div className="space-y-4">
                            <span className="text-accent-gold text-xs font-black uppercase tracking-[0.3em] block">Step 02: The Soul of the Instrument</span>
                            <h3 className="text-5xl font-serif font-bold italic">The Timber</h3>
                        </div>

                        {/* Wood Selection with Maker's Notes */}
                        <div className="grid grid-cols-1 gap-6">
                            {woods.map((wood) => (
                                <button
                                    key={wood.name}
                                    onClick={() => setConfig({ ...config, wood: wood.name })}
                                    className={`group relative flex items-center gap-8 p-8 rounded-[2.5rem] border-2 transition-all text-left ${config.wood === wood.name
                                        ? 'border-accent-gold bg-accent-gold/5 shadow-2xl'
                                        : isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'
                                        }`}
                                >
                                    <div className={`size-20 rounded-2xl shadow-inner transition-all flex-shrink-0 ${wood.color}`}></div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-xl font-bold ${config.wood === wood.name ? 'text-accent-gold' : ''}`}>{wood.name}</span>
                                            {config.wood === wood.name && <span className="material-symbols-outlined text-accent-gold scale-125">verified</span>}
                                        </div>
                                        <p className={`text-base italic ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                                            "{wood.note}"
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-accent-gold text-xs font-black uppercase tracking-[0.3em] block">Step 03: Structural Elegance</span>
                                <h3 className="text-5xl font-serif font-bold italic">The Finish</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['24k Gold', 'Sterling Silver', 'Brushed Chrome', 'Gunmetal Noir'].map((trim) => (
                                    <button
                                        key={trim}
                                        onClick={() => setConfig({ ...config, trim: trim })}
                                        className={`px-8 py-5 rounded-2xl border-2 transition-all text-xs font-black uppercase tracking-widest ${config.trim === trim
                                            ? 'bg-accent-gold text-black border-accent-gold shadow-xl shadow-accent-gold/20'
                                            : isDarkMode ? 'bg-[#1a1c1b] border-[#2e3332] text-slate-400 hover:text-white hover:border-accent-gold/30' : 'bg-white border-[#e5dec9] text-[#203c35]/60 hover:text-[#203c35] hover:border-accent-gold/30'
                                            }`}
                                    >
                                        {trim}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 04: Nib (Fountain Pen only) */}
                        {config.instrument === 'Fountain Pen' && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-accent-gold text-xs font-black uppercase tracking-[0.3em] block">Step 04: The Character</span>
                                    <h3 className="text-5xl font-serif font-bold italic">The Nib</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {nibs.map((nib) => (
                                        <button
                                            key={nib.name}
                                            onClick={() => setConfig({ ...config, nib: nib.name })}
                                            className={`group relative flex items-center gap-6 p-6 rounded-2xl border-2 transition-all text-left ${config.nib === nib.name
                                                ? 'border-accent-gold bg-accent-gold/5 shadow-xl'
                                                : isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'
                                                }`}
                                        >
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-lg font-bold ${config.nib === nib.name ? 'text-accent-gold' : ''}`}>{nib.name}</span>
                                                    {config.nib === nib.name && <span className="material-symbols-outlined text-accent-gold">verified</span>}
                                                </div>
                                                <p className={`text-sm italic ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                                                    "{nib.note}"
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Summary Result */}
                        <div className={`p-12 rounded-[4rem] transition-colors border-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden ${isDarkMode ? 'bg-[#131615] border-accent-gold/30' : 'bg-[#fdfaf3] border-[#203c35]/10'}`}>
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-[10rem]">signature</span>
                            </div>
                            <div className="space-y-8 relative z-10 text-center">
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-[0.4em] text-accent-gold">Artisan Commission Fee</p>
                                    <h4 className="text-5xl md:text-6xl font-serif font-black">$345.00</h4>
                                </div>
                                <p className={`text-lg italic leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                                    "Your {config.instrument.toLowerCase()} commission includes the hand-turning of your {config.wood}, {config.trim.toLowerCase()} appointments, {config.instrument === 'Fountain Pen' ? `a ${config.nib.toLowerCase()} nib ground to your specification, ` : ''}a master-grade mechanism, a handcrafted presentation box, and a signed certificate of origin."
                                </p>
                                <button className="w-full bg-accent-gold text-black py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all shadow-2xl shadow-accent-gold/40 flex items-center justify-center gap-3 group">
                                    Initiate Heirloom Commission
                                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">send</span>
                                </button>
                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 opacity-60">Estimated lead time: 7-14 business days from the Geelong workshop.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PenBuilder;
