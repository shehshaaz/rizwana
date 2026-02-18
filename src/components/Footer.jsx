import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    const handleNav = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            {/* Top section */}
            <div className="footer-top">
                <div className="container footer-top-inner">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-initials">AR</span>
                            <span className="footer-logo-name">Rizwana</span>
                        </div>
                        <p className="footer-tagline">
                            Crafting spaces where elegance meets purpose.
                            Every line tells a story.
                        </p>
                        <div className="footer-arabic">
                            <span>مصممة معمارية وداخلية</span>
                        </div>
                    </div>

                    {/* Nav links */}
                    <div className="footer-nav">
                        <span className="footer-nav-title">Navigation</span>
                        {['#hero', '#about', '#portfolio', '#philosophy', '#skills', '#contact'].map(href => (
                            <a
                                key={href}
                                href={href}
                                className="footer-link"
                                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                            >
                                {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
                            </a>
                        ))}
                    </div>

                    {/* Services */}
                    <div className="footer-nav">
                        <span className="footer-nav-title">Services</span>
                        {['Architectural Design', 'Interior Design', 'Space Planning', 'Concept Development', '3D Visualization'].map(s => (
                            <span key={s} className="footer-service">{s}</span>
                        ))}
                    </div>

                    {/* Contact snippet */}
                    <div className="footer-contact-col">
                        <span className="footer-nav-title">Get In Touch</span>
                        <a href="mailto:rizwana@design.com" className="footer-link">rizwana@design.com</a>
                        <a href="tel:+971000000000" className="footer-link">+971 00 000 0000</a>
                        <span className="footer-service">UAE · Available Worldwide</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="footer-divider">
                <div className="footer-divider-pattern" aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="divider-diamond">◇</span>
                    ))}
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p className="footer-copy">
                        © {year} Ayshath Rizwana M A. All rights reserved.
                    </p>
                    <p className="footer-made">
                        Designed with <span className="heart">♡</span> and intention
                    </p>
                </div>
            </div>
        </footer>
    );
}
