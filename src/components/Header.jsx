import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const { totalItems, setIsCartOpen } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);

    const isActive = (path) => location.pathname === path || location.pathname + location.search === path;

    const handleNavClick = (e, path) => {
        if (path.includes('#')) {
            const [basePath, hash] = path.split('#');
            if (location.pathname === basePath || (basePath === '' && location.pathname === '/')) {
                // Already on the page — just scroll to the element
                e.preventDefault();
                const el = document.getElementById(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            // Otherwise, let the Link navigate; ScrollToTop will handle the hash
        }
    };

    const navSections = [
        {
            name: 'Pens',
            links: [
                { name: 'All Pens', path: '/pens' },
                { name: 'Fountain Pens', path: '/pens?category=fountain' },
                { name: 'Rollerball Pens', path: '/pens?category=rollerball' },
                { name: 'Limited Edition', path: '/pens?category=limited edition' },
                { name: 'Artisan Accessories', path: '/pens?category=accessories' },
                { name: 'Pen Builder', path: '/pen-builder' },
                { name: 'Gift Guide', path: '/info/gifts' }
            ]
        },
        {
            name: 'About',
            links: [
                { name: 'Our Story', path: '/about' },
                { name: 'The Workshop', path: '/info/workshop' },
                { name: 'Timber Sourcing', path: '/info/timber-sourcing' },
                { name: 'Sustainability', path: '/info/sustainability' },
                { name: 'Artisan Journal', path: '/info/journal' },
                { name: 'Wholesale & Corporate', path: '/info/wholesale' },
                { name: 'Bespoke Commissions', path: '/pen-builder' }
            ]
        },
        {
            name: 'Help',
            links: [
                { name: 'FAQ', path: '/info/faq' },
                { name: 'Pen Care Guide', path: '/info/pen-care' },
                { name: 'Shipping Info', path: '/info/shipping' },
                { name: 'Returns Policy', path: '/info/returns' },
                { name: 'Artisan Warranty', path: '/info/warranty' },
                { name: 'Contact Workshop', path: '/contact' }
            ]
        }
    ];

    return (
        <>
        <header className={`sticky top-0 z-50 w-full transition-colors duration-500 border-b backdrop-blur-sm ${isDarkMode ? 'bg-[#131615]/95 border-[#2e3332]' : 'bg-[#fdfaf3]/95 border-[#e5dec9]'}`}>
            <div className="max-w-[1400px] mx-auto px-4 lg:px-10 h-[80px] flex items-center justify-between">
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 group py-2">
                        <div className="relative size-12 flex items-center justify-center">
                            <svg className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${isDarkMode ? 'text-accent-gold' : 'text-[#203c35]'}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 5L14 15C14 15 14 22 10 26C6 30 6 34 10 34H30C34 34 34 30 30 26C26 22 26 15 26 15L20 5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                <path d="M20 5V24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                <circle cx="20" cy="24" r="1.5" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col -space-y-1.5 ml-1">
                            <h1 className={`font-['Pinyon_Script'] text-5xl transition-colors leading-[0.8] ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                Barwon
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-accent-gold">
                                    CRAFTWORKS
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden xl:flex items-center gap-2">
                        {navSections.map((section) => (
                            <div key={section.name} className="relative group px-4 py-7">
                                <button className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] transition-all ${isDarkMode ? 'text-slate-400 hover:text-accent-gold' : 'text-[#203c35]/60 hover:text-[#203c35]'}`}>
                                    {section.name}
                                    <span className="material-symbols-outlined text-[14px] group-hover:rotate-180 transition-transform text-accent-gold/50">expand_more</span>
                                </button>

                                {/* Dropdown Menu */}
                                <div className={`absolute top-[80px] left-0 w-72 border rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-[100] ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`}>
                                    <div className="p-3 space-y-1">
                                        <div className="px-4 py-2 mb-2 border-b border-accent-gold/10">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-gold opacity-50">{section.name} Overview</p>
                                        </div>
                                        {section.links.map(link => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                onClick={(e) => handleNavClick(e, link.path)}
                                                className={`flex items-center justify-between px-4 py-4 rounded-xl text-sm font-semibold transition-all group/item ${isActive(link.path) ? 'text-accent-gold bg-accent-gold/5' : isDarkMode ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-[#203c35]/5 text-[#203c35]/70 hover:text-[#203c35]'}`}
                                            >
                                                {link.name}
                                                <span className="material-symbols-outlined text-[18px] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-accent-gold">arrow_forward</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:gap-6">
                    <button
                        onClick={toggleTheme}
                        className={`flex items-center justify-center size-11 rounded-full transition-all ${isDarkMode ? 'bg-[#1e2321] text-accent-gold hover:bg-accent-gold hover:text-black border border-[#2e3332]' : 'bg-[#f5f0e1] text-[#203c35] hover:bg-[#203c35] hover:text-[#fdfaf3] border border-[#e5dec9]'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <div className="hidden lg:flex items-center gap-6">
                        <button onClick={() => setIsCartOpen(true)} className={`transition-colors relative h-11 w-11 flex items-center justify-center rounded-full border ${isDarkMode ? 'text-slate-300 hover:text-accent-gold border-[#2e3332]' : 'text-[#203c35]/70 hover:text-[#203c35] border-[#e5dec9]'}`} aria-label="Your Collection">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 size-5 bg-accent-gold text-black text-[10px] font-black rounded-full flex items-center justify-center">{totalItems}</span>
                            )}
                        </button>
                        <button className={`h-11 w-11 flex items-center justify-center rounded-full border transition-colors ${isDarkMode ? 'text-slate-300 hover:text-accent-gold border-[#2e3332]' : 'text-[#203c35]/70 hover:text-[#203c35] border-[#e5dec9]'}`}>
                            <span className="material-symbols-outlined">account_circle</span>
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden h-11 w-11 flex items-center justify-center rounded-full bg-accent-gold text-black shadow-lg">
                        <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

        </header>

            {/* Mobile Menu Overlay — outside header to avoid sticky context issues */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] xl:hidden" onClick={() => setMobileOpen(false)} />
            )}

            {/* Mobile Menu Panel — outside header */}
            <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-[999] xl:hidden transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-[#131615]' : 'bg-[#fdfaf3]'}`}>
                {/* Mobile Header */}
                <div className={`h-[80px] flex items-center justify-between px-6 border-b flex-shrink-0 ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>Menu</span>
                    <button onClick={() => setMobileOpen(false)} className={`size-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-[#e5dec9] text-[#203c35]/60'}`}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Mobile Nav */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {navSections.map((section) => (
                        <div key={section.name} className={`border-b ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]/60'}`}>
                            <button
                                onClick={() => setExpandedSection(expandedSection === section.name ? null : section.name)}
                                className={`w-full flex items-center justify-between px-6 py-4 text-sm font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#203c35]/80 hover:text-[#203c35]'}`}
                            >
                                {section.name}
                                <span className={`material-symbols-outlined text-accent-gold text-[18px] transition-transform ${expandedSection === section.name ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${expandedSection === section.name ? 'max-h-[500px] pb-3' : 'max-h-0'}`}>
                                {section.links.map(link => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={(e) => { handleNavClick(e, link.path); setMobileOpen(false); setExpandedSection(null); }}
                                        className={`block px-10 py-3 text-sm transition-colors ${isActive(link.path) ? 'text-accent-gold font-bold' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#203c35]/60 hover:text-[#203c35]'}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Mobile Footer Actions */}
                <div className={`p-6 border-t space-y-3 flex-shrink-0 ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                    <button onClick={() => { setIsCartOpen(true); setMobileOpen(false); }} className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${isDarkMode ? 'border-[#2e3332] text-slate-300 hover:border-accent-gold hover:text-accent-gold' : 'border-[#e5dec9] text-[#203c35]/70 hover:border-[#203c35] hover:text-[#203c35]'}`}>
                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                        Your Collection {totalItems > 0 && `(${totalItems})`}
                    </button>
                    <button onClick={() => { navigate('/contact'); setMobileOpen(false); }} className="w-full bg-accent-gold text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all shadow-lg">
                        Contact Workshop
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
