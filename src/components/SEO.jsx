import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    keywords,
    canonical,
    ogType = 'website',
    ogImage = 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2574&auto=format&fit=crop',
    structuredData,
}) => {
    const location = useLocation();
    const siteUrl = 'https://barwoncraftworks.com.au';
    const fullCanonical = canonical || `${siteUrl}${location.pathname}`;
    const fullTitle = title ? `${title} | Barwon Craftworks` : 'Barwon Craftworks — Handcrafted Australian Timber Writing Instruments | Geelong, Victoria';

    useEffect(() => {
        document.title = fullTitle;

        const setMeta = (name, content) => {
            if (!content) return;
            let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                if (name.startsWith('og:') || name.startsWith('article:')) {
                    el.setAttribute('property', name);
                } else {
                    el.setAttribute('name', name);
                }
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const setLink = (rel, href) => {
            let el = document.querySelector(`link[rel="${rel}"]`);
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        if (description) setMeta('description', description);
        if (keywords) setMeta('keywords', keywords);

        setMeta('og:title', fullTitle);
        if (description) setMeta('og:description', description);
        setMeta('og:type', ogType);
        setMeta('og:url', fullCanonical);
        setMeta('og:image', ogImage);
        setMeta('og:site_name', 'Barwon Craftworks');
        setMeta('og:locale', 'en_AU');

        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', fullTitle);
        if (description) setMeta('twitter:description', description);
        setMeta('twitter:image', ogImage);

        setMeta('geo.region', 'AU-VIC');
        setMeta('geo.placename', 'Geelong');

        setLink('canonical', fullCanonical);

        // Structured Data (JSON-LD)
        let scriptEl = document.querySelector('script[data-seo-jsonld]');
        if (structuredData) {
            if (!scriptEl) {
                scriptEl = document.createElement('script');
                scriptEl.setAttribute('type', 'application/ld+json');
                scriptEl.setAttribute('data-seo-jsonld', 'true');
                document.head.appendChild(scriptEl);
            }
            scriptEl.textContent = JSON.stringify(structuredData);
        } else if (scriptEl) {
            scriptEl.remove();
        }

        return () => {
            // Cleanup structured data on unmount
            const el = document.querySelector('script[data-seo-jsonld]');
            if (el) el.remove();
        };
    }, [fullTitle, description, keywords, fullCanonical, ogType, ogImage, structuredData]);

    return null;
};

export default SEO;
