import { useEffect, useRef } from 'react';
import './Skills.css';

const technicalSkills = [
    { name: 'AutoCAD', level: 90, category: 'Software' },
    { name: 'SketchUp', level: 85, category: 'Software' },
    { name: 'Revit', level: 80, category: 'Software' },
    { name: 'Adobe Photoshop', level: 88, category: 'Software' },
    { name: 'Lumion / V-Ray', level: 78, category: 'Rendering' },
    { name: 'Hand Drafting', level: 92, category: 'Traditional' },
];

const designSkills = [
    { name: 'Space Planning', level: 95 },
    { name: 'Interior Design', level: 92 },
    { name: 'Architectural Design', level: 88 },
    { name: 'Material Selection', level: 90 },
    { name: 'Lighting Design', level: 82 },
    { name: 'Concept Development', level: 94 },
];

const softSkills = [
    { icon: '◈', label: 'Client Communication' },
    { icon: '◇', label: 'Project Management' },
    { icon: '◉', label: 'Creative Problem Solving' },
    { icon: '◈', label: 'Team Collaboration' },
    { icon: '◇', label: 'Presentation Skills' },
    { icon: '◉', label: 'Research & Analysis' },
];

function SkillBar({ name, level, index }) {
    const barRef = useRef(null);
    const fillRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        if (fillRef.current) {
                            fillRef.current.style.width = `${level}%`;
                        }
                        if (barRef.current) {
                            barRef.current.classList.add('visible');
                        }
                    }, index * 80);
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.2 }
        );
        const el = barRef.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [level, index]);

    return (
        <div className="skill-bar-item reveal" ref={barRef} style={{ transitionDelay: `${index * 0.06}s` }}>
            <div className="skill-bar-header">
                <span className="skill-name">{name}</span>
                <span className="skill-percent">{level}%</span>
            </div>
            <div className="skill-bar-track">
                <div
                    className="skill-bar-fill"
                    ref={fillRef}
                    style={{ '--target-width': `${level}%` }}
                />
            </div>
        </div>
    );
}

function CircularSkill({ name, level, index }) {
    const ref = useRef(null);
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        if (ref.current) {
                            const circle = ref.current.querySelector('.circle-progress');
                            if (circle) circle.style.strokeDashoffset = offset;
                            ref.current.classList.add('visible');
                        }
                    }, index * 100);
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.2 }
        );
        const el = ref.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, [offset, index]);

    return (
        <div className="circular-skill reveal" ref={ref} style={{ transitionDelay: `${index * 0.08}s` }}>
            <div className="circle-wrapper">
                <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r={radius} fill="none" stroke="var(--sand-dark)" strokeWidth="3" />
                    <circle
                        className="circle-progress"
                        cx="45" cy="45" r={radius}
                        fill="none"
                        stroke="var(--rose)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        transform="rotate(-90 45 45)"
                        style={{ transition: `stroke-dashoffset 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s` }}
                    />
                </svg>
                <div className="circle-center">
                    <span className="circle-num">{level}</span>
                    <span className="circle-pct">%</span>
                </div>
            </div>
            <span className="circle-label">{name}</span>
        </div>
    );
}

export default function Skills() {
    const titleRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
            }),
            { threshold: 0.15 }
        );
        if (titleRef.current) observer.observe(titleRef.current);
        return () => { if (titleRef.current) observer.unobserve(titleRef.current); };
    }, []);

    return (
        <section id="skills" className="skills">
            <div className="container">
                {/* Header */}
                <div className="skills-header reveal" ref={titleRef}>
                    <div className="section-label">Skills</div>
                    <h2 className="section-title">
                        Tools of <em>Craft</em>
                    </h2>
                    <p className="skills-subtitle">
                        A blend of technical precision and artistic intuition — the instruments through which visions become reality.
                    </p>
                </div>

                <div className="skills-layout">
                    {/* Left: Technical bars */}
                    <div className="skills-bars-col">
                        <h3 className="skills-col-title">Software & Tools</h3>
                        <div className="skills-bars">
                            {technicalSkills.map((s, i) => (
                                <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Right: Design circles */}
                    <div className="skills-circles-col">
                        <h3 className="skills-col-title">Design Expertise</h3>
                        <div className="skills-circles">
                            {designSkills.map((s, i) => (
                                <CircularSkill key={s.name} name={s.name} level={s.level} index={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Soft skills */}
                <div className="soft-skills reveal" style={{ transitionDelay: '0.3s' }}>
                    <h3 className="skills-col-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Professional Strengths
                    </h3>
                    <div className="soft-skills-grid">
                        {softSkills.map((s, i) => (
                            <div className="soft-skill-chip" key={s.label}>
                                <span className="soft-skill-icon">{s.icon}</span>
                                <span className="soft-skill-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
