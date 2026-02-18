import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Philosophy.css';

const pillars = [
    {
        num: '01',
        title: 'Space as Narrative',
        body: 'Architecture is the art of storytelling through space. Every corridor, every threshold, every room is a chapter — and the inhabitant is the reader.',
        arabic: 'الفضاء كرواية',
    },
    {
        num: '02',
        title: 'Light as Material',
        body: 'I treat natural light as the most precious material in my palette. Its quality, direction, and rhythm define the emotional character of every space I design.',
        arabic: 'الضوء كمادة',
    },
    {
        num: '03',
        title: 'Heritage in Modernity',
        body: 'The geometric wisdom of Islamic architecture — its patterns, proportions, and principles — is not a style but a living language I speak fluently in contemporary form.',
        arabic: 'التراث في الحداثة',
    },
    {
        num: '04',
        title: 'Silence in Design',
        body: 'The most powerful spaces are those that know when to be quiet. Restraint, negative space, and deliberate emptiness are as important as any element I add.',
        arabic: 'الصمت في التصميم',
    },
];

export default function Philosophy() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

    return (
        <section id="philosophy" className="philosophy" ref={sectionRef}>
            {/* Parallax background */}
            <motion.div className="philosophy-bg" style={{ y: bgY }} aria-hidden="true">
                <svg className="philosophy-geo" viewBox="0 0 800 800" aria-hidden="true">
                    <defs>
                        <linearGradient id="philGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C9737A" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#E8B4B8" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    {/* Large octagon */}
                    <polygon points="400,50 600,150 700,350 600,550 400,650 200,550 100,350 200,150"
                        fill="url(#philGrad)" stroke="#C9737A" strokeWidth="0.5" opacity="0.4" />
                    <polygon points="400,100 570,185 650,350 570,515 400,600 230,515 150,350 230,185"
                        fill="none" stroke="#E8B4B8" strokeWidth="0.5" opacity="0.3" />
                    {/* Inner star */}
                    <polygon points="400,150 450,300 600,300 480,390 530,540 400,450 270,540 320,390 200,300 350,300"
                        fill="none" stroke="#C9737A" strokeWidth="0.4" opacity="0.25" />
                </svg>
            </motion.div>

            <div className="container">
                {/* Header */}
                <motion.div className="philosophy-header reveal" style={{ y: textY }}>
                    <div className="section-label">Design Philosophy</div>
                    <h2 className="section-title">
                        The <em>Principles</em> That Guide My Hand
                    </h2>
                    <p className="philosophy-intro">
                        Design is not decoration. It is the thoughtful orchestration of space, material,
                        light, and human experience — guided by principles that transcend trend.
                    </p>
                </motion.div>

                {/* Pillars */}
                <div className="philosophy-pillars">
                    {pillars.map((pillar, i) => (
                        <div
                            key={pillar.num}
                            className={`pillar-block reveal`}
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className="pillar-num">{pillar.num}</div>
                            <div className="pillar-content">
                                <div className="pillar-arabic">{pillar.arabic}</div>
                                <h3 className="pillar-title">{pillar.title}</h3>
                                <p className="pillar-body">{pillar.body}</p>
                            </div>
                            <div className="pillar-line" aria-hidden="true" />
                        </div>
                    ))}
                </div>

                {/* Central quote */}
                <div className="philosophy-quote reveal">
                    <div className="quote-mark">"</div>
                    <blockquote className="quote-text">
                        Architecture is the learned game, correct and magnificent, of forms assembled in the light.
                    </blockquote>
                    <cite className="quote-author">— Le Corbusier</cite>
                    <div className="quote-arabic">الهندسة المعمارية لعبة متعلمة، صحيحة وعظيمة</div>
                </div>
            </div>
        </section>
    );
}
