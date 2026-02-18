import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.15 }
        );
        const el = ref.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);
    return ref;
}

const qualities = [
    { icon: '◈', label: 'Spatial Thinking', desc: 'Transforming raw space into living narratives' },
    { icon: '◇', label: 'Material Mastery', desc: 'Curating textures that speak to the senses' },
    { icon: '◉', label: 'Cultural Sensitivity', desc: 'Weaving heritage into contemporary design' },
    { icon: '◈', label: 'Detail Obsession', desc: 'Every millimeter considered, every corner refined' },
];

export default function About() {
    const titleRef = useReveal();
    const textRef = useReveal();
    const cardsRef = useReveal();
    const imageRef = useReveal();

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section id="about" className="about" ref={sectionRef}>
            {/* Parallax background accent */}
            <motion.div className="about-bg-accent" style={{ y: bgY }} aria-hidden="true" />

            <div className="container about-grid">
                {/* Left: Image */}
                <div className={`about-image-col reveal-left`} ref={imageRef}>
                    <div className="about-image-frame">
                        <div className="about-image-inner">
                            {/* Decorative portrait placeholder */}
                            <div className="about-portrait">
                                <div className="about-portrait-monogram">AR</div>
                                <div className="about-portrait-overlay">
                                    <span className="about-arabic-text">مصممة معمارية</span>
                                </div>
                            </div>
                        </div>
                        {/* Floating accent card */}
                        <div className="about-accent-card">
                            <span className="accent-card-num">B.Arch</span>
                            <span className="accent-card-label">Graduate Designer</span>
                        </div>
                        {/* Decorative corner */}
                        <div className="about-corner-deco" aria-hidden="true">
                            <svg width="80" height="80" viewBox="0 0 80 80">
                                <rect x="5" y="5" width="30" height="30" fill="none" stroke="#C9737A" strokeWidth="1" opacity="0.4" transform="rotate(45 20 20)" />
                                <rect x="15" y="15" width="20" height="20" fill="none" stroke="#E8B4B8" strokeWidth="0.8" opacity="0.3" transform="rotate(45 25 25)" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right: Text */}
                <div className="about-text-col">
                    <div className="reveal" ref={titleRef}>
                        <div className="section-label">About Me</div>
                        <h2 className="section-title">
                            Designing Spaces That <em>Breathe</em>
                        </h2>
                    </div>

                    <div className="reveal" ref={textRef} style={{ transitionDelay: '0.15s' }}>
                        <p className="about-intro">
                            I am Ayshath Rizwana M A, an architectural and interior design graduate with a deep passion
                            for creating environments that harmonize beauty, function, and cultural identity.
                        </p>
                        <p className="about-body">
                            My design philosophy is rooted in the belief that every space has a soul — and my role is
                            to awaken it. Drawing inspiration from the graceful geometry of Arabic architecture and the
                            clean lines of contemporary minimalism, I craft interiors and structures that feel both
                            timeless and deeply personal.
                        </p>
                        <p className="about-body">
                            From residential sanctuaries to conceptual architectural visions, each project is an
                            exploration of light, material, and human experience — designed to evoke emotion and
                            endure through time.
                        </p>
                    </div>

                    {/* Qualities grid */}
                    <div className="about-qualities reveal" ref={cardsRef} style={{ transitionDelay: '0.3s' }}>
                        {qualities.map((q, i) => (
                            <div className="quality-card" key={i}>
                                <span className="quality-icon">{q.icon}</span>
                                <div>
                                    <h4 className="quality-label">{q.label}</h4>
                                    <p className="quality-desc">{q.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Arabic pattern divider */}
            <div className="container">
                <div className="arabic-divider">
                    <span>✦</span>
                    <span>بسم الله</span>
                    <span>✦</span>
                </div>
            </div>
        </section>
    );
}
