import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Wait for DOM to render, then scroll to the anchor element
            const timer = setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
            return () => clearTimeout(timer);
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [pathname, search, hash]);

    return null;
};

export default ScrollToTop;
