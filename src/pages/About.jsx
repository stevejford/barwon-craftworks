import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title="Our Story — Australian Artisan Pen Maker in Geelong"
                description="Meet the maker behind Barwon Craftworks. A former 20-year tradesman turned artisan woodturner, handcrafting fountain pens and rollerball pens from rare Australian timbers like Tasmanian Blackwood, Huon Pine and Jarrah in his Geelong, Victoria workshop."
                keywords="Australian pen maker, artisan woodturner Geelong, handmade pen story, Barwon Craftworks about, pen turning Australia, woodturning craftsman Victoria, handcrafted writing instruments maker, disability artisan story"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    'mainEntity': {
                        '@type': 'Person',
                        'name': 'Barwon Craftworks Artisan',
                        'jobTitle': 'Master Pen Turner & Artisan Woodworker',
                        'description': 'A former 20-year tradesman turned artisan pen maker, handcrafting writing instruments from rare Australian timbers in Geelong, Victoria.',
                        'knowsAbout': ['Woodturning', 'Pen Making', 'Australian Timber', 'Artisan Craft'],
                        'workLocation': {
                            '@type': 'Place',
                            'name': 'Barwon Craftworks Workshop',
                            'address': { '@type': 'PostalAddress', 'addressLocality': 'Geelong', 'addressRegion': 'VIC', 'addressCountry': 'AU' }
                        }
                    }
                }}
            />
            <Header />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-10 py-10">
                {/* Cinematic About Hero */}
                <section className="rounded-[2rem] overflow-hidden relative min-h-[280px] flex items-center group mb-10 shadow-xl border p-1 transition-colors dark:border-[#2e3332] light:border-[#e5dec9]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{
                            backgroundImage: isDarkMode
                                ? "linear-gradient(to right, rgba(13, 16, 15, 0.95), rgba(13, 16, 15, 0.35)), url('https://images.unsplash.com/photo-1722411927318-ba7be472dd50?q=80&w=2670&auto=format&fit=crop')"
                                : "linear-gradient(to right, rgba(253, 250, 243, 0.95), rgba(253, 250, 243, 0.35)), url('https://images.unsplash.com/photo-1722411927318-ba7be472dd50?q=80&w=2670&auto=format&fit=crop')"
                        }}
                    ></div>
                    <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 px-10 md:px-16 py-10">
                        <div className="flex-shrink-0">
                            <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-3 block underline decoration-accent-gold/40 underline-offset-8">Our Heritage</span>
                            <h1 className={`text-4xl md:text-5xl font-serif font-black drop-shadow-xl leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Where Resilience <br /><span className="italic text-accent-gold">Meets</span> Artistry
                            </h1>
                        </div>
                        <p className={`text-[18px] font-light leading-relaxed max-w-md drop-shadow-md ${isDarkMode ? 'text-white/90' : 'text-[#203c35]/80'}`}>
                            The story of a Geelong artisan who turned twenty years of tradesman's grit into handcrafted writing instruments from rare Australian timbers. "I don't just build pens; I build the witnesses to your most sacred promises."
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
                    <div className="space-y-12 order-2 lg:order-1">
                        <div className={`space-y-8 text-xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/80'}`}>
                            <p>
                                Two years ago, a life defined by the physical grit of a tradesman changed in an instant. The job sites and the scaffolding were replaced by a wheelchair, and a man who had spent his life building the world found himself needing to rebuild his own.
                            </p>
                            <p>
                                But a craftsman's soul cannot be contained. In the quiet sanctuary of his Geelong workshop, the tools were lowered, the benches were refined, and a new vision took shape. From that chair, Barwon Craftworks was born — not just as a business, but as a path back to wholeness through the ancient art of woodturning.
                            </p>
                            <p>
                                Today, my work is a dialogue between the organic beauty of Australian timber and the quiet precision of the lathe. Whether it's a handcrafted fountain pen turned from 500-year-old reclaimed oak or a rollerball pen shaped from Tasmanian Blackwood, every piece carries the same weight: the pride of a father providing for his family through the mastery of his hands.
                            </p>
                            <p>
                                Every pen begins its life as a rough block of ethically sourced Australian hardwood. I mount it on the lathe, and over hours of careful turning, the grain reveals itself — swirls of amber and chocolate in the Blackwood, honey-gold warmth in the Huon Pine, deep red fire in the Jarrah. The timber tells me what shape it wants to become. I finish each piece to a mirror-smooth 400-grit polish, fit a precision mechanism, and sign a certificate of origin. From raw timber to finished writing instrument, no step leaves my bench.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div className="space-y-2">
                                <h3 className="text-4xl font-serif font-black text-accent-gold">20+</h3>
                                <p className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>Years on Tools</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-4xl font-serif font-black text-accent-gold">100%</h3>
                                <p className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>Hand-finished</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className={`relative aspect-square rounded-[4rem] overflow-hidden border p-1 shadow-2xl transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-[#f5f0e1] border-[#e5dec9]'}`}>
                            <img
                                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2670&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 rounded-[3.8rem]"
                                alt="Australian artisan woodturner handcrafting a timber pen at the lathe in Geelong workshop"
                            />
                            <div className="absolute inset-0 bg-accent-gold/5 pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* The "Why We Create" Section */}
                <section className={`py-40 px-8 rounded-[4rem] text-center relative overflow-hidden transition-colors ${isDarkMode ? 'bg-[#131615]' : 'bg-white'}`}>
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-[15rem]">history_edu</span>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                        <span className="text-accent-gold text-xs font-black uppercase tracking-[0.4em] block">Our Purpose</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold">Instruments for <span className="text-accent-gold italic">Generations</span></h2>
                        <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                            I create these handcrafted writing instruments because I know that the most important words are often the hardest to write. Whether it's a wedding vow, a business contract, or a letter to someone you love, my goal is to give you a tool that feels as significant as the signature you're about to make. Every handmade fountain pen and rollerball pen in our collection is built to be passed down — an heirloom, not a disposable.
                        </p>
                        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/pens" className="text-accent-gold text-xs font-black uppercase tracking-[0.2em] hover:underline underline-offset-4">Browse the Collection →</Link>
                            <Link to="/pen-builder" className="text-accent-gold text-xs font-black uppercase tracking-[0.2em] hover:underline underline-offset-4">Commission a Bespoke Pen →</Link>
                            <Link to="/info/timber-sourcing" className="text-accent-gold text-xs font-black uppercase tracking-[0.2em] hover:underline underline-offset-4">Our Timber Sourcing →</Link>
                        </div>
                        <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-10">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-accent-gold text-3xl">eco</span>
                                <p className="text-xs font-black uppercase tracking-widest">Ethically Sourced Timbers</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-accent-gold text-3xl">verified</span>
                                <p className="text-xs font-black uppercase tracking-widest">Lifetime Artisan Warranty</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
