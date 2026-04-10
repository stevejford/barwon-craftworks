import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
    const { isDarkMode } = useTheme();
    const { clearCart } = useCart();
    const [searchParams] = useSearchParams();
    const isDemo = searchParams.get('demo') === 'true';

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <Header />
            <main className="flex-grow max-w-[1400px] w-full mx-auto px-4 lg:px-10 py-12 flex items-center justify-center">
                <div className="text-center max-w-xl">
                    <div className="size-24 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-8">
                        <span className="material-symbols-outlined text-accent-gold text-5xl">check_circle</span>
                    </div>
                    <h1 className={`text-4xl md:text-5xl font-serif font-black mb-4 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                        Thank You.
                    </h1>
                    <p className={`text-lg leading-relaxed mb-2 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                        Your order has been confirmed and I'm preparing it at the bench now.
                        Every piece is personally inspected before it leaves the workshop.
                    </p>
                    <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                        You'll receive a confirmation email with tracking details once your order is packed and dispatched.
                    </p>

                    {isDemo && (
                        <div className={`p-4 rounded-2xl border-2 border-dashed mb-8 ${isDarkMode ? 'bg-[#131615] border-accent-gold/30' : 'bg-[#f5f0e1] border-accent-gold/30'}`}>
                            <p className="text-accent-gold text-xs font-black uppercase tracking-widest mb-1">Demo Mode</p>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                                Stripe is not configured yet. Once API keys are added, this will process real payments.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/pens"
                            className="px-8 py-4 bg-accent-gold text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-xl shadow-accent-gold/20"
                        >
                            Continue Browsing
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${isDarkMode ? 'border-[#2e3332] text-slate-400 hover:border-accent-gold hover:text-accent-gold' : 'border-[#e5dec9] text-[#203c35]/60 hover:border-accent-gold hover:text-accent-gold'}`}
                        >
                            Contact Workshop
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
