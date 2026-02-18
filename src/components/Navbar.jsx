import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);

            // Active section detection
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="navbar-inner">
                {/* Logo */}
                <a href="#hero" className="navbar-logo" onClick={() => handleNavClick('#hero')}>
                    <span className="logo-initials">AR</span>
                    <span className="logo-text">Rizwana</span>
                </a>

                {/* Desktop Links */}
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="#contact"
                    className="navbar-cta btn-primary"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                >
                    Hire Me
                </a>

                {/* Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    id="hamburger-btn"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="mobile-link"
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <a
                            href="#contact"
                            className="btn-primary mobile-cta"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                        >
                            Hire Me
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
