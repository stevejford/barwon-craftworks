import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { isDarkMode } = useTheme();
    const location = useLocation();

    const handleFooterClick = (e, path) => {
        if (path.includes('#')) {
            const [basePath, hash] = path.split('#');
            if (location.pathname === basePath) {
                e.preventDefault();
                const el = document.getElementById(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    };

    const footerSections = [
        {
            name: 'Writing Instruments',
            links: [
                { name: 'All Pens', path: '/pens' },
                { name: 'Fountain Pens', path: '/pens?category=fountain' },
                { name: 'Rollerball Pens', path: '/pens?category=rollerball' },
                { name: 'Limited Edition', path: '/pens?category=limited edition' },
                { name: 'Accessories', path: '/pens?category=accessories' },
                { name: 'Pen Builder', path: '/pen-builder' },
                { name: 'Gift Guide', path: '/info/gifts' },
                { name: 'Pen Care Guide', path: '/info/pen-care' }
            ]
        },
        {
            name: 'Company',
            links: [
                { name: 'Our Story', path: '/about' },
                { name: 'Workshop', path: '/info/workshop' },
                { name: 'Timber Sourcing', path: '/info/timber-sourcing' },
                { name: 'Sustainability', path: '/info/sustainability' },
                { name: 'Journal', path: '/info/journal' },
                { name: 'Wholesale', path: '/info/wholesale' }
            ]
        },
        {
            name: 'Help',
            links: [
                { name: 'FAQ', path: '/info/faq' },
                { name: 'Shipping', path: '/info/shipping' },
                { name: 'Returns', path: '/info/returns' },
                { name: 'Warranty', path: '/info/warranty' },
                { name: 'Contact', path: '/contact' }
            ]
        }
    ];

    return (
        <footer className={`transition-colors duration-500 border-t ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332]' : 'bg-[#fdfaf3] border-[#e5dec9]'}`}>
            <div className="max-w-[1280px] mx-auto px-4 lg:px-10 py-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <Link to="/" className="flex items-center gap-4 group">
                            {/* Matched Custom Engineered Nib Icon */}
                            <div className="relative size-10 flex items-center justify-center">
                                <svg className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${isDarkMode ? 'text-accent-gold' : 'text-[#203c35]'}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 5L14 15C14 15 14 22 10 26C6 30 6 34 10 34H30C34 34 34 30 30 26C26 22 26 15 26 15L20 5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                    <path d="M20 5V24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                    <circle cx="20" cy="24" r="1.5" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="flex flex-col -space-y-1 ml-1">
                                <h1 className={`font-['Pinyon_Script'] text-4xl transition-colors leading-[0.8] ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                                    Barwon
                                </h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-[7px] font-black uppercase tracking-[0.5em] text-accent-gold">
                                        CRAFTWORKS
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <p className={`text-sm leading-relaxed max-w-xs transition-colors ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                            Artisan writing instruments handcrafted from rare Australian timbers. <span className="text-accent-gold">Made in Geelong, Victoria.</span>
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { name: 'Instagram', icon: 'photo_camera', href: '#' },
                                { name: 'Facebook', icon: 'group', href: '#' },
                                { name: 'YouTube', icon: 'play_circle', href: '#' }
                            ].map((social) => (
                                <a key={social.name} href={social.href} aria-label={social.name} className={`size-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${isDarkMode ? 'bg-[#1e2321] text-slate-400 hover:text-accent-gold' : 'bg-white border border-[#e5dec9] text-[#203c35]/60 hover:text-[#203c35]'}`}>
                                    <span className="material-symbols-outlined text-[18px]">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-10">
                        {footerSections.map((section) => (
                            <div key={section.name} className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-gold">{section.name}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                to={link.path}
                                                onClick={(e) => handleFooterClick(e, link.path)}
                                                className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-[#203c35]/50 hover:text-[#203c35]'}`}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                    <p className={`text-[10px] uppercase font-black tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>
                        © 2025 Barwon Craftworks. Handcrafted at the Geelong Atelier.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <Link to="/admin" className={`text-[10px] uppercase font-black tracking-widest transition-colors hover:text-accent-gold ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>Admin Portal</Link>
                        <Link to="/info/warranty" className={`text-[10px] uppercase font-black tracking-widest transition-colors hover:text-accent-gold ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>Legal</Link>
                        <Link to="/info/shipping" className={`text-[10px] uppercase font-black tracking-widest transition-colors hover:text-accent-gold ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
