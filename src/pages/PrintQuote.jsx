import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const materialData = {
    'PLA Pro': {
        colours: ['White', 'Black', 'Grey', 'Red', 'Blue', 'Green', 'Yellow'],
        tolerance: '±0.2mm', layer: '0.1–0.3mm', buildVol: '350 × 350 × 400mm',
        desc: 'Biodegradable, ideal for visual prototypes & concept models. Good surface finish, low warp.',
        priceGuide: 'From ~$15 for small parts'
    },
    'PETG': {
        colours: ['Clear', 'White', 'Black', 'Blue'],
        tolerance: '±0.2mm', layer: '0.1–0.3mm', buildVol: '350 × 350 × 400mm',
        desc: 'Chemical-resistant, food-safe capable. Great for functional enclosures & outdoor parts.',
        priceGuide: 'From ~$20 for small parts'
    },
    'Carbon Fiber': {
        colours: ['Matte Black'],
        tolerance: '±0.15mm', layer: '0.1–0.2mm', buildVol: '250 × 250 × 250mm',
        desc: 'Lightweight, extremely rigid. Perfect for drone parts, jigs, automotive brackets.',
        priceGuide: 'From ~$35 for small parts'
    },
    'High-Detail Resin': {
        colours: ['Grey', 'Clear', 'White', 'Black'],
        tolerance: '±0.05mm', layer: '0.025–0.1mm', buildVol: '220 × 130 × 200mm',
        desc: 'Ultra-fine detail for miniatures, jewellery masters, dental models, cosmetic prototypes.',
        priceGuide: 'From ~$25 for small parts'
    }
};

const infillOptions = [
    { value: '15', label: '15% — Light / Visual prototype', desc: 'Hollow feel, minimal strength' },
    { value: '30', label: '30% — Standard / General use', desc: 'Good balance of strength and weight' },
    { value: '50', label: '50% — Strong / Functional parts', desc: 'Handles moderate loads' },
    { value: '75', label: '75% — Heavy duty / Structural', desc: 'High strength, heavier' },
    { value: '100', label: '100% — Solid / Maximum strength', desc: 'Completely filled, heaviest' }
];

const finishOptions = [
    { value: 'standard', label: 'Standard', desc: 'Support removal & basic cleanup. Visible layer lines.' },
    { value: 'sanded', label: 'Sanded Smooth', desc: 'Progressive sanding to reduce layer lines. Good surface quality.' },
    { value: 'vapor', label: 'Vapor Smoothed', desc: 'Chemical smoothing for glossy, injection-mould-like finish. (Resin only)' },
    { value: 'painted', label: 'Primed & Painted', desc: 'Custom colour painting with optional clear-coat UV protection.' },
    { value: 'raw', label: 'Raw / As-Printed', desc: 'No post-processing. Supports left intact for client removal.' }
];

const STEPS = ['Upload', 'Material', 'Specs', 'Finishing', 'Contact', 'Review'];

