import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

// Animated geometric SVG lines
function GeoLines() {
    return (
        <svg className="hero-geo-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9737A" stopOpacity="0" />
                    <stop offset="50%" stopColor="#C9737A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#C9737A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8B4B8" stopOpacity="0" />
                    <stop offset="50%" stopColor="#E8B4B8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#E8B4B8" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Arabic-inspired geometric octagon */}
            <g className="geo-rotate-slow" style={{ transformOrigin: '72% 45%' }}>
                <polygon points="1040,200 1100,240 1120,310 1100,380 1040,420 980,380 960,310 980,240"
                    fill="none" stroke="url(#lineGrad1)" strokeWidth="1" />
                <polygon points="1040,220 1090,254 1107,310 1090,366 1040,400 990,366 973,310 990,254"
                    fill="none" stroke="url(#lineGrad2)" strokeWidth="0.5" />
                <line x1="1040" y1="200" x2="1040" y2="420" stroke="url(#lineGrad1)" strokeWidth="0.5" />
                <line x1="960" y1="310" x2="1120" y2="310" stroke="url(#lineGrad1)" strokeWidth="0.5" />
                <line x1="980" y1="240" x2="1100" y2="380" stroke="url(#lineGrad2)" strokeWidth="0.5" />
                <line x1="1100" y1="240" x2="980" y2="380" stroke="url(#lineGrad2)" strokeWidth="0.5" />
            </g>

            {/* Flowing curves */}
            <path d="M0,600 Q360,500 720,580 T1440,520" fill="none" stroke="url(#lineGrad2)" strokeWidth="1" className="geo-drift" />
            <path d="M0,650 Q400,550 800,630 T1440,570" fill="none" stroke="url(#lineGrad1)" strokeWidth="0.6" className="geo-drift-slow" />

            {/* Small decorative diamonds */}
            <g opacity="0.4">
                <rect x="180" y="150" width="12" height="12" fill="none" stroke="#C9737A" strokeWidth="1" transform="rotate(45 186 156)" />
                <rect x="1260" y="700" width="10" height="10" fill="none" stroke="#E8B4B8" strokeWidth="1" transform="rotate(45 1265 705)" />
                <rect x="80" y="700" width="8" height="8" fill="none" stroke="#C9737A" strokeWidth="0.8" transform="rotate(45 84 704)" />
                <rect x="1350" y="200" width="14" height="14" fill="none" stroke="#E8B4B8" strokeWidth="1" transform="rotate(45 1357 207)" />
            </g>

            {/* Subtle grid lines */}
            <line x1="0" y1="450" x2="400" y2="450" stroke="#E8B4B8" strokeWidth="0.4" opacity="0.3" />
            <line x1="1040" y1="0" x2="1040" y2="180" stroke="#E8B4B8" strokeWidth="0.4" opacity="0.3" />
        </svg>
    );
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
    const handleScrollDown = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="hero">
            {/* Real hero background image */}
            <div className="hero-bg">
                <img src="/hero-section.jpeg" alt="" className="hero-bg-img" aria-hidden="true" />
                <div className="hero-bg-overlay" />
            </div>

            {/* Geometric SVG */}
            <GeoLines />

            {/* Floating orbs */}
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />
            <div className="hero-orb hero-orb-3" aria-hidden="true" />

            {/* Content */}
            <div className="hero-content container">
                <motion.div
                    className="hero-text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.div className="hero-eyebrow" variants={itemVariants}>
                        <span className="eyebrow-line" />
                        <span>Architectural & Interior Designer</span>
                        <span className="eyebrow-line" />
                    </motion.div>

                    {/* Name */}
                    <motion.h1 className="hero-name" variants={itemVariants}>
                        <span className="name-first">Ayshath</span>
                        <span className="name-last">Rizwana</span>
                        <span className="name-suffix">M A</span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p className="hero-tagline" variants={itemVariants}>
                        Crafting spaces where elegance meets purpose — where every line tells a story
                        and every room breathes with intention.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div className="hero-ctas" variants={itemVariants}>
                        <button
                            className="btn-primary"
                            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            id="hero-view-work-btn"
                        >
                            View My Work
                        </button>
                        <button
                            className="btn-outline"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            id="hero-contact-btn"
                        >
                            Get In Touch
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div className="hero-stats" variants={itemVariants}>
                        <div className="stat">
                            <span className="stat-num">15+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">3+</span>
                            <span className="stat-label">Years Study</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">∞</span>
                            <span className="stat-label">Passion</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right visual */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="hero-portrait-frame">
                        <div className="portrait-inner">
                            <img
                                src="/hero-section.jpeg"
                                alt="Ayshath Rizwana M A — Architectural & Interior Designer"
                                className="portrait-photo"
                            />
                        </div>
                        <div className="portrait-ring portrait-ring-1" />
                        <div className="portrait-ring portrait-ring-2" />
                        <div className="portrait-badge">
                            <span className="badge-arabic">مصممة</span>
                            <span className="badge-text">Designer</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                className="scroll-indicator"
                onClick={handleScrollDown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                aria-label="Scroll down"
                id="hero-scroll-btn"
            >
                <span className="scroll-text">Scroll</span>
                <ChevronDown size={16} className="scroll-chevron" />
            </motion.button>
        </section>
    );
}
