import React, { useState, useEffect } from 'react';

const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scorched down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    flex items-center justify-center size-14 rounded-full 
                    bg-accent-gold text-black shadow-2xl shadow-accent-gold/20
                    transition-all duration-500 hover:scale-110 hover:bg-white
                    ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}
                `}
                aria-label="Scroll to top"
            >
                <span className="material-symbols-outlined font-black text-2xl">arrow_upward</span>
            </button>
        </div>
    );
};

export default ScrollTopButton;
