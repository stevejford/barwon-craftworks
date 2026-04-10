import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';

const CartDrawer = () => {
    const { items, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const { isDarkMode } = useTheme();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;
        setIsCheckingOut(true);
        try {
            const res = await fetch(`${API_URL}/api/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(i => ({
                        id: i.id,
                        name: i.name,
                        description: i.description,
                        image_url: i.image_url,
                        price: i.price,
                        quantity: i.quantity
                    }))
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error('Checkout error:', err);
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md z-[201] shadow-2xl flex flex-col transition-colors ${isDarkMode ? 'bg-[#131615]' : 'bg-white'}`}>
                {/* Header */}
                <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-accent-gold">shopping_bag</span>
                        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                            Your Collection ({totalItems})
                        </h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className={`size-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-[#f5f0e1] text-[#203c35]/50'}`}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-accent-gold/20 mb-4 block">inventory_2</span>
                            <p className={`text-lg font-serif mb-2 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>Your collection is empty</p>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>
                                Each pen awaits the right storyteller.
                            </p>
                            <Link
                                to="/pens"
                                onClick={() => setIsCartOpen(false)}
                                className="inline-block mt-6 px-6 py-3 bg-accent-gold text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all"
                            >
                                Browse Pens
                            </Link>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className={`flex gap-4 p-4 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332]' : 'bg-[#fdfaf3] border-[#e5dec9]'}`}>
                                <div className="size-20 rounded-xl bg-cover bg-center flex-shrink-0"
                                    style={{ backgroundImage: `url('${item.image_url || item.img || ''}')` }}
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{item.name}</h3>
                                    <p className="text-accent-gold font-bold text-sm mt-1">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className={`size-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${isDarkMode ? 'bg-[#1e2321] text-slate-400 hover:text-white' : 'bg-[#e5dec9]/50 text-[#203c35]/50 hover:text-[#203c35]'}`}
                                        >−</button>
                                        <span className={`text-sm font-bold w-6 text-center ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className={`size-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${isDarkMode ? 'bg-[#1e2321] text-slate-400 hover:text-white' : 'bg-[#e5dec9]/50 text-[#203c35]/50 hover:text-[#203c35]'}`}
                                        >+</button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="self-start text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className={`p-6 border-t space-y-4 ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>Subtotal</span>
                            <span className={`text-2xl font-serif font-bold text-accent-gold`}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className={`text-[10px] uppercase tracking-widest font-black text-center ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>
                            Complimentary shipping Australia-wide
                        </p>
                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full bg-accent-gold text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-accent-gold transition-all shadow-xl shadow-accent-gold/20 disabled:opacity-50"
                        >
                            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                        <button
                            onClick={clearCart}
                            className={`w-full py-2 text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-slate-600 hover:text-red-400' : 'text-[#203c35]/30 hover:text-red-500'}`}
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
