import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Instagram, Linkedin, Dribbble } from 'lucide-react';
import './Contact.css';

const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#', id: 'social-instagram' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', id: 'social-linkedin' },
    { icon: Dribbble, label: 'Dribbble', href: '#', id: 'social-dribbble' },
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [focused, setFocused] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1800);
    };

    return (
        <section id="contact" className="contact">
            {/* Background */}
            <div className="contact-bg" aria-hidden="true" />

            <div className="container">
                {/* Header */}
                <div className="contact-header reveal">
                    <div className="section-label">Contact</div>
                    <h2 className="section-title">
                        Let's Create <em>Together</em>
                    </h2>
                    <p className="contact-subtitle">
                        Whether you have a project in mind, a question to ask, or simply wish to connect —
                        I'd love to hear from you.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Info column */}
                    <div className="contact-info reveal-left">
                        {/* Arabic greeting */}
                        <div className="contact-arabic-greeting">
                            <span className="arabic-greeting-text">أهلاً وسهلاً</span>
                            <span className="arabic-greeting-sub">Welcome</span>
                        </div>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <div className="detail-icon-wrap">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <span className="detail-label">Email</span>
                                    <a href="mailto:rizwana@design.com" className="detail-value">rizwana@design.com</a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="detail-icon-wrap">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <span className="detail-label">Phone</span>
                                    <a href="tel:+971000000000" className="detail-value">+971 00 000 0000</a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="detail-icon-wrap">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <span className="detail-label">Location</span>
                                    <span className="detail-value">UAE · Available Worldwide</span>
                                </div>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="contact-socials">
                            <span className="socials-label">Follow My Journey</span>
                            <div className="socials-row">
                                {socialLinks.map(({ icon: Icon, label, href, id }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="social-btn"
                                        aria-label={label}
                                        id={id}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Decorative geo */}
                        <div className="contact-geo-deco" aria-hidden="true">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <polygon points="60,10 100,35 100,85 60,110 20,85 20,35"
                                    fill="none" stroke="rgba(201,115,122,0.2)" strokeWidth="1" />
                                <polygon points="60,25 88,42 88,78 60,95 32,78 32,42"
                                    fill="none" stroke="rgba(232,180,184,0.15)" strokeWidth="0.8" />
                                <circle cx="60" cy="60" r="8" fill="none" stroke="rgba(201,115,122,0.25)" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>

                    {/* Form column */}
                    <div className="contact-form-col reveal-right">
                        {submitted ? (
                            <motion.div
                                className="form-success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <div className="success-icon">✦</div>
                                <h3 className="success-title">Message Received</h3>
                                <p className="success-text">
                                    Thank you for reaching out. I'll be in touch with you shortly, inshallah.
                                </p>
                                <span className="success-arabic">شكراً جزيلاً</span>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                                <div className="form-row">
                                    <div className={`form-group ${focused === 'name' ? 'focused' : ''} ${formData.name ? 'filled' : ''}`}>
                                        <label htmlFor="contact-name">Your Name</label>
                                        <input
                                            type="text"
                                            id="contact-name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused('')}
                                            required
                                        />
                                        <div className="input-line" />
                                    </div>

                                    <div className={`form-group ${focused === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}>
                                        <label htmlFor="contact-email">Email Address</label>
                                        <input
                                            type="email"
                                            id="contact-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused('')}
                                            required
                                        />
                                        <div className="input-line" />
                                    </div>
                                </div>

                                <div className={`form-group ${focused === 'subject' ? 'focused' : ''} ${formData.subject ? 'filled' : ''}`}>
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input
                                        type="text"
                                        id="contact-subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('subject')}
                                        onBlur={() => setFocused('')}
                                        required
                                    />
                                    <div className="input-line" />
                                </div>

                                <div className={`form-group ${focused === 'message' ? 'focused' : ''} ${formData.message ? 'filled' : ''}`}>
                                    <label htmlFor="contact-message">Your Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('message')}
                                        onBlur={() => setFocused('')}
                                        required
                                    />
                                    <div className="input-line" />
                                </div>

                                <button
                                    type="submit"
                                    className="form-submit btn-primary"
                                    disabled={loading}
                                    id="contact-submit-btn"
                                >
                                    {loading ? (
                                        <span className="submit-loading">Sending...</span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