const PrintQuote = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [files, setFiles] = useState([]);
    const [form, setForm] = useState({
        material: '',
        colour: '',
        quantity: 1,
        infill: '30',
        layerHeight: '0.2',
        finish: 'standard',
        postProcessing: [],
        dimensions: '',
        application: '',
        notes: '',
        name: '',
        email: '',
        phone: '',
        company: '',
        deadline: '',
        priority: 'standard'
    });

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
    const togglePost = (val) => setForm(prev => ({
        ...prev,
        postProcessing: prev.postProcessing.includes(val)
            ? prev.postProcessing.filter(v => v !== val)
            : [...prev.postProcessing, val]
    }));

    const canProceed = () => {
        switch (step) {
            case 0: return files.length > 0 || form.notes.trim().length > 10;
            case 1: return form.material && form.colour;
            case 2: return form.quantity > 0;
            case 3: return form.finish;
            case 4: return form.name && form.email;
            default: return true;
        }
    };

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

    const handleDrop = (e) => {
        e.preventDefault();
        const dropped = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...dropped]);
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            files.forEach(f => formData.append('files', f));
            formData.append('data', JSON.stringify(form));

            const res = await fetch('/api/print-quote', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                setSubmitted(true);
            }
        } catch (err) {
            console.error('Quote submission error:', err);
        }
        setSubmitting(false);
    };

    const selectedMaterial = materialData[form.material];

    const cardClass = `rounded-[2rem] border-2 p-8 md:p-10 transition-colors ${isDarkMode ? 'bg-[#131615] border-[#2e3332]' : 'bg-white border-[#e5dec9]'}`;
    const labelClass = 'text-accent-gold text-[10px] font-black uppercase tracking-widest block mb-2';
    const inputClass = `w-full rounded-xl px-4 py-3 text-sm border-2 transition-colors outline-none focus:border-accent-gold ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332] text-white placeholder:text-slate-600' : 'bg-[#fdfaf3] border-[#e5dec9] text-[#203c35] placeholder:text-[#203c35]/30'}`;

    if (submitted) {
        return (
            <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
                <SEO title="Quote Submitted — Barwon Craftworks 3D Printing" description="Your 3D printing quote request has been submitted." />
                <Header />
                <main className="flex-grow flex items-center justify-center px-4 py-20">
                    <div className="text-center max-w-lg space-y-6">
                        <div className="size-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black">Quote Request <span className="text-accent-gold italic">Received</span></h1>
                        <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>
                            Thanks, {form.name}. I'll review your files and specifications and send a detailed quote to <span className="text-accent-gold font-bold">{form.email}</span> within 24–48 hours. If I have questions about your project, I'll reach out first.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button onClick={() => navigate('/3d-printing')} className="bg-accent-gold text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all">
                                Back to 3D Printing
                            </button>
                            <button onClick={() => navigate('/')} className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${isDarkMode ? 'border-[#2e3332] text-slate-400 hover:border-accent-gold hover:text-accent-gold' : 'border-[#e5dec9] text-[#203c35]/60 hover:border-[#203c35] hover:text-[#203c35]'}`}>
                                Home
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={`transition-colors duration-500 font-display min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0d0f0e] text-slate-100' : 'bg-[#fdfaf3] text-[#203c35]'}`}>
            <SEO
                title="Request a 3D Printing Quote — Custom PLA, PETG, Carbon Fiber & Resin"
                description="Get a detailed quote for custom 3D printing in Geelong. Upload your files, choose materials and colours, specify finishing requirements. Personal service from an experienced tradesman."
                keywords="3D printing quote Geelong, custom 3D print quote, 3D printing cost Australia, get 3D printing quote Victoria"
            />
            <Header />

            <main className="flex-grow w-full max-w-[1000px] mx-auto px-4 md:px-10 py-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Free Quote • 24–48hr Response</span>
                    <h1 className={`text-4xl md:text-5xl font-serif font-black mb-4 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>
                        Request a <span className="italic text-accent-gold">Print Quote</span>
                    </h1>
                    <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                        Tell me about your project and I'll send a detailed, no-obligation quote. No account needed.
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-12 flex-wrap">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center gap-1 sm:gap-2">
                            <button
                                onClick={() => i < step && setStep(i)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === step ? 'bg-accent-gold text-black shadow-lg' : i < step ? 'bg-accent-gold/10 text-accent-gold cursor-pointer hover:bg-accent-gold/20' : isDarkMode ? 'bg-[#1e2321] text-slate-600' : 'bg-[#f5f0e1] text-[#203c35]/30'}`}
                            >
                                {i < step ? <span className="material-symbols-outlined text-[14px]">check</span> : <span>{i + 1}</span>}
                                <span className="hidden sm:inline">{s}</span>
                            </button>
                            {i < STEPS.length - 1 && <div className={`w-4 sm:w-8 h-[2px] ${i < step ? 'bg-accent-gold' : isDarkMode ? 'bg-[#2e3332]' : 'bg-[#e5dec9]'}`} />}
                        </div>
                    ))}
                </div>

                {/* Step 1: File Upload */}
                {step === 0 && (
                    <div className={cardClass}>
                        <h2 className="text-2xl font-serif font-bold mb-2">Upload Your 3D Files</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                            Drop your STL, STEP, OBJ, 3MF, or IGES files below. Don't have a file yet? Describe your project in the notes field instead.
                        </p>

                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer hover:border-accent-gold ${isDarkMode ? 'border-[#2e3332] bg-[#0d0f0e]' : 'border-[#e5dec9] bg-[#fdfaf3]'}`}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <span className="material-symbols-outlined text-accent-gold text-4xl mb-4 block">cloud_upload</span>
                            <p className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>Drag & drop files here</p>
                            <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/40'}`}>or click to browse</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['STL', 'STEP', 'OBJ', '3MF', 'IGES'].map(f => (
                                    <span key={f} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-[#1e2321] text-slate-400' : 'bg-[#e5dec9]/50 text-[#203c35]/50'}`}>{f}</span>
                                ))}
                            </div>
                            <input id="file-input" type="file" multiple accept=".stl,.step,.stp,.obj,.3mf,.iges,.igs" className="hidden" onChange={handleFiles} />
                        </div>

                        {files.length > 0 && (
                            <div className="mt-6 space-y-3">
                                <label className={labelClass}>Uploaded Files ({files.length})</label>
                                {files.map((f, i) => (
                                    <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${isDarkMode ? 'bg-[#0d0f0e] border-[#2e3332]' : 'bg-[#fdfaf3] border-[#e5dec9]'}`}>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="material-symbols-outlined text-accent-gold text-xl">description</span>
                                            <div className="min-w-0">
                                                <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{f.name}</p>
                                                <p className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/40'}`}>{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 space-y-2">
                            <label className={labelClass}>Project Description / Notes</label>
                            <textarea
                                rows="4"
                                value={form.notes}
                                onChange={(e) => update('notes', e.target.value)}
                                placeholder="Describe your project — what the part does, critical dimensions, application context, or anything else that will help me give you an accurate quote..."
                                className={inputClass + ' resize-none'}
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Material & Colour */}
                {step === 1 && (
                    <div className={cardClass}>
                        <h2 className="text-2xl font-serif font-bold mb-2">Choose Material & Colour</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                            Each material has different properties, tolerances, and available colours. Not sure? I'll recommend the best option in your quote.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {Object.entries(materialData).map(([name, mat]) => (
                                <button
                                    key={name}
                                    onClick={() => { update('material', name); update('colour', ''); }}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${form.material === name ? 'border-accent-gold bg-accent-gold/5 shadow-lg' : isDarkMode ? 'border-[#2e3332] hover:border-accent-gold/30' : 'border-[#e5dec9] hover:border-accent-gold/30'}`}
                                >
                                    <h3 className={`text-lg font-bold mb-1 ${form.material === name ? 'text-accent-gold' : isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{name}</h3>
                                    <p className={`text-xs mb-3 ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>{mat.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${isDarkMode ? 'bg-[#0d0f0e] text-slate-400' : 'bg-[#fdfaf3] text-[#203c35]/50'}`}>{mat.tolerance}</span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${isDarkMode ? 'bg-[#0d0f0e] text-slate-400' : 'bg-[#fdfaf3] text-[#203c35]/50'}`}>{mat.priceGuide}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {form.material && selectedMaterial && (
                            <div>
                                <label className={labelClass}>Select Colour — {form.material}</label>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    {selectedMaterial.colours.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => update('colour', c)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all ${form.colour === c ? 'border-accent-gold bg-accent-gold/5 text-accent-gold shadow-md' : isDarkMode ? 'border-[#2e3332] text-slate-400 hover:border-accent-gold/30' : 'border-[#e5dec9] text-[#203c35]/60 hover:border-accent-gold/30'}`}
                                        >
                                            <div className={`size-4 rounded-full border ${c === 'White' ? 'bg-white border-gray-300' : c === 'Black' || c === 'Matte Black' ? 'bg-black border-gray-600' : c === 'Grey' ? 'bg-gray-400 border-gray-500' : c === 'Red' ? 'bg-red-500 border-red-600' : c === 'Blue' ? 'bg-blue-500 border-blue-600' : c === 'Green' ? 'bg-green-500 border-green-600' : c === 'Yellow' ? 'bg-yellow-400 border-yellow-500' : c === 'Clear' ? 'bg-white/50 border-gray-300 ring-1 ring-inset ring-gray-200' : 'bg-gray-300 border-gray-400'}`} />
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Print Specs */}
                {step === 2 && (
                    <div className={cardClass}>
                        <h2 className="text-2xl font-serif font-bold mb-2">Print Specifications</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                            Not sure about these settings? Leave defaults and I'll optimise them based on your project. These are starting points — I'll confirm the best settings in your quote.
                        </p>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Quantity</label>
                                    <input type="number" min="1" max="1000" value={form.quantity} onChange={(e) => update('quantity', parseInt(e.target.value) || 1)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Layer Height (mm)</label>
                                    <select value={form.layerHeight} onChange={(e) => update('layerHeight', e.target.value)} className={inputClass}>
                                        <option value="0.05">0.05mm — Ultra fine (Resin)</option>
                                        <option value="0.1">0.10mm — Fine detail</option>
                                        <option value="0.15">0.15mm — High quality</option>
                                        <option value="0.2">0.20mm — Standard (recommended)</option>
                                        <option value="0.3">0.30mm — Fast / Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Infill Density</label>
                                <div className="space-y-3 mt-2">
                                    {infillOptions.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => update('infill', opt.value)}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${form.infill === opt.value ? 'border-accent-gold bg-accent-gold/5' : isDarkMode ? 'border-[#2e3332] hover:border-accent-gold/30' : 'border-[#e5dec9] hover:border-accent-gold/30'}`}
                                        >
                                            <div>
                                                <p className={`text-sm font-bold ${form.infill === opt.value ? 'text-accent-gold' : isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{opt.label}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/40'}`}>{opt.desc}</p>
                                            </div>
                                            {form.infill === opt.value && <span className="material-symbols-outlined text-accent-gold">check_circle</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Critical Dimensions (optional)</label>
                                <input
                                    value={form.dimensions}
                                    onChange={(e) => update('dimensions', e.target.value)}
                                    placeholder="e.g. Bore must be 25.4mm ± 0.1mm, overall height 80mm max"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Application / Purpose</label>
                                <input
                                    value={form.application}
                                    onChange={(e) => update('application', e.target.value)}
                                    placeholder="e.g. Functional bracket for drone frame, visual prototype for client presentation"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Post-Processing & Finishing */}
                {step === 3 && (
                    <div className={cardClass}>
                        <h2 className="text-2xl font-serif font-bold mb-2">Finishing & Post-Processing</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                            Every print includes support removal and basic cleanup. Select additional finishing if you need a higher surface quality.
                        </p>

                        <div>
                            <label className={labelClass}>Surface Finish</label>
                            <div className="space-y-3 mt-2">
                                {finishOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => update('finish', opt.value)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${form.finish === opt.value ? 'border-accent-gold bg-accent-gold/5' : isDarkMode ? 'border-[#2e3332] hover:border-accent-gold/30' : 'border-[#e5dec9] hover:border-accent-gold/30'}`}
                                    >
                                        <div>
                                            <p className={`text-sm font-bold ${form.finish === opt.value ? 'text-accent-gold' : isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{opt.label}</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/40'}`}>{opt.desc}</p>
                                        </div>
                                        {form.finish === opt.value && <span className="material-symbols-outlined text-accent-gold">check_circle</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className={labelClass}>Additional Services (optional)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {[
                                    { value: 'inserts', label: 'Heat-set Threaded Inserts', icon: 'build' },
                                    { value: 'assembly', label: 'Multi-Part Assembly', icon: 'handyman' },
                                    { value: 'painting', label: 'Custom Colour Painting', icon: 'palette' },
                                    { value: 'clearcoat', label: 'UV Clear Coat', icon: 'wb_sunny' },
                                    { value: 'bearings', label: 'Press-fit Bearings', icon: 'settings' },
                                    { value: 'dimcheck', label: 'Dimensional Report', icon: 'straighten' }
                                ].map(svc => (
                                    <button
                                        key={svc.value}
                                        onClick={() => togglePost(svc.value)}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${form.postProcessing.includes(svc.value) ? 'border-accent-gold bg-accent-gold/5' : isDarkMode ? 'border-[#2e3332] hover:border-accent-gold/30' : 'border-[#e5dec9] hover:border-accent-gold/30'}`}
                                    >
                                        <span className={`material-symbols-outlined text-lg ${form.postProcessing.includes(svc.value) ? 'text-accent-gold' : 'text-slate-400'}`}>{svc.icon}</span>
                                        <span className={`text-sm font-bold ${form.postProcessing.includes(svc.value) ? 'text-accent-gold' : isDarkMode ? 'text-white' : 'text-[#203c35]'}`}>{svc.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Contact Details */}
                {step === 4 && (
                    <div className={cardClass}>
                        <h2 className="text-2xl font-serif font-bold mb-2">Your Details</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                            I'll send your detailed quote to the email below. No account needed — just a conversation between two people.
                        </p>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Full Name *</label>
                                    <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Email Address *</label>
                                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="your@email.com" className={inputClass} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Phone (optional)</label>
                                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="04xx xxx xxx" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Company (optional)</label>
                                    <input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company name" className={inputClass} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Deadline (optional)</label>
                                    <input type="date" value={form.deadline} onChange={(e) => update('deadline', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Priority</label>
                                    <select value={form.priority} onChange={(e) => update('priority', e.target.value)} className={inputClass}>
                                        <option value="standard">Standard (2–3 business days)</option>
                                        <option value="rush">Rush (24 hrs, +50% surcharge)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 6: Review & Submit */}
                {step === 5 && (
                    <div className={cardClass}>
                        <h2 className="text-2xl font-serif font-bold mb-2">Review Your Quote Request</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/60'}`}>
                            Check everything looks right before submitting. Click any section to go back and edit.
                        </p>

                        <div className="space-y-6">
                            {[
                                { label: 'Files', value: files.length > 0 ? files.map(f => f.name).join(', ') : 'No files — project described in notes', step: 0 },
                                { label: 'Material', value: form.material || 'Not selected', step: 1 },
                                { label: 'Colour', value: form.colour || 'Not selected', step: 1 },
                                { label: 'Quantity', value: form.quantity, step: 2 },
                                { label: 'Layer Height', value: form.layerHeight + 'mm', step: 2 },
                                { label: 'Infill', value: infillOptions.find(o => o.value === form.infill)?.label || form.infill + '%', step: 2 },
                                { label: 'Surface Finish', value: finishOptions.find(o => o.value === form.finish)?.label || form.finish, step: 3 },
                                { label: 'Additional Services', value: form.postProcessing.length > 0 ? form.postProcessing.join(', ') : 'None', step: 3 },
                                { label: 'Application', value: form.application || 'Not specified', step: 2 },
                                { label: 'Critical Dimensions', value: form.dimensions || 'Not specified', step: 2 },
                                { label: 'Name', value: form.name, step: 4 },
                                { label: 'Email', value: form.email, step: 4 },
                                { label: 'Priority', value: form.priority === 'rush' ? 'Rush (+50%)' : 'Standard', step: 4 },
                                { label: 'Deadline', value: form.deadline || 'No deadline', step: 4 }
                            ].map((item, i) => (
                                <button key={i} onClick={() => setStep(item.step)} className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-colors hover:border-accent-gold/40 group ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>{item.label}</p>
                                        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-[#203c35]'}`}>{item.value}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-sm text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                                </button>
                            ))}

                            {form.notes && (
                                <button onClick={() => setStep(0)} className={`w-full p-4 rounded-xl border text-left transition-colors hover:border-accent-gold/40 group ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-600' : 'text-[#203c35]/30'}`}>Project Notes</p>
                                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-[#203c35]/70'}`}>{form.notes.substring(0, 200)}{form.notes.length > 200 ? '...' : ''}</p>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                    <button
                        onClick={() => step > 0 ? setStep(step - 1) : navigate('/3d-printing')}
                        className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${isDarkMode ? 'border-[#2e3332] text-slate-400 hover:border-accent-gold hover:text-accent-gold' : 'border-[#e5dec9] text-[#203c35]/60 hover:border-[#203c35] hover:text-[#203c35]'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        {step === 0 ? 'Back' : 'Previous'}
                    </button>

                    {step < STEPS.length - 1 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                            className="flex items-center gap-2 bg-accent-gold text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all shadow-lg shadow-accent-gold/20 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !form.name || !form.email}
                            className="flex items-center gap-2 bg-accent-gold text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#203c35] hover:text-white transition-all shadow-lg shadow-accent-gold/20 disabled:opacity-40"
                        >
                            {submitting ? 'Submitting...' : 'Submit Quote Request'}
                            <span className="material-symbols-outlined text-[18px]">{submitting ? 'hourglass_top' : 'send'}</span>
                        </button>
                    )}
                </div>

                {/* Trust Bar */}
                <div className="mt-12 grid grid-cols-3 gap-4">
                    {[
                        { icon: 'schedule', label: '24–48hr Response' },
                        { icon: 'lock', label: 'Files Kept Confidential' },
                        { icon: 'verified_user', label: 'No-Obligation Quote' }
                    ].map(item => (
                        <div key={item.label} className={`text-center p-4 rounded-2xl border transition-colors ${isDarkMode ? 'border-[#2e3332]' : 'border-[#e5dec9]'}`}>
                            <span className="material-symbols-outlined text-accent-gold text-xl mb-1 block">{item.icon}</span>
                            <p className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-[#203c35]/50'}`}>{item.label}</p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrintQuote;
